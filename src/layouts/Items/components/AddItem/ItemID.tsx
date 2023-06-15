import { Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface ItemIDProps {
  register: UseFormRegister<FieldValues>;
}

export default function ItemID({ register }: ItemIDProps) {
  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Item ID</Heading>

      <Input
        {...register('item_id')}
        variant="createGameSubmit"
        placeholder="Ex: 0,0001"
      />
    </CardBox>
  );
}
