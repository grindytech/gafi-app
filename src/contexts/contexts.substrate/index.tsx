import { ApiPromise, WsProvider } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';

import config from 'config';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface SubstrateStateProps {
  PROVIDER_SOCKET?: string;
  api?: ApiPromise;
}

export interface SubstrateContextProps {
  substrate: SubstrateStateProps | undefined;
  setSubstrate: React.Dispatch<
    React.SetStateAction<SubstrateStateProps | undefined>
  >;
}

const SubstrateContext = createContext<SubstrateContextProps>({
  substrate: undefined,
  setSubstrate: () => {},
});

const SubstrateContextProvider = ({ children }: PropsWithChildren) => {
  const [substrate, setSubstrate] = useState<SubstrateStateProps>();

  const provider = useMemo(
    () =>
      new WsProvider(
        substrate?.PROVIDER_SOCKET || config.PROVIDER_SOCKETS?.[0]
      ),
    [substrate?.PROVIDER_SOCKET]
  );

  const api = useMemo(
    () =>
      new ApiPromise({
        provider,
        rpc: jsonrpc,
      }),
    [provider]
  );

  useEffect(() => {
    api.isReady.then(event => {
      if (!substrate?.api) {
        setSubstrate(prev => ({
          ...prev,
          api: event,
        }));
      }
    });
  }, []);

  return (
    <SubstrateContext.Provider
      value={{
        setSubstrate,
        substrate,
      }}
    >
      {children}
    </SubstrateContext.Provider>
  );
};

const useSubstrateContext = () => {
  const { substrate, setSubstrate } = useContext(SubstrateContext);

  return {
    api: substrate?.api,
    PROVIDER_SOCKET: substrate?.PROVIDER_SOCKET,

    setSubstrate,
  };
};

export { SubstrateContextProvider, useSubstrateContext };
