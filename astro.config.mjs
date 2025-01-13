import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',  // Cambiado a hybrid
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    imageService: true,
    imagesConfig: {
      sizes: [640, 750, 828, 1080, 1200, 1920],
      domains: [],
      formats: ['image/avif', 'image/webp'],
    },
  }),
  integrations: [tailwind()],
});
