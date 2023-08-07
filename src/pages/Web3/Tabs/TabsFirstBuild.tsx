import { Box, Flex, Grid, Heading, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import LineAddIcon from 'public/assets/line/add.svg';

import { Link } from 'react-router-dom';
import { ListWeb3Item } from 'layouts/DefaultLayout/DefaultWeb3';

export default function TabsFirstBuild() {
  return (
    <Box
      px={{
        lg: 24,
        xl: 48,
      }}
    >
      <Box
        padding={10}
        textAlign="center"
        bg="shader.a.200"
        borderRadius="xl"
        border="0.0625rem solid"
        borderColor="shader.a.300"
      >
        <Heading color="shader.a.900" fontSize="xl" fontWeight="semibold">
          🛠 Build your first projects!
        </Heading>

        <Text
          color="shader.a.500"
          mt={1}
          whiteSpace={{
            sm: 'pre-line',
          }}
        >
          {`Lorem ipsum dolor sit amet consectetur. Diam bibendum justo
            sollicitudin rutrum. Neque velit commodo convallis`}
        </Text>
      </Box>

      <Box
        border="0.0625rem solid"
        borderColor="shader.a.200"
        borderRadius="xl"
        bg="white"
        boxShadow="0px 0.5rem 1rem 0px rgba(0, 0, 0, 0.03)"
        mx={8}
        transform="translateY(-5%)"
      >
        <Grid
          color="shader.a.900"
          padding={6}
          gap={6}
          gridTemplateColumns={{
            sm: 'repeat(2, 1fr)',
          }}
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
    </Box>
  );
}
