import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import RatioPicture from 'components/RatioPicture';
import CloseIcon from 'public/assets/fill/close.svg';

interface JohnProps {
  image?: string | null;
  name: string;
  id: number;
  remove?: () => void;
}

export default ({ image, name, id, remove }: JohnProps) => {
  return (
    <Flex
      position="relative"
      display="inline-flex"
      gap={2}
      padding={2}
      paddingRight={20}
      borderRadius="xl"
      bg="shader.a.800"
    >
      <RatioPicture
        src={image ? cloundinary_link(image) : null}
        sx={{ width: 10 }}
      />

      <Box>
        <Text fontSize="sm" color="white" fontWeight="medium" lineHeight={4}>
          {name}
        </Text>

        <Text as="span" fontSize="xs" color="shader.a.400">
          ID: {id}
        </Text>
      </Box>

      <Box
        position="absolute"
        inset="0 auto auto 0"
        transform="translate(-25%, -25%)"
        onClick={remove}
      >
        <Icon as={CloseIcon} width={4} height={4} color="shader.a.300" />
      </Box>
    </Flex>
  );
};
