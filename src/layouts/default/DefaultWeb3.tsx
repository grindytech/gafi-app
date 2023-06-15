import { Center, Grid, IconButton, Text } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import LineAddIcon from 'public/assets/line/add.svg';
import { Link } from 'react-router-dom';
import GamesIcon from 'public/assets/illustration/games.svg';
import CollectionsIcon from 'public/assets/illustration/collections.svg';
import ItemsIcon from 'public/assets/illustration/items.svg';
import MetadataIcon from 'public/assets/illustration/metadata.svg';

export const ListWeb3Project = [
  {
    title: 'New Games',
    icon: <GamesIcon />,
    link: '/games',
    background: 'gradient.linear.2',
  },
  {
    title: 'Collections',
    icon: <CollectionsIcon />,
    link: '/',
    background: 'gradient.linear.3',
  },
  {
    title: 'Items',
    icon: <ItemsIcon />,
    link: '/items',
    background: 'gradient.linear.4',
  },
  {
    title: 'Metadata',
    icon: <MetadataIcon />,
    link: '/',
    background: 'gradient.linear.5',
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
          ListWeb3Project.map(project => (
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
