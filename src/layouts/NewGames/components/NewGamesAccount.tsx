import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import ButtonCopy from 'components/ButtonCopy';
import CardBox from 'components/CardBox';
import React from 'react';
import UserProfileIcon from 'public/assets/header/user-profile.svg';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

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
      <Heading
        as="h3"
        color="primary.a.500"
        fontSize="sm"
        fontWeight="semibold"
      >
        Owner
      </Heading>

      <Flex gap={4} mt={4}>
        <UserProfileIcon />

        <Box>
          <Heading
            as="h6"
            fontSize="md"
            fontWeight="semibold"
            color="shader.a.900"
          >
            {owner}
          </Heading>

          <Text
            fontSize="sm"
            fontWeight="medium"
            color="shader.a.600"
            display="flex"
            gap={1}
          >
            {value}
            <ButtonCopy value={value} />
          </Text>
        </Box>
      </Flex>

      <Divider borderColor="shader.a.300" my={4} />

      <Flex justifyContent="space-between">
        <Heading as="h6">Balance</Heading>

        <Text fontSize="xl" fontWeight="semibold">
          1,499,034.999&nbsp;
          <Text as="span" fontSize="xs" color="primary.a.500">
            GAFI
          </Text>
        </Text>
      </Flex>
    </CardBox>
  );
}
