import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind()],
  vite: {
    build: {
      rollupOptions: {
        external: ['flowbite/dist/flowbite.min.js'],
      }
    },
    ssr: {
      noExternal: ['flowbite-react']
    },
    optimizeDeps: {
      exclude: ['@astrojs/vercel/serverless']
    }
  }
});
