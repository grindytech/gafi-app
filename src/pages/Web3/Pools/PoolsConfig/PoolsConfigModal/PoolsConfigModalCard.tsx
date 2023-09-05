import { Box, BoxProps, Center, Icon, Text } from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import RatioPicture from 'components/RatioPicture';
import { convertHex } from 'utils/utils';
import BlockIcon from 'public/assets/line/block.svg';

interface PoolsConfigModalCard {
  image: string | undefined;
  name: string;
  id: number | string;
  amount: string | number | null;
  sx?: BoxProps;
}

export default ({ id, image, name, amount, sx }: PoolsConfigModalCard) => {
  return (
    <Box
      overflow="hidden"
      position="relative"
      borderRadius="xl"
      border="0.125rem solid transparent"
      bg="shader.a.900"
      {...sx}
    >
      <RatioPicture
        src={image ? cloundinary_link(image) : null}
        sx={{ width: 'full' }}
      />

      <Center
        justifyContent="space-between"
        color="white"
        fontWeight="medium"
        py={3}
        px={4}
      >
        <Text>{name}</Text>

        <Text color="shader.a.500" fontSize="sm">
          ID:&nbsp;
          <Text as="span" color="white">
            {id}
          </Text>
        </Text>
      </Center>

      <Center
        borderRadius="md"
        bg={convertHex('#000000', 0.3)}
        px={1.5}
        py={1}
        gap={1}
        color="white"
        backdropFilter="blur(2rem)"
        position="absolute"
        top={0}
        margin={2}
      >
        <Icon as={BlockIcon} width={4} height={4} />

        <Text fontSize="sm" fontWeight="medium">
          {amount ? 'x' + amount : 'Inifnity'}
        </Text>
      </Center>
    </Box>
  );
};
