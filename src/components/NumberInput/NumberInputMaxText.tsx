import {
  Box,
  Center,
  FormControl,
  FormControlProps,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import React from 'react';

import { TypeNumberInput } from 'types';

interface NumberInputMaxTextProps extends Omit<TypeNumberInput, 'setValue'> {
  max: number;
}

export const NumberInputMaxTextStyle: FormControlProps = {
  gap: 4,
  justifyContent: 'space-between',
  alignItems: {
    base: 'unset',
  },
  flexDirection: {
    base: 'column',
    sm: 'row',
  },

  sx: {
    '[title="maxium_length"]': {
      inset: '0 0 0 auto',
      position: 'absolute',
      borderLeft: '0.0625rem solid',
      borderColor: 'shader.a.400',
      px: 2,
      color: 'shader.a.600',
      fontSize: 'sm',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      margin: 0,
    },
  },
};

export default function NumberInputMaxText({
  register,
  isRequired,
  isInvalid,
  title,
  value,
  max,
}: NumberInputMaxTextProps) {
  const [text, setText] = React.useState('');

  return (
    <FormControl
      {...NumberInputMaxTextStyle}
      isRequired={isRequired}
      isInvalid={isInvalid}
      as={Center}
    >
      <FormLabel>
        <Heading variant="game">{title}</Heading>
      </FormLabel>

      <Box position="relative">
        <Input
          variant="control"
          required={false}
          placeholder="Ex: 0"
          pr={16}
          maxLength={max}
          {...register(value, { required: isRequired })}
          onChange={e => setText(e.target.value)}
        />

        <Center title="maxium_length">
          {text.length}/{max}
        </Center>
      </Box>
    </FormControl>
  );
}
