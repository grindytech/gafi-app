import { Box, Button, Heading, Icon, Text } from '@chakra-ui/react';
import { mdiArrowRightThin } from '@mdi/js';

import Card from 'components/card/Card';

const Banner = () => (
  <Card mb={4} sx={bannerStyled}>
    <Box>
      <Heading>Upfront pool</Heading>
      <Text sx={subTitleStyled} fontSize="md">
        Upfront Pool provides upfront-charge services to reduce transaction fees
        and enhance network security.
      </Text>
    </Box>
    <Button
      variant="white"
      rightIcon={
        <Icon color="primary">
          <path fill="currentColor" d={mdiArrowRightThin} />
        </Icon>
      }
    >
      More detail
    </Button>
  </Card>
);

export default Banner;

const bannerStyled = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 200,
  bg: 'url(/assets/layout/upfront-banner-bg.png) no-repeat center',
  backgroundSize: 'cover',
  justifyContent: 'space-between',
  color: 'white',
};

const subTitleStyled = {
  width: '70%',
  mt: 4,
};
