import { defineConfig } from 'astro/config';
import nodejs from '@astrojs/node';
import vue from "@astrojs/vue";
import relativeLinks from 'astro-relative-links';
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  compressHTML: false,//HTMLを圧縮しない 
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  server: {
    port: 1234,
    host: true
  },
  integrations: [vue(), relativeLinks(), react()]
});