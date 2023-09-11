interface commonProps {
  APP_NAME: string;
  CUSTOM_RPC_METHODS: Record<string, any>;
  PROVIDER_SOCKETS?: string[];
}

const common: commonProps = {
  APP_NAME: 'gafi-dashboard',
  CUSTOM_RPC_METHODS: {},
};

const development = {
  PROVIDER_SOCKETS: ['ws://0.0.0.0:9944'],
  // PROVIDER_SOCKETS: ['ws://192.168.1.19:9944'],
  // PROVIDER_SOCKETS: ['ws://192.168.1.13:9944'],
};

const production = {
  PROVIDER_SOCKETS: [
    'wss://ws-testnet.gafi.network',
    'wss://ws-test.gafi.network',
  ],
};

const rococo = {
  PROVIDER_SOCKETS: ['wss://ws-rococo.gafi.network'],
};

const test = {
  PROVIDER_SOCKETS: ['wss://dev-node.substrate.dev'],
};

const config = {
  development,
  production,
  rococo,
  test,
  common,
};
export default config;
