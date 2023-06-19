const configEnv = await import(`./config`).then(env => env.default);

// Accepting React env vars and aggregating them into `config` object.
const envVarNames = ['VITE_APP_PROVIDER_SOCKET'];
const envVars = envVarNames.reduce((mem: Record<string, unknown>, n) => {
  // Remove the `VITE_APP_` prefix
  if (process.env[n] !== undefined) mem[n.slice(9)] = process.env[n];
  return mem;
}, {});

const config = {
  ...configEnv['common'],
  ...configEnv[import.meta.env.VITE_APP_ENV as keyof typeof configEnv],
  ...envVars,
};
export default config;
