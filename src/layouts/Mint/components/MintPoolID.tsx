import { Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface MintPoolIDProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function MintPoolID({ setValue }: MintPoolIDProps) {
  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Pool ID</Heading>

      <Input
        onBlur={e => {
          const { value } = e.target;

          setValue('pool_id', value);
        }}
        min={0}
        variant="createGameSubmit"
        placeholder="Ex: 0"
      />
    </CardBox>
  );
}
