

import { FaArrowRight } from "react-icons/fa";


export default function MailInput() {   
    return (
        <div className="flex flex-cols">
            <div className="w-1/4 bg-white p-2 flex justify-center items-center rounded-l-sm">
                <FaArrowRight className="text-black"/>
            </div>
            <input 
                type="email"
                placeholder="Ingresa tu correo"
                className="w-3/4 rounded bg-neutral-900/60 p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );
}