import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import pkg from './package.json'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
      react(),
      tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/renderer/src"),
      '@root': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/renderer/src/setupTests.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/renderer/src/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}', '**/*.d.ts', 'src/renderer/src/main.tsx', 'src/renderer/src/App.tsx', 'src/renderer/src/components/ui/**'],
      reporter: ['text', 'lcov', 'json'],
      reportsDirectory: './coverage'
    }
  }
});
