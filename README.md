# Darik Coffee (ዳሪክ ቡና) — Artisanal Packaged Coffee & CMS Platform

> **Since 2004 E.C.** | Authentic Ethiopian Highland Specialty Coffee

A modern web storefront and Content Management System (CMS) admin panel for **Darik Coffee (ዳሪክ ቡና)**, dedicated to freshly roasted, nitrogen-sealed packaged coffee bags from Ethiopia's prime terroirs (Yirgacheffe, Guji, Sidama, Harar, Jimma, Limu).

---

## ✨ Features

- ☕ **Artisanal Roasted Coffee Bag Storefront**:
  - Roasted packaged whole bean & custom ground coffee bags.
  - Interactive Coffee Customizer modal (package weights: 250g, 500g, 1kg; grind profiles: Whole Bean, French Press, Pour Over, Espresso, Traditional Jebena).
  - Floating shopping bag & slide-over cart drawer with checkout flow.
- 📱 **100% Fluid Responsive Design**:
  - Touch-optimized across mobile phones, tablets, and desktop displays.
  - Slide-over mobile drawer navigation for admin and customer storefront.
- 🔐 **CMS Admin Panel (`/admin`)**:
  - **Supabase Authentication**: Secure admin login and session management.
  - **Coffee Packs Manager (`/admin/products`)**: Create, edit, and manage packaged coffee products with dual mobile card / desktop table views.
  - **Site Sections Editor (`/admin/content`)**: Real-time copy & promotional campaign updater.
  - **Media Gallery Manager (`/admin/gallery`)**: Curate photos for the "Our Dream Gallery" bento showcase.
  - **Orders Workflow Manager (`/admin/orders`)**: Real-time customer orders tracker (`Pending` ➔ `Roasting` ➔ `Dispatched` ➔ `Delivered`).
- 📸 **Dual Image Upload & Web Link System**:
  - Option to upload local photos or enter direct web image links for products, gallery, and site headlines.
  - In-browser client-side HTML5 canvas compression for instant loading and zero server bloat.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Swiftminale/DarikCoffee.git
   cd DarikCoffee
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
   ```bash
   cp .env.local.example .env.local
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Project Structure

```
├── public/                 # Static assets & brand seals
├── src/
│   ├── app/
│   │   ├── page.jsx        # Public Storefront
│   │   ├── layout.jsx      # Root HTML Layout & Font configuration
│   │   └── admin/          # CMS Admin Panel routes
│   │       ├── page.jsx          # Admin Dashboard Overview
│   │       ├── login/page.jsx    # Supabase Admin Login
│   │       ├── products/page.jsx # Products CRUD
│   │       ├── content/page.jsx  # Site Content Editor
│   │       ├── gallery/page.jsx  # Gallery Manager
│   │       └── orders/page.jsx   # Orders Log
│   ├── components/         # UI Components (Hero, SpecialPromo, BentoGallery, etc.)
│   ├── context/            # CartContext, ContentContext, AuthContext
│   └── lib/                # Supabase client initialization
└── package.json
```

---

## 📜 License
Private & Proprietary — Darik Coffee (ዳሪክ ቡና). All rights reserved.
