import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import { Filter } from "lucide-react";

export default async function ShopPage() {
  // Aquí llamamos a la función corregida
  const products = await getProducts();

  // console.log(products); // <-- Descomenta esto si quieres ver los datos en la terminal de VS Code

  return (
    <div className="bg-vor-black min-h-screen pt-24 pb-20">
      
      {/* HEADER */}
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <h1 className="text-6xl md:text-9xl font-display text-white uppercase tracking-tighter" style={{fontFamily:"var(--font-monument)"}}>
          Catalog
        </h1>
        <p className="text-white/50 font-mono text-xs mt-2" style={{fontFamily:"var(--font-jetbrains)"}}>// {products.length} PRODUCTS FOUND</p>
      </div>

      {/* GRID */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-px gap-y-px bg-white/10 border border-white/10">
          
          {products.length > 0 ? (
            products.map((product: any, index: number) => (
              <div key={product.node.id} className="bg-vor-black">
                 <ProductCard product={product} index={index} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-white font-mono">
                NO PRODUCTS FOUND IN SHOPIFY.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}