import { Box, Flex, FlexProps, Text } from '@chakra-ui/react';
import RatioPicture from 'components/RatioPicture';

interface JohnPopoverJSXProps {
  image?: string;
  name?: string;
  id: number;
  onClick?: () => void;
  sx?: FlexProps;
}

export default ({ image, name, id, onClick, sx }: JohnPopoverJSXProps) => {
  return (
    <Flex
      transitionDuration="ultra-slow"
      px={4}
      py={3}
      cursor="pointer"
      gap={2}
      onClick={onClick}
      _hover={{
        bg: 'shader.a.800',
      }}
      {...sx}
    >
      <RatioPicture src={image || null} sx={{ width: 10, height: 10 }} />

      <Box flex={1}>
        <Text fontWeight="medium" color="white">
          {name}
        </Text>

        <Text as="span" fontSize="xs" color="shader.a.400">
          ID: {id}
        </Text>
      </Box>
    </Flex>
  );
};
