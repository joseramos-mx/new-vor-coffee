"use client"

import Link from "next/link"
import { ShoppingBag, Menu } from "lucide-react"
import { JetBrains_Mono } from "next/font/google"

export default function Header() {
  return (
    // 'fixed': Para que se quede pegado arriba al hacer scroll
    // 'mix-blend-difference': La magia que invierte el color según el fondo
    // 'text-white': Color base (que se invertirá a negro sobre el amarillo)
    <header className="fixed top-0 left-0 w-full z-[100] px-6 py-6 flex justify-between items-start text-neutral-900">
      
      {/* IZQUIERDA: LOGO + META */}
      <Link href="/" className="group flex flex-col gap-1 cursor-pointer">
        {/* Logo VOR */}
        <img src="logo.svg" alt="logo de vor" className="h-15 invert" />
      </Link>

      {/* CENTRO: NAVEGACIÓN (Estilo Código/Ficha) */}
      <nav className="hidden md:flex items-center gap-12 text-xs uppercase tracking-widest bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10" style={{fontFamily:'var(--font-jetbrains)'}}>
        <NavLink href="/shop">Home</NavLink>
        <NavLink href="/subscriptions">Shop</NavLink>
        <NavLink href="/wholesale">Login</NavLink>
        <NavLink href="/journal">Contacto</NavLink>
      </nav>

      {/* DERECHA: CARRITO Y MENÚ */}
      <div className="flex items-center gap-6">
        
        {/* Carrito Estilo Texto Técnico */}
        <button className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
          <span className="hidden md:block">[ Carrito: 0 ]</span>
          <ShoppingBag size={18} className="md:hidden" />
        </button>

        {/* Menú Hamburgesa (Para Móvil o Full Menu) */}
        <button className="hover:scale-110 transition-transform hidden">
            <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

    </header>
  )
}

// Sub-componente para links con efecto hover
function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} className="relative group overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                {children}
            </span>
            <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-vor-yellow">
                {children}
            </span>
        </Link>
    )
}