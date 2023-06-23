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

import { TypeSetValue } from 'types';

interface NumberInputLimitProps {
  setValue: TypeSetValue;
  title: string;
  value: string;
  required?: boolean;
  min: number;
  max: number;
}

export default function NumberInputLimit({
  setValue,
  title,
  value,
  required,
  min,
  max,
}: NumberInputLimitProps) {
  const [currentAmount, setCurrentAmount] = React.useState(min);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading variant="game">
        {title}&nbsp;
        {required && (
          <Text as="span" color="second.red" fontWeight="normal">
            *
          </Text>
        )}
      </Heading>

      <Center>
        <NumberInput
          min={min}
          max={max}
          onChange={e => {
            setCurrentAmount(Number(e));

            setValue(value, Number(e));
          }}
        >
          <NumberInputField {...NumberInputStyle} placeholder="Ex: 0" />

          <NumberInputStepper
            px={3}
            justifyContent="center"
            width="auto"
            borderLeft="0.0625rem solid"
            borderColor="shader.a.300"
          >
            <Text as="span" color="shader.a.500" fontSize="sm">
              {currentAmount}/{max}
            </Text>
          </NumberInputStepper>
        </NumberInput>
      </Center>
    </CardBox>
  );
}
