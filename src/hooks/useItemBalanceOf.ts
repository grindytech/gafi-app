import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { useEffect } from 'react';
import useSubscribeSystem from './useSubscribeSystem';

interface groupMetaProps {
  amount: number;
  owner: string;
  collection_id: number;
  nft_id: number;
}

interface useItemBalanceOfProps {
  key?: string;
  group: Omit<groupMetaProps, 'amount'>[];
}

export default function useItemBalanceOf({
  key,
  group,
}: useItemBalanceOfProps) {
  const { event, setEvent } = useSubscribeSystem('game::PriceSet');

  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: [`itemBalanceOf/${key}`],
    queryFn: async () => {
      if (api && group?.length) {
        const response = await Promise.all(
          group.map(async ({ nft_id, collection_id, owner }) => {
            const service = await api.query.game.itemBalanceOf.entries(
              owner,
              collection_id
            );

            return service.map(([meta, amount]) => {
              const [who, collection, item] = meta.args;

              if (
                nft_id === item.toNumber() &&
                collection_id === collection.toNumber()
              ) {
                return {
                  owner: who.toString(),
                  amount: amount.toNumber(),
                  nft_id,
                  collection_id,
                };
              }
            });
          })
        ).then(data =>
          data.map(child =>
            child.find((item): item is groupMetaProps => !!item)
          )
        );

        return response.filter(item => !!item);
      }

      // not found group
      return [];
    },
    enabled: !!group,
  });

  useEffect(() => {
    if (event && group?.length) {
      event.forEach(({ eventValue }) => {
        const [, , collection, item] = JSON.parse(eventValue);

        group.forEach(({ collection_id, nft_id }) => {
          if (collection === collection_id && nft_id === item) {
            refetch();
            setEvent([]);
          }
        });
      });
    }
  }, [event]);

  const currentItemBalanceOf = ({
    collection_id,
    nft_id,
  }: Omit<groupMetaProps, 'owner' | 'amount'>) => {
    return data?.find(
      meta => meta?.collection_id === collection_id && meta?.nft_id === nft_id
    );
  };

  return {
    getItemBalanceOf: data,
    currentItemBalanceOf,
  };
}
