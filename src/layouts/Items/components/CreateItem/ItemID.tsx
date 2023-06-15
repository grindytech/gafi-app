import { Center, Heading, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface ItemIDProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function ItemID({ setValue }: ItemIDProps) {
  const ItemID = 0;

  setValue('item_id', ItemID);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Item ID</Heading>

      <Text color="shader.a.900" fontWeight="medium">
        {ItemID}
      </Text>
    </CardBox>
  );
}
