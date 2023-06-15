import { Box, Divider, Flex, Heading } from '@chakra-ui/react';

import CardBox from 'components/CardBox';
import React from 'react';

import { FieldValues, UseFormSetValue } from 'react-hook-form';
import NewGamesProfile from './NewGamesProfile';
import GafiAmount from 'components/GafiAmount';

interface NewGamesAccountProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function NewGamesAccount({ setValue }: NewGamesAccountProps) {
  const value = '5DPA2URG1G8....ScaFqiuu3hb9';
  const owner = 'Alex Pham';

  setValue('owner', {
    account: owner,
    hash: value,
  });

  return (
    <CardBox variant="createGames" padding={6}>
      <Box>
        <Heading
          as="h3"
          color="primary.a.500"
          fontSize="sm"
          fontWeight="semibold"
          mb={4}
        >
          Owner
        </Heading>

        <NewGamesProfile account={owner} hash={value} />
      </Box>

      <Divider borderColor="shader.a.300" my={4} />

      <Flex justifyContent="space-between">
        <Heading as="h6">Balance</Heading>

        <GafiAmount amount="1,499,034.999" />
      </Flex>
    </CardBox>
  );
}
