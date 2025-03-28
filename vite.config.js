import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  extend: {
    // ...
   backgroundOpacity: ['active'],
  },
  theme: {
    extend: {
      animation: {
        gradientMove: "gradientMove 5s ease infinite",
        colorChange: "colorChange 3s ease infinite",
        blink: "blink 1.5s ease infinite",
      },
      keyframes: {
        gradientMove: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        colorChange: {
          "0%, 100%": { "background-color": "#ff7e5f" },
          "50%": { "background-color": "#feb47b" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
})
