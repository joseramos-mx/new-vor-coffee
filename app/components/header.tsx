'use client';

import { FiMenu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Toasthour from './toasthour';

interface HeaderProps {
  // Recibe la función para *abrir* el sidebar
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="w-full p-5 pb-4 sticky top-0 z-30">
      <div className="flex items-center">
        <a
          onClick={onMenuClick}
          className="cursor-pointer text-white flex flex-col group"
        >
          Menu
          <div className='bg-orange-500 h-1 w-5 group-hover:w-full transition-all duration-500 z-60'></div>
        </a>
        
        <span className="ml-4 text-lg font-semibold"></span>
        <a
          onClick={onMenuClick}
          className="cursor-pointer text-white flex flex-col group font-serif"
        >
          Tienda
          <div className='bg-orange-500 h-1 w-5 group-hover:w-full transition-all duration-500 z-60'></div>
        </a>
        
        <span className="ml-4 text-lg font-semibold"></span>
        <div>
            <Toasthour/>  
        </div>
      </div>

    </header>
  );
}