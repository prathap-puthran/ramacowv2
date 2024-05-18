import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from "vite-plugin-pwa";

const pwaConfig = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Rama Cow",
    short_name: "Rama Cow",
    description: "Rama Cow",
    icons: [
      {
        src: "/icon.png",
        sizes: "64x64",
        type: "image/png"
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: "/icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaConfig)],
});
