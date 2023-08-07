import { Center, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';
import GameIcon from 'public/assets/fill/game.svg';
import CollectionIcon from 'public/assets/fill/collection.svg';
import ItemIcon from 'public/assets/fill/item.svg';
import MetadataIcon from 'public/assets/fill/metadata.svg';
import PoolsIcon from 'public/assets/line/pools.svg';
import UpgradeIcon from 'public/assets/fill/upgrade.svg';
import Collections from 'pages/Web3/Collections';
import NewGames from 'pages/Web3/NewGames';

import Pools from 'pages/Web3/Pools';
import NFTs from 'pages/Web3/NFTs';

export const ListWeb3Item = [
  {
    title: 'Games',
    icon: <GameIcon />,
    element: <NewGames />,
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
    element: <>comming soon</>,
    background: 'gradient.linear.5',
  },
  {
    title: 'Upgrade',
    icon: <UpgradeIcon />,
    link: '/web3/upgrade',
    element: <>comming soon</>,
    background: 'linear-gradient(135deg, #3EDBFF 0%, #00B2FF 100%)',
  },
];

export default function DefaultWeb3({ children }: PropsWithChildren) {
  return (
    <>
      <SimpleGrid
        columns={{
          base: 2,
          sm: 3,
          md: ListWeb3Item.length,
        }}
        gap={4}
        mb={10}
      >
        {React.Children.toArray(
          ListWeb3Item.map(project => (
            <Center
              as={Link}
              to={project.link}
              padding={3}
              gap={3}
              border="0.0625rem solid"
              borderColor="shader.a.400"
              bg="white"
              borderRadius="xl"
              justifyContent="flex-start"
              flexDirection={{
                base: 'column',
                lg: 'row',
              }}
            >
              <IconButton
                variant="unstyled"
                minWidth="auto"
                height="auto"
                aria-label={`icon-${project.title}`}
                borderRadius="lg"
                padding={1}
                color="white"
                background={project.background}
                icon={project.icon}
              />

              <Text fontWeight="medium">{project.title}</Text>
            </Center>
          ))
        )}
      </SimpleGrid>

      {children}
    </>
  );
}
