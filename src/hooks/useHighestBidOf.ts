import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { useEffect } from 'react';
import useSubscribeSystem from './useSubscribeSystem';

interface highestBidOfProps {
  owner: string;
  trade_id: number;
  maybePrice: string;
}

interface useHighestBidOfProps {
  key?: string;
  group: number[];
  filter?: 'only' | 'entries' | 'every';
}

export default function useHighestBidOf({
  key,
  group,
  filter,
}: useHighestBidOfProps) {
  const { event, setEvent } = useSubscribeSystem('game::Bid');
  const { api } = useAppSelector(state => state.substrate);

  const { data, refetch } = useQuery({
    queryKey: ['highestBidOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'only') {
          const highestBidOf = await api.query.game.highestBidOf(group[0]);

          if (highestBidOf.isSome) {
            return [
              {
                trade_id: group[0],
                owner: highestBidOf.value[0].toString(),
                maybePrice: highestBidOf.value[1].toString(),
              },
            ] as highestBidOfProps[];
          }
        }

        if (filter === 'entries') {
          const highestBidOf = await api.query.game.highestBidOf.entries();

          return highestBidOf.map(([trade_id, meta]) => ({
            trade_id: trade_id.args[0].toNumber(),
            owner: meta.value[0].toString(),
            maybePrice: meta.value[1].toString(),
          })) as highestBidOfProps[];
        }

        if (filter === 'every') {
          return Promise.all(
            group.map(async trade => {
              const highestBidOf = await api.query.game.highestBidOf(trade);

              if (highestBidOf.isSome) {
                return {
                  trade_id: trade,
                  owner: highestBidOf.value[0].toString(),
                  maybePrice: highestBidOf.value[1].toString(),
                } as highestBidOfProps;
              }
            })
          );
        }

        // not found
        return [];
      }
    },
    enabled: !!group,
  });

  useEffect(() => {
    if (event) {
      event.forEach(({ eventValue }) => {
        const [trade_id] = JSON.parse(eventValue);

        group.forEach(trade => {
          if (trade_id === trade) {
            refetch();
          }
        });

        setEvent([]);
      });
    }
  }, [event]);

  return {
    getHighestBidOf: data,
  };
}
