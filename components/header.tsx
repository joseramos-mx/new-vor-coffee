"use client"

import Link from "next/link"
import { ShoppingBag, Menu } from "lucide-react"
import { useCart } from "../app/context/CartContext"

export default function Header() {
  const { cart, openCart } = useCart()

  const totalItems = cart?.lines?.edges?.reduce((acc: number, item: any) => {
    return acc + item.node.quantity
  }, 0) || 0

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-start text-white">
      
      {/* IZQUIERDA: LOGO */}
      <Link href="/" className="group flex flex-col gap-1 cursor-pointer">
        <img 
            src="/logo.png" 
            alt="logo de vor" 
            className="w-[100px] h-auto object-contain" 
        />
      </Link>

      <nav 
        className="hidden md:flex items-center gap-12 text-xs uppercase tracking-widest px-8 py-3 rounded-full border border-white/40" 
        style={{ fontFamily: 'var(--font-jetbrains)' }}
      >
        <NavLink href="/">Home</NavLink>
        <NavLink href="/shop">Shop</NavLink>
        <NavLink href="/login">Login</NavLink>
        <NavLink href="/contact">Contacto</NavLink>
      </nav>

      {/* DERECHA: CARRITO */}
      <div className="flex items-center gap-6">
        <button 
            onClick={openCart} 
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider  transition-opacity text-white"
        >
          <span className="hidden md:block pt-2" style={{ fontFamily: 'var(--font-jetbrains)' }}>
            [ Carrito: {totalItems} ]
          </span>
          <div className="relative md:hidden">
            <ShoppingBag size={18} />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] w-3 h-3 flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                </span>
            )}
          </div>
        </button>

        <button className="hover:scale-110 transition-transform md:hidden">
            <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

    </header>
  )
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="relative group overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {children}
            </span>
            {/* El texto hover será gris oscuro para contrastar con el negro invertido */}
            <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-white">
                {children}
            </span>
        </Link>
    )
}