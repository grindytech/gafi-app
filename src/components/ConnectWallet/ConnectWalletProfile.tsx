import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import ButtonCopy from 'components/ButtonCopy';

import { shorten } from 'utils/utils';

interface ConnectWalletProfileProps {
  address: string;
  name: string | undefined;
  sx?: FlexProps;
}

export default function ConnectWalletProfile({
  address,
  name,
  sx,
}: ConnectWalletProfileProps) {
  return (
    <Flex gap={4} px={4} py={2} {...sx}>
      <Box width={8} height={8}>
        <AccountJazzicon
          address={address}
          sx={{ width: 'inherit', height: 'inherit' }}
        />
      </Box>

      <Box>
        <Text fontWeight="semibold" lineHeight={1}>
          {name || 'unknown'}
        </Text>

        <Text color="shader.a.500" fontSize="sm">
          {shorten(address, 6)}

          <ButtonCopy
            value={address}
            sx={{
              'aria-label': 'copy-icon',
              ml: 1,
              sx: {
                svg: {
                  width: '1.125rem',
                  height: '1.125rem',
                },
              },
            }}
          />
        </Text>
      </Box>
    </Flex>
  );
}
