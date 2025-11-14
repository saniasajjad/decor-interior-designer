import { DesignStyle, Service, TeamMember, SubscriptionPlan, ContactInfo } from './types';
import { BadgeIcon, BlueprintIcon, DiamondIcon, FloorPlanIcon, ExteriorIcon, LandscapeIcon, LightbulbIcon, HeartIcon, PaletteIcon } from './components/icons';

export const ADMIN_EMAIL = 'admin@decor.com';

export const DESIGN_STYLES: DesignStyle[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean lines, simple color palette, and use of materials like metal, glass, and steel.',
    imageUrl: 'https://picsum.photos/seed/modern/400/300',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Uncluttered and simple. "Less is more" philosophy with neutral colors and functional furniture.',
    imageUrl: 'https://picsum.photos/seed/minimalist/400/300',
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    description: 'Carefree, eclectic, and unconventional style with a mix of patterns, textures, and colors.',
    imageUrl: 'https://picsum.photos/seed/bohemian/400/300',
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    description: 'Simplicity, minimalism, and functionality, with a focus on light, natural materials, and muted colors.',
    imageUrl: 'https://picsum.photos/seed/scandinavian/400/300',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    description: 'Raw, unfinished look with exposed bricks, ductwork, and wood. A warehouse or factory feel.',
    imageUrl: 'https://picsum.photos/seed/industrial/400/300',
  },
  {
    id: 'coastal',
    name: 'Coastal',
    description: 'Light, airy, and open feel inspired by the beach. Light colors, natural materials, and nautical decor.',
    imageUrl: 'https://picsum.photos/seed/coastal/400/300',
  },
];

export const DESIGN_SERVICES: Service[] = [
    {
        id: 'floor-plan',
        name: 'AI Floor Plan Generation',
        price: '$500',
        icon: FloorPlanIcon,
        features: [
            'AI-Powered Layout Creation',
            'Up to 2,000 sq ft',
            'Structural Feasibility Check',
            '2D & 3D Floor Plans',
            'Two Revision Rounds'
        ],
    },
    {
        id: 'exterior-rendering',
        name: '3D Exterior Rendering',
        price: '$950',
        icon: ExteriorIcon,
        features: [
            'Photorealistic 3D Views',
            'Material & Lighting Selection',
            'Environment Integration',
            'Architectural Style Consultation',
            'High-Resolution Images'
        ],
    },
    {
        id: 'landscape-design',
        name: 'Landscape Design',
        price: '$750',
        icon: LandscapeIcon,
        features: [
            'Garden & Patio Layouts',
            'Plant & Material Suggestions',
            'Outdoor Lighting Plan',
            '3D Visualization',
            'Water Feature Design'
        ],
    },
    {
        id: 'e-design',
        name: 'E-Design Package',
        price: '$300',
        icon: BadgeIcon,
        features: [
            'Virtual Consultation',
            '2D Mood Board',
            'Curated Shopping List',
            'Color Palette Selection',
            'Email Support'
        ],
    },
    {
        id: 'full-service',
        name: 'Full-Service Design',
        price: '$2,000+',
        icon: BlueprintIcon,
        features: [
            'Everything in E-Design',
            'In-Person Meetings',
            '3D Renderings',
            'Project Management',
            'Final Installation & Styling'
        ],
    },
    {
        id: 'vip',
        name: 'VIP Treatment',
        price: '$5,000+',
        icon: DiamondIcon,
        features: [
            'Everything in Full-Service',
            'Bespoke Furniture Design',
            'Personal Shopping',
            'Exclusive Material Sourcing',
            '24/7 Priority Support'
        ],
    },
];

export const TEAM_MEMBERS: TeamMember[] = [
    {
        name: 'Misha zulfiqar',
        title: 'Lead Interior Designer',
        bio: 'With a passion for creating beautiful and functional spaces, Misha leads our design team with a keen eye for detail.',
        imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQFwDFYB86BNWg/profile-displayphoto-scale_400_400/B56ZehKEGnHQAg-/0/1750755462406?e=1763596800&v=beta&t=a9NLH4dkNhhN88kWVYnZ50rWmxkW7d973hM0Qxs6mGk'
    },
    {
        name: 'Larib Tanveer',
        title: 'AI & Tech Lead',
        bio: 'Larib is the mastermind behind our AI, constantly innovating to bring you the most realistic design generations.',
        imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8SEBIQEA8QDw8QEBAPEA8PEA8PDw8QFREWFhUVFRUYHSggGBomGxUVIjEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OFxAQFy0dHR0tLS0tLS0tLS0tKy0rLS0tLS0tLSstLSstLS0tLS0tLSs3Ky0tLS0uLS0rLS03OC4rOP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAgEDBAYHBf/EAEIQAAIBAgMFAwcKBAUFAAAAAAABAgMRBAUhBhIxQVETYXEic4GRobGyFCMyM0JTcpPB0SQ0UrMVFoLw8UNjksLh/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAJhEBAQACAQUAAQMFAAAAAAAAAAECEQMEEiExQRMUMlEiM2Gxwf/aAAwDAQACEQMRAD8A55Sxe7Lek79wZnm6nGy0PFq4i5j9pdjZpk9q3xEnOxD0RXJkCTqFMmTIUo6rsthabwdBunBt09W4Rber52PW+R0vuqf/AIQ/Y8/ZT+Sw/m/1Z66Ok9M/VKwVH7qn+XD9ifkVH7qn+XD9i5EmRSsFR+6p/lw/Yn5FR+6p/lw/YvSBgUfIqP3VP8uH7B8jo/dUvy4fsTUxEY/Se6ur4evkeJnu0tOjeEGp1O7WMfFhWVmOIwtJa0qblbSKhD26aGm5pmam35FOK1sowikvYYuMzOU7tvV6+k8atXvzuYVbVqxvwXqREJp/ZXqRibw/bW4Ioyq7iuCXqRiORMLt8LmQqOl7AYjMnKv5ij56l/cRTUsXZU/4ih5+l/cQWO4pBJD2FkcI9n1TcWoTKViqUrmbk7Y47Y2Li2tDVc0y6b1tc3Cws6afIky0cnF3Rzr5DL+lgb/8mj/SgNfkcP0t/lxpzuPSKhkz0PGyd65E0JSYVJAVzQiJbIQHW9lP5LD+bXvZ6yPI2U/ksP5te9nsI6fGfqSSCSBkyvEVowi5ydopNtvkkJiMTCEXKUlGK1bbsjn21O0XbPcg2qKfhvvr4GVkXZ7tdKd4UfIhw3vtSX6GrOvIR1l0IlWvyIoq1GypFsYpjql3AVxWgjMunhJTdoxbuWYjJ68FvSpyUP6uS8eg2uqpw1STSjFXeulr8S3saq0cZLuaZsuyNHDWtddq7Jqdrv8ACbRVy2ElZxT/AN9TlnyWX07cfD3z25PVg0+HsL8pX8RQ8/R/uI3/ABGzkZcLrv0PPnstuPtE9afzi5ax8pcPAk5o3emynp0VlVWRpWWbYyclGavc23td5J9VczlNOvHZl6JJiOQlabXAxMViHCLk+Rykt9PRc5h7Z1yTWaW1EU7TjZdT28Jj6dRXjJMtxsaw5ccvVZYC7wEdPDiRIEHtfCWwegjZPIRgSBBIHV9lZfweH82vez2HI1rZyq4YSg5v5twVpf0tt6PuM3E5nGKbvaK4y5eCfU3vTOnp1cTGKu2ku81/NNrKcLqnFzkub0jf9TXc2zidV2TcKa4LnLvZ4OIrdDNrWmfmub1az3qkr9Ir6K9B5dRtlbkyZSuQKAGXlWXzxFaFGHGT1fKMVxYWTfgYChOo7Qi5dWlwNlwWzjdnN2T9ZuWWZNSo01CEbWWr5yfVsjMcNK3kvdfW29b0Hkz5cr6fQ4ulwnnLyqyvK6VNeTFX6vVnqTpRaaaTTVrW0ZrWYZliMM6abo1u03tGpUd2MVdycrtW9Bn5JntLExvC8ZK2/CX0o3967y9txm63M+PkvbPDxM72TSfaUE42esFy749D2tm61V09ytrKDspPi13nuxjcSGGSd1zNy7jheOYZeDqmijG0vm6nm5/Cy6lJ3ldWSdk7p7ytx7ivGT+bqebn8LMWR1tsjk2U1IxqQcuF0dXw1SMoRceFkcZpvh4I3nY7OL/NTfgdeTHbzdPnMbqtrqI17auUux8nrqbNOJiYvDKSs1dM4S3GvdnxzkxcqqVZVLK3A97J6NWilNt2b4M2OlktGMr7upbjsLvR3Yrgdcs5Y8OPFlhWP/ibJMT/AAup0A5eHfvyc5IsSB7HzzCMZioAQIbdFA2fLM27OlCM/LgoWVO9kteP/wAMPFY+dR6vyI/RjfSK6I8hVHZIyIvRIArVmYrZZWKgAlMgAJbMjL8XUo1I1act2cXdPivBrmjGLIIHp03I9s6FRKNe1Cpw3n9TJ/i+z6fWbM4xkrppp6pp3TRxNGfluc4jDv5qo4rnB+VB/wCl6HK8c+PTh1Fnt0HaHIo4iKi3KMo33Zx1tfimua0Ri5LkEaFnHelNtb02rXXC1uSMDL9vOCxFH/XSf/q/3NiwG0eCqWtWjBv7NT5t+3T2mLMvTtjlxW909vXhAmeg8Gmrppp8GndMpxE7E3qLq5VXVZrG0WX15xlKE3ZJuylbSzubC2U4z6qp5ufwsz3eXXLi3i49SMvC4hwkpReqdzDpcF4FqPW+U6rs/mka9Na+Ulqj1XA5Nk2ZyoVFJPTmjqGV5hCtBSi13o8+eOnv4eXc1TToERopGY0YOa4hU6UpvkjnJt1yqyyJOe/5on19pJvscu+NPIJA9LwIJhG5BdR4FCy0RWhpsVEEltKXEqGjwAJsUAAAAABFsCosgBcSiESgGQEXJQGXhMfVpNOnVnTtr5Mml6VzOsKW9CLUt+8YvfVvK046HGnLkbzsLnCf8LUlra9Fv2w/Vek5cmO49PTckxy1frI2qxroQp2dSKlO0pwk99JK9k3om317zzcmz7EypzVdb9PdcFVsk1KUXZPk/HvRuWMwMZxtKMZrnGSUk/QzAx2XRdGUN1QjGMpJQSik0m1oc5lNasd88Mpl3Y3w5VTjovAsQsGMel88M9TJM3nQmmn5N9UeWBLNrLq7dgy3M4VoJxavbVGube5jaCpRer4mn5dmNSk7xk13Gat/E1E5as5zDVd7zbxeBuMDc/8ALiIOjjutGAAKyC5aIoHctAEYMlIgokm4oEDxQpbU0SXdr3lQAAEwV2l1aQEDxGxdB06koPjF28VxT9VhIgXRY6KmPFgMEpWRFylyuwGpvmZFObTUk2pJppp2aa4NFcBgOn7K7RxxMVTqNRxEV5S4Kol9qP6ov2txyoYSrNO05Lsofjnpf0K79By2hVlCSnCTjOLvGUXZp9x71bG18fuQqNJUYyk3FW3mlrJrrbT1nK8fl6Zz3t1fbWkMhIyJTOjzGuTcS5W53KMinq7G7bL4C3lNGq5Rh7yR0nKaG7BIn1dMrs0QXWA0u3DgACMoYEkMCSAAAJAAGqO7FAAA9DI8G6laCs7KSd+ljEoUnJo3rZDK9177Wpz5M5jHbh4rnl/h5+3eTOLjioq8JRjTq2+zNK0ZPua09C6moxZ3N4WMoOE4qUZJqUWrpp8Uc02r2Qnh71aN6mH4tcZ0V39Y9/r6jDLxqt83F5tjX0roSK1EhNlk3bx9x0eYVJclx5iwQiRNwLkxt4o3hXJgZCld2Rv2zOA3MNUm1rKnJX7t1tmiZbTvNeKR1ajSUcNJLgqU/hZPq/HIIy0XgDmVp6AVDSkNSWoiMjDR1FG0bN4e7WhvtFWSNU2WjobdAmLd9JAkDbDhgABkAAAAQSAAAAAAAAbBsnglWk1/RZ+vh+p0rAUFFJdFY5dsnmSoYmLk7U5/NzfJX4S9D97OsUEeXkxvft9Pps5+LU9syIlZK2o0SmvOwq4+3Pc02RqOdSdPsqSc24QvK1u5/Z8DT8RRnCbhNWlF2aOi7S572cJKFnPq+C8DnNarKUnKTbk3dtnXiyyvv08nUY4Y3+n2XeGjBsIQv4D719FwOrzF7LktRuxZlUIK5nqnF2014EtWRRldL5ynF8HOK9bsdO/6E/Nz+Fmn5Lk7lNO3C1r9b39hu1eFqM1/25/CxPK3xHE0hnEuoUrpPuLZUGXbLEhEzKKCFKxbGBLVbps1C0Uzaab0Na2cXzaNlprQYtU4ABthwu5JFiTIAAAAAAAALA0AAAANBG7bJ7VdmlRxD8haQqvXcXSXd3ml00Wpks21jncb4ds+UJxvBqSaupJppruZrG1OcuhDRpzlok7mh4bNK9JWpVZwXSMnu+rgYuMxlWq71ZubXN2/Q5/j3Xp/U6xsk8mxGKnVk5Tld9eCMdsnkLY6yaeW3YcmNSeobo1OkwjKpP3nu5VQ3rO1+B5mEob1l7Dc9ncu1Ta8le1nLK+dR2459r28twu5Faa219JkYz6up5ufwstQmMXzVTzc/hZ1k1HK3dciw8VZeCMxU00YVKWiMymzFWRDpX4GXg8E5SWhdg8ObDluD7jO9t9rKybC7qPZRXSp2RajrJpjKgAA0y4VckixJkAAAAAABbTQlTiG/pYUAGhG4qRkQjYCLAxmyq9whZO7GpxuI2W05WQU1VcEidwakufFvgRUl9lf8sCaELu74GTg4b0resmNKyS8DKyLBzqVEoq7b9hm3Uak3Xt5Hld5dX7l1N1w9GMIpLgjHy7BRpRstZP6T6maiYY/a6cmU1qejRExf1VTzc/hY8SvGfV1PNz+FnVxcdpcvBHqYSHA86hTbPcy+kcM7p248dvUwFC7SNnw1CyPPyjD82j2Ui8c+ry3XgIkCbHVwQA1gA4STujJDNaEFQAAAAAAEtFqotJNppSV4t8Gu4WKuwtlntZSp6DtDpFNWfJekrJZa6chKnQshIqnxIpRqau7CjU+IGTOTStztbwGwlG7Svq+fQoqvUvwkra8yLHruEfZp4Gfs3jVTrwV7KclB99+C9djwnUYYOo+0jJO2495PvXBmZGrl/DrkRkU4aTcYt2bcYttcG2i06Rm00RMZ9XP8E/hYyFxX1c/wT+FmvjLmWBpXsbBlmCbaMTK8FoupteAwu6jyfur2fsxZOHp7qsWgiUemTUeXK7pkSQhkgiAGAppwxIichZTK7mQEgAACQDwiB6cMdF0eylG7S3YPrrz6E0MHRjbfrXk7bypwclDVp3lz5PTvKsDhlVlZpRjBLfkvJfO2r5tv2IyKmCklvQUpQXOy3u/Tu6jHGR7+XDqeo4sM7NyTU1POp/yetkzTDdkoyjNVKc15E0mr6K6afBq/A8uEvaPiKt/J5J39JSWvnxeporqSvyIgrjVWuRFVoeHEhoiD1AvnT4mRg4pJ3KqktH32JjO0e9kU0pXLKcreBjRuz0MqwzqVYU4relKS48EubfoKjp2WSl2NJy+k6UL+O6jLuJFdOQxqFOhK/0Jfhl7hkDV013CpK8jK8Jom0eshYRsMc8MdR25Mu6pRKIQyNuRkTcUkoa4CkjRtwYAYJGRIA0NCNwJjEtiiVEmwR6eW4yEYuNRKKa0qxjeUfxx4TXtXLoZWNxHZ04Tgo1VFbqqQbcIytxb5fhkkeHVl5NiIVHFSs2t6O7K32o9H1K9fB13Nw43HG+P9ed+GK7hYfeJUlx6EeVHAePAqky2lKyAqkQXSimipRAtctEREhrkOkCrIRN22GwSSnWa1+hHu5yfuNMoptpRTbbSSWrbfJHUMjwXY0IU39K29P8AE+P7egsR6KJQqJNQOSKmSQCACSN1KJRBKKyklEIk0AkgAjhA6Q3ZNcURNnNbLPFVsyKUSmCuzKiipU2BokrqTsEit6vuRFVhvaFcmRUATYgKAuAWKLqEtSajSKoSsEVcgbvLYt9CIpGThaEpzjTgryk0l+4Rs+xGA1liJLh5FPx+0/09ZuSZhYHDxpU4048Iq3i+b9LMmLEVdFj3KUWI2h0MhUiUVEgCAzGqlEoUZBDIkUC2qkkAJtHHMy4nnTIA54ens6/+/kegZEQA28VSzGrEgCKKgoARpIAAAAAAExJABkZmVfWx8Je4kAPeJRIAMhkAFQxZhvpw/HH4kAFG8oAAKBkQBaylEgArRgACD//Z'
    },
    {
        name: 'Sania Sajjad',
        title: 'Founder & CEO',
        bio: 'Sania Sajjad founded DecorAI with the vision of making professional interior design accessible to everyone, everywhere.',
        imageUrl: 'data:image/jpeg;base64,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'
    }
];


export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
        id: 'Pro',
        name: 'Pro',
        price: 29,
        isPopular: true,
        features: [
            'Unlimited AI Generations',
            'Access to All Design Styles',
            'Save Unlimited Designs to Gallery',
            'High-Resolution Exports',
            'Priority Email Support',
        ],
    },
    {
        id: 'Business',
        name: 'Business',
        price: 79,
        features: [
            'All features from Pro',
            'Commercial License for Designs',
            'Team Collaboration (Up to 3 seats)',
            'Dedicated Account Manager',
            '24/7 Priority Support',
        ],
    },
];


export const LOADING_MESSAGES: string[] = [
    "Brewing creativity...",
    "Arranging pixels and furniture...",
    "Consulting with our digital designers...",
    "Finding the perfect color palette...",
    "Adding the finishing touches..."
];

export const ABOUT_US_CONTENT = {
    mission: "To democratize interior and architectural design, making it accessible, affordable, and enjoyable for everyone through the power of artificial intelligence.",
    story: "Founded in a small garage by a designer and a tech enthusiast, DecorAI started with a simple idea: what if you could visualize a new room design instantly, without the high cost and long waits of traditional design services? This question sparked a journey to build the most intuitive and powerful AI design tool on the market. Today, we're a passionate team dedicated to helping people create spaces they truly love.",
};

export const COMPANY_VALUES = [
    {
        name: "Innovation",
        description: "We are constantly pushing the boundaries of AI to deliver cutting-edge, realistic, and inspiring design solutions.",
        icon: LightbulbIcon,
    },
    {
        name: "Creativity",
        description: "We believe everyone has a creative spark. Our tool is designed to ignite that spark and bring your unique vision to life.",
        icon: PaletteIcon,
    },
    {
        name: "Customer Passion",
        description: "Our users are at the heart of everything we do. We are committed to listening, learning, and building a platform that exceeds expectations.",
        icon: HeartIcon,
    },
];

export const DEFAULT_CONTACT_INFO: ContactInfo = {
    address: "123 Design Lane, Creativity City, pakistan 1234",
    phone: "+923218949378",
    email: "support@decor.com",
};