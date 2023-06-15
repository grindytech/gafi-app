import { Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface CollectionsMiningProps {
  register: UseFormRegister<FieldValues>;
}

export default function CollectionsMining({
  register,
}: CollectionsMiningProps) {
  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Mining fee</Heading>

      <Input
        {...register('mining_fee')}
        variant="createGameSubmit"
        placeholder="Ex: 0,0001"
      />
    </CardBox>
  );
}
