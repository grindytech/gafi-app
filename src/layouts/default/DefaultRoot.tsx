import { Box, Container, Flex } from '@chakra-ui/react';

import Footer from 'pages/Footer';
import Header from 'pages/Header';
import React, { PropsWithChildren } from 'react';
import { breakpointsContainer } from 'utils/constants';

export default function DefaultMain({ children }: PropsWithChildren) {
  return (
    <Container maxWidth={breakpointsContainer} as="article">
      <Flex flexDirection="column" height="100vh">
        <Header />

        <Box as="main" flex={1}>
          {children}
        </Box>

        <Footer />
      </Flex>
    </Container>
  );
}
