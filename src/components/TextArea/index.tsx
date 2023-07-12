import {
  FormControl,
  FormLabel,
  Heading,
  Textarea as TextareaChakra,
} from '@chakra-ui/react';
import { TextInputMaxLengthStyle } from 'components/TextInput/TextInputMaxLength';
import { UseFormRegister } from 'react-hook-form';

interface TextAreaProps {
  value: string;
  register: UseFormRegister<any>;
  isInvalid?: boolean;
  isRequired?: boolean;
  placeholder?: string;
}

export default function TextArea({
  register,
  value,
  isInvalid,
  isRequired,
  placeholder,
}: TextAreaProps) {
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
