import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import FluidGlass from "../components/FluidGlass";

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
      <body className="bg-vor-black text-vor-white antialiased">
        
        {/* 1. Aquí se renderiza tu página (Hero, Textos, etc) */}
        <main>
            {children} 
        </main>

        {/* 2. El cursor fluido va encima de todo */}
        <div style={{ height: '600px', position: 'relative' }}>
          <FluidGlass 
             lensProps={{
                scale: 0.3,          // Hazlo más pequeño o grande
                ior: 1.5,            // Más distorsión (tipo lupa fuerte)
                thickness: 2,        // Más delgado
                chromaticAberration: 0.2, // Más efecto arcoíris
                color: "#ffffff"     // O cámbiale el tinte
             }} 
          />
        </div>

      </body>
    </html>
  );
}