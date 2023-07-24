import React from 'react';
import { useAppSelector } from './useRedux';
import useSubscribeSystem from './useSubscribeSystem';

export default function useNextCollectionID() {
  const { event } = useSubscribeSystem('nfts::NextCollectionIdIncremented');
  const { api } = useAppSelector(state => state.substrate);

  const [ID, setID] = React.useState<string | undefined>();

  React.useEffect(() => {
    const getCollectionID = () => {
      const callback = async () => {
        if (api && api.query.nfts) {
          const res = await api.query.nfts.nextCollectionId();
          setID(res.toString() || '0');
        }
      };

      callback();
    };

    getCollectionID();

    return () => getCollectionID();
  }, [event]);

  return { ID };
}
