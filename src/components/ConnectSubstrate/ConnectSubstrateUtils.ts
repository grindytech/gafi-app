import { injectedExtension } from 'redux/injected';
import { GAFI_WALLET_STORAGE_KEY } from 'utils/constants';
import { getInjectedWeb3 } from 'utils/utils';
import {
  InjectedAccountWithMeta,
  InjectedAccount,
} from '@polkadot/extension-inject/types';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { reduxSubstrateProps, substrateConnect } from 'redux/substrate';
import { AppDispatch } from 'redux/store';

interface mapAccountsProps {
  source: string;
  list: InjectedAccount[];
  ss58Format?: number;
}

interface loadAccountsProps {
  extensionName: string;
  dispatch: AppDispatch;
}

interface connectAPIProps {
  socket: reduxSubstrateProps['socket'];
  jsonrpc: reduxSubstrateProps['jsonrpc'];
  apiState: reduxSubstrateProps['apiState'];
  dispatch: AppDispatch;
}

const mapAccounts = ({
  source,
  list,
  ss58Format,
}: mapAccountsProps): InjectedAccountWithMeta[] => {
  return list.map(
    ({ address, genesisHash, name, type }): InjectedAccountWithMeta => ({
      address:
        address.length === 42
          ? address
          : encodeAddress(decodeAddress(address), ss58Format),
      meta: { genesisHash, name, source: source },
      type,
    })
  );
};

const loadAccounts = async ({ extensionName, dispatch }: loadAccountsProps) => {
  try {
    const getKeyOfGAFI = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);

    const accounts = await getInjectedWeb3(extensionName);

    const getAccounts = await accounts?.accounts.get();

    if (getAccounts) {
      if (!getAccounts.length) {
        dispatch(
          injectedExtension({
            keyringState: 'ERROR',
            polkadot: {},
          })
        );
      }

      if (getAccounts.length) {
        const mappedAccounts: InjectedAccountWithMeta[] = mapAccounts({
          source: extensionName,
          list: getAccounts, // filter(({ type }) => type && true),
          ss58Format: undefined,
        });

        dispatch(
          injectedExtension({
            keyringState: 'READY',
            polkadot: {
              allAccount: mappedAccounts.map(({ address, type, meta }) => ({
                address,
                ...meta,
                type,
              })),
            },
          })
        );
      }

      if (!getKeyOfGAFI) {
        localStorage.setItem(GAFI_WALLET_STORAGE_KEY, extensionName);
      }
    }
  } catch (error) {
    dispatch(
      injectedExtension({
        keyringState: 'INSTALL',
        polkadot: {},
      })
    );
  }
};

const connectAPI = async ({
  socket,
  jsonrpc,
  apiState,
  dispatch,
}: connectAPIProps) => {
  if (apiState) return;

  const provider = new WsProvider(socket);
  const api = new ApiPromise({ provider, rpc: jsonrpc });

  api.on('connected', () => {
    api.isReady.then(() =>
      dispatch(substrateConnect({ apiState: 'READY', payload: api }))
    );
  });

  api.on('error', error =>
    dispatch(substrateConnect({ apiState: 'ERROR', payload: error }))
  );
};

export { mapAccounts, loadAccounts, connectAPI };
