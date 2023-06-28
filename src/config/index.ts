import cfg from './config';

const config = {
  ...cfg[process.env.VITE_APP_ENV as keyof typeof cfg],
  ...cfg.common,
};

export default config;
