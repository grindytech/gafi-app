import React from 'react';

import DefaultWeb3 from 'layouts/default/DefaultWeb3';
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Chevron02Icon from 'public/assets/line/chevron-02.svg';
import LayoutGridIcon from 'public/assets/line/layout-grid.svg';
import LayoutRowIcon from 'public/assets/line/layout-row.svg';

const ListItems = [
  {
    title: 'Heroes & Empires',
    collection: '12',
    id: 0,
    image: 'assets/web3/heroes.jpg',
    hour: 'Open 3 hours',
  },
  {
    title: 'Heroes & Empires',
    collection: '12',
    id: 1,
    image: 'assets/web3/heroes.jpg',
    hour: 'Open 3 hours',
  },
  {
    title: 'Heroes & Empires',
    collection: '12',
    id: 2,
    image: 'assets/web3/heroes.jpg',
    hour: 'Open 3 hours',
  },
  {
    title: 'Heroes & Empires',
    collection: '12',
    id: 3,
    image: 'assets/web3/heroes.jpg',
    hour: 'Open 3 hours',
  },
];

export default function Items() {
  return (
    <DefaultWeb3>
      <Tabs variant="unstyled">
        <TabList>
          <Flex
            flexWrap="wrap"
            gap={3}
            sx={{
              button: {
                color: 'shader.a.900',
                fontSize: 'sm',
                fontWeight: 'medium',
                borderRadius: 'lg',
                border: '0.0625rem solid',
                borderColor: 'shader.a.400',

                _selected: {
                  color: 'white',
                  fontWeight: 'semibold',
                  bg: 'primary.a.500',
                  borderColor: 'transparent',
                },
              },
            }}
          >
            <Tab>Games 4</Tab>

            <Tab position="relative">
              Collections 16
              <Center
                position="absolute"
                inset="0 0 auto auto"
                borderRadius="full"
                width={6}
                height={6}
                fontSize="xs"
                fontWeight="medium"
                color="white"
                bg="second.red"
                transform="translate(50%, -50%)"
              >
                4
              </Center>
            </Tab>

            <Tab>Items 1200</Tab>
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="flex-end"
            fontSize="sm"
            gap={3}
            flex={{
              sm: 1,
            }}
          >
            <Center gap={2}>
              Filter:
              <Menu>
                <MenuButton
                  color="primary.a.500"
                  border="unset"
                  display="flex"
                  variant="unstyled"
                  fontWeight="medium"
                  height="unset"
                  as={Button}
                  iconSpacing={1}
                  rightIcon={<Chevron02Icon />}
                >
                  Date modified
                </MenuButton>

                <MenuList padding={0}>
                  <MenuItem>children</MenuItem>
                </MenuList>
              </Menu>
            </Center>

            <Icon
              as={LayoutGridIcon as any}
              color="primary.a.500"
              width={6}
              height={6}
            />

            <Icon
              as={LayoutRowIcon as any}
              color="shader.a.900"
              width={6}
              height={6}
            />
          </Flex>
        </TabList>

        <TabPanels
          sx={{
            '> div': {
              px: 0,
            },
          }}
        >
          <TabPanel>
            <Grid
              gridTemplateColumns={{
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
              }}
              gap={5}
              fontWeight="medium"
            >
              {ListItems.map(item => (
                <Box
                  key={item.id}
                  border="0.0625rem solid"
                  borderColor="shader.a.300"
                  borderRadius="xl"
                >
                  <Image
                    width="full"
                    borderTopRadius="inherit"
                    src={item.image}
                    alt={item.title}
                  />

                  <Flex
                    bg="white"
                    borderRadius="inherit"
                    flexDirection="column"
                    gap={3}
                    padding={4}
                    wordBreak="break-word"
                  >
                    <Flex gap="inherit">
                      <Heading
                        flex={1}
                        fontWeight="inherit"
                        fontSize="lg"
                        color="shader.a.800"
                      >
                        {item.title}
                      </Heading>

                      <Text color="shader.a.500" fontSize="sm">
                        ID:&nbsp;
                        <Text color="primary.a.500" as="span">
                          {item.id}
                        </Text>
                      </Text>
                    </Flex>

                    <Flex gap="inherit">
                      <Heading
                        flex={1}
                        as="h3"
                        color="primary.a.500"
                        fontSize="md"
                        fontWeight="inherit"
                      >
                        {item.collection} collections
                      </Heading>

                      <Text
                        as="span"
                        color="shader.a.500"
                        fontSize="xs"
                        fontWeight="normal"
                      >
                        {item.hour}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DefaultWeb3>
  );
}
