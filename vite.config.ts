import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [svelte()],
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'jsdom',
    globals: true,
    browser: {
      enabled: true,
      name: 'chromium',
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }]
    }
  }
});
