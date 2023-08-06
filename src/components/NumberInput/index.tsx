import {
  Center,
  CenterProps,
  FormControl,
  FormLabel,
  Heading,
  NumberInput as NumberInputChakra,
  NumberInputField,
} from '@chakra-ui/react';

import { Control, Controller } from 'react-hook-form';

interface NumberInputProps {
  formState: {
    control: Control<any, any>;
    value: string;
    isInvalid?: boolean;
    isRequired?: boolean;
    max?: number;
  };
  heading?: string;
  placeholder?: string;
  sx?: CenterProps;
}

export default function NumberInput({
  formState,
  placeholder,
  heading,
  sx,
}: NumberInputProps) {
  const isEmpty = '';

  return (
    <FormControl
      justifyContent="space-between"
      isRequired={formState?.isRequired}
      isInvalid={formState?.isInvalid}
      as={Center}
      {...sx}
    >
      {heading ? (
        <FormLabel display="flex" margin={0}>
          <Heading variant="game">{heading}</Heading>
        </FormLabel>
      ) : null}

      <Controller
        control={formState.control}
        name={formState.value}
        render={({ field }) => (
          <NumberInputChakra
            borderColor="shader.a.300"
            width={heading ? undefined : 'full'}
            name={field.name}
            value={field.value || isEmpty} // reset should empty value
            max={formState?.max}
            onChange={event =>
              event.length ? field.onChange(event) : field.onChange(null)
            }
          >
            <NumberInputField
              placeholder={placeholder || 'Ex: 0'}
              pr={14}
              color="shader.a.900"
              fontSize="sm"
              _placeholder={{
                color: 'shader.a.400',
                fontSize: 'inherit',
              }}
            />
          </NumberInputChakra>
        )}
        rules={{
          required: formState?.isRequired,
        }}
      />
    </FormControl>
  );
}
