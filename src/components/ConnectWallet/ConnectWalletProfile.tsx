import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
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
      <Box>
        <AvatarJazzicon
          address={address}
          sx={{ width: 'inherit', height: 'inherit' }}
        />
      </Box>

      <Box>
        <Text fontWeight="semibold" lineHeight={1}>
          {name || 'unknown'}
        </Text>

        <Text gap={2} display="flex" color="shader.a.500" fontSize="sm">
          {shorten(address, 6)}

          <ButtonCopy
            value={address}
            sx={{
              'aria-label': 'copy-icon',

              sx: {
                svg: { width: '1.125rem', height: '1.125rem' },
              },
            }}
          />
        </Text>
      </Box>
    </Flex>
  );
}
