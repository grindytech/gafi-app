import {
  Center,
  Heading,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface MintCollectionProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function MintCollection({ setValue }: MintCollectionProps) {
  const maxiumLength = 10;
  const [text, setText] = useState<number>(0);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Collection ID</Heading>

      <Center>
        <InputGroup>
          <NumberInput
            onBlur={e => {
              const { value, ariaValueMax } = e.currentTarget;

              Number(value) >= Number(ariaValueMax)
                ? setText(Number(ariaValueMax))
                : setText(Number(value));

              setValue('collection_id', text);
            }}
            min={0}
            max={maxiumLength}
          >
            <NumberInputField />
          </NumberInput>
          <InputRightAddon bg="transparent">
            <Text as="span" color="shader.a.500" fontSize="sm">
              {text}/{maxiumLength}
            </Text>
          </InputRightAddon>
        </InputGroup>
      </Center>
    </CardBox>
  );
}
