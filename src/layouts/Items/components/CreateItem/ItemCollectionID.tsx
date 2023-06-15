import { Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface ItemCollectionIDProps {
  register: UseFormRegister<FieldValues>;
}

export default function ItemCollectionID({ register }: ItemCollectionIDProps) {
  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Collection ID</Heading>

      <Input
        {...register('collection_id')}
        variant="createGameSubmit"
        placeholder="Ex: 0"
      />
    </CardBox>
  );
}
