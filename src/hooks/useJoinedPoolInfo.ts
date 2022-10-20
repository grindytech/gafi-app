import { GafiPrimitivesTicketTicketInfo } from '@polkadot/types/lookup';
import { useQuery } from 'react-query';

import { useSubstrateState } from 'contexts/substrateContext';

const useJoinedPoolInfo = () => {
  const { api, currentAccount } = useSubstrateState();

  const { data, refetch } = useQuery(
    ['getJoinedPool', currentAccount],
    async (): Promise<GafiPrimitivesTicketTicketInfo[] | undefined> => {
      if (api && currentAccount) {
        const res = await api.query.pool.tickets.entries(
          currentAccount.address
        );

        const tickets = res
          .map(([, exposure]) => {
            if (exposure.isSome) {
              return exposure.unwrap();
            }

            return undefined;
          })
          .filter((item): item is GafiPrimitivesTicketTicketInfo => !!item);

        return tickets;
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  return {
    joinedPoolInfo: data,
    refetch,
    isJoinedPool: !!data?.length,
  };
};

export default useJoinedPoolInfo;
