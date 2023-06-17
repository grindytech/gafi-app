import { BoxProps, Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface ItemAdd {
  setValue: UseFormSetValue<FieldValues>;
  sx?: BoxProps;
}

export default function ItemAdd({ setValue, sx }: ItemAdd) {
  return (
    <CardBox
      as={Center}
      variant="createGames"
      justifyContent="space-between"
      {...sx}
    >
      <Heading variant="game">Item ID</Heading>

      <Input
        onBlur={e => {
          const { value } = e.target;

          setValue('item_id', value);
        }}
        min={0}
        variant="createGameSubmit"
        placeholder="Ex: 0"
      />
    </CardBox>
  );
}
