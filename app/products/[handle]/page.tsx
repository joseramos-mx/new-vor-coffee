import Image from "next/image"
import { motion } from "motion/react"
import { ArrowDownLeft, Check, Minus, Plus, ShoppingBag } from "lucide-react"
import { getProduct } from "@/lib/shopify";
import ProductView from "../../../components/ProductView";
import { notFound } from "next/navigation";

// --- DATOS DUMMY (Simulando lo que vendrá de Shopify) ---
const PRODUCT = {
  title: "Daylight",
  subtitle: "Essential Blend",
  price: 350,
  description: "Diseñado para la claridad mental diaria. Un perfil de tueste medio que resalta la acidez brillante de los cítricos con un final dulce a miel de abeja. Combustible limpio para sesiones largas.",
  images: [
    "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop", // Bolsa
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop", // Grano
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop", // Taza
  ],
  specs: [
    { label: "Origin", value: "Etiopía / Colombia" },
    { label: "Process", value: "Washed / Honey" },
    { label: "Altitude", value: "1800 - 2100 masl" },
    { label: "Roast", value: "Medium-Light" },
  ],
  tags: ["Citrus", "Honey", "Floral"]
}

export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  
  // 1. Esperamos a obtener el parámetro de la URL
  const { handle } = await params;

  // 2. Pedimos los datos a Shopify
  const product = await getProduct(handle);

  // 3. Si el producto no existe en Shopify, mandamos error 404
  if (!product) {
    return notFound();
  }

  return <ProductView product={product} />;
}