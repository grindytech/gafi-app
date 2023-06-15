import _ from 'lodash';
import cfg from './config';
// Using `require` as `import` does not support dynamic loading (yet).
const configEnv = _.get(cfg, import.meta.env.VITE_APP_ENV || 'development');

// Accepting React env vars and aggregating them into `config` object.
const envVarNames = ['VITE_APP_PROVIDER_SOCKET'];
const envVars = envVarNames.reduce((mem: Record<string, unknown>, n) => {
  // Remove the `VITE_APP_` prefix
  if (process.env[n] !== undefined) mem[n.slice(9)] = process.env[n];
  return mem;
}, {});

const config = { ...cfg.common, ...configEnv, ...envVars };
export default config;
