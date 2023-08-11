import { Box, Container, Flex } from '@chakra-ui/react';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import { Outlet, ScrollRestoration } from 'react-router-dom';

/**
 * Reset Position scrollbar to top
 * https://reactrouter.com/en/main/components/scroll-restoration
 */

export default function DefaultMain() {
  const header = '4.5rem';

  return (
    <>
      <ScrollRestoration />

      <Flex flexDirection="column" height="100vh">
        <Container as="article">
          <Header />

          <Box as="main" minHeight={`calc(100vh - ${header})`}>
            <Outlet />
          </Box>

          <Footer />
        </Container>
      </Flex>
    </>
  );
}
