import './globals.css';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../context/ContentContext';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import CartDrawer from '../components/CartDrawer';
import CustomizationModal from '../components/CustomizationModal';
import ToastNotification from '../components/ToastNotification';

export const metadata = {
  title: 'DARIK COFFEE (ዳሪክ ቡና) | Artisanal Ethiopian Roastery & Café',
  description: 'Experience the birthplace of coffee with Darik Coffee. Artisanal single-origin Ethiopian beans from Yirgacheffe, Sidama, and Harrar roasted daily.',
  icons: {
    icon: '/darik-official-logo.png',
    apple: '/darik-official-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/darik-official-logo.png" type="image/png" />
      </head>
      <body className="min-h-screen bg-[#0E0704] text-[#FAF6F0] antialiased">
        <ContentProvider>
          <AdminAuthProvider>
            <CartProvider>
              {children}
              <CartDrawer />
              <CustomizationModal />
              <ToastNotification />
            </CartProvider>
          </AdminAuthProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
