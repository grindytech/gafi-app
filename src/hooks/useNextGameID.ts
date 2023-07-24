import React from 'react';
import { useAppSelector } from './useRedux';
import useSubscribeSystem from './useSubscribeSystem';

export default function useNextGameID() {
  const { event } = useSubscribeSystem('game::GameCreated');
  const { api } = useAppSelector(state => state.substrate);

  const [ID, setID] = React.useState<string | undefined>();

  React.useEffect(() => {
    const getGameID = () => {
      const callback = async () => {
        if (api && api.query.game) {
          const res = await api.query.game.nextGameId();
          setID(res.toString() || '0');
        }
      };

      callback();
    };

    getGameID();

    return () => getGameID();
  }, [event]);

  return { ID };
}
