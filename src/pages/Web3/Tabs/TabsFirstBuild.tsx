import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import React from 'react';

import GridIcon from 'public/assets/grid.svg';
import LineAddIcon from 'public/assets/line/add.svg';
import File05Icon from 'public/assets/files/file-05.svg';

import { Link } from 'react-router-dom';
import { ListWeb3Item } from 'layouts/DefaultLayout/DefaultWeb3';

export default () => {
  return (
    <Box
      my={{
        base: 12,
        lg: 16,
      }}
      mx={{
        md: 12,
        lg: 24,
        xl: 40,
      }}
      border="0.0625rem solid"
      borderColor="shader.a.800"
      borderRadius="xl"
    >
      <Center
        flexDirection="column"
        textAlign="center"
        py={10}
        borderBottom="0.0625rem solid"
        borderColor="shader.a.800"
        bg="linear-gradient(180deg, #3F3F46 0%, #27272A 100%)"
        position="relative"
      >
        <Box position="absolute" bottom={0}>
          <GridIcon />
        </Box>

        <Heading color="white" fontSize="xl" fontWeight="bold">
          BUILD YOUR FIRST PROJECT
        </Heading>

        <Text mt={2} color="shader.a.500" whiteSpace={{ sm: 'pre-line' }}>
          {`Lorem ipsum dolor sit amet consectetur. Diam bibendum justo
            sollicitudin rutrum. Neque velit commodo convallis`}
        </Text>

        <Button
          mt={10}
          variant="unstyled"
          px={4}
          py={2.5}
          borderRadius="lg"
          border="0.0625rem solid"
          borderColor="shader.a.700"
          bg="shader.a.800"
          color="white"
          leftIcon={<Icon as={File05Icon} width={5} height={5} />}
        >
          How to create
        </Button>
      </Center>

      <Grid
        bg="shader.a.900"
        boxShadow="0px 0.5rem 1rem 0px rgba(0, 0, 0, 0.03)"
        padding={6}
        gap={4}
        gridTemplateColumns={{
          '2sm': 'repeat(2, 1fr)',
        }}
      >
        {React.Children.toArray(
          ListWeb3Item.map(project => (
            <Center
              as={Link}
              to={project.link}
              border="0.0625rem solid"
              borderColor="shader.a.600"
              borderRadius="xl"
              color="shader.a.400"
              fontWeight="medium"
              padding={5}
              gap={3}
              role="group"
              transitionDuration="ultra-slow"
              _hover={{
                bg: 'shader.a.800',
                borderColor: 'primary.a.300',
                color: 'white',
              }}
            >
              <Box
                padding={2}
                bg={project.background}
                borderRadius="lg"
                color="white"
              >
                {project.icon}
              </Box>

              <Text color="inherit" flex={1}>
                {project.title}
              </Text>

              <Icon
                as={LineAddIcon}
                width={6}
                height={6}
                opacity={0}
                transitionDuration="ultra-slow"
                _groupHover={{
                  opacity: 1,
                }}
              />
            </Center>
          ))
        )}
      </Grid>
    </Box>
  );
};
