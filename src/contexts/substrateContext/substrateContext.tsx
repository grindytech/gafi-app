import { useToast } from '@chakra-ui/react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import {
  Injected,
  InjectedAccountWithMeta,
  InjectedAccount,
} from '@polkadot/extension-inject/types';
import { KeyringPair } from '@polkadot/keyring/types';
import { TypeRegistry } from '@polkadot/types/create';
import polkadotJsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { DefinitionRpcExt } from '@polkadot/types/types';
import { Keyring, keyring as KeyringPolkadot } from '@polkadot/ui-keyring';
import { isTestChain } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { get, set } from 'lodash';
import React, { useContext, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';

import config from 'config';
import { acctAddr, getGAKIAccountAddress } from 'utils';
import { GAFI_WALLET_STORAGE_KEY } from 'utils/constants';

const parsedQuery = new URLSearchParams(window.location.search);
// Using temporary 'as'. Remove when add type for config.

const connectedSocket =
  parsedQuery.get('rpc') || (config.PROVIDER_SOCKETS as string[])[0];

// Initial state for `useReducer`

interface SubstrateContextState {
  socket: string;
  jsonrpc: Record<string, Record<string, DefinitionRpcExt>>;
  keyring: Keyring | null;
  keyringState: string;
  api: ApiPromise | null;
  apiError: any;
  apiState: string | null;
  currentAccountState: string;
  currentAccount: KeyringPair | null;
  polkadotAccounts: Array<string>;
  currentPolkadotAccount: string;
  currentMetamaskAccountAsString: string;
  chainDecimal: number;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: SubstrateContextState = {
  // These are the states
  socket: connectedSocket,
  jsonrpc: { ...polkadotJsonrpc, ...config.CUSTOM_RPC_METHODS },
  keyring: null,
  keyringState: '',
  api: null,
  apiError: null,
  apiState: null,
  currentAccountState: '',
  currentAccount: null,
  currentPolkadotAccount: '',
  polkadotAccounts: [],
  currentMetamaskAccountAsString: '',
  chainDecimal: 18,
};

const registry = new TypeRegistry();

const reducer = (
  state: SubstrateContextState,
  action: Action
): SubstrateContextState => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' };
    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' };
    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY' };
    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload };
    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' };
    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' };
    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' };
    case 'LOAD_CURRENT_ACCOUNT':
      return { ...state, currentAccountState: 'LOADING' };
    case 'CURRENT_ACCOUNT_ERROR':
      return {
        ...state,
        currentAccount: null,
        currentPolkadotAccount: '',
        currentAccountState: 'ERROR',
      };
    case 'SET_CURRENT_ACCOUNT':
      return {
        ...state,
        currentAccount: action.payload,
        currentAccountState: 'READY',
      };
    case 'SET_CURRENT_POLKADOT_ACCOUNT':
      return { ...state, currentPolkadotAccount: action.payload };
    case 'SET_POLKADOT_ACCOUNTS':
      return { ...state, polkadotAccounts: action.payload };
    case 'SET_CHAIN_DECIMAL':
      return { ...state, chainDecimal: action.payload };
    case 'SET_CONNECT_SOCKET':
      return {
        ...state,
        socket: action.payload,
        apiState: null,
      };
    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

const connect = (
  state: SubstrateContextState,
  dispatch: React.Dispatch<Action>
) => {
  const { apiState, socket, jsonrpc } = state;
  if (apiState) return;

  dispatch({ type: 'CONNECT_INIT' });
  const provider = new WsProvider(socket);
  const _api = new ApiPromise({ provider, rpc: jsonrpc });

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: _api });

    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(() => dispatch({ type: 'CONNECT_SUCCESS' }));
  });
  _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
  _api.on('error', err => dispatch({ type: 'CONNECT_ERROR', payload: err }));
};

const retrieveChainInfo = async (api: ApiPromise | null) => {
  const [systemChain, systemChainType] = await Promise.all([
    api?.rpc.system.chain(),
    api?.rpc.system.chainType
      ? api.rpc.system.chainType()
      : Promise.resolve(registry.createType('ChainType', 'Live')),
  ]);

  return {
    systemChain: (systemChain || '<unknown>').toString(),
    systemChainType,
  };
};

const connectWallet = async (extensionName: string) => {
  const result: Injected = await window.injectedWeb3[extensionName].enable(
    config.APP_NAME
  );

  return result.accounts.get();
};

export async function getSigner() {
  const extensionName = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);
  if (extensionName) {
    const result: Injected = await window.injectedWeb3[extensionName].enable(
      config.APP_NAME
    );

    return result.signer;
  }
}

export function mapAccounts(
  source: string,
  list: InjectedAccount[],
  ss58Format?: number
): InjectedAccountWithMeta[] {
  return list.map(
    ({ address, genesisHash, name, type }): InjectedAccountWithMeta => ({
      address:
        address.length === 42
          ? address
          : encodeAddress(decodeAddress(address), ss58Format),
      meta: { genesisHash, name, source },
      type,
    })
  );
}

const loadAccounts = (
  extensionName: string,
  state: SubstrateContextState,
  dispatch: React.Dispatch<Action>
): Promise<string> => {
  const { api } = state;
  dispatch({ type: 'LOAD_KEYRING' });

  const asyncLoadAccounts = async () => {
    let accounts;
    try {
      accounts = await connectWallet(extensionName);
    } catch (error) {
      dispatch({ type: 'KEYRING_ERROR' });
      return 'PLEASE_ALLOW_WALLET';
    }

    const mappedAccounts = mapAccounts(
      extensionName,
      accounts.filter(({ type }) => type && true),
      undefined
    );

    try {
      const allAccounts = mappedAccounts.map(
        ({ address, meta }: InjectedAccountWithMeta) => ({
          address,
          meta: { ...meta, name: `${meta.name} (${meta.source})` },
        })
      );

      // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
      // ref: https://github.com/polkadot-js/apps/blob/15b8004b2791eced0dde425d5dc7231a5f86c682/packages/react-api/src/Api.tsx?_pjax=div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20%3E%20main#L101-L110
      const { systemChain, systemChainType } = await retrieveChainInfo(api);
      if (api?.registry.chainDecimals) {
        dispatch({
          type: 'SET_CHAIN_DECIMAL',
          payload: api.registry.chainDecimals[0],
        });
      }
      const isDevelopment =
        systemChainType.isDevelopment ||
        systemChainType.isLocal ||
        isTestChain(systemChain);

      KeyringPolkadot.loadAll({}, allAccounts);

      const pairs = KeyringPolkadot?.getPairs() || [];
      const polkadotAccounts = pairs.map((key: KeyringPair) => acctAddr(key));
      dispatch({ type: 'SET_POLKADOT_ACCOUNTS', payload: polkadotAccounts });
      dispatch({ type: 'SET_KEYRING', payload: KeyringPolkadot });

      // Successfully connected.
      localStorage.setItem(GAFI_WALLET_STORAGE_KEY, extensionName);
      return '';
    } catch (e) {
      console.error(e);
      dispatch({ type: 'KEYRING_ERROR' });
      return '';
    }
  };

  return asyncLoadAccounts();
};

const loadCurrentAccount = (
  metamaskAccount: string | null,
  state: SubstrateContextState,
  dispatch: React.Dispatch<Action>
) => {
  const asyncLoadCurrentAccounts = async () => {
    const { keyring, api, currentAccount } = state;
    dispatch({ type: 'LOAD_CURRENT_ACCOUNT' });
    try {
      const pairs = keyring?.getPairs() || [];
      const response = await api?.query.proofAddressMapping.h160Mapping(
        metamaskAccount
      );
      const polkadotAccountWasMapped = (await response?.toHuman()) || '';

      const currentPair = pairs.find(
        (pair: KeyringPair) =>
          getGAKIAccountAddress(pair.addressRaw) === polkadotAccountWasMapped
      );
      if (currentPair) {
        dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: currentPair });
      } else if (pairs.length > 0) {
        dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: pairs[0] });
      }

      dispatch({
        type: 'SET_CURRENT_POLKADOT_ACCOUNT',
        payload: acctAddr(currentAccount),
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'KEYRING_ERROR' });
    }
  };

  asyncLoadCurrentAccounts();
};

const SubstrateContext = React.createContext<{
  state: SubstrateContextState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

let keyringLoadAll = false;

const SubstrateContextProvider: React.FC<Record<string, unknown>> = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { account: metamaskAccount } = useWallet();
  const neededPropNames = ['socket'];
  neededPropNames.forEach(key => {
    set(
      initialState,
      key,
      // eslint-disable-next-line react/destructuring-assignment
      typeof props[key] === 'undefined' ? get(initialState, key) : props[key]
    );
  });

  connect(state, dispatch);

  useEffect(() => {
    const extensionName = localStorage.getItem(GAFI_WALLET_STORAGE_KEY) || '';
    const { apiState, keyringState } = state;

    async function prepareLoadAccounts() {
      if (apiState === 'READY' && !keyringState && !keyringLoadAll) {
        keyringLoadAll = true;

        loadAccounts(extensionName, state, dispatch);
      }
    }

    prepareLoadAccounts();
  }, [state, dispatch]);

  //   useEffect(() => {
  //     if (state.keyring && state.api)
  //       loadCurrentAccount(metamaskAccount, state, dispatch);
  //   }, [metamaskAccount, state.keyring, state.api]);

  return (
    <SubstrateContext.Provider value={{ state, dispatch }}>
      {children}
    </SubstrateContext.Provider>
  );
};

const useSubstrate = () => {
  const { state, dispatch } = useContext(SubstrateContext);
  const toast = useToast();
  const { t } = useTranslation();

  const setCurrentAccount = (acct: KeyringPair) => {
    dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: acct });
    dispatch({
      type: 'SET_CURRENT_POLKADOT_ACCOUNT',
      payload: acctAddr(acct),
    });
  };

  const setAccounts = (extensionName: string) =>
    loadAccounts(extensionName, state, dispatch);

  const setConnectSocket = (socket: string) => {
    dispatch({ type: 'SET_CONNECT_SOCKET', payload: socket });
  };

  return {
    state,
    setCurrentAccount,
    hanldeSwitchAccount: (acct: KeyringPair) => {
      try {
        setCurrentAccount(acct);
        toast({
          position: 'top-right',
          title: t('SWITCH_ACCOUNT_SUCCESSFUL'),
          description: acctAddr(acct),
          isClosable: true,
          status: 'success',
        });
      } catch (error) {
        toast({
          position: 'top-right',
          description: t('SWITCH_ACCOUNT_FAIL'),
          isClosable: true,
          status: 'error',
        });
      }
    },
    setAccounts,
    setConnectSocket,
  };
};

const useSubstrateState = () => useContext(SubstrateContext).state;

export { SubstrateContextProvider, useSubstrate, useSubstrateState };
