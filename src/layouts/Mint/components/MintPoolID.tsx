import { BoxProps, Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { NumberInputStyle } from 'components/NumberInput';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface MintPoolIDProps {
  sx?: BoxProps;
  register: UseFormRegister<FieldValues>;
}

export default function MintPoolID({ register, sx }: MintPoolIDProps) {
  return (
    <CardBox
      as={Center}
      variant="createGames"
      justifyContent="space-between"
      {...sx}
    >
      <Heading variant="game">Pool ID</Heading>

      <Input
        {...register('pool_id')}
        {...NumberInputStyle}
        width="auto"
        min={0}
        placeholder="Ex: 0"
      />
    </CardBox>
  );
}
