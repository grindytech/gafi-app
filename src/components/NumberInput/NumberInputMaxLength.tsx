import {
  Center,
  CenterProps,
  FormControl,
  FormLabel,
  Heading,
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
  sx?: CenterProps;
}

export default function NumberInputMaxLength({
  formState,
  heading,
  placeholder,
  sx,
}: NumberInputMaxLengthProps) {
  return (
    <FormControl
      {...TextInputMaxLengthStyle}
      isRequired={formState?.isRequired}
      isInvalid={formState?.isInvalid}
      as={Center}
      className="okfen"
      {...sx}
    >
      {heading ? (
        <FormLabel>
          <Heading variant="game">{heading}</Heading>
        </FormLabel>
      ) : null}

      <Controller
        control={formState.control}
        name={formState.value}
        render={({ field }) => (
          <NumberInput
            width={heading ? undefined : 'full'}
            name={field.name}
            value={field.value || ''}
            max={formState?.max}
            min={formState?.min || 0}
            onChange={event =>
              event.length ? field.onChange(event) : field.onChange(null)
            }
          >
            <NumberInputField
              placeholder={placeholder || 'Ex: 0'}
              maxLength={formState?.max}
              pr={14}
              color="shader.a.900"
              fontSize="sm"
              _placeholder={{
                color: 'shader.a.400',
                fontSize: 'inherit',
              }}
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
