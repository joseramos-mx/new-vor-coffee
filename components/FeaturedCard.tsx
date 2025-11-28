"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import PixelTransition from "./PixelTransition" // <--- Importa tu nuevo componente

export default function FeaturedCard({ product, index }: { product: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const title = product.node.title;
  const subtitle = "Technical Roast // " + new Date().getFullYear(); 
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0);
  const imageSrc = product.node.images.edges[0]?.node.url;

  return (
    <div 
      className="group relative w-full h-full overflow-hidden bg-vor-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 1. ENVOLTURA CON PIXEL TRANSITION */}
      <div className="absolute inset-0 w-full h-full z-0">
        <PixelTransition
          gridSize={4} // Tamaño de los cuadros (ajusta a tu gusto, 10 o 12 es bueno)
          pixelColor="#fff" // Color de los pixeles (Negro VOR para que funda con el texto)
          animationStepDuration={0.4}
          className="h-full w-full"
          
          // CONTENIDO A (Imagen Original)
          firstContent={
            <div className="relative w-full h-full">
               <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          }
          
          // CONTENIDO B (Lo que aparece al hacer hover: COMPRAR AHORA)
          secondContent={
            <div 
                className="w-full h-full flex items-center justify-center bg-[#F54A00] border border-white/10"
                style={{ backgroundColor: '#F54A00' }}
            >
                <p className="text-white text-4xl md:text-4xl uppercase text-center leading-none tracking-tighter px-4" style={{fontFamily:"var(--font-monument)"}}>
                    Comprar<br/>Ahora
                </p>
            </div>
          }
        />
      </div>

      {/* 2. INFO FLOTANTE (Se queda encima siempre) */}
      {/* Usamos 'pointer-events-none' para que no bloquee el hover del PixelTransition */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between z-30 pointer-events-none">
        
        {/* Header Técnico */}
        <div className="flex justify-between items-start text-white/80 mt-12 lg:mt-0">
            <span className="font-mono text-xs tracking-widest border border-white/30 px-2 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                0{index + 1}
            </span>
        </div>

        <div className="grow" />

        {/* Info Inferior */}
        {/* Ocultamos el título/precio cuando haces hover para dejar limpio el "COMPRAR AHORA" */}
        <motion.div 
            className="grid grid-cols-1 2xl:grid-cols-2 gap-4 items-end"
            animate={{ opacity: isHovered ? 1 : 1 }} // Desaparece suavemente
            transition={{ duration: 0.3 }}
        >
            <div className="space-y-2">
                <h3 className="text-3xl xl:text-5xl text-white uppercase leading-[0.9]" style={{fontFamily:"var(--font-jetbrains)"}}>
                    {title}
                </h3>
            </div>

            <div className="flex flex-col items-start 2xl:items-end justify-end space-y-4">
                <div className="space-y-1 text-left 2xl:text-right">
                    <p className="text-xs text-white/60 hidden xl:block" style={{fontFamily:"var(--font-fraunces)"}}>
                        {subtitle}
                    </p>
                    <p className="font-mono text-lg text-white" style={{fontFamily:"var(--font-monument)"}}>
                        ${price}
                    </p>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  )
}