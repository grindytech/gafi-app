import CardBox from 'components/CardBox';
import { Center, List, ListItem, Text } from '@chakra-ui/react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import React from 'react';

import Activities from './Activities';
export const ListExplorerTab = [
  {
    title: 'Activities',
    link: 'activities',
    element: <Activities />,
  },
  {
    title: 'Games',
    link: '/marketplace/explorer/games',
    element: <Activities />,
  },
  {
    title: 'Collections',
    link: '/marketplace/collections',
  },
  {
    title: 'NFTs',
    link: '/marketplace/nfts',
  },
  {
    title: 'Creators',
    link: '/marketplace/creators',
  },
];
const Explorer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (pathname === '/marketplace/explorer') {
      navigate('/marketplace/explorer');
    }
  }, [pathname]);
  return (
    <>
      <CardBox padding={0}>
        <List display="flex" gap={3} mb={6} flexWrap="wrap">
          {ListExplorerTab.map(market => {
            const isActive = pathname.includes(market.link);

            return (
              <ListItem key={market.title}>
                <Center
                  as={Link}
                  to={market.link}
                  px={4}
                  py={2.5}
                  gap={2}
                  color={isActive ? 'shader.a.900' : 'shader.a.400'}
                  bg={isActive ? 'primary.a.500' : 'transparent'}
                  borderRadius="lg"
                >
                  <Text fontWeight="medium" fontSize="sm">
                    {market.title}
                  </Text>
                </Center>
              </ListItem>
            );
          })}
        </List>
        <Outlet />
      </CardBox>
    </>
  );
};

export default Explorer;
