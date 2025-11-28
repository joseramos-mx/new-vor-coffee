// components/FeaturedGrid.tsx
import { getProducts } from "@/lib/shopify";
import FeaturedCard from "./FeaturedCard";

export default async function FeaturedGrid() {
  const products = await getProducts();
  const featuredThree = products.slice(0, 3);

  return (
    // CAMBIO AQUÍ:
    // - Quitamos 'w-screen h-screen'
    // - Ponemos 'w-full' y una altura controlada 'h-[70vh] min-h-[600px]'
    // - 'border-y' para un look más "sección editorial"
    <section className="relative w-full h-[70vh] min-h-[800px] bg-vor-black overflow-hidden border-y border-white/10">
      
      {/* HEADER FLOTANTE */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-start pointer-events-none mix-blend-difference text-white">
        <h2 className="font-display text-2xl uppercase tracking-tighter">
          Featured
        </h2>
        <span className="font-mono text-xs">
          [ Selected / 001-003 ]
        </span>
      </div>

      {/* EL GRID */}
      {/* 'h-full' aquí asegura que el grid llene los 600px/70vh del padre */}
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full w-full divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {featuredThree.map((product: any, index: number) => (
          <FeaturedCard key={product.node.id} product={product} index={index} />
        ))}
      </div>

    </section>
  )
}