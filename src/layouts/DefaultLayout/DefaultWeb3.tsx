import { Center, Grid, IconButton, Text } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import LineAddIcon from 'public/assets/line/add.svg';
import { Link } from 'react-router-dom';
import GameIcon from 'public/assets/fill/game.svg';
import CollectionIcon from 'public/assets/fill/collection.svg';
import ItemIcon from 'public/assets/fill/item.svg';
import MetadataIcon from 'public/assets/fill/metadata.svg';
import PoolsIcon from 'public/assets/line/pools.svg';
import UpgradeIcon from 'public/assets/fill/upgrade.svg';
import Items from 'layouts/Web3/Items';
import Collections from 'layouts/Web3/Collections';
import Pools from 'layouts/Web3/Pools';
import NewGames from 'layouts/Web3/NewGames';

export const ListWeb3Item = [
  {
    title: 'New Games',
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
    title: 'Items',
    icon: <ItemIcon />,
    element: <Items />,
    link: '/web3/items',
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
      <Grid
        gridTemplateColumns={{
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={{
          base: 3,
          lg: 5,
        }}
        mb={10}
      >
        {React.Children.toArray(
          ListWeb3Item.map(project => (
            <Center
              as={Link}
              to={project.link}
              padding={3}
              border="0.0625rem solid"
              borderColor="shader.a.400"
              borderRadius="xl"
              justifyContent="space-between"
            >
              <Center gap={3}>
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

              <LineAddIcon />
            </Center>
          ))
        )}
      </Grid>

      {children}
    </>
  );
}
