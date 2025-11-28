"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

export default function FeaturedCard({ product, index }: { product: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const title = product.node.title;
  const subtitle = "Technical Roast // " + new Date().getFullYear(); 
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0);
  const imageSrc = product.node.images.edges[0]?.node.url;

  return (
    // CAMBIO AQUÍ: 'h-full' en lugar de 'h-[90vh]'
    // Quitamos 'border-r' porque el padre (Grid) ya usa 'divide-x'
    <div 
      className="group relative w-full h-full overflow-hidden bg-vor-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 1. IMAGEN DE FONDO */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          // 'object-cover' asegura que llene la columna sin deformarse
          className={`object-cover transition-all duration-700 ease-in-out
            ${isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale'}`} 
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* 2. INFO */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-10">
        
        {/* Index Técnico (Bajamos un poco el margen top para no chocar con el header flotante) */}
        <div className="flex justify-between items-start text-white/80 mt-12 lg:mt-0">
            <span className="font-mono text-xs tracking-widest border border-white/30 px-2 py-1 rounded-full">
                0{index + 1}
            </span>
        </div>

        <div className="flex-grow" />

        {/* Bottom Info */}
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
                <div className="overflow-hidden">
                    <motion.h3 
                        className="text-3xl xl:text-5xl text-white font-display uppercase leading-[0.9]"
                        animate={{ y: isHovered ? -5 : 0 }}
                    >
                        {title}
                    </motion.h3>
                </div>
            </div>

            <div className="flex flex-col items-start 2xl:items-end justify-end space-y-4">
                <div className="space-y-1 text-left 2xl:text-right">
                    <p className="font-mono text-xs text-white/60 uppercase hidden xl:block">
                        {subtitle}
                    </p>
                    <p className="font-mono text-lg text-white">
                        ${price}
                    </p>
                </div>

                <button className={`
                    flex items-center gap-2 px-5 py-2 border border-white/30 backdrop-blur-sm
                    text-white font-mono text-[10px] uppercase tracking-wider
                    hover:bg-white hover:text-black hover:border-white transition-all duration-300
                    ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}>
                    Agregar al carrito <ArrowUpRight size={12} />
                </button>
            </div>
        </div>

      </div>
    </div>
  )
}