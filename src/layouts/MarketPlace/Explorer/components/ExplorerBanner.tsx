import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { convertHex } from 'utils/utils';
import { Link } from 'react-router-dom';

export default function ExplorerBanner() {
  const ListButton = [
    {
      text: 'Sell NFTs',
      link: '#',
    },
    {
      text: 'Mint',
      link: '#',
    },
  ];

  return (
    <>
      <Box
        backgroundImage='url("/assets/background/bg-01.png")'
        borderRadius="lg"
        padding={10}
        whiteSpace="pre-line"
      >
        <Heading mt={9} fontWeight="bold" color="shader.a.100" fontSize="4xl">
          {`Buy, sell or mint
          Extraordinary Games NFTs`}
        </Heading>

        <Text mt={0} color={convertHex('#ffffff', 0.75)} fontSize="sm">
          {`Lorem ipsum dolor sit amet consectetur. Diam bibendum justo 
          sollicitudin rutrum. Neque velit commodo.`}
        </Text>

        <Flex gap={4} mt={16}>
          {ListButton.map((button, index) => {
            const isActive = index === 0;

            return (
              <Text
                as={Link}
                px={7}
                py={2.5}
                borderRadius="lg"
                fontSize="sm"
                fontWeight="medium"
                bg={isActive ? 'shader.a.100' : convertHex('#ffffff', 0.15)}
                color={isActive ? 'shader.a.900' : 'shader.a.100'}
                key={button.text}
                to={button.link}
              >
                {button.text}
              </Text>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}
