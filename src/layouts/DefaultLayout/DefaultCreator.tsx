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
import Games from 'pages/Creator/Games';
import Collections from 'pages/Creator/Collections';
import NFTs from 'pages/Creator/NFTs';
import Pools from 'pages/Creator/Pools';

export const ListCreatorItem = [
  {
    title: 'Games',
    icon: <GameIcon />,
    element: <Games />,
    link: '/creator/games',
    background: 'gradient.linear.2',
  },
  {
    title: 'Collections',
    icon: <CollectionIcon />,
    element: <Collections />,
    link: '/creator/collections',
    background: 'gradient.linear.3',
  },
  {
    title: 'NFTs',
    icon: <ItemIcon />,
    element: <NFTs />,
    link: '/creator/nft',
    background: 'gradient.linear.4',
  },
  {
    title: 'Pools',
    icon: <PoolsIcon />,
    element: <Pools />,
    link: '/creator/pools',
    background: 'gradient.linear.6',
  },
  {
    title: 'Metadata',
    icon: <MetadataIcon />,
    link: '/creator/metadata',
    element: <Box color="white">comming soon</Box>,
    background: 'gradient.linear.5',
  },
  {
    title: 'Upgrade',
    icon: <UpgradeIcon />,
    link: '/creator/upgrade',
    element: <Box color="white">comming soon</Box>,
    background: 'gradient.linear.7',
  },
];

export default ({ children }: PropsWithChildren) => {
  return (
    <>
      <SimpleGrid
        columns={{
          base: 2,
          sm: 3,
          xl: ListCreatorItem.length,
        }}
        gap={4}
        mt={5}
        mb={12}
      >
        {React.Children.toArray(
          ListCreatorItem.map(project => (
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
};
