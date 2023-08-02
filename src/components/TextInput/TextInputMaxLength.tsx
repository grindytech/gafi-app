import {
  Center,
  FormControl,
  FormControlProps,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';

import { Control, Controller } from 'react-hook-form';

interface TextInputMaxLengthProps {
  formState: {
    control: Control<any, any>;
    value: string;
    isInvalid?: boolean;
    isRequired?: boolean;
    max?: number;
  };
  heading?: string;
  placeholder?: string;
}

export const TextInputMaxLengthStyle: FormControlProps = {
  gap: 4,
  justifyContent: 'space-between',
  alignItems: {
    base: 'unset',
  },
  flexDirection: {
    base: 'column',
    sm: 'row',
  },

  sx: {
    '[title="maxium_length"]': {
      inset: '0 0 0 auto',
      position: 'absolute',
      borderLeft: '0.0625rem solid',
      borderColor: 'shader.a.400',
      px: 2,
      color: 'shader.a.600',
      fontSize: 'sm',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      margin: 0,
    },
  },
};

export default function TextInputMaxLength({
  placeholder,
  formState,
  heading,
}: TextInputMaxLengthProps) {
  return (
    <FormControl
      justifyContent="space-between"
      isRequired={formState?.isRequired}
      isInvalid={formState?.isInvalid}
      as={Center}
    >
      {heading ? (
        <FormLabel display="flex" margin={0}>
          <Heading variant="game">{heading}</Heading>
        </FormLabel>
      ) : null}

      {formState?.control && (
        <Controller
          control={formState.control}
          name={formState.value}
          render={({ field }) => (
            <InputGroup
              borderColor="shader.a.300"
              width={heading ? 'unset' : '100%'}
            >
              <Input
                name={field.name}
                value={field.value || ''} // reset should empty value
                max={formState?.max}
                onKeyDown={event => {
                  if (event.nativeEvent.key !== 'Backspace') {
                    if (field.value?.length >= Number(formState?.max)) {
                      return event.preventDefault();
                    }
                  }
                }}
                onChange={({ target }) =>
                  target.value?.length
                    ? field.onChange(target.value)
                    : field.onChange(null)
                }
                width={heading ? 'auto' : '100%'}
                placeholder={placeholder || 'Ex: 0'}
                color="shader.a.900"
                fontSize="sm"
                _placeholder={{
                  color: 'shader.a.400',
                  fontSize: 'inherit',
                }}
              />

              {formState?.max ? (
                <InputRightAddon bg="transparent">
                  {field.value?.length || '0'}/{formState.max}
                </InputRightAddon>
              ) : null}
            </InputGroup>
          )}
          rules={{
            required: formState?.isRequired,
          }}
        />
      )}
    </FormControl>
  );
}
