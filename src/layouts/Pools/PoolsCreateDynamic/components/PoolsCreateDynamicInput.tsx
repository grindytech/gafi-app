import {
  BoxProps,
  Center,
  Heading,
  Input,
  NumberInput,
} from '@chakra-ui/react';

import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface PoolsCreateDynamicInputProps {
  setValue: UseFormSetValue<FieldValues>;
  title: string;
  value: string;
  sx?: BoxProps;
}

export default function PoolsCreateDynamicInput({
  setValue,
  title,
  value,
  sx,
}: PoolsCreateDynamicInputProps) {
  return (
    <Center justifyContent="space-between" {...sx}>
      <Heading variant="game">{title}</Heading>

      <NumberInput>
        <Input
          type="number"
          onBlur={e => {
            const { value: valueChange } = e.target;

            setValue(value, valueChange);
          }}
          min={0}
          border="0.0625rem solid"
          borderColor="shader.a.400"
          borderRadius="lg"
          color="shader.a.900"
          fontWeight="medium"
          _placeholder={{
            color: 'shader.a.500',
            fontWeight: 'normal',
          }}
          placeholder="Ex: 0"
        />
      </NumberInput>
    </Center>
  );
}
