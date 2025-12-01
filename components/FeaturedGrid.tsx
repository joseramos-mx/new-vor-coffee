// components/FeaturedGrid.tsx
import { getProducts } from "@/lib/shopify";
import FeaturedCard from "./FeaturedCard";

export default async function FeaturedGrid() {
  const products = await getProducts();
  const featuredThree = products.slice(0, 3);

  return (
    <section className="relative w-full h-screen min-h-screen p-20 bg-black overflow-hidden border-y border-white/10">
      
      {/* HEADER FLOTANTE */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 flex justify-center items-center flex-col md:flex-row md:justify-between pointer-events-none mix-blend-difference text-white md:pl-62">
        <h2 className="font-display text-2xl uppercase tracking-tighter" style={{fontFamily:"var(--font-jetbrains)"}}>
          Featured
        </h2>
        <span className="font-mono text-xs pt-0 md:pt-0 md:pr-35" style={{fontFamily:'var(--font-jetbrains)'}}>
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