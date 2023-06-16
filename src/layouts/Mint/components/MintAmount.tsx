import { Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface MintAmountProps {
  register: UseFormRegister<FieldValues>;
}

export default function MintAmount({ register }: MintAmountProps) {
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
