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
import NextIcon from 'public/assets/line/chevron-01.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { useRef } from 'react';
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
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
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
              <Box position="relative">
                <Swiper
                  // install Swiper modules
                  spaceBetween={20}
                  slidesPerView={4}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current!,
                    nextEl: nextRef.current!,
                  }}
                  onInit={swiper => {
                    //  @typescript-eslint/ban-ts-comment
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // eslint-disable-next-line no-param-reassign
                    setTimeout(() => {
                      // Override prevEl & nextEl now that refs are defined
                      //  @typescript-eslint/ban-ts-comment
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      // eslint-disable-next-line no-param-reassign
                      swiper.params.navigation.prevEl = prevRef.current;
                      //  @typescript-eslint/ban-ts-comment
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      // eslint-disable-next-line no-param-reassign
                      swiper.params.navigation.nextEl = nextRef.current;

                      // Re-init navigation
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    });
                  }}
                  breakpoints={{
                    450: {
                      slidesPerView: 1,
                    },
                    630: {
                      slidesPerView: 2,
                    },
                    920: {
                      slidesPerView: 3,
                    },
                    1232: {
                      slidesPerView: 4,
                    },
                    1520: {
                      slidesPerView: 4,
                    },
                  }}
                  style={{
                    position: 'relative',
                  }}
                >
                  {TestData.map(item => (
                    <SwiperSlide key={item.name}>
                      <CardTypeOne item={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  position="absolute"
                  sx={{
                    top: '50%',
                    zIndex: 10,
                  }}
                >
                  <Button
                    ref={prevRef}
                    variant="navigation"
                    sx={{
                      left: '-20px',
                    }}
                  >
                    <Icon
                      as={NextIcon}
                      height={6}
                      w={6}
                      transform="rotate(90deg)"
                    />
                  </Button>
                  <Button
                    ref={nextRef}
                    variant="navigation"
                    sx={{
                      right: '-20px',
                    }}
                  >
                    <Icon
                      as={NextIcon}
                      height={6}
                      w={6}
                      transform="rotate(-90deg)"
                    />
                  </Button>
                </Box>
              </Box>
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
