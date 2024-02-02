import { defineConfig } from 'astro/config';
import nodejs from '@astrojs/node';
import node from "@astrojs/node";
import vue from "@astrojs/vue";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [vue(), react()]
});