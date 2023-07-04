import { Box, Container, Flex } from '@chakra-ui/react';
import Footer from 'layouts/Footer';

import Header from 'layouts/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { breakpointsContainer } from 'utils/constants';

export default function DefaultMain() {
  return (
    <>
      <Flex flexDirection="column" height="100vh">
        <Container maxWidth={breakpointsContainer} as="article">
          <Header />
          <Box as="main" flex={1}>
            <Outlet />
          </Box>
        </Container>
        <Box bg="white" mt="30px">
          <Container maxWidth={breakpointsContainer}>
            <Footer />
          </Container>
        </Box>
      </Flex>
    </>
  );
}
