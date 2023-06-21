const common = {
  APP_NAME: 'gafi-dashboard',
  CUSTOM_RPC_METHODS: {},
};

const development = {
  PROVIDER_SOCKETS: ['ws://127.0.0.1:9944'],
  GRAPHQL_ENDPOINT: 'http://115.79.142.60:8000',
  FEATURE_FLAG: {
    PUBLIC_FEATURE_GAME_CREATOR: false,
    PUBLIC_NEW_DASHBOARD_UI: true,
  },
  WHITELIST_DEFAULT_URL: 'http://localhost:5000/whitelist',
  TRACKING_ID: 'G-PB9GEPCD66',
};

const production = {
  PROVIDER_SOCKETS: [
    'wss://ws-testnet.gafi.network',
    'wss://ws-test.gafi.network',
  ],
  GRAPHQL_ENDPOINT: 'https://api.subquery.network/sq/grindytech/gafi-query',
  FEATURE_FLAG: {
    PUBLIC_FEATURE_GAME_CREATOR: false,
    PUBLIC_NEW_DASHBOARD_UI: true,
  },
  WHITELIST_DEFAULT_URL: 'https://whitelist.gafi.network',
  TRACKING_ID: 'G-PB9GEPCD66',
};

const rococo = {
  PROVIDER_SOCKETS: ['wss://ws-rococo.gafi.network'],
  GRAPHQL_ENDPOINT:
    'https://api.subquery.network/sq/lhtrung307/gafi-query__bGh0c',
  FEATURE_FLAG: {
    PUBLIC_FEATURE_GAME_CREATOR: false,
    PUBLIC_NEW_DASHBOARD_UI: true,
  },
  TRACKING_ID: 'G-PB9GEPCD66',
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
