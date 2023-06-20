import { Center, CenterProps, Input, Text } from '@chakra-ui/react';

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
        <Text fontSize="sm" fontWeight="normal" color="shader.a.500">
          Amount
        </Text>

        <Input
          onBlur={e => {
            const { value } = e.target;

            setValue('maybeSupply', value);
          }}
          min={0}
          variant="createGameSubmit"
          placeholder="Ex: 0"
        />
      </Center>
    </>
  );
}
