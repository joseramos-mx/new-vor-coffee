import { FiChevronRight, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import DynamicImagePlaceholder from './DynamicImagePlaceholder'; // Importamos el placeholder
import MailInput from './mailinput';

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-[#0E0E0E] text-gray-200 p-8 font-sans">

<div className="grid grid-cols-10 grid-rows-6 gap-5 h-screen w-[80%] mx-auto pb-30">
        <div className="col-span-5 row-span-4 bg-neutral-800 h-full w-full">
            
            <div className="grid grid-cols-2 grid-rows-6 gap-2 h-full w-full p-6">
                <div className='grid grid-rows-2 gap-2'><div>Tostado</div><div className='font-serif text-xl'>Claro</div></div>
                <div className="row-span-3 border rounded-2xl"></div>
                <div className="row-span-3 col-start-2 row-start-4 border rounded-2xl"></div>
                <div className="col-start-1 row-start-2 grid grid-rows-2"><div>Tostado</div><div className='font-serif text-xl'>Claro</div></div>
                <div className="col-start-1 row-start-3 grid grid-rows-2"><div>Tostado</div><div className='font-serif text-xl'>Claro</div></div>
                <div className="col-start-1 row-start-4 grid grid-rows-2"><div>Tostado</div><div className='font-serif text-xl'>Claro</div></div>
                <div className='grid grid-rows-2 gap-2'><div>Tostado</div><div className='font-serif text-xl'>Claro</div></div>
                <div className="row-start-6 grid grid-rows-2 gap-2"><div>Tostado</div><div className='font-serif text-xl'>Claro</div></div>
            </div>
    
        </div>
            <div className="col-span-3 row-span-2 col-start-1 row-start-5 bg-neutral-600 h-full w-full"><div className='grid grid-rows-2 p-8'><div className='text-xl mb-8'>Suscribete</div><div><MailInput/></div></div></div>
            <div className="col-span-2 row-span-2 col-start-4 row-start-5 bg-orange-600 h-full w-full"></div>
            <div className="col-span-5 row-span-6 col-start-6 row-start-1 bg-orange-500 h-full w-full bg-[url(/heroimage.jpg)]"></div>
        </div>  
    </section>
  );
}