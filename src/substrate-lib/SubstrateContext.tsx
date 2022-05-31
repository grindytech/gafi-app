import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { KeyringPair } from '@polkadot/keyring/types';
import { TypeRegistry } from '@polkadot/types/create';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { DefinitionRpcExt } from '@polkadot/types/types';
import { Keyring, keyring as KeyringPolkadot } from '@polkadot/ui-keyring';
import { isTestChain } from '@polkadot/util';
import { set, get } from 'lodash';
import React, { useReducer, useContext, useEffect } from 'react';

import config from '../config';

const parsedQuery = new URLSearchParams(window.location.search);
// Using temporary 'as'. Remove when add type for config.
const connectedSocket =
  parsedQuery.get('rpc') || (config.PROVIDER_SOCKET as string);
///
// Initial state for `useReducer`

interface SubstrateContextState {
  socket: string;
  jsonrpc: Record<string, Record<string, DefinitionRpcExt>>;
  keyring: Keyring | null;
  keyringState: any;
  api: ApiPromise | null;
  apiError: any;
  apiState: string | null;
  currentAccount: KeyringPair | null;
  chainDecimal: number;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: SubstrateContextState = {
  // These are the states
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...config.CUSTOM_RPC_METHODS },
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  currentAccount: null,
  chainDecimal: 18,
};

const registry = new TypeRegistry();

///
// Reducer function for `useReducer`

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
    case 'SET_CURRENT_ACCOUNT':
      return { ...state, currentAccount: action.payload };
    case 'SET_CHAIN_DECIMAL':
      return { ...state, chainDecimal: action.payload };
    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

///
// Connecting to the Substrate node

const connect = (
  state: SubstrateContextState,
  dispatch: React.Dispatch<Action>
) => {
  const { apiState, socket, jsonrpc } = state;
  // We only want this function to be performed once
  if (apiState) return;

  dispatch({ type: 'CONNECT_INIT' });

  console.log(`Connected socket: ${socket}`);
  const provider = new WsProvider(socket);
  const _api = new ApiPromise({ provider, rpc: jsonrpc });

  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: _api });

    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(_api => dispatch({ type: 'CONNECT_SUCCESS' }));
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

// Loading accounts from dev and polkadot-js extension
const loadAccounts = (
  state: SubstrateContextState,
  dispatch: React.Dispatch<Action>
) => {
  const { api } = state;
  dispatch({ type: 'LOAD_KEYRING' });

  const asyncLoadAccounts = async () => {
    try {
      await web3Enable(config.APP_NAME);
      let allAccounts = await web3Accounts();

      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: { ...meta, name: `${meta.name} (${meta.source})` },
      }));

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

      dispatch({ type: 'SET_KEYRING', payload: KeyringPolkadot });
    } catch (e) {
      console.error(e);
      dispatch({ type: 'KEYRING_ERROR' });
    }
  };
  asyncLoadAccounts();
};

const SubstrateContext = React.createContext({
  state: initialState,
  setCurrentAccount: (acct: KeyringPair) => {},
});

let keyringLoadAll = false;

const SubstrateContextProvider = (props: any) => {
  const neededPropNames = ['socket'];
  neededPropNames.forEach(key => {
    set(
      initialState,
      key,
      typeof props[key] === 'undefined' ? get(initialState, key) : props[key]
    );
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  connect(state, dispatch);

  useEffect(() => {
    const { apiState, keyringState } = state;
    if (apiState === 'READY' && !keyringState && !keyringLoadAll) {
      keyringLoadAll = true;
      loadAccounts(state, dispatch);
    }
  }, [state, dispatch]);

  function setCurrentAccount(acct: KeyringPair) {
    dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: acct });
  }

  return (
    <SubstrateContext.Provider value={{ state, setCurrentAccount }}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

const useSubstrate = () => useContext(SubstrateContext);
const useSubstrateState = () => useContext(SubstrateContext).state;

export { SubstrateContextProvider, useSubstrate, useSubstrateState };
