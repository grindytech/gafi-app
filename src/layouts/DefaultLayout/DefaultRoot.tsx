import { Box, Container, Flex } from '@chakra-ui/react';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { breakpointsContainer } from 'utils/constants';
/**
 * Reset Position scrollbar to top
 * https://reactrouter.com/en/main/components/scroll-restoration
 */

export default function DefaultMain() {
  return (
    <>
      <ScrollRestoration />
      <Flex flexDirection="column" height="100vh">
        <Container maxWidth={breakpointsContainer} as="article">
          <Header />

          <Box as="main" flex={1}>
            <Outlet />
          </Box>
        </Container>
        <Box bg="white" mt={4}>
          <Container maxWidth={breakpointsContainer} as="article">
            <Footer />
          </Container>
        </Box>
      </Flex>
    </>
  );
}
