import React from 'react';
import { useAppSelector } from './useRedux';
import { FrameSystemEventRecord } from '@polkadot/types/lookup';

interface StateEventProps {
  eventName: string;
  eventValue: string;
  timestamp: number;
}

/* 
  optional 1:
    - only match string "hello".include("hello")

  optional 2:
    - show everything
*/
export default function useSubscribeSystem(include?: string) {
  const [event, setEvent] = React.useState<StateEventProps[] | undefined>([]);
  const { api } = useAppSelector(state => state.substrate);

  React.useEffect(() => {
    const subscribe = () => {
      if (api) {
        api.query.system.events(events => {
          events.forEach((record: FrameSystemEventRecord) => {
            const eventName = record.event.section + '::' + record.event.method;
            const eventValue = record.event.data.toString();
            const eventPhase = eventName + '::' + record.phase.toString();

            const FILTER_EVENT =
              'system::ExtrinsicSuccess::{"applyExtrinsic":0}';

            if (FILTER_EVENT.includes(eventPhase)) return;

            if (include && eventName === include) {
              return setEvent(prev => [
                {
                  eventName,
                  eventValue,
                  timestamp: new Date().getTime(),
                },
                ...(prev || []),
              ]);
            }

            if (!include) {
              return setEvent(prev => [
                {
                  eventName,
                  eventValue,
                  timestamp: new Date().getTime(),
                },
                ...(prev || []),
              ]);
            }
          });
        });
      }
    };

    subscribe();

    return () => subscribe();
  }, [api?.query.system]);

  return {
    event,
    setEvent,
  };
}
