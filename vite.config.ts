import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function meticulousRecorder(recordingToken: string | undefined): Plugin {
  return {
    name: 'jobfilter-meticulous-recorder',
    transformIndexHtml(html) {
      if (!recordingToken) return html;

      const snippet = [
        '<script',
        `  data-recording-token="${recordingToken}"`,
        `  data-is-production-environment="${process.env.VERCEL_ENV === 'production' ? 'true' : 'false'}"`,
        '  src="https://snippet.meticulous.ai/v1/meticulous.js">',
        '</script>',
      ].join('\n');

      return html.replace('<head>', `<head>\n    ${snippet.replace(/\n/g, '\n    ')}`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [meticulousRecorder(env.VITE_METICULOUS_RECORDING_TOKEN), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true' ? { clientPort: 443 } : false,
    },
  };
});
