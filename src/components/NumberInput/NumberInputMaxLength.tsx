import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import { TypeNumberInput } from 'types';
import { NumberInputMaxTextStyle } from './NumberInputMaxText';
import { Controller } from 'react-hook-form';

interface NumberInputMaxLengthProps
  extends Omit<TypeNumberInput, 'register' | 'setValue'> {
  max: number;
}

export default function NumberInputMaxLength({
  control,
  isRequired,
  isInvalid,
  title,
  value,
  max,
}: NumberInputMaxLengthProps) {
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
              placeholder="Ex: 0"
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
