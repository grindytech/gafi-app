import {
  BoxProps,
  Center,
  Heading,
  Input,
  NumberInput as NumberInputChakra,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import { TypeRegister, TypeSetValue } from 'types';

interface NumberInputProps {
  setValue?: TypeSetValue;
  register?: TypeRegister;
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
  required,
}: NumberInputProps) {
  return (
    <Center justifyContent="space-between">
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
          placeholder="Ex: 0"
          type="number"
          min={0}
          {...(register ? register(value) : undefined)}
          onBlur={e => {
            const { value: valueChange } = e.target;

            if (setValue) {
              if (!valueChange.length) return setValue(value, undefined);

              setValue(value, Number(valueChange));
            }
          }}
        />
      </NumberInputChakra>
    </Center>
  );
}
