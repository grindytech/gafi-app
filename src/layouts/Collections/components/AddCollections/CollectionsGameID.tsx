import { Center, Heading, Input } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface CollectionsGameIDProps {
  register: UseFormRegister<FieldValues>;
}

export default function CollectionsGameID({
  register,
}: CollectionsGameIDProps) {
  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Game ID</Heading>

      <Input
        {...register('game_id')}
        variant="createGameSubmit"
        placeholder="Ex: 0"
      />
    </CardBox>
  );
}
