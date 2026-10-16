-- =======================================================
-- DARIK COFFEE (ዳሪክ ቡና) — SUPABASE DATABASE SETUP
-- Paste this script into your Supabase Dashboard -> SQL Editor
-- =======================================================

-- 1. Products Table (Coffee Packs)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  amharic_name TEXT,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  base_weight TEXT DEFAULT '250g',
  rating NUMERIC DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  badge TEXT,
  process TEXT,
  roast_level TEXT,
  roast_degree INT DEFAULT 3,
  altitude TEXT,
  origin TEXT,
  description TEXT,
  notes JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Site Content Table (Key-Value CMS for sections)
CREATE TABLE IF NOT EXISTS public.site_content (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Gallery Items Table
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  span TEXT DEFAULT 'col-span-6 md:col-span-4',
  aspect TEXT DEFAULT 'h-48 md:h-[240px]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Customer Orders Table
CREATE TABLE IF NOT EXISTS public.customer_orders (
  id TEXT PRIMARY KEY,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'roasting', 'dispatched', 'delivered'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_orders ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view products, content, and gallery)
CREATE POLICY "Public products viewable" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public content viewable" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Public gallery viewable" ON public.gallery_items FOR SELECT USING (true);

-- Anyone can insert an order from cart
CREATE POLICY "Public can insert orders" ON public.customer_orders FOR INSERT WITH CHECK (true);

-- Authenticated Admin Policies (Full access to products, content, gallery, and orders)
CREATE POLICY "Admins have full access to products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to site_content" ON public.site_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to gallery_items" ON public.gallery_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins have full access to customer_orders" ON public.customer_orders FOR ALL USING (auth.role() = 'authenticated');
