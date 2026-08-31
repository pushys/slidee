import babel from '@rolldown/plugin-babel';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import oxlintPlugin from 'vite-plugin-oxlint';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';

  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({
        presets: [reactCompilerPreset()],
      }),
      oxlintPlugin({ failOnError: isTest, failOnWarning: isTest }),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          // Additionally to default static files also cache fonts and sounds because they don't change frequently.
          globPatterns: ['**/*.{js,css,html,woff2,mp3,wav}'],
          runtimeCaching: [
            {
              urlPattern: /\.(?:avif)$/i,
              handler: 'CacheFirst',
              options: { cacheName: 'images' },
            },
            {
              urlPattern: /\/locales\/.*\.json$/,
              handler: 'NetworkFirst',
              options: { cacheName: 'locales' },
            },
          ],
        },
      }),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    test: {
      projects: [
        {
          extends: true,
          test: {
            environment: 'happy-dom',
          },
        },
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(import.meta.dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
          },
        },
      ],
    },
  };
});
