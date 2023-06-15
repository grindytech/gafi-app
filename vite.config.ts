import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

const define: Record<string, string | undefined> = {};

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };
  console.log(process);

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({
        exportAsDefault: true,
      }),
    ],
    define: { 'process.env': process.env },
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
