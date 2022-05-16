import { AddressOrPair, SignerOptions } from '@polkadot/api/types';
import { web3FromSource } from '@polkadot/extension-dapp';
import Web3 from 'web3';

const { fromWei } = Web3.utils;
// Temporary using any. Define type later.
export const getFromAcct = async (
  currentAccount: any
): Promise<[AddressOrPair, Partial<SignerOptions>?]> => {
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

export const handleTxError = (events: any, api: any, toast: any) => {
  events.forEach(({ event }: any) => {
    if (api.events.system.ExtrinsicFailed.is(event)) {
      // extract the data for this event
      const [dispatchError, dispatchInfo] = event.data;
      let errorInfo;

      // decode the error
      if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        // (For specific known errors, we can also do a check against the
        // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
        const decoded = api.registry.findMetaError(dispatchError.asModule);

        errorInfo = `${decoded.name}`;
      } else {
        // Other, CannotLookup, BadOrigin, no extra info
        errorInfo = dispatchError.toString();
      }

      toast({
        description: errorInfo,
        isClosable: true,
        status: 'error',
      });
    }
  });
};

export const weiToEther = (wei: string) => fromWei(wei, 'ether');
