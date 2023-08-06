import React from 'react';

import { Button, NumberInput, NumberInputField, Stack } from '@chakra-ui/react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';

interface AccountOwnerIncrementProps {
  formState: {
    control: Control<any, any>;
    setValue: UseFormSetValue<any>;
    value: string;
  };
}

export default function AccountOwnerIncrement({
  formState,
}: AccountOwnerIncrementProps) {
  // first value should return 1
  React.useEffect(() => {
    formState.setValue(formState.value, 1);
  }, []);

  return (
    <Stack
      gap={1}
      sx={{
        'button, input': {
          width: '14',
          height: 8,
          minWidth: 'auto',
          border: '0.0625rem solid',
          borderColor: 'shader.a.300',
          borderRadius: 'lg',
          bg: 'white',
          px: 2,
          textAlign: 'center',
        },
      }}
    >
      <Controller
        control={formState.control}
        name={formState.value}
        render={({ field }) => (
          <>
            <Button
              variant="unstyled"
              isDisabled={field.value === 1}
              onClick={() => field.onChange(--field.value)}
            >
              -
            </Button>

            <NumberInput
              name={field.name}
              value={field.value}
              onChange={event =>
                event.length ? field.onChange(event) : field.onChange(1)
              }
            >
              <NumberInputField fontWeight="medium" color="shader.a.900" />
            </NumberInput>

            <Button
              variant="unstyled"
              onClick={() => field.onChange(++field.value)}
            >
              +
            </Button>
          </>
        )}
      />
    </Stack>
  );
}
