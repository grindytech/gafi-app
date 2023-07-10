import { Flex, Text } from '@chakra-ui/react';
import DataResult from 'layouts/MarketPlace/Explorer/DataResult';

const Activities = () => {
  return (
    <>
      <Flex direction="column" gap={4} color="shader.a.900" width="full">
        <Text fontWeight="medium" lineHeight="1.5rem">
          Total 150 Projects
        </Text>
        <DataResult />
      </Flex>
    </>
  );
};

export default Activities;
