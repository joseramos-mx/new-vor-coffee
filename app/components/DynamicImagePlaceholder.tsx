// Este componente simula la sección derecha con stickers
export default function DynamicImagePlaceholder() {
  return (
    // Contenedor relativo para posicionar los stickers
    <div className="relative w-full h-full">
      
      {/* 1. Placeholder de la bolsa de café (el centro) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-screen h-[28rem] bg-gray-900 border border-gray-800 rounded-xl shadow-2xl flex items-center justify-center">
          <span className="text-gray-600">Placeholder de Imagen</span>
        </div>
      </div>

      {/* 2. Los "Stickers" (posicionados absolutamente) 
        Ajusta su posición (top, left, right, bottom) como necesites.
      */}
      
      {/* Sticker: "Always in motion" */}
      <div className="absolute bottom-1/4 left-10 -rotate-6">
        <span className="text-2xl font-bold text-white italic">Always in</span>
        <span className="block text-3xl font-extrabold text-blue-400 italic -mt-2">
          motion
        </span>
      </div>

      {/* Sticker: "ヴォール" (Japonés) */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 rotate-12">
        <span className="text-4xl font-bold text-white" style={{ writingMode: 'vertical-rl' }}>
          ヴォール
        </span>
      </div>

      {/* Sticker: "*VOR*" (Rosa) */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 -rotate-12">
        <span className="text-3xl font-extrabold text-pink-500 bg-black px-2">
          *VOR*
        </span>
      </div>

      {/* Sticker: Estrella Verde */}
      <div className="absolute top-10 left-16 rotate-12 text-5xl text-lime-400">
        ★
      </div>

      {/* Sticker: Flor Roja */}
      <div className="absolute bottom-20 right-16 rotate-12 text-5xl text-red-500">
        ❁
      </div>
    </div>
  );
}