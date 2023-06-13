import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({
        exportAsDefault: true,
      }),
    ],
    build: {
      manifest: true,
    },
    server: {
      port: Number(process.env.VITE_PORT),
    },
    preview: {
      port: Number(process.env.VITE_PORT),
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
        public: path.resolve(__dirname, './public'),
      },
    },
  });
};
