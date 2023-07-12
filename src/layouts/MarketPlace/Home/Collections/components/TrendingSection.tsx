import {
  Box,
  Button,
  HStack,
  Icon,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import CardTypeOne from 'components/ProductCard/CardTypeOne';
import ArrowIcon from 'public/assets/line/chevron-02.svg';
import { SwiperSlide } from 'swiper/react';
import Carousel from 'components/Carousel/Carousel';
import { TestDataCollections } from 'layouts/MarketPlace/Explorer/DataTest';

const TrendingSection = () => {
  return (
    <>
      <Box pt={6} borderTop="0.063rem solid" borderColor="shader.a.300">
        <Tabs variant="unstyled">
          <HStack justifyContent="space-between">
            <TabList gap={4} flexWrap="wrap">
              <Tab>Hot Games</Tab>
              <Tab>Hot Collections</Tab>
              <Tab>Hot NFTs</Tab>
            </TabList>
            <Link href="#">
              <Button
                variant="more"
                fontSize="sm"
                rightIcon={
                  <Icon
                    as={ArrowIcon}
                    transform="rotate(180deg)"
                    color="primary.a.500"
                    height="1.25rem"
                    width="1.25rem"
                  />
                }
              >
                more
              </Button>
            </Link>
          </HStack>

          <TabPanels>
            <TabPanel px={0}>
              <Carousel>
                {TestDataCollections.map(item => (
                  <SwiperSlide key={item.id}>
                    <CardTypeOne item={item} />
                  </SwiperSlide>
                ))}
              </Carousel>
            </TabPanel>
            <TabPanel>Hot Games</TabPanel>
            <TabPanel>Hots NFTS</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default TrendingSection;
