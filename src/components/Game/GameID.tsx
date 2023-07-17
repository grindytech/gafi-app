import { Center, Heading, Skeleton, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import useNextGameID from 'hooks/useNextGameID';
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';

interface GameIDProps {
  setValue: UseFormSetValue<any>;
  refetch?: () => void;
}

export default function GameID({ setValue, refetch }: GameIDProps) {
  const { ID } = useNextGameID({
    refetch: () => {
      if (refetch) {
        refetch();
      }
    },
  });

  React.useEffect(() => {
    setValue('game_id', ID);
  }, [ID]);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading variant="game">Game ID</Heading>

      {ID ? (
        <Text fontWeight="medium" color="shader.a.900">
          {ID}
        </Text>
      ) : (
        <Skeleton width={4} height={4} />
      )}
    </CardBox>
  );
}
