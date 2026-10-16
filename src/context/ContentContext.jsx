'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { COFFEE_MENU, GALLERY_ITEMS } from '../data/coffeeData';

const ContentContext = createContext();

const DEFAULT_SITE_CONTENT = {
  hero: {
    accentTag: 'Pure Ethiopian Tradition',
    titleLine1: 'Enjoy Your Life',
    titleLine2: 'With Coffee',
    description: 'Experience the ancient soul of coffee in every drop. Freshly roasted heirloom Arabica, meticulously brewed to unveil vibrant notes of bergamot, floral jasmine, and dark honey.',
    establishedBadge: 'Since 2004 E.C.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
  },
  promo: {
    title: 'Coffee Time',
    tag: 'Limited Roastery Release',
    discountBadge: '50%',
    productName: 'Yirgacheffe Geisha Honey Reserve (500g Bag)',
    description: 'Indulge in our rare Yirgacheffe Geisha Honey Reserve (500g Bag), freshly roasted and nitrogen-sealed at origin. Unlocks exquisite tasting notes of jasmine flower, bergamot rind, and wild highland honeycomb.',
    salePrice: 14.50,
    originalPrice: 29.00,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
  },
  social: {
    tiktokUrl: 'https://www.tiktok.com/@darikcoffee',
    tiktokHandle: '@darikcoffee on TikTok',
  },
  footer: {
    quote: '"You can\'t buy happiness, but you can buy coffee, and that\'s pretty close."',
    quoteAuthor: '— An Old Roaster\'s Proverb',
  }
};

export function ContentProvider({ children }) {
  const [products, setProducts] = useState(COFFEE_MENU);
  const [siteContent, setSiteContent] = useState(DEFAULT_SITE_CONTENT);
  const [galleryItems, setGalleryItems] = useState(GALLERY_ITEMS);
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load content from localStorage (Supabase is reserved strictly for Auth)
  useEffect(() => {
    try {
      const savedProds = localStorage.getItem('darik_cms_products');
      if (savedProds) setProducts(JSON.parse(savedProds));

      const savedContent = localStorage.getItem('darik_cms_content');
      if (savedContent) {
        const parsed = JSON.parse(savedContent);
        setSiteContent({
          ...DEFAULT_SITE_CONTENT,
          ...parsed,
          hero: { ...DEFAULT_SITE_CONTENT.hero, ...(parsed.hero || {}) },
          promo: { ...DEFAULT_SITE_CONTENT.promo, ...(parsed.promo || {}) },
          social: { ...DEFAULT_SITE_CONTENT.social, ...(parsed.social || {}) },
          footer: { ...DEFAULT_SITE_CONTENT.footer, ...(parsed.footer || {}) },
        });
      }

      const savedGallery = localStorage.getItem('darik_cms_gallery');
      if (savedGallery) setGalleryItems(JSON.parse(savedGallery));

      const savedOrders = localStorage.getItem('darik_cms_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.warn('LocalStorage error while reading CMS state', e);
    }
    setIsLoaded(true);
  }, []);

  // Sync to LocalStorage for persistence across page refreshes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('darik_cms_products', JSON.stringify(products));
      localStorage.setItem('darik_cms_content', JSON.stringify(siteContent));
      localStorage.setItem('darik_cms_gallery', JSON.stringify(galleryItems));
      localStorage.setItem('darik_cms_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Error saving CMS state to localStorage', e);
    }
  }, [products, siteContent, galleryItems, orders, isLoaded]);

  // CRUD: Products
  const addProduct = async (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `pack-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setProducts((prev) => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = async (id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = async (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProductAvailability = async (id) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    const newStatus = !item.available;
    updateProduct(id, { available: newStatus });
  };

  // CRUD: Site Content
  const updateSectionContent = async (sectionKey, sectionData) => {
    setSiteContent((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...sectionData,
      },
    }));
  };

  // CRUD: Gallery
  const addGalleryItem = async (newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id || Date.now(),
      span: newItem.span || 'col-span-6 md:col-span-4',
      aspect: newItem.aspect || 'h-48 md:h-[240px]',
      created_at: new Date().toISOString(),
    };
    setGalleryItems((prev) => [itemWithId, ...prev]);
    return itemWithId;
  };

  const deleteGalleryItem = async (id) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Orders Management
  const addOrder = async (orderData) => {
    const newOrder = {
      ...orderData,
      id: `DARIK-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <ContentContext.Provider
      value={{
        products,
        siteContent,
        galleryItems,
        orders,
        isLoaded,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductAvailability,
        updateSectionContent,
        addGalleryItem,
        deleteGalleryItem,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
