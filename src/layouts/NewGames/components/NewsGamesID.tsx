import { Center, Heading, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface NewsGamesIDProps {
  setValue: UseFormSetValue<FieldValues>;
}
export default function NewsGamesID({ setValue }: NewsGamesIDProps) {
  const id = 0;

  setValue('games_id', id);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Games ID</Heading>

      <Text fontWeight="medium" color="shader.a.900">
        {id}
      </Text>
    </CardBox>
  );
}
