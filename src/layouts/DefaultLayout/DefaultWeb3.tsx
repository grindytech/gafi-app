import { Box, Center, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import LineAddIcon from 'public/assets/line/add.svg';
import React, { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';
import GameIcon from 'public/assets/fill/game.svg';
import CollectionIcon from 'public/assets/fill/collection.svg';
import ItemIcon from 'public/assets/fill/item.svg';
import MetadataIcon from 'public/assets/fill/metadata.svg';
import PoolsIcon from 'public/assets/line/pools.svg';
import UpgradeIcon from 'public/assets/fill/upgrade.svg';
import Games from 'pages/Web3/Games';
import Collections from 'pages/Web3/Collections';
import NFTs from 'pages/Web3/NFTs';
import Pools from 'pages/Web3/Pools';

export const ListWeb3Item = [
  {
    title: 'Games',
    icon: <GameIcon />,
    element: <Games />,
    link: '/web3/games',
    background: 'gradient.linear.2',
  },
  {
    title: 'Collections',
    icon: <CollectionIcon />,
    element: <Collections />,
    link: '/web3/collections',
    background: 'gradient.linear.3',
  },
  {
    title: 'NFTs',
    icon: <ItemIcon />,
    element: <NFTs />,
    link: '/web3/nft',
    background: 'gradient.linear.4',
  },
  {
    title: 'Pools',
    icon: <PoolsIcon />,
    element: <Pools />,
    link: '/web3/pools',
    background: 'gradient.linear.6',
  },
  {
    title: 'Metadata',
    icon: <MetadataIcon />,
    link: '/web3/metadata',
    element: <Box color="white">comming soon</Box>,
    background: 'gradient.linear.5',
  },
  {
    title: 'Upgrade',
    icon: <UpgradeIcon />,
    link: '/web3/upgrade',
    element: <Box color="white">comming soon</Box>,
    background: 'gradient.linear.7',
  },
];

export default function DefaultWeb3({ children }: PropsWithChildren) {
  return (
    <>
      <SimpleGrid
        columns={{
          base: 2,
          sm: 3,
          xl: ListWeb3Item.length,
        }}
        gap={4}
        mt={5}
        mb={12}
      >
        {React.Children.toArray(
          ListWeb3Item.map(project => (
            <Center
              as={Link}
              to={project.link}
              padding={3}
              gap={3}
              border="0.0625rem solid"
              borderColor="shader.a.800"
              borderRadius="xl"
              color="white"
              fontWeight="medium"
              bg="shader.a.900"
              justifyContent="flex-start"
              flexDirection={{
                base: 'column',
                md: 'row',
              }}
            >
              <Box
                padding={1}
                bg={project.background}
                borderRadius="lg"
                color="white"
              >
                {project.icon}
              </Box>

              <Text flex={1}>{project.title}</Text>

              <Icon as={LineAddIcon} width={6} height={6} />
            </Center>
          ))
        )}
      </SimpleGrid>

      {children}
    </>
  );
}
