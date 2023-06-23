import { useSubstrateState } from 'contexts/substrateContext';
import React from 'react';

interface useNextCollectionIDProps {
  refetch?: () => void;
}

export default function useNextCollectionID({
  refetch,
}: useNextCollectionIDProps = {}) {
  const { api } = useSubstrateState();

  const [ID, setID] = React.useState<string | undefined>();

  React.useEffect(() => {
    const getCollectionID = async () => {
      if (api && api.query.nfts) {
        const res = await api.query.nfts.nextCollectionId();
        const id = res.toString();

        setID(id);
      }
    };

    getCollectionID();
  }, [api?.query, refetch]);

  return { ID };
}
