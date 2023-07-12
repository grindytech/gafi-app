import CardBox from 'components/CardBox';
import { Box, Center, List, ListItem, Text } from '@chakra-ui/react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import React from 'react';

import Activities from './Activities';
import Games from './Games';
import Collections from './Collections';
import NFTs from './NFTs';
import GameDetail from './Games/GameDetail';

export const ListExplorerTab = [
  {
    title: 'Activities',
    link: 'activities',
    element: <Activities />,
  },
  {
    title: 'Games',
    link: 'games',
    element: <Games />,
  },
  {
    title: 'Collections',
    link: 'collections',
    element: <Collections />,
  },
  {
    title: 'NFTs',
    link: 'nfts',
    element: <NFTs />,
  },
  {
    title: 'Creators',
    link: 'creators',
    element: <Collections />,
  },
];
export const ListExplorerChild = [
  {
    link: 'game/:id',
    element: <GameDetail />,
  },
];
const Explorer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (pathname === '/marketplace/explorer') {
      navigate('/marketplace/explorer/activities');
    }
  }, [pathname]);

  return (
    <>
      <CardBox
        padding={0}
        bg="white"
        border="0.063rem solid"
        borderColor="shader.a.300"
        borderRadius="xl"
        boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
      >
        <List
          display="flex"
          gap={6}
          flexWrap="wrap"
          px={6}
          py={5}
          borderBottom="0.063rem solid"
          borderBottomColor="shader.a.200"
        >
          {ListExplorerTab.map(market => {
            const isActive = pathname.includes(market.link);
            return (
              <ListItem key={market.title}>
                <Center
                  as={Link}
                  to={market.link}
                  /*    px={4}
                  py={2.5} */
                  gap={2}
                  color={isActive ? 'shader.a.900' : 'shader.a.400'}
                >
                  <Text fontSize="lg" fontWeight="medium" lineHeight="1.5rem">
                    {market.title}
                  </Text>
                </Center>
              </ListItem>
            );
          })}
        </List>
        <Box p={4}>
          <Outlet />
        </Box>
      </CardBox>
    </>
  );
};

export default Explorer;
