import { Box, Flex, FlexProps, Heading, Text } from '@chakra-ui/react';
import ButtonCopy from 'components/ButtonCopy';

import { shorten } from 'utils/utils';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';

interface AuthorizeProfileProps {
  account: string;
  hash: string;
  shortenLength?: number;
  sx?: FlexProps;
}

export default function AuthorizeProfile({
  account,
  hash,
  shortenLength = 12,
  sx,
}: AuthorizeProfileProps) {
  return (
    <Flex
      gap={{
        base: 2,
        md: 4,
      }}
      flexWrap="wrap"
      {...sx}
    >
      <AccountJazzicon address={hash} />

      <Box>
        <Heading
          as="h6"
          fontSize="md"
          fontWeight="semibold"
          color="shader.a.900"
        >
          {account}
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
          {shorten(hash, shortenLength)}
          <ButtonCopy value={hash} />
        </Text>
      </Box>
    </Flex>
  );
}
