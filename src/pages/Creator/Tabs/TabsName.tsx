import { Text } from '@chakra-ui/react';

interface TabsNameProps {
  name: 'Game' | 'Collection' | 'NFT' | 'Pool';
  amount: number | undefined;
}

export default ({ name, amount }: TabsNameProps) => {
  return (
    <Text display="flex" alignItems="center" gap={2} fontWeight="medium">
      {name}
      <Text
        as="span"
        className="quantity"
        fontSize="xs"
        borderRadius="md"
        px={2}
        py={0.5}
      >
        {amount || 0}
      </Text>
    </Text>
  );
};
