import {
  FormControl,
  FormLabel,
  Heading,
  Textarea as TextareaChakra,
} from '@chakra-ui/react';
import { TextInputMaxLengthStyle } from 'components/TextInput/TextInputMaxLength';

import { TypeNumberInput } from 'types';

export default function TextArea({
  register,
  value,
  isInvalid,
  isRequired,
  placeholder,
}: Omit<TypeNumberInput, 'setValue' | 'title' | 'control'>) {
  return (
    <>
      <FormControl
        {...TextInputMaxLengthStyle}
        isRequired={isRequired}
        isInvalid={isInvalid}
      >
        <FormLabel>
          <Heading variant="game">Description</Heading>
        </FormLabel>

        <TextareaChakra
          {...register(value, { required: isRequired })}
          mt={4}
          required={false}
          resize="none"
          placeholder={placeholder || 'Write about your project.'}
        />
      </FormControl>
    </>
  );
}
