import { ApiPromise } from '@polkadot/api';
import { DefinitionRpcExt } from '@polkadot/types/types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from 'config';
import polkadotJsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { chainDecimal } from 'utils/constants';

interface PayloadProps {
  apiState?: reduxSubstrateProps['apiState'];
  payload: reduxSubstrateProps['api'];
  socket?: reduxSubstrateProps['socket'];
}

export interface reduxSubstrateProps {
  socket: string;
  jsonrpc: Record<string, Record<string, DefinitionRpcExt>>;
  api: ApiPromise | null;
  apiError: any;
  apiState: 'READY' | 'ERROR' | undefined;
  chainDecimal: number;
}

const initialState: reduxSubstrateProps = {
  socket: config.PROVIDER_SOCKETS?.[0] as string,
  jsonrpc: {
    ...polkadotJsonrpc,
    ...config.CUSTOM_RPC_METHODS,
  },
  api: null,
  apiError: undefined,
  apiState: undefined,
  chainDecimal,
};

export const substrate = createSlice({
  name: 'substrate',
  initialState,
  reducers: {
    substrateConnect: (state, { payload }: PayloadAction<PayloadProps>) => {
      if (payload.apiState) {
        state.apiState = payload.apiState;
        state.api = payload.payload;
      }
    },
    setConnectSocket: (state, { payload }: PayloadAction<PayloadProps>) => {
      if (payload.socket) {
        state.apiState = payload.apiState;
        state.socket = payload.socket;
      }
    },
  },
});

export const { substrateConnect, setConnectSocket } = substrate.actions;

export default substrate.reducer;
