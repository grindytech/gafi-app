import {
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface MintAmountProps {
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export default function MintAmount({ setValue, watch }: MintAmountProps) {
  const maxiumLength = 10;
  const currentAmount = watch('amount');

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Amount</Heading>

      <Center>
        <InputGroup>
          <Input
            id="input"
            onBlur={e => {
              const { value, min, max } = e.target;

              if (Number(value) < Number(min)) {
                return setValue('amount', Number(min));
              }
              if (Number(value) > Number(max)) {
                return setValue('amount', Number(max));
              }

              setValue('amount', Number(value));
            }}
            max={maxiumLength}
            min={0}
            variant="createGameSubmit"
            placeholder="Ex: 0"
          />

          <InputRightAddon bg="transparent">
            <Text as="span" color="shader.a.500" fontSize="sm">
              {currentAmount || 0}/{maxiumLength}
            </Text>
          </InputRightAddon>
        </InputGroup>
      </Center>
    </CardBox>
  );
}
