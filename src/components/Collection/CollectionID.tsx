import { Center, Heading, Skeleton, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import useNextCollectionID from 'hooks/useNextCollectionID';
import React from 'react';
import { TypeSetValue } from 'types';

interface CollectionIDProps {
  setValue: TypeSetValue;
  refetch: () => void;
}

export default function CollectionID({ setValue, refetch }: CollectionIDProps) {
  const { ID } = useNextCollectionID({
    refetch() {
      refetch();
    },
  });

  React.useEffect(() => {
    setValue('collection_id', ID);
  }, [ID]);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading variant="game">Collection ID</Heading>

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
