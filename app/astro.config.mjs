import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import relativeLinks from 'astro-relative-links';


// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  //HTMLを圧縮しない
  build: {
    // Example: Generate `page.html` instead of `page/index.html` during build.
    format: 'file'
  },
  server: {
    port: 1234,
    host: true
  },
  integrations: [vue(), relativeLinks()]
});