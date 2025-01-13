// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel'; // Cambia esta línea
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel()
});