import { Box, Container } from '@chakra-ui/react';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import { Outlet } from 'react-router-dom';
import { breakpointsContainer } from 'utils/constants';

export default function DefaultMain() {
  const header = '4.5rem';

  return (
    <Container maxWidth={breakpointsContainer} as="article">
      <Header />

      <Box as="main" minHeight={`calc(100vh - ${header})`}>
        <Outlet />
      </Box>

      <Footer />
    </Container>
  );
}
