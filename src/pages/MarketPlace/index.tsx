import React from 'react';
import GridIcon from 'public/assets/line/layout-grid.svg';
import PickaxeIcon from 'public/assets/line/pickaxe.svg';

import { Center, Icon, List, ListItem, Text } from '@chakra-ui/react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import HomeMarketPlace from './Home';

export const ListMarketPlace = [
  {
    icon: GridIcon,
    text: 'Home',
    link: 'home',
    element: <HomeMarketPlace />,
  },
  {
    icon: PickaxeIcon,
    text: 'Minting pools',
    link: 'minting',
  },
];

export default function MarketPlace() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (pathname === '/marketplace') {
      navigate('/marketplace/home');
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
