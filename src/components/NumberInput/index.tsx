import {
  BoxProps,
  Center,
  Heading,
  Input,
  NumberInput as NumberInputChakra,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface NumberInputProps {
  setValue: UseFormSetValue<FieldValues>;
  title: string;
  value: string;
  sx?: BoxProps;
  required?: boolean;
}

export const NumberInputStyle = {
  border: '0.0625rem solid',
  borderColor: 'shader.a.400',
  borderRadius: 'lg',
  color: 'shader.a.900',
  fontWeight: 'medium',
  _placeholder: {
    color: 'shader.a.500',
    fontWeight: 'normal',
  },
};

export default function NumberInput({
  setValue,
  title,
  value,
  sx,
  required,
}: NumberInputProps) {
  return (
    <Center justifyContent="space-between" {...sx}>
      <Heading variant="game">
        {title}&nbsp;
        {required && (
          <Text as="span" color="second.red" fontWeight="normal">
            *
          </Text>
        )}
      </Heading>

      <NumberInputChakra>
        <Input
          {...NumberInputStyle}
          type="number"
          min={0}
          placeholder="Ex: 0"
          onBlur={e => {
            const { value: valueChange } = e.target;

            setValue(value, valueChange);
          }}
        />
      </NumberInputChakra>
    </Center>
  );
}
