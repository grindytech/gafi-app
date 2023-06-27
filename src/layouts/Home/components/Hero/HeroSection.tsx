import React from 'react';
import { Box, Grid, Text, Image, Heading } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import GafiImg from 'public/assets/art/Gaki.svg';
const HeroSection = () => {
  return (
    <CardBox
      background="gradient.linear.1"
      borderBottomLeftRadius="12px"
      borderBottomRightRadius="12px"
      overflow="hidden"
      transform="translateY(-1.5rem)"
    >
      <Grid
        gridTemplateColumns={{
          sm: 'repeat(1, 1fr)',
          lg: 'repeat(2, 1fr)',
        }}
      >
        <Box py={20} pl={20}>
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
              transform: 'translate3d(0,20%,0)',
            },
          }}
        >
          {/*  <Box
            background={
              "url('public/assets/art/Gaki.svg') center center no-repeat"
            }
          /> */}
          <GafiImg />
        </Box>
      </Grid>
    </CardBox>
  );
};

export default HeroSection;
