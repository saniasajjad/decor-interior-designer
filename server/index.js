import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Optional Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
let supabase = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('Supabase connected (optional - will use in-memory if tables missing)');
  } catch (e) {
    console.warn('Supabase init failed, using in-memory storage:', e.message);
  }
} else {
  console.log('No Supabase config - using in-memory storage');
}

// In-memory storage (fallback if Supabase not configured)
const ADMIN_EMAIL = 'admin@decor.com';
const users = new Map(); // email -> user
const galleries = new Map(); // email -> GalleryItem[]
let orders = []; // Order[]
let contactInfo = {
  address: '123 Design Lane, Creativity City, pakistan 1234',
  phone: '+923218949378',
  email: 'support@decor.com'
};

// POST /login
app.post('/login', async (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  const isAdmin = email === ADMIN_EMAIL;
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({ email, name, is_admin: isAdmin, plan: 'Free', free_generations_left: 3 }, { onConflict: 'email' })
        .select()
        .single();
      if (error) throw error;
      const user = { name: data.name, email: data.email, isAdmin: data.is_admin, plan: data.plan, freeGenerationsLeft: data.free_generations_left };
      return res.json(user);
    } catch (e) {
      console.warn('Supabase login failed, using memory fallback:', e.message || e);
    }
  }
  const existing = users.get(email);
  if (existing) {
    const updated = { ...existing, isAdmin };
    users.set(email, updated);
    return res.json(updated);
  }
  const user = { name, email, plan: 'Free', freeGenerationsLeft: 3, isAdmin };
  users.set(email, user);
  return res.json(user);
});

// POST /user (save)
app.post('/user', async (req, res) => {
  const user = req.body;
  if (!user || !user.email) return res.status(400).json({ error: 'user with email required' });
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          email: user.email,
          name: user.name,
          is_admin: !!user.isAdmin,
          plan: user.plan,
          free_generations_left: user.freeGenerationsLeft
        }, { onConflict: 'email' })
        .select()
        .single();
      if (error) throw error;
      const saved = { name: data.name, email: data.email, isAdmin: data.is_admin, plan: data.plan, freeGenerationsLeft: data.free_generations_left };
      return res.json(saved);
    } catch (e) {
      console.warn('Supabase saveUser failed, using memory fallback:', e.message || e);
    }
  }
  users.set(user.email, user);
  return res.json(user);
});

// GET /gallery?email=
app.get('/gallery', async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'email required' });
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .eq('email', email)
        .order('saved_at', { ascending: false });
      if (error) throw error;
      const items = (data || []).map(row => ({
        id: row.id,
        originalImage: row.original_image,
        generatedImage: row.generated_image,
        style: row.style,
        prompt: row.prompt,
        savedAt: row.saved_at
      }));
      return res.json(items);
    } catch (e) {
      console.warn('Supabase getGallery failed, using memory fallback:', e.message || e);
    }
  }
  return res.json(galleries.get(email) || []);
});

// POST /gallery { email, item }
app.post('/gallery', async (req, res) => {
  const { email, item } = req.body || {};
  if (!email || !item) return res.status(400).json({ error: 'email and item required' });
  if (supabase) {
    try {
      const { error } = await supabase
        .from('galleries')
        .insert({
          email,
          id: item.id,
          original_image: item.originalImage,
          generated_image: item.generatedImage,
          style: item.style,
          prompt: item.prompt,
          saved_at: item.savedAt
        });
      if (error) throw error;
      const { data } = await supabase
        .from('galleries')
        .select('*')
        .eq('email', email)
        .order('saved_at', { ascending: false });
      const items = (data || []).map(row => ({ id: row.id, originalImage: row.original_image, generatedImage: row.generated_image, style: row.style, prompt: row.prompt, savedAt: row.saved_at }));
      return res.json(items);
    } catch (e) {
      console.warn('Supabase saveToGallery failed, using memory fallback:', e.message || e);
    }
  }
  const current = galleries.get(email) || [];
  const updated = [item, ...current];
  galleries.set(email, updated);
  return res.json(updated);
});

// GET /orders
app.get('/orders', async (_req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });
      if (error) throw error;
      const list = (data || []).map(row => ({
        id: row.id,
        serviceName: row.service_name,
        price: row.price,
        status: row.status,
        orderDate: row.order_date,
        customerName: row.customer_name,
        customerEmail: row.customer_email
      }));
      return res.json(list);
    } catch (e) {
      console.warn('Supabase getAllOrders failed, using memory fallback:', e.message || e);
    }
  }
  return res.json(orders);
});

// POST /orders { user, service }
app.post('/orders', async (req, res) => {
  const { user, service } = req.body || {};
  if (!user || !service) return res.status(400).json({ error: 'user and service required' });
  const newOrder = {
    id: `ORD-${Date.now()}`,
    serviceName: service.name,
    price: service.price,
    status: 'Pending',
    orderDate: new Date().toISOString(),
    customerName: user.name,
    customerEmail: user.email,
  };
  if (supabase) {
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          id: newOrder.id,
          service_name: newOrder.serviceName,
          price: newOrder.price,
          status: newOrder.status,
          order_date: newOrder.orderDate,
          customer_name: newOrder.customerName,
          customer_email: newOrder.customerEmail
        });
      if (error) throw error;
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });
      const list = (data || []).map(row => ({ id: row.id, serviceName: row.service_name, price: row.price, status: row.status, orderDate: row.order_date, customerName: row.customer_name, customerEmail: row.customer_email }));
      return res.json(list);
    } catch (e) {
      console.warn('Supabase placeOrder failed, using memory fallback:', e.message || e);
    }
  }
  orders = [newOrder, ...orders];
  return res.json(orders);
});

// PATCH /orders/:id { status }
app.patch('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};
  if (!status) return res.status(400).json({ error: 'status required' });
  if (supabase) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });
      const list = (data || []).map(row => ({ id: row.id, serviceName: row.service_name, price: row.price, status: row.status, orderDate: row.order_date, customerName: row.customer_name, customerEmail: row.customer_email }));
      return res.json(list);
    } catch (e) {
      console.warn('Supabase updateOrderStatus failed, using memory fallback:', e.message || e);
    }
  }
  orders = orders.map(o => o.id === id ? { ...o, status } : o);
  return res.json(orders);
});

// GET /contact
app.get('/contact', async (_req, res) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        return res.json({ address: data.address, phone: data.phone, email: data.email });
      }
    } catch (e) {
      console.warn('Supabase getContactInfo failed, using memory fallback:', e.message || e);
    }
  }
  return res.json(contactInfo);
});

// PUT /contact
app.put('/contact', async (req, res) => {
  const info = req.body;
  if (!info) return res.status(400).json({ error: 'contact info required' });
  if (supabase) {
    try {
      const payload = { id: 1, ...info };
      const { error } = await supabase
        .from('contact_info')
        .upsert(payload, { onConflict: 'id' });
      if (error) throw error;
      return res.json(info);
    } catch (e) {
      console.warn('Supabase updateContactInfo failed, using memory fallback:', e.message || e);
    }
  }
  contactInfo = info;
  return res.json(contactInfo);
});

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'decor-server' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
