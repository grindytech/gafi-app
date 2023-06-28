import React from 'react';
import { Box, Grid, Text, Image, Heading, Flex } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import GafiImg from 'public/assets/art/gaki.svg';
const HeroSection = () => {
  return (
    <CardBox
      background="gradient.linear.1"
      borderBottomLeftRadius="12px"
      borderBottomRightRadius="12px"
      overflow="hidden"
      transform="translateY(-1.5rem)"
    >
      <Flex flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        <Box py={{ md: 16, base: 4 }} px={{ md: 16, base: 4 }}>
          <Heading as="h4" fontSize="2xl" mb={3.5}>
            <Text display="inline-block" color="white">
              Welcome to
            </Text>
            <Text
              ml={2}
              display="inline-block"
              fontWeight="bold"
              color="primary.a.200"
            >
              GAFI APP
            </Text>
          </Heading>
          <Text color=" #FFFFFFBF">
            Lorem ipsum dolor sit amet consectetur. Diam bibendum justo
            sollicitudin rutrum. Neque velit commodo convallis lacus iaculis
            eget nisl odio sagittis.
          </Text>
        </Box>

        <Box
          width="full"
          display="flex"
          justifyContent="end"
          sx={{
            svg: {
              transform: {
                md: 'translate3d(0,20%,0)',
                base: 'translate3d(0,25%,0)',
              },
            },
          }}
        >
          {/*  <Box
            background={
              "url('public/assets/art/gaki.svg') center center no-repeat"
            }
          /> */}
          <GafiImg />
        </Box>
      </Flex>
    </CardBox>
  );
};

export default HeroSection;
