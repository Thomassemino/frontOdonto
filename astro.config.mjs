import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',  // Cambiado a static
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
  }),
  integrations: [tailwind()],
  vite: {
    ssr: {
      noExternal: ['flowbite', 'flowbite-react']
    }
  }
});
