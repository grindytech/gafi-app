import {
  BoxProps,
  Center,
  Heading,
  Input,
  NumberInput as NumberInputChakra,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface NumberInputProps {
  setValue?: UseFormSetValue<FieldValues>;
  register?: UseFormRegister<FieldValues>;
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
  register,
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
          {...(register ? register(value) : undefined)}
          type="number"
          min={0}
          placeholder="Ex: 0"
          defaultValue={0}
          onBlur={
            setValue
              ? e => {
                  const { value: valueChange } = e.target;

                  setValue(value, valueChange);
                }
              : undefined
          }
        />
      </NumberInputChakra>
    </Center>
  );
}
