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
/* const FILTERED_EVENTS = [
  'system:ExtrinsicSuccess::(phase={"applyExtrinsic":0})',
]; */
const FILTER_EVENT = 'system::ExtrinsicSuccess::{"applyExtrinsic":0}';

export default function useSubscribeSystem(include?: string) {
  const [events, setEvents] = React.useState<StateEventProps[] | undefined>([]);
  const { api } = useAppSelector(state => state.substrate);

  React.useEffect(() => {
    const subscribe = () => {
      if (api) {
        api.query.system.events(events => {
          events.forEach((record: FrameSystemEventRecord) => {
            const eventName = record.event.section + '::' + record.event.method;
            const eventValue = record.event.data.toString();
            const eventPhase = eventName + '::' + record.phase.toString();

            if (FILTER_EVENT.includes(eventPhase)) return;

            if (include && eventName === include) {
              return setEvents(prev => [
                {
                  eventName,
                  eventValue,
                  timestamp: new Date().getTime(),
                },
                ...(prev || []),
              ]);
            }

            if (!include) {
              return setEvents(prev => [
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
    events,
    setEvents,
  };
}
