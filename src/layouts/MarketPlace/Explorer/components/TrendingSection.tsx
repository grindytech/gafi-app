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
export interface TestPropsType1 {
  image: string;
  name: string;
  floor: string;
  volume: string;
  isVerified?: boolean;
}
const TestData: TestPropsType1[] = [
  /*   {
    image:
      'https://i.seadn.io/s/production/c0f1c70c-d930-47f3-8d4f-0513d9aa288b.png?w=500&auto=format',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
  {
    image:
      'https://i.seadn.io/gcs/files/f0613a60a26a9241b85456ad2b68673b.jpg?auto=format&dpr=1&h=500',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  }, */
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRibpCPA7GQED-pJueP6IzIEUAp-nmwg033g&usqp=CAU',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
  {
    image:
      'https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
  },
];
const TrendingSection = () => {
  return (
    <>
      <Box py={4} borderTop="0.063rem solid" borderColor="shader.a.300" mt={4}>
        <Tabs variant="unstyled">
          <HStack justifyContent="space-between">
            <TabList gap={4}>
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
                {TestData.map(item => (
                  <SwiperSlide key={item.name}>
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
