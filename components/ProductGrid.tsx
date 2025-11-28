// components/ProductGrid.tsx
import { getProducts } from "../lib/shopify";
import ProductCard from "./FeaturedCard"; // Importamos la tarjeta del paso 4A
export default async function ProductGrid() {
  // 1. Pedimos los datos REALES a Shopify
  const products = await getProducts();

  return (
    <section className="bg-black py-24 px-4 md:px-8 w-full relative z-10">
      
      {/* HEADER IGUAL QUE ANTES */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/20 pb-6 ">
        <div>
          <h2 className="text-4xl md:text-5xl text-white tracking-tighter" style={{ fontFamily: 'var(--font-monument)', fontWeight: 300 }}>
            New blends
          </h2>
        </div>
      </div>

      {/* GRID DE PRODUCTOS REALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {products.map((product: any, index: number) => (
          // Pasamos el nodo completo de Shopify a la tarjeta
          <ProductCard key={product.node.id} product={product} index={index} />
        ))}
      </div>

    </section>
  )
}