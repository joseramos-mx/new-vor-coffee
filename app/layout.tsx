'use client'; // ¡Importante! Necesario para usar useState

import { useState } from 'react';
import type { Metadata } from 'next'; // Aún puedes exportar Metadata
import { Inter } from 'next/font/google';
import './globals.css';

// Importa los componentes
import Sidebar from './components/sidebar';
import Header from './components/header';

const inter = Inter({ subsets: ['latin'] });

/*
// Ya no puedes exportar metadata así en un Client Component.
// Deberías moverla a un (layout) o página hijo,
// o manejarla con un <head> si es necesario.
export const metadata: Metadata = {
  title: 'Mi App con Drawer',
  description: 'Sidebar oculto',
};
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ¡AQUÍ VIVE EL ESTADO!
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="es">
      <body className={inter.className}>
        {/* 1. El Sidebar se renderiza aquí. 
             Como usa 'fixed', no importa su posición en el DOM.
        */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />

        {/* 2. Contenedor principal de la página.
             El sidebar ya NO está en un flex-box con el main.
        */}
        <div className="flex flex-col min-h-screen">
          {/* 3. El Header recibe la función para *cambiar* el estado
          */}
          <Header 
            onMenuClick={() => setIsSidebarOpen(true)} // Pasa la función
          />

          {/* 4. El contenido de tu página */}
          <main className="">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}