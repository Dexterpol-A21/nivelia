// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://glyv.com',
  redirects: {
    '/servicios': '/como-funciona',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/sistema') && !page.includes('/marca'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': path.resolve(root, 'src/components'),
        '@layouts': path.resolve(root, 'src/layouts'),
        '@utils': path.resolve(root, 'src/utils'),
        '@scripts': path.resolve(root, 'src/scripts'),
      },
    },
  },
  devToolbar: { enabled: false },
  compressHTML: true,
});
