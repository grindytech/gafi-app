import { BoxProps, Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface AddSupplyAmount {
  setValue: UseFormSetValue<FieldValues>;
  sx?: BoxProps;
}

export default function AddSupplyAmount({ setValue, sx }: AddSupplyAmount) {
  return (
    <CardBox
      as={Center}
      variant="createGames"
      justifyContent="space-between"
      {...sx}
    >
      <Heading variant="game">Amount</Heading>

      <Input
        onBlur={e => {
          const { value } = e.target;

          setValue('amount', value);
        }}
        min={0}
        variant="createGameSubmit"
        placeholder="Ex: 0"
      />
    </CardBox>
  );
}
