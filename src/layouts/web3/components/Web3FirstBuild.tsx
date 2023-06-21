import { Box, Flex, Grid, Heading, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import LineAddIcon from 'public/assets/line/add.svg';

import { Link } from 'react-router-dom';
import { ListWeb3Item } from 'layouts/default/DefaultWeb3';

export default function Web3FirstBuild() {
  return (
    <Box
      pt={{
        base: 4,
        sm: 24,
        lg: 48,
      }}
      px={{
        lg: 48,
      }}
    >
      <Box textAlign="center" mb={6}>
        <Heading color="shader.a.900" fontSize="xl" fontWeight="semibold">
          🛠 Build your first projects!
        </Heading>

        <Text
          color="shader.a.500"
          whiteSpace={{
            sm: 'pre-line',
          }}
          mt={1}
        >
          {`Lorem ipsum dolor sit amet consectetur. Diam bibendum justo
            sollicitudin rutrum. Neque velit commodo convallis`}
        </Text>
      </Box>

      <Grid
        gridTemplateColumns={{
          sm: 'repeat(2, 1fr)',
        }}
        color="shader.a.900"
        border="0.0625rem solid"
        borderRadius="xl"
        borderColor="shader.a.400"
        padding={6}
        gap={6}
      >
        {React.Children.toArray(
          ListWeb3Item.map(project => (
            <Link to={project.link}>
              <Flex
                justifyContent="space-between"
                padding={4}
                alignItems="center"
                border="0.0625rem solid"
                borderColor="shader.a.400"
                borderRadius="xl"
              >
                <Box>
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

                  <Text mt={3} fontWeight="medium">
                    {project.title}
                  </Text>
                </Box>

                <LineAddIcon />
              </Flex>
            </Link>
          ))
        )}
      </Grid>
    </Box>
  );
}
