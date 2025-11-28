import Image from "next/image";
import {Hero} from "./components/hero";
import Header from "./components/header";
import ProductGrid from "@/components/ProductGrid";
import FeaturedGrid from "@/components/FeaturedGrid";

export default function Home() {
  return (
    <div className="h-full w-full">
      <main className="">
        <Header/>
        <Hero/>
        <div>
          <FeaturedGrid />
        </div>
       
      </main>
    </div>
  );
}