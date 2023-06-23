import { useSubstrateState } from 'contexts/substrateContext';
import React from 'react';

interface useNextPoolIDProps {
  refetch?: () => void;
}

export default function useNextPoolID({ refetch }: useNextPoolIDProps = {}) {
  const { api } = useSubstrateState();

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
