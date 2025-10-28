'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiUser, FiSettings, FiX } from 'react-icons/fi';

// Define los items de navegación
const navItems = [
  { name: 'Inicio', href: '/', icon: FiHome },
  { name: 'Perfil', href: '/perfil', icon: FiUser },
  { name: 'Ajustes', href: '/ajustes', icon: FiSettings },
];

// --- Variantes de Animación ---

// Variante para el fondo (backdrop)
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Variante para el sidebar (slide-in)
const sidebarVariants = {
  hidden: { x: '-100%' }, // Inicia fuera de la pantalla a la izquierda
  visible: { x: 0 },     // Termina en la pantalla
};

// --- Tipos de Props ---
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void; // Función para cerrar
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    // AnimatePresence maneja la animación de entrada y salida
    <AnimatePresence>
      {/* Solo si isOpen es true, renderiza el contenido */}
      {isOpen && (
        <>
          {/* 1. Backdrop (Fondo oscuro) */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* 2. Contenedor del Sidebar */}
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-64 bg-black p-5 z-50"
          >
            {/* Botón para cerrar (dentro del sidebar) */}
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold">VOR</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Navegación */}
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)} // Cierra al navegar
                      className="flex items-center space-x-3 p-3 rounded-lg font-medium hover:bg-blue-50 hover:text-blue-700"
                    >
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}