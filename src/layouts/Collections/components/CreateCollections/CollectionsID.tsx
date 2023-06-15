import { Center, Heading, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface CollectionsIDProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function CollectionsID({ setValue }: CollectionsIDProps) {
  const collectionID = 0;

  setValue('collection_id', collectionID);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Collection ID</Heading>

      <Text fontWeight="medium" color="shader.a.900">
        {collectionID}
      </Text>
    </CardBox>
  );
}
