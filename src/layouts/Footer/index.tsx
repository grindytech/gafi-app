import { Center, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Text
      py={3.5}
      as={Center}
      fontSize="sm"
      gap={1}
      color="shader.a.900"
      fontWeight="350"
    >
      © 2023 Powered by
      <Text as="span" color="primary.a.500" fontWeight="medium">
        Grindy Technologies
      </Text>
    </Text>
  );
}
