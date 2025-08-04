# ECommerce Template

A full-stack eCommerce website template built with Next.js, Firebase, and modern web technologies.

## Features

### Frontend
- 🏠 **Home Page**: Hero section, featured products, category showcase
- 🛍️ **Product Catalog**: Filtering, sorting, search functionality
- 🛒 **Shopping Cart**: Add/remove items, quantity management
- ❤️ **Wishlist**: Save favorite products
- 💳 **Checkout**: Multi-step checkout with payment integration
- 📱 **Responsive Design**: Mobile-first approach

### Admin Panel
- 🔐 **Authentication**: Firebase Auth with email/password
- 📦 **Product Management**: CRUD operations for products
- 📊 **Order Management**: View and update order status
- 🖼️ **Image Upload**: Firebase Storage integration
- 📈 **Dashboard**: Sales statistics and overview

### Backend & Integrations
- 🔥 **Firebase**: Firestore, Auth, Storage
- 💰 **Payment Gateways**: Razorpay, Stripe, PayPal (mock implementations)
- 🚚 **Shipping**: Shiprocket API integration (mock)
- 📧 **Email**: Order confirmation emails (mock)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Storage)
- **UI Components**: shadcn/ui, Radix UI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS

## Quick Start

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd ecommerce-template
npm install
\`\`\`

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - **Authentication**: Email/Password provider
   - **Firestore Database**: Start in test mode
   - **Storage**: Start in test mode

3. Get your Firebase config from Project Settings > General > Your apps
4. Update `lib/firebase.ts` with your config:

\`\`\`typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}
\`\`\`

### 3. Firestore Security Rules

Update your Firestore rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - read for all, write for authenticated users only
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders - read/write for authenticated users only
    match /orders/{document} {
      allow read, write: if request.auth != null;
    }
    
    // Users - read/write for authenticated users only
    match /users/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
\`\`\`

### 4. Storage Security Rules

Update your Storage rules:

\`\`\`javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
\`\`\`

### 5. Create Admin User

1. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

2. Go to `/admin` and try to login
3. Create an admin user in Firebase Console:
   - Go to Authentication > Users
   - Add user with email: `admin@estore.com` and password: `admin123`

### 6. Add Sample Products

Use the admin panel to add products, or add them directly in Firestore:

\`\`\`javascript
// Sample product document in 'products' collection
{
  name: "Wireless Headphones",
  description: "High-quality wireless headphones with noise cancellation",
  price: 2999,
  originalPrice: 3999,
  category: "electronics",
  stock: 50,
  isOnSale: true,
  imageUrl: "https://example.com/image.jpg"
}
\`\`\`

## Project Structure

\`\`\`
ecommerce-template/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── products/          # Product pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Site header
│   ├── Footer.tsx        # Site footer
│   └── ...
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # Authentication context
│   └── CartContext.tsx   # Shopping cart context
├── lib/                  # Utility libraries
│   ├── firebase.ts       # Firebase configuration
│   ├── payment.ts        # Payment processing
│   └── utils.ts          # Utility functions
├── types/                # TypeScript type definitions
└── README.md
\`\`\`

## Payment Integration

### Razorpay Setup (Production)

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API keys from Dashboard
3. Install Razorpay SDK:
\`\`\`bash
npm install razorpay
\`\`\`
4. Update `lib/payment.ts` with actual Razorpay integration

### Stripe Setup (Production)

1. Sign up at [Stripe](https://stripe.com/)
2. Get your API keys
3. Install Stripe SDK:
\`\`\`bash
npm install @stripe/stripe-js stripe
\`\`\`
4. Update `lib/payment.ts` with actual Stripe integration

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Firebase Hosting

1. Install Firebase CLI:
\`\`\`bash
npm install -g firebase-tools
\`\`\`

2. Login and initialize:
\`\`\`bash
firebase login
firebase init hosting
\`\`\`

3. Build and deploy:
\`\`\`bash
npm run build
firebase deploy
\`\`\`

## Environment Variables

Create a `.env.local` file for local development:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Payment Gateway Keys (Production)
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
\`\`\`

## Customization

### Styling
- Update `app/globals.css` for global styles
- Modify Tailwind config in `tailwind.config.ts`
- Customize components in `components/` directory

### Adding New Features
- Create new pages in `app/` directory
- Add new components in `components/`
- Extend types in `types/index.ts`
- Update Firebase functions in `lib/firebase.ts`

## Testing

### Test Admin Panel
1. Go to `/admin`
2. Login with: `admin@estore.com` / `admin123`
3. Add/edit products
4. Manage orders

### Test Customer Flow
1. Browse products on home page
2. Add items to cart
3. Proceed to checkout
4. Test payment flow (mock)

## Production Checklist

- [ ] Update Firebase security rules
- [ ] Set up real payment gateways
- [ ] Configure email service
- [ ] Set up Shiprocket API
- [ ] Add error monitoring (Sentry)
- [ ] Set up analytics (Google Analytics)
- [ ] Configure SEO metadata
- [ ] Test on mobile devices
- [ ] Set up backup strategy
- [ ] Configure domain and SSL

## Support

For issues and questions:
1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review [Next.js Documentation](https://nextjs.org/docs)
3. Check component documentation at [shadcn/ui](https://ui.shadcn.com/)

## License

This project is licensed under the MIT License.
