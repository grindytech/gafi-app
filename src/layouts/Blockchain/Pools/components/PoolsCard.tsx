import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { PoolsItemProps } from '../index';

interface PoolsCardProps {
  item: PoolsItemProps[];
}

export default function PoolsCard({ item }: PoolsCardProps) {
  return (
    <Flex gap={4}>
      {item.map(element => (
        <Box
          key={element.type}
          bg="gray.400"
          borderRadius="xl"
          padding={6}
          textAlign="center"
          flex={1}
        >
          <Heading
            as="h6"
            bg="shader.a.800"
            padding={16}
            fontSize="3xl"
            color="white"
            fontWeight="bold"
            borderRadius="2xl"
          >
            {element.type}
          </Heading>

          <Box my={10}>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              Discount fee {element.discount}%
            </Text>

            <Text color="white">
              {`Rate: ${element.rate.txLimit} transactions / ${element.rate.minute} minutes`}
            </Text>

            <Text color="white">
              {`Fee: ${element.fee.gaki} GAKI / ${element.fee.minute} minutes`}
            </Text>
          </Box>

          <Button
            variant="unstyled"
            bg="primary.a.500"
            color="white"
            fontWeight="bold"
            width="full"
            borderRadius="lg"
          >
            Join
          </Button>
        </Box>
      ))}
    </Flex>
  );
}
