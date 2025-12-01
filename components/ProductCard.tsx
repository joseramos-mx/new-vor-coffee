"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { Plus, Check, Loader2 } from "lucide-react"
import { useCart } from "../app/context/CartContext"

export default function ProductCard({ product, index }: { product: any, index: number }) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Datos del producto
  const { title, handle } = product.node
  const price = parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(0)
  const imageSrc = product.node.images.edges[0]?.node.url
  
  // Datos para el carrito
  const variant = product.node.variants?.edges[0]?.node
  const variantId = variant?.id
  const isAvailable = variant?.availableForSale

  // Función Quick Add
  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault() // Evita que el Link se active (no entra a la página)
    e.stopPropagation()
    
    if (!isAvailable || isAdding) return

    setIsAdding(true)
    await addItem(variantId, 1) // Agrega 1 unidad
    
    // Pequeño delay para mostrar el check de "Listo"
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <Link 
      href={`/products/${handle}`}
      className="group relative flex flex-col h-full bg-vor-black border-r border-b border-white/10 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* 1. SECCIÓN DE IMAGEN (Aspect Square) */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#0a0a0a]">
        
        {/* Badge de Stock */}
        <div className="absolute top-3 left-3 z-20 flex gap-2">
            
            {/* Index decorativo */}
            <span className="border border-white/20 text-white/50 text-[9px] font-mono px-2 py-1">
                0{index + 1}
            </span>
        </div>

        {/* Imagen con efecto Grayscale -> Color */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 ease-in-out
            ${isHovered ? 'scale-105 grayscale-0' : 'scale-100 grayscale'}
            ${!isAvailable ? 'opacity-50' : 'opacity-100'}
          `}
        />
      </div>

      {/* 2. SECCIÓN DE INFO (Técnica) */}
      <div className="p-5 flex flex-col justify-between flex-grow relative bg-vor-black transition-colors duration-300 group-hover:bg-[#111]">
        
        <div className="space-y-1">
            <div className="flex justify-between items-start">
                <h3 className="text-xl text-white font-display uppercase leading-[0.9] max-w-[80%]">
                    {title}
                </h3>
                <ArrowIcon hovered={isHovered} />
            </div>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Essential Collection
            </p>
        </div>

        <div className="mt-6 flex items-end justify-between">
            <span className="text-lg font-mono text-white">
                ${price}
            </span>

            {/* BOTÓN QUICK ADD */}
            {isAvailable && (
                <button
                    onClick={handleQuickAdd}
                    disabled={isAdding}
                    className={`
                        flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 border
                        ${isAdding 
                            ? 'bg-green-500 border-green-500 text-black' 
                            : 'bg-transparent border-white/30 text-white hover:bg-white hover:text-black hover:border-white'
                        }
                    `}
                >
                    {isAdding ? (
                        <>Added <Check size={12} /></>
                    ) : (
                        <>Add <Plus size={12} /></>
                    )}
                </button>
            )}
        </div>

        {/* Línea de carga decorativa en hover */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-vor-orange transition-all duration-500 ease-out" 
             style={{ width: isHovered ? '100%' : '0%' }} 
        />
      </div>

    </Link>
  )
}

// Pequeño componente visual para la flecha
function ArrowIcon({ hovered }: { hovered: boolean }) {
    return (
        <div className="relative w-4 h-4 overflow-hidden">
            <motion.div
                animate={{ x: hovered ? 15 : 0, y: hovered ? -15 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </motion.div>
            <motion.div
                className="absolute top-0 left-0"
                initial={{ x: -15, y: 15 }}
                animate={{ x: hovered ? 0 : -15, y: hovered ? 0 : 15 }}
                transition={{ duration: 0.3 }}
            >
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-vor-orange">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            </motion.div>
        </div>
    )
}