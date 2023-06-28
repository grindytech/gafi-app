import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const IfForgetEnviromentDevelopment = 3000;

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({
        exportAsDefault: true,
        esbuildOptions: {
          minify: true,
        },
      }),
    ],
    root: './',
    publicDir: process.env.VITE_PUBLIC_DIR,
    define: {
      'process.env': process.env,
    },
    build: {
      manifest: true,
    },
    server: {
      port: Number(process.env.VITE_PORT) || IfForgetEnviromentDevelopment,
    },
    preview: {
      port: Number(process.env.VITE_PORT),
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
        assets: path.resolve(__dirname, './public/assets'),
      },
    },
  });
};
