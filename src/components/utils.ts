import { web3FromSource } from '@polkadot/extension-dapp';

// Temporary using any. Define type later.
export const getFromAcct = async (currentAccount: any) => {
  const {
    address,
    meta: { source, isInjected },
  } = currentAccount;

  if (!isInjected) {
    return [currentAccount];
  }

  // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
  // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
  const injector = await web3FromSource(source);
  return [address, { signer: injector.signer }];
};

export const shorten = (hash: string) => {
  const n = hash.length;
  return `${hash.substr(0, 10)}...${hash.substr(n - 6)}`;
};
