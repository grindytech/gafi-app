import { Center, Heading, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { useSubstrateState } from 'contexts/substrateContext';
import React, { useRef } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface CollectionIDProps {
  setValue: UseFormSetValue<FieldValues>;
  refetch: () => void;
}
export default function CollectionID({ setValue, refetch }: CollectionIDProps) {
  const { api } = useSubstrateState();
  const ref = useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const getCollectionID = async () => {
      if (api && api.query.nfts && ref && ref.current) {
        const res = await api.query.nfts.nextCollectionId();
        const id = res.toString();

        ref.current.innerHTML = id;
        setValue('collection_id', id);
      }
    };

    getCollectionID();
  }, [api?.query, refetch]);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading variant="game">Collection ID</Heading>

      <Text ref={ref} fontWeight="medium" color="shader.a.900">
        ...
      </Text>
    </CardBox>
  );
}
