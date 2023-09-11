import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from './useRedux';
import { TypeMetadataOfPool } from 'types';

export interface useMetaPoolProps {
  filter: 'entries' | 'pool_id';
  arg?: number[];
  key: string | string[] | number | number[];
}

interface MetaPoolFieldProps extends TypeMetadataOfPool {
  pool_id: number;
}

export default ({ filter, arg, key }: useMetaPoolProps) => {
  const { api } = useAppSelector(state => state.substrate);

  const { data } = useQuery({
    queryKey: ['poolMetadataOf', key],
    queryFn: async () => {
      if (api) {
        if (filter === 'pool_id' && arg) {
          return Promise.all(
            arg.map(async pool_id => {
              const service = await api.query.game.poolMetadataOf(pool_id);

              // not found
              if (service.isEmpty || service.value.data.isEmpty) return;

              const metadata = JSON.parse(
                String(service.value.data.toHuman())
              ) as TypeMetadataOfPool;

              return {
                title: metadata.title || 'unknown',
                description: metadata.description || 'unknown',
                pool_id,
              } as MetaPoolFieldProps;
            })
          ).then(data =>
            data.filter((meta): meta is MetaPoolFieldProps => !!meta)
          );
        }
      }

      // not found group
      return [];
    },
    enabled: !!api?.query.game.poolMetadataOf || !!arg,
  });

  return {
    MetaPool: data,
  };
};
