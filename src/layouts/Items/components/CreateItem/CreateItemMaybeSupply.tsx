import { Center, CenterProps, Heading, Input } from '@chakra-ui/react';

import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface CreateItemMaybeSupplyProps {
  setValue: UseFormSetValue<FieldValues>;
  sx?: CenterProps;
}

export default function CreateItemMaybeSupply({
  setValue,
  sx,
}: CreateItemMaybeSupplyProps) {
  return (
    <>
      <Center justifyContent="space-between" {...sx}>
        <Heading variant="game">Maybe Supply</Heading>

        <Input
          onBlur={e => {
            const { value } = e.target;

            setValue('maybe_supply', value);
          }}
          min={0}
          variant="createGameSubmit"
          placeholder="Ex: 0"
        />
      </Center>
    </>
  );
}
