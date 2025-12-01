"use client";

import { useCart } from "../app/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
const { cart, isOpen, closeCart, removeItem, updateItem, isUpdating } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Panel Lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0A0A0A] border-l border-white/10 z-[201] flex flex-col shadow-2xl"
          >
            {/* Header Técnico */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="font-mono text-xs text-vor-orange uppercase tracking-widest">[ CART STATUS: OPEN ]</span>
              <button onClick={closeCart} className="text-white hover:text-vor-orange transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!cart?.lines?.edges?.length ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 font-mono text-sm">
                  <p>NO ENCONTRAMOS NADA.</p>
                  <p>AGREGA CAFECITO A TU CARRITO.</p>
                </div>
              ) : (
                cart.lines.edges.map(({ node }: any) => (
                  <div key={node.id} className="flex gap-4 group">
                    <div className="relative w-20 h-24 bg-[#111] border border-white/10 overflow-hidden shrink-0">
                      <Image 
                        src={node.merchandise.image.url} 
                        alt={node.merchandise.product.title} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start">
                            <h4 className="text-white font-display uppercase text-sm leading-tight max-w-[150px]">
                                {node.merchandise.product.title}
                            </h4>
                            <span className="text-white font-mono text-sm">
                                ${parseInt(node.merchandise.price.amount) * node.quantity}
                            </span>
                        </div>
                        <p className="text-gray-500 text-[10px] font-mono mt-1">
                            VAR: {node.merchandise.title}
                        </p>
                      </div>
                      
                      {/* Controles Cantidad (Visual, lógica pendiente de conectar remove) */}
                      <div className="flex justify-between items-center border border-white/10 p-1 w-max gap-4">
                         <span className="font-mono text-xs text-white px-2">Qty: {node.quantity}</span>
                      </div>
                      <div className="flex justify-between items-center w-full mt-2">
    
    {/* Selector + / - */}
    <div className="flex items-center border border-white/10">
        <button 
            // Restar cantidad
            onClick={() => updateItem(node.id, node.quantity - 1)}
            disabled={isUpdating}
            className="p-2 text-white hover:bg-white/10 disabled:opacity-50"
        >
            <Minus size={12} />
        </button>
        
        <span className="font-mono text-xs text-white px-2 w-8 text-center">
            {node.quantity}
        </span>
        
        <button 
            // Sumar cantidad
            onClick={() => updateItem(node.id, node.quantity + 1)}
            disabled={isUpdating}
            className="p-2 text-white hover:bg-white/10 disabled:opacity-50"
        >
            <Plus size={12} />
        </button>
    </div>

    {/* Botón de Eliminar (Basura) */}
    <button 
        onClick={() => removeItem(node.id)}
        disabled={isUpdating}
        className="text-gray-500 hover:text-red-500 transition-colors p-2 disabled:opacity-50"
        title="Remove Item"
    >
        <Trash2 size={16} />
    </button>

</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart?.lines?.edges?.length > 0 && (
  <div className="border-t border-white/10 p-6 bg-[#0A0A0A]">
    
    {/* Totales */}
    <div className="flex justify-between items-end mb-6 font-mono text-white">
        <div className="flex flex-col">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest">Subtotal</span>
            <span className="text-xs text-gray-600">Tax included. Shipping calculated at checkout.</span>
        </div>
        <span className="text-2xl font-bold">
            ${parseFloat(cart.cost.totalAmount.amount).toFixed(0)} 
            <span className="text-sm text-gray-500 ml-1">MXN</span>
        </span>
    </div>
    
    {/* BOTÓN DE CHECKOUT */}
    <a 
        href={cart.checkoutUrl} // <--- AQUÍ ESTÁ LA MAGIA
        className="group relative flex items-center justify-center gap-4 w-full bg-[#EFEFEF] text-black py-5 font-display text-lg uppercase tracking-wider hover:bg-[#FF3B00] transition-colors duration-300"
    >
        <span className="font-bold relative z-10">Ir al pago</span>
        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
    </a>

  </div>
)}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}