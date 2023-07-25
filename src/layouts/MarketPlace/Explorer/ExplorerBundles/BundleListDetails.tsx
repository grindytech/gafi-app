import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';

interface IProps {
  items: Array<{
    image: string;
    name: string;
    rarity: string;
    id: string;
    quantity: string;
  }>;
}
const BundleListDetails = ({ items }: IProps) => {
  return (
    <CardBox variant="baseStyle" padding={0}>
      <HStack
        px={6}
        py={4}
        borderBottom="0.063rem solid"
        borderColor="shader.a.200"
      >
        <Text fontWeight="medium">Bundle Detail </Text>
        <Text fontSize="sm" fontWeight="medium" color="shader.a.500">
          {items.length} items
        </Text>
      </HStack>
      <Flex
        flexDirection="column"
        gap={6}
        padding={6}
        maxHeight="37.5rem "
        overflowY="scroll"
      >
        {items.map(item => (
          <HStack
            borderRadius="xl"
            justifyContent="space-between"
            key={item.id}
            border="0.063rem solid"
            borderColor="shader.a.300"
            py={3}
            px={4}
          >
            <Flex gap={4}>
              <Image
                borderRadius="lg"
                src={item.image}
                height="48px"
                width="48px"
              />
              <Box display="flex" flexDirection="column">
                <HStack>
                  <Text fontWeight="medium" color="shader.a.900">
                    {item.name}
                  </Text>
                  <Text fontSize="sm" color="shader.a.700">
                    ID: {item.id}
                  </Text>
                </HStack>
                <HStack>
                  <Text fontSize="sm" color="shader.a.500">
                    Rarity
                  </Text>
                  <Text fontSize="sm" fontWeight="medium" color="primary.a.500">
                    {item.rarity}%
                  </Text>
                </HStack>
              </Box>
            </Flex>
            <Text>x{item.quantity}</Text>
          </HStack>
        ))}
      </Flex>
    </CardBox>
  );
};

export default BundleListDetails;
