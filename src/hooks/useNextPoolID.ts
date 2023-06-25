import React from 'react';
import { useAppSelector } from './useRedux';

interface useNextPoolIDProps {
  refetch?: () => void;
}

export default function useNextPoolID({ refetch }: useNextPoolIDProps = {}) {
  const { api } = useAppSelector(state => state.substrate);

  const [ID, setID] = React.useState<string | undefined>();

  React.useEffect(() => {
    const getPoolID = async () => {
      if (api && api.query.game) {
        const res = await api.query.game.nextPoolId();
        const id = res.toString();

        setID(id);
      }
    };

    getPoolID();
  }, [api?.query, refetch]);

  return { ID };
}
