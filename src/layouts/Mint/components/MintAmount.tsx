import {
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { NumberInputStyle } from 'components/NumberInput';
import React from 'react';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface MintAmountProps {
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export default function MintAmount({ setValue, watch }: MintAmountProps) {
  const currentAmount = watch('amount');
  const maxiumLength = 10;
  const min = 0;

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading variant="game">Amount</Heading>

      <Center>
        <InputGroup>
          <Input
            {...NumberInputStyle}
            onChange={e => {
              const { value, max, min } = e.target;

              if (Number(value) > Number(max)) {
                return setValue('amount', max);
              }
              if (Number(value) < Number(min)) {
                return setValue('amount', min);
              }

              setValue('amount', value);
            }}
            value={currentAmount}
            max={maxiumLength}
            min={min}
            placeholder="Ex: 0"
          />

          <InputRightAddon bg="transparent">
            <Text as="span" color="shader.a.500" fontSize="sm">
              {currentAmount || min}/{maxiumLength}
            </Text>
          </InputRightAddon>
        </InputGroup>
      </Center>
    </CardBox>
  );
}
