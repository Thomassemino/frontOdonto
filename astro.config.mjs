import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: vercel(),
  vite: {
    ssr: {
      noExternal: ['flatpickr'] 
    }
  }
});