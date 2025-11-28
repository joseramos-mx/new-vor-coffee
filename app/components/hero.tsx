"use client"

import { useState, useRef, useEffect } from "react"
import { motion, stagger, useAnimate, useMotionValue, useSpring } from "motion/react"
import Image from "next/image"
import { FloatingElement } from "@/components/ui/parallax-floating"
import Floating from "@/components/ui/parallax-floating"


const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://deathtostock.imgix.net/000/012/279/small/DTS_GREASY__Franco_Dupuy_12279.jpg.jpg?ixlib=js-3.8.0&q=75&s=32e513693435fa1c46b3e0216d052601",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://deathtostock.imgix.net/000/008/370/large/final_dts-bad-taste_14.jpg?ixlib=js-3.8.0&q=50&s=9a2a26d40ec52d9f5746975674d5c409",
    link: "https://deathtostock.imgix.net/000/008/370/large/final_dts-bad-taste_14.jpg?ixlib=js-3.8.0&q=50&s=9a2a26d40ec52d9f5746975674d5c409",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://deathtostock.imgix.net/000/012/451/small/DTS_SNOWBOUND_Daniel_Faro_12451.jpg.jpg?ixlib=js-3.8.0&q=75&s=f333a5aaf0638f3c306c819850517d4b",
    link: "https://deathtostock.imgix.net/000/012/451/small/DTS_SNOWBOUND_Daniel_Faro_12451.jpg.jpg?ixlib=js-3.8.0&q=75&s=f333a5aaf0638f3c306c819850517d4b",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://deathtostock.imgix.net/000/012/255/small/DTS_GREASY__Franco_Dupuy_12255.jpg.jpg?ixlib=js-3.8.0&q=75&s=553e291bc87bbb7af91ab766b250a1c9",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://deathtostock.imgix.net/000/006/643/small/DTS_Daniel-Faro_On-The_Job_61.jpg?ixlib=js-3.8.0&q=75&s=f1f43691c1d17d36f73f465ed0fd1cb1",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
]

const Hero = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  // --- MOTOR DEL CURSOR ---
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Físicas para que el movimiento sea suave (como goma)
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Función que actualiza la posición
  const handleMouseMove = (e: React.MouseEvent) => {
    // Restamos 48px (mitad de w-24) para centrar el círculo en la punta del mouse
    mouseX.set(e.clientX - 48)
    mouseY.set(e.clientY - 48)
  }

  

  return (
    
    <div
      className="flex w-full h-full min-h-screen justify-center items-center bg-[#FDBB00] overflow-hidden"
      ref={scope}
    >
        <div style={{ height: '600px', position: 'relative' }}>

</div>
      <motion.div
        className="z-50 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-[145px] z-50 text-white font-serif" style={{ 
              fontFamily: 'var(--font-fraunces)', 
              
              fontWeight: 300 // Fraunces se ve mejor delgada (Light)
            }}>
          Daylight 

        </p>
        

  <div className=" bottom-0 left-0 w-full z-10 pb-6 md:pb-12 text-center pointer-events-none">
    <p 
      className="text-5xl md:text-[2vw] leading-none text-white pt-10"
      style={{ 
        fontFamily: 'var(--font-monument)', 
        fontWeight: 800 
      }}
    >
      Essential blend
    </p>
  </div>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[1].url}
            className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[0%] left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[3].url}
            className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[40%] left-[2%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[4].url}
            className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[70%] left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[7].url}
            className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[73%] left-[15%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[80%] left-[50%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[6].url}
            className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
      </Floating>
    </div>
  )
}

export { Hero }
