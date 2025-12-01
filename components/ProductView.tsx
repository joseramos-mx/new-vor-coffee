"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Check, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "../app/context/CartContext"; // Importar hook

export default function ProductView({ product }: { product: any }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const selectedVariant = product.variants.edges[0].node; // Por ahora tomamos la primera

  const isInStock = selectedVariant.availableForSale; //
  const stockQuantity = selectedVariant.quantityAvailable; //

  const variantId = product.variants?.edges[0]?.node.id;
  // Formateo de datos de Shopify
  const title = product.title;
  const description = product.description;
  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const images = product.images.edges.map((img: any) => img.node.url);
  // Usamos el 'productType' como subtítulo, o un fallback
  const subtitle = product.productType || "Specialty Coffee";

  // Specs simulados (Nota: Para hacerlo real, necesitarías Metafields en Shopify, 
  // por ahora lo dejamos estético basado en tags o estático)
  const specs = [
    { label: "Origin", value: "Veracruz / Chiapas" }, 
    { label: "Roast", value: "Medium-Dark" },
  ];

const handleAddToCart = () => {
    if (isInStock) {
       addItem(selectedVariant.id, quantity);
    }
  };

  return (
    <div className="bg-vor-black min-h-screen text-white pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          {/* --- GALERÍA (Imágenes Reales) --- */}
          <div className="w-full lg:w-3/5 flex flex-col gap-4">
            {images.map((img: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative w-full aspect-square bg-[#111] overflow-hidden border border-white/10"
              >
                <Image 
                  src={img} 
                  alt={`${title} image ${i}`} 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>

          {/* --- INFO STICKY --- */}
          <div className="w-full lg:w-2/5 relative">
            <div className="sticky top-32 space-y-8">
              
              {/* Header */}
              <div className="space-y-2 border-b border-white/20 pb-6">
                
                <h1 className="text-5xl md:text-7xl font-display uppercase leading-[0.9] tracking-tight" style={{fontFamily:"var(--font-monument)"}}>
                  {title}
                </h1>
                <p className="text-xl text-gray-400" style={{fontFamily:"var(--font-fraunces)"}}>
                  {subtitle}
                </p>
                <p className="text-2xl  pt-2 text-white" style={{fontFamily:"var(--font-jetbrains)"}}>
                  ${price} <span className="text-sm text-gray-500">{currency}</span>
                </p>
              </div>

              {/* Selectores */}
              <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Molienda: Grano</label>
                    
                </div>

                {/* Cantidad */}
                <div className="flex items-center justify-between border border-white/20 p-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 ml-2">Cantidad</span>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Minus size={16} /></button>
                        <span className="font-mono text-lg w-8 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><Plus size={16} /></button>
                    </div>
                </div>

                <button disabled={!isInStock} className={`
            w-full py-5 font-display text-xl uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-3
            ${isInStock 
                ? 'bg-[#FF3B00] text-black hover:bg-white cursor-pointer' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'} 
        `}  style={{fontFamily:"var(--font-jetbrains)"}} onClick={handleAddToCart}>
            {isInStock ? (
            <>Add to Cart <ShoppingBag size={20} strokeWidth={2.5} /></>
        ) : (
            "Sold Out"
        )}
                </button>
              </div>

              {/* Descripción */}
              <div className="pt-8 space-y-8">
                  <div>
                      <h3 className="font-mono text-xs uppercase text-gray-500 mb-4 tracking-widest">// Profile</h3>
                      <div 
                        className="font-sans text-lg leading-relaxed text-gray-300 prose prose-invert"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                      />
                  </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}