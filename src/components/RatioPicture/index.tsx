import { AspectRatio, AspectRatioProps, Image } from '@chakra-ui/react';

interface RatioPictureProps {
  src: string | null;
  alt?: string | number;
  sx?: AspectRatioProps;
}

export default function RatioPicture({ src, alt, sx }: RatioPictureProps) {
  return (
    <AspectRatio
      ratio={16 / 9}
      padding={2}
      bg="shader.a.300"
      borderRadius="lg"
      sx={{
        img: { objectFit: src ? 'cover' : 'none' },
      }}
      {...sx}
    >
      <Image
        borderRadius="inherit"
        src={src || '/assets/fill/item.png'}
        alt={`${alt}`}
      />
    </AspectRatio>
  );
}
