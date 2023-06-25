import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InjectedAccount } from '@polkadot/extension-inject/types';

interface PayloadProps {
  keyringState?: reduxInjectedProps['keyringState'];
  polkadot: reduxInjectedProps['polkadot'];
}

export interface reduxInjectedProps {
  polkadot: {
    account?: {
      address?: string | null;
      name?: string | null;
    };
    allAccount?: InjectedAccount[];
  };
  keyringState: undefined | 'READY' | 'ERROR' | 'INSTALL';
}

const initialState: reduxInjectedProps = {
  polkadot: {
    account: {},
    allAccount: [],
  },
  keyringState: undefined,
};

export const injected = createSlice({
  name: 'injected',
  initialState,
  reducers: {
    injectedExtension: (state, { payload }: PayloadAction<PayloadProps>) => {
      state.keyringState = payload.keyringState;
      state.polkadot.allAccount = payload.polkadot.allAccount;
    },
    injectedAccount: (state, { payload }: PayloadAction<PayloadProps>) => {
      state.polkadot.account = payload.polkadot.account;
    },
  },
});

export const { injectedExtension, injectedAccount } = injected.actions;

export default injected.reducer;
