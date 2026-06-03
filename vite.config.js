import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        nosotros: resolve(__dirname, 'src/nosotros.html'),
        programas: resolve(__dirname, 'src/programas.html'),
        biblioteca: resolve(__dirname, 'src/biblioteca.html'),
        contacto: resolve(__dirname, 'src/contacto.html'),
      },
    },
  },
});
