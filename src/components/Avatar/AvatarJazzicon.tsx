import { Box, BoxProps } from '@chakra-ui/react';

import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';

interface AvatarJazziconProps {
  address: string;
  sx?: BoxProps;
}

export default function AvatarJazzicon({ address, sx }: AvatarJazziconProps) {
  return (
    <Box title={address} display="inline-flex" as="figure">
      <Jazzicon
        paperStyles={{
          border: '0.09375rem solid',
          borderColor: 'currentColor',
          color: 'transparent',
          borderRadius: '100%',
          width: '2.5rem',
          height: '2.5rem',
          ...sx,
        }}
        svgStyles={{
          width: '100%',
          height: '100%',
        }}
        seed={jsNumberForAddress(address)}
      />
    </Box>
  );
}
