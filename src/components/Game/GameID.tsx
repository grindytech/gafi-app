import { Center, Heading, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { useSubstrateState } from 'contexts/substrateContext';
import React, { useRef } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface GameIDProps {
  setValue: UseFormSetValue<FieldValues>;
  refetch: () => void;
}
export default function GameID({ setValue, refetch }: GameIDProps) {
  const { api } = useSubstrateState();
  const ref = useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const getGameID = async () => {
      if (api && api.query.game && ref && ref.current) {
        const res = await api.query.game.nextGameId();
        const id = res.toString();

        ref.current.innerHTML = id;
        setValue('game_id', id);
      }
    };

    getGameID();
  }, [api?.query, refetch]);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading variant="game">Game ID</Heading>

      <Text ref={ref} fontWeight="medium" color="shader.a.900">
        ...
      </Text>
    </CardBox>
  );
}
