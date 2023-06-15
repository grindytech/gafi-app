import { Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface ItemAmountProps {
  register: UseFormRegister<FieldValues>;
}

export default function ItemAmount({ register }: ItemAmountProps) {
  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Amount</Heading>

      <Input
        {...register('amount')}
        variant="createGameSubmit"
        placeholder="Ex: 0,0001"
      />
    </CardBox>
  );
}
