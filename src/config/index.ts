import cfg from './config';

const config = {
  ...cfg[import.meta.env.VITE_APP_ENV as keyof typeof cfg],
  ...cfg.common,
};

export default config;
