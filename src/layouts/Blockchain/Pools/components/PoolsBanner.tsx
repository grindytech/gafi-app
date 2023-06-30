import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import Chevron01Icon from 'public/assets/line/chevron-01.svg';

interface PoolsBannerProps {
  heading:
    | 'Upfront pool'
    | 'Staking Pool'
    | 'Sponsored pool'
    | 'Game creator'
    | 'Deploy Contract';
  body: string;
  detail: string;
}

export default function PoolsBanner({
  heading,
  body,
  detail,
}: PoolsBannerProps) {
  return (
    <Flex
      padding={8}
      whiteSpace="pre-line"
      bg="linear-gradient(87.68deg, #2A7AD7 26.71%, #75B7FF 90.07%)"
      borderRadius="lg"
    >
      <Box flex={1}>
        <Heading fontWeight="bold" color="shader.a.100" fontSize="4xl">
          {heading}
        </Heading>

        <Text mt={3} color="white">
          {body}
        </Text>
      </Box>

      <Button
        as={Link}
        href={detail}
        variant="unstyled"
        display="flex"
        alignItems="center"
        px={6}
        bg="primary.a.500"
        color="white"
        borderRadius="xl"
        fontSize="sm"
        rightIcon={<Chevron01Icon />}
        _hover={{
          textDecoration: 'none',
        }}
      >
        More Details
      </Button>
    </Flex>
  );
}
