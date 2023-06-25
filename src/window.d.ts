import { InjectedWindowProvider } from '@polkadot/extension-inject/types';
import Web3 from 'web3';

declare global {
  interface Window {
    web3: Web3;
    injectedWeb3: Record<string, InjectedWindowProvider>;
  }
}
