import React from 'react';

import ExplorerIcon from 'public/assets/line/compass.svg';
import GameIcon from 'public/assets/line/game.svg';
import Collection02Icon from 'public/assets/line/collection-02.svg';
import NFTSIcon from 'public/assets/line/nfts.svg';
import PoolsIcon from 'public/assets/line/pools.svg';
import PickaxeIcon from 'public/assets/line/pickaxe.svg';

import { Center, Icon, List, ListItem, Text } from '@chakra-ui/react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import Explorer from 'layouts/MarketPlace/Explorer';
import Games from 'layouts/MarketPlace/Games';
export const ListMarketPlace = [
  {
    icon: ExplorerIcon,
    text: 'Explorer',
    link: 'explorer',
    element: <Explorer />,
  },
  {
    icon: GameIcon,
    text: 'Games',
    link: 'games',
    element: <Games />,
  },
  {
    icon: Collection02Icon,
    text: 'Collections',
    link: 'collections',
  },
  {
    icon: NFTSIcon,
    text: 'NFTs',
    link: 'nfts',
  },
  {
    icon: PoolsIcon,
    text: 'Pools',
    link: 'pools',
  },
  {
    icon: PickaxeIcon,
    text: 'Minting',
    link: 'mining',
  },
];

export default function MarketPlace() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (pathname === '/marketplace') {
      navigate('/marketplace/explorer');
    }
  }, [pathname]);

  return (
    <>
      <List display="flex" gap={3} mb={6} flexWrap="wrap">
        {ListMarketPlace.map(market => {
          const isActive = pathname.includes(market.link);

          return (
            <ListItem key={market.text}>
              <Center
                as={Link}
                to={market.link}
                px={4}
                py={2.5}
                gap={2}
                color={isActive ? 'white' : 'shader.a.900'}
                bg={isActive ? 'primary.a.500' : 'transparent'}
                border="0.0625rem solid"
                borderColor={isActive ? 'transparent' : 'shader.a.400'}
                borderRadius="lg"
              >
                <Icon as={market.icon} width={5} height={5} />

                <Text fontWeight="medium" fontSize="sm">
                  {market.text}
                </Text>
              </Center>
            </ListItem>
          );
        })}
      </List>

      <Outlet />
    </>
  );
}
