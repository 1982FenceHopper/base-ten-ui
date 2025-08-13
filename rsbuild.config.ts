import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss(_, ctx) {
      ctx.addPlugins({ '@tailwindcss/postcss': {} });
    },
  },
});
