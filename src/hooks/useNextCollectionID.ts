import React from 'react';
import { useAppSelector } from './useRedux';

interface useNextCollectionIDProps {
  refetch?: () => void;
}

export default function useNextCollectionID({
  refetch,
}: useNextCollectionIDProps = {}) {
  const { api } = useAppSelector(state => state.substrate);

  const [ID, setID] = React.useState<string | undefined>();

  React.useEffect(() => {
    const getCollectionID = async () => {
      if (api && api.query.nfts) {
        const res = await api.query.nfts.nextCollectionId();
        const id = res.toString();

        setID(id || '0');
      }
    };

    getCollectionID();
  }, [api?.query, refetch]);

  return { ID };
}
