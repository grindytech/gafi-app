import { Box, Flex, HStack, Link, Text, Icon, Button } from '@chakra-ui/react';
import React from 'react';

import GameIcon from 'public/assets/line/game.svg';
import ArrowIcon from 'public/assets/line/chevron-02.svg';
import Carousel from 'components/Carousel/Carousel';
import CardTypeTwo from 'components/ProductCard/CardTypeTwo';
import { SwiperSlide } from 'swiper/react';
export interface TestDataProps2 {
  image: string;
  name: string;
  id: string;
  minted: string;
  volume: string;
  price: string;
  isVerified?: boolean;
}
const TestData: TestDataProps2[] = [
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '100',
    isVerified: true,
  },
  {
    image:
      'https://cdn.tgdd.vn/Files/2020/12/26/1316151/overwatchdangduocmienphi4-_1920x1080-800-resize.jpg',
    name: 'Overwatch: Gun',
    id: '17',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '200',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Rush War: Gun & Gear',
    id: '18',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://img-cdn.2game.vn/pictures/xemgame/2019/08/27/rush-war-1.jpg',
    name: 'Call Of Duty 2027',
    id: '19',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'SoG: Weapon',
    id: '20',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://img-cdn.2game.vn/pictures/xemgame/2019/08/27/rush-war-1.jpg',
    name: 'Azuki 2020',
    id: '21',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Azuki 2020',
    id: '22',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '23',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '24',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
];
const TopPool = () => {
  return (
    <>
      <Box mt={4}>
        <HStack
          mt={10} //test
          justifyContent="space-between"
          spacing={0}
          position="sticky"
          left={0}
        >
          <Flex gap={3} alignItems="center">
            <Icon as={GameIcon} height={6} width={6} color="#D946EF" />
            <Text color="shader.a.900" fontWeight="semibold" fontSize="xl">
              Top Pools
            </Text>
          </Flex>

          <Link href="#">
            <Button
              variant="more"
              fontSize="sm"
              rightIcon={
                <Icon
                  as={ArrowIcon}
                  transform="rotate(180deg)"
                  color="primary.a.500"
                  height={5}
                  width={5}
                />
              }
            >
              more
            </Button>
          </Link>
        </HStack>
        <Box mt={5}>
          <Carousel>
            {TestData.map(item => (
              <SwiperSlide key={item.id}>
                <CardTypeTwo item={item} />
              </SwiperSlide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </>
  );
};

export default TopPool;
