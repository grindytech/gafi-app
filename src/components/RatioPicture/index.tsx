import {
  AspectRatio,
  AspectRatioProps,
  Box,
  Icon,
  Image,
} from '@chakra-ui/react';

import ItemIcon from 'public/assets/fill/item.svg';

interface RatioPictureProps {
  src: string | null;
  alt?: string | number;
  sx?: AspectRatioProps;
}

export default function RatioPicture({ src, alt, sx }: RatioPictureProps) {
  return (
    <Box {...sx}>
      <AspectRatio
        ratio={16 / 9}
        padding={2}
        bg="shader.a.800"
        borderRadius="lg"
        width="full"
        height="full"
      >
        {src ? (
          <Image
            objectFit="cover"
            borderRadius="inherit"
            src={src}
            alt={`${alt}`}
          />
        ) : (
          <Box>
            <Icon color="shader.a.700" width={10} height={10} as={ItemIcon} />
          </Box>
        )}
      </AspectRatio>
    </Box>
  );
}
