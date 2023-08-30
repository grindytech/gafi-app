import { Center, Icon, Text } from '@chakra-ui/react';
import AddIcon from 'public/assets/line/add.svg';

export default () => {
  return (
    <Center
      mt={2}
      justifyContent="space-between"
      borderRadius="xl"
      bg="shader.a.900"
      px={6}
      py={4}
      gap={2}
    >
      <Text color="shader.a.300" fontSize="sm" fontWeight="medium">
        Add collaborators
      </Text>

      <Icon
        as={AddIcon}
        width={6}
        height={6}
        color="primary.a.300"
        cursor="pointer"
      />
    </Center>
  );
};
