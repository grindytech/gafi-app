import { Box, Container, Flex } from '@chakra-ui/react';
import Footer from 'layouts/Footer';

import Header from 'layouts/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { breakpointsContainer } from 'utils/constants';

export default function DefaultMain() {
  return (
    <Container maxWidth={breakpointsContainer} as="article">
      <Flex flexDirection="column" height="100vh">
        <Header />

        <Box as="main" flex={1}>
          <Outlet />
        </Box>

        <Footer />
      </Flex>
    </Container>
  );
}
