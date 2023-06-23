import { useSubstrateState } from 'contexts/substrateContext';
import React from 'react';

interface useNextGameIDProps {
  refetch?: () => void;
}

export default function useNextGameID({ refetch }: useNextGameIDProps = {}) {
  const { api } = useSubstrateState();

  const [ID, setID] = React.useState<string | undefined>();

  React.useEffect(() => {
    const getGameID = async () => {
      if (api && api.query.game) {
        const res = await api.query.game.nextGameId();
        const id = res.toString();

        setID(id);
      }
    };

    getGameID();
  }, [api?.query, refetch]);

  return { ID };
}
