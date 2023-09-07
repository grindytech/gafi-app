import { Center, Icon, Text } from '@chakra-ui/react';
import ServicesIcon from 'public/assets/services.svg';

export default () => {
  return (
    <Center
      gridColumn="span 4"
      flexDirection="column"
      height="50vh"
      fontWeight="medium"
      color="shader.a.500"
      gap={1}
    >
      <Icon as={ServicesIcon} width={16} height={16} />

      <Text>Empty data</Text>
    </Center>
  );
};
