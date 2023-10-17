import { useQuery } from '@tanstack/react-query';
import { useSubstrateContext } from 'contexts/contexts.substrate';
import { TypeMetaPool } from 'types/meta.type.ts';

export interface useMetaPoolProps {
  filter: 'entries' | 'pool_id';
  arg?: number[];
  key: string | string[] | number | number[];
}

interface MetaPoolFieldProps extends TypeMetaPool {
  pool_id: number;
}

export default ({ filter, arg, key }: useMetaPoolProps) => {
  const { api } = useSubstrateContext();

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
              ) as TypeMetaPool;

              return {
                title: metadata.title,
                description: metadata.description,
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
