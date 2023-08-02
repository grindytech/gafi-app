import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import { Control, Controller } from 'react-hook-form';
import { TextInputMaxLengthStyle } from 'components/TextInput/TextInputMaxLength';

interface NumberInputMaxLengthProps {
  formState: {
    control: Control<any, any>;
    value: string;
    isInvalid?: boolean;
    isRequired?: boolean;
    max?: number;
    min?: number;
  };
  placeholder?: string;
  heading?: string;
}

export default function NumberInputMaxLength({
  formState,
  heading,
  placeholder,
}: NumberInputMaxLengthProps) {
  return (
    <FormControl
      {...TextInputMaxLengthStyle}
      isRequired={formState?.isRequired}
      isInvalid={formState?.isInvalid}
      as={Center}
    >
      <FormLabel>
        <Heading variant="game">{heading}</Heading>
      </FormLabel>

      <Controller
        control={formState.control}
        name={formState.value}
        render={({ field }) => (
          <NumberInput
            name={field.name}
            value={field.value || ''}
            max={formState?.max}
            min={formState?.min || 0}
            onChange={field.onChange}
          >
            <Input
              as={NumberInputField}
              variant="control"
              required={false}
              placeholder={placeholder || 'Ex: 0'}
              pr={16}
              maxLength={formState?.max}
            />

            <Center title="maxium_length">
              {field.value || 0}/{formState?.max}
            </Center>
          </NumberInput>
        )}
        rules={{
          required: formState?.isRequired,
        }}
      />
    </FormControl>
  );
}
