import { BoxProps, Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface PoolsCreateDynamicInputProps {
  setValue: UseFormSetValue<FieldValues>;
  title: string;
  value: string;
  sx?: BoxProps;
}

export default function PoolsCreateDynamicInput({
  setValue,
  title,
  value,
  sx,
}: PoolsCreateDynamicInputProps) {
  return (
    <CardBox
      as={Center}
      variant="createGames"
      justifyContent="space-between"
      {...sx}
    >
      <Heading variant="game">{title}</Heading>

      <Input
        onBlur={e => {
          const { value: valueChange } = e.target;

          setValue(value, valueChange);
        }}
        min={0}
        variant="createGameSubmit"
        placeholder="Ex: 0"
      />
    </CardBox>
  );
}
