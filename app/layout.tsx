import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "../components/CartDrawer";

// 1. Configuración de Fraunces
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  // ▼ ESTO ES LA CLAVE: Pide explícitamente la versión itálica real
  style: ["normal", "italic"], 
  display: "swap",
  // Opcional: Ajustes para que se vea más "soft" y premium
  axes: ["SOFT", "WONK", "opsz"], 
});

// 2. Configuración de JetBrains Mono
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// 3. Configuración de Monument (Tu fuente local)
const monument = localFont({
  src: "./fonts/MonumentExtended-Regular.otf",
  variable: "--font-monument",
  weight: "800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VOR Coffee co.",
  description: "Fuel your mind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${monument.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <body className="text-vor-white antialiased bg-black">
          <CartProvider>
            
            <Header />
            <CartDrawer /> {/* 4. El Drawer vive aquí, disponible siempre */}
            
            <main>{children}</main>

            {/* Cursor Wrapper... */}
            
        </CartProvider>

        
      </body>
    </html>
  );
}