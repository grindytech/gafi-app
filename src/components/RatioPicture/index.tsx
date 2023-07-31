import { Center, CenterProps, Image } from '@chakra-ui/react';

interface RatioPictureProps {
  src: string | null;
  alt?: string | number;
  sx?: CenterProps;
}

export default function RatioPicture({ src, alt, sx }: RatioPictureProps) {
  return (
    <Center
      padding={2}
      pt={(9 / 16) * 100 + '%'} // 16:9 Aspect Ratio
      position="relative"
      overflow="hidden"
      borderRadius="lg"
      {...sx}
    >
      <Image
        inset={0}
        position="absolute"
        bg="shader.a.300"
        width="full"
        height="full"
        borderRadius="inherit"
        objectFit={src ? 'cover' : 'none'}
        src={src || '/assets/fill/item.png'}
        alt={`image-outdated-${alt}`}
      />
    </Center>
  );
}
