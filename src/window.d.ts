/* eslint-disable no-unused-vars */

import { InjectedWindowProvider } from 'types/polkadot.type';

declare global {
  interface Window {
    injectedWeb3: Record<string, InjectedWindowProvider>;
  }
}
