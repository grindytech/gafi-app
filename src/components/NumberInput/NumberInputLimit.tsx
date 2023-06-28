import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { NumberInputStyle } from 'components/NumberInput';
import React from 'react';

import { TypeRegister } from 'types';

interface NumberInputLimitProps {
  register: TypeRegister;
  isRequired?: boolean;
  isInvalid: boolean;
  title: string;
  value: string;
  min: number;
  max: number;
}

export default function NumberInputLimit({
  register,
  isRequired,
  isInvalid,
  title,
  value,
  min,
  max,
}: NumberInputLimitProps) {
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

      <InputGroup width="auto">
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
                  min,
                  max,
                }
              : undefined
          )}
        />
        <InputRightAddon bg="transparent" borderColor="shader.a.400">
          {max}
        </InputRightAddon>
      </InputGroup>
    </FormControl>
  );
}
