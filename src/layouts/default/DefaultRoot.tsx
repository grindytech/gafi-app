import { Box, Container } from '@chakra-ui/react';
import { breakpointsContainer } from 'constants/constants';
import Footer from 'pages/Footer';
import Header from 'pages/Header';
import React, { PropsWithChildren } from 'react';

export default function DefaultMain({ children }: PropsWithChildren) {
  return (
    <Container maxWidth={breakpointsContainer} as="article">
      <Header />

      <Box as="main">{children}</Box>

      <Footer />
    </Container>
  );
}
