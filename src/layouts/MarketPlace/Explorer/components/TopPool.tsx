import { Box, Flex, HStack, Link, Text, Icon, Button } from '@chakra-ui/react';
import React from 'react';

import GameIcon from 'public/assets/line/game.svg';
import ArrowIcon from 'public/assets/line/chevron-02.svg';
interface IProps {
  image: string;
  name: string;
  id: string;
  minted: string;
  volume: string;
}
const TestData: IProps[] = [
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
  },
  {
    image:
      'https://cdn.tgdd.vn/Files/2020/12/26/1316151/overwatchdangduocmienphi4-_1920x1080-800-resize.jpg',
    name: 'Overwatch: Gun',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Rush War: Gun & Gear',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
  },
  {
    image:
      'https://img-cdn.2game.vn/pictures/xemgame/2019/08/27/rush-war-1.jpg',
    name: 'Call Of Duty 2027',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'SoG: Weapon',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
  },
  {
    image:
      'https://img-cdn.2game.vn/pictures/xemgame/2019/08/27/rush-war-1.jpg',
    name: 'Azuki 2020',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Azuki 2020',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
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
          color={'#D946EF'}
        >
          <Flex gap={3} alignItems="center">
            <Icon as={GameIcon} height="1.5rem" width="1.5rem" />
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
                  height="1.25rem"
                  width="1.25rem"
                />
              }
            >
              more
            </Button>
          </Link>
        </HStack>
        <Box></Box>
      </Box>
    </>
  );
};

export default TopPool;
