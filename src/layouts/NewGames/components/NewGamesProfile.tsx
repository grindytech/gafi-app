import { Box, Flex, FlexProps, Heading, Text } from '@chakra-ui/react';
import ButtonCopy from 'components/ButtonCopy';
import React from 'react';
import UserProfileIcon from 'public/assets/header/user-profile.svg';

interface NewGamesProfileProps {
  account?: string;
  hash: string;
  sx?: FlexProps;
}

export default function NewGamesProfile({
  account,
  hash,
  sx,
}: NewGamesProfileProps) {
  return (
    <Flex
      gap={{
        base: 2,
        md: 4,
      }}
      flexWrap="wrap"
      {...sx}
    >
      <UserProfileIcon />

      <Box>
        <Heading
          as="h6"
          fontSize="md"
          fontWeight="semibold"
          color="shader.a.900"
        >
          {account || '-'}
        </Heading>

        <Text
          fontSize="sm"
          fontWeight="medium"
          color="shader.a.600"
          gap={1}
          display="flex"
          alignItems={{
            base: 'flex-start',
            sm: 'center',
          }}
        >
          {hash}
          <ButtonCopy value={hash} />
        </Text>
      </Box>
    </Flex>
  );
}
