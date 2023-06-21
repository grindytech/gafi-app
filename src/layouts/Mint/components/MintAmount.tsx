import {
  Center,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { NumberInputStyle } from 'components/NumberInput';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface MintAmountProps {
  register: UseFormRegister<FieldValues>;
}

export default function MintAmount({ register }: MintAmountProps) {
  const maxiumLength = 10;
  const min = 0;

  const [currentAmount, setCurrentAmount] = React.useState(min);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading variant="game">
        Amount&nbsp;
        <Text as="span" color="second.red" fontWeight="normal">
          *
        </Text>
      </Heading>

      <Center>
        <NumberInput
          min={min}
          max={maxiumLength}
          defaultValue={0}
          onChange={e => {
            setCurrentAmount(Number(e));
          }}
        >
          <NumberInputField
            {...NumberInputStyle}
            {...register('amount')}
            placeholder="Ex: 0"
          />
          <NumberInputStepper
            px={3}
            justifyContent="center"
            width="auto"
            borderLeft="0.0625rem solid"
            borderColor="shader.a.300"
          >
            <Text as="span" color="shader.a.500" fontSize="sm">
              {currentAmount}/{maxiumLength}
            </Text>
          </NumberInputStepper>
        </NumberInput>
      </Center>
    </CardBox>
  );
}
