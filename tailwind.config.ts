import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // 1. Definimos las fuentes AQUÍ (Fuera de extend) para sobrescribir las defaults
    fontFamily: {
      display: ['var(--font-monument)', 'sans-serif'], 
      serif: ['var(--font-fraunces)', 'serif'],       
      mono: ['var(--font-jetbrains)', 'monospace'],   
      // Agregamos sans por si acaso para que no se rompa el resto
      sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        vor: {
          black: '#050505',
          white: '#EFEFEF',
          steel: '#8C8C8C',
          orange: '#FF3B00',
          cyan: '#00B9EC',
          jade: '#04A777',
          tangerine: '#FC934C',
          neon: '#CCFF00',
        },
      },
    },
  },
  plugins: [],
};
export default config;