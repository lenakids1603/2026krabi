import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  // Load .env (all keys, no VITE_ prefix filter) so GOOGLE_MAPS_PLATFORM_KEY can
  // live in the .env file like every other secret. A real shell env var still
  // wins, e.g.  export GOOGLE_MAPS_PLATFORM_KEY="xxx" && npm run build
  const env = loadEnv(mode, process.cwd(), '');
  const mapsKey = process.env.GOOGLE_MAPS_PLATFORM_KEY || env.GOOGLE_MAPS_PLATFORM_KEY || '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Only the maps key is exposed to the client bundle. Other .env values
      // (admin password, session secret) are NOT defined here — they stay
      // server-side and never reach the browser.
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(mapsKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
