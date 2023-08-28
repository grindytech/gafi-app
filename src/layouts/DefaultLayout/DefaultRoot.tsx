import { Box, Container, Flex } from '@chakra-ui/react';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import { Outlet } from 'react-router-dom';

export default function DefaultMain() {
  const header = '4.5rem';

  return (
    <Flex flexDirection="column" height="100vh">
      <Container as="article">
        <Header />

        <Box as="main" minHeight={`calc(100vh - ${header})`}>
          <Outlet />
        </Box>

        <Footer />
      </Container>
    </Flex>
  );
}
