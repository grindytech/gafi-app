import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

import { TextInputMaxLengthStyle } from './TextInputMaxLength';
import { UseFormRegister } from 'react-hook-form';

interface TextInputProps {
  title: string;
  value: string;
  register: UseFormRegister<any>;
  isInvalid?: boolean;
  isRequired?: boolean;
  placeholder?: string;
}

export default function TextInput({
  title,
  value,
  register,
  isRequired,
  isInvalid,
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
