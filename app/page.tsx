import Image from "next/image";
import {Hero} from "./components/hero";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="h-full w-full">
      <main className="">
        <Header/>
       <Hero/>
       
      </main>
    </div>
  );
}