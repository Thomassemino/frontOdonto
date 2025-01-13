// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind({
    // Agrega la configuración de Flowbite
    config: {
      content: [
        "./node_modules/flowbite/**/*.js",
        "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
      ],
      plugins: [
        require('flowbite/plugin')
      ]
    }
  })],
  output: 'server',
  adapter: vercel(),
});