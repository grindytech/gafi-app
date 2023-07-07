import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import { TypeNumberInput } from 'types';
import { TextInputMaxLengthStyle } from './TextInputMaxLength';

type TextInputProps = Omit<TypeNumberInput, 'control' | 'setValue'>;

export default function TextInput({
  register,
  isRequired,
  isInvalid,
  title,
  value,
  placeholder,
}: TextInputProps) {
  return (
    <FormControl
      {...TextInputMaxLengthStyle}
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
          placeholder={placeholder || 'Ex: 0'}
          pr={16}
          {...register(value, { required: isRequired })}
        />
      </Box>
    </FormControl>
  );
}
