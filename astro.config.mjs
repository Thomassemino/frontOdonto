import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    functionPerRoute: false,
    maxDuration: 10
  }),
  integrations: [tailwind()],
  vite: {
    build: {
      minify: false
    },
    ssr: {
      noExternal: ['flowbite', 'flowbite-react']
    }
  }
});
