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
  title: string;
  value: string;
  control: Control<any, any>;
  isInvalid?: boolean;
  isRequired?: boolean;
  max: number;
  placeholder?: string;
}

export default function NumberInputMaxLength({
  control,
  isRequired,
  isInvalid,
  title,
  value,
  max,
  placeholder,
}: NumberInputMaxLengthProps) {
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

      <Controller
        control={control}
        name={value}
        render={({ field }) => (
          <NumberInput
            name={field.name}
            value={field.value}
            max={max}
            onChange={field.onChange}
          >
            <Input
              as={NumberInputField}
              variant="control"
              required={false}
              placeholder={placeholder || 'Ex: 0'}
              pr={16}
              maxLength={max}
            />

            <Center title="maxium_length">
              {field.value || 0}/{max}
            </Center>
          </NumberInput>
        )}
        rules={{
          required: isRequired,
        }}
      />
    </FormControl>
  );
}
