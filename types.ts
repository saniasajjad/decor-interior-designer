export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Service {
  id: string;
  name: string;
  price: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

export type SubscriptionPlanName = 'Free' | 'Pro' | 'Business';

export interface User {
  name: string;
  email: string;
  plan: SubscriptionPlanName;
  freeGenerationsLeft: number;
  isAdmin?: boolean;
}

export interface GalleryItem {
  id: string;
  originalImage: string;
  generatedImage: string;
  style: string;
  prompt: string;
  savedAt: string;
}

export interface SubscriptionPlan {
    id: SubscriptionPlanName;
    name: string;
    price: number;
    features: string[];
    isPopular?: boolean;
}

export interface Order {
  id: string;
  serviceName: string;
  price: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  orderDate: string;
  customerName: string;
  customerEmail: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}


export type AppState = 'UPLOADING' | 'CUSTOMIZING' | 'GENERATING' | 'RESULTS';
export type AppView = 'DESIGNER' | 'SERVICES' | 'TEAM' | 'GALLERY' | 'PRICING' | 'ABOUT' | 'CONTACT' | 'ORDERS' | 'ADMIN';