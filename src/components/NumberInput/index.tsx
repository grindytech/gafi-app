import {
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput as NumberInputChakra,
  NumberInputField,
} from '@chakra-ui/react';
import { TextInputMaxLengthStyle } from 'components/TextInput/TextInputMaxLength';
import React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface NumberInputProps {
  title: string;
  value: string;
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  isInvalid?: boolean;
  isRequired?: boolean;
  isReset?: boolean;
}

export default function NumberInput({
  register,
  setValue,
  isInvalid,
  isRequired,
  title,
  value,
  isReset,
}: NumberInputProps) {
  const [text, setText] = React.useState<string>('');

  React.useEffect(() => {
    if (isReset) {
      setText('');
    }
  }, [isReset]);

  React.useEffect(() => {
    if (setValue && !text.length) {
      setValue(value, undefined);
    }
  }, [text]);

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

      <NumberInputChakra min={0} value={text}>
        <Input
          as={NumberInputField}
          isRequired={false}
          variant="control"
          placeholder="Ex: 0"
          {...register(value, {
            required: isRequired,
            onChange(event) {
              setText(event.target.value);
            },
            onBlur(event) {
              if (!event.target.value.length && setValue) {
                setValue(value, undefined);
              }
            },
          })}
        />
      </NumberInputChakra>
    </FormControl>
  );
}
