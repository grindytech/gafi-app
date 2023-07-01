import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput as NumberInputChakra,
  NumberInputField,
} from '@chakra-ui/react';

import { TypeNumberInput } from 'types';
import { NumberInputMaxTextStyle } from './NumberInputMaxText';

export default function NumberInput({
  register,
  isRequired,
  isInvalid,
  title,
  value,
}: Omit<TypeNumberInput, 'control' | 'setValue'>) {
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

      <NumberInputChakra min={0}>
        <Input
          as={NumberInputField}
          required={false}
          variant="control"
          placeholder="Ex: 0"
          {...register(value, { required: isRequired })}
        />
      </NumberInputChakra>
    </FormControl>
  );
}
