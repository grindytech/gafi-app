import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import React from 'react';

import { TypeRegister } from 'types';

interface NumberInputProps {
  register: TypeRegister;
  isInvalid?: boolean;
  isRequired?: boolean;
  title: string;
  value: string;
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
  register,
  isRequired,
  isInvalid,
  title,
  value,
}: NumberInputProps) {
  return (
    <FormControl
      as={Center}
      isRequired={isRequired}
      isInvalid={isInvalid}
      justifyContent="space-between"
    >
      <FormLabel margin={0} display="flex" alignItems="center">
        <Heading variant="game">{title}</Heading>
      </FormLabel>

      <Input
        {...NumberInputStyle}
        required={false}
        _focusVisible={{}}
        width="auto"
        min={0}
        placeholder="Ex: 0"
        type="number"
        {...register(
          value,
          isRequired
            ? {
                required: 'Please fill out this field.',
                min: 0,
              }
            : undefined
        )}
      />
    </FormControl>
  );
}
