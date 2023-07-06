import CardBox from 'components/CardBox';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  List,
  ListItem,
  Select,
  Text,
} from '@chakra-ui/react';
import { useLocation, Link, Outlet, useNavigate } from 'react-router-dom';
import React from 'react';
import FilterIcon from 'public/assets/line/filter.svg';
import Activities from './Activities';
import Filter from 'layouts/MarketPlace/Explorer/Filter';
export const ListExplorerTab = [
  {
    title: 'Activities',
    link: 'activities',
    element: <Activities />,
  },
  {
    title: 'Games',
    link: 'games',
    element: <Activities />,
  },
  {
    title: 'Collections',
    link: 'collections',
  },
  {
    title: 'NFTs',
    link: 'nfts',
  },
  {
    title: 'Creators',
    link: 'creators',
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
          <HStack gap={4} mb={4}>
            <Button variant="primary" leftIcon={<Icon as={FilterIcon} />}>
              Filter
            </Button>
            <Select variant="formFilter" width="fit-content">
              {testOption1.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
            <Select variant="formFilter" width="fit-content">
              {testOption2.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
            <Select variant="formFilter" width="fit-content">
              {testOption3.map(item => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </HStack>
          <Flex width="full" gap={5}>
            <Filter />
            <Outlet />
          </Flex>
        </Box>
      </CardBox>
    </>
  );
};

export default Explorer;

/**
 *  Can Use Observer API intersection or Use Infinite query of Tanstack query
 *
 */
export const testOption1 = [
  {
    title: 'Single NFT',
    value: 'single-nft',
  },
  {
    title: 'Single NFT 2',
    value: 'single-nft-2',
  },
  {
    title: 'Single NFT 3',
    value: 'single-nft-3',
  },
  {
    title: 'Single NFT 4',
    value: 'single-nft-4',
  },
];
export const testOption2 = [
  {
    title: 'Auction',
    value: 'auction-1',
  },
  {
    title: 'Auction 2',
    value: 'auction-2',
  },
  {
    title: 'Auction 3',
    value: 'auction-3',
  },
  {
    title: 'Auction 4',
    value: 'auction-4',
  },
];
export const testOption3 = [
  {
    title: 'Newest',
    value: 'newest',
  },
  {
    title: 'Price High To Low',
    value: 'price-high-low',
  },
  {
    title: 'Price Low to High',
    value: 'price-low-high',
  },
];
