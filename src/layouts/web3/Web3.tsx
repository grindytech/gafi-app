import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React from 'react';

import useAccount from 'hooks/useAccount';
import { useSubstrateState } from 'contexts/substrateContext';

import Chevron02Icon from 'public/assets/line/chevron-02.svg';
import LayoutGridIcon from 'public/assets/line/layout-grid.svg';
import LayoutRowIcon from 'public/assets/line/layout-row.svg';
import { useQueries } from '@tanstack/react-query';
import Web3Games, { Web3GamesDataProps } from './components/Web3Games';
import Web3Collections, {
  Web3CollectionsDataProps,
} from './components/Web3Collections';
import Web3Items, { Web3ItemsDataProps } from './components/Web3Items';

import Web3FirstBuild from './components/Web3FirstBuild';
import DefaultWeb3 from 'layouts/default/DefaultWeb3';
import { useConnectWallet } from 'components/ConnectWallet/ConnectWalletProvider';

export default function Web3() {
  const { api } = useSubstrateState();
  const { getAccount } = useAccount();

  const data = useQueries({
    queries: [
      {
        queryKey: ['gameAccount'],
        queryFn: async () => {
          if (api && api.query.game && getAccount) {
            const res = await api.query.game.gameAccount.entries(
              getAccount.address
            );

            const getGames = await Promise.all(
              res.map(
                async ([
                  {
                    args: [owner, game_id],
                  },
                ]): Promise<Web3GamesDataProps> => {
                  const collectionsOfGame = await api.query.game.collectionsOf(
                    game_id
                  );

                  return {
                    owner: owner.toHuman(),
                    game_id: game_id.toPrimitive(),
                    collections: collectionsOfGame.toPrimitive(),
                  } as Web3GamesDataProps;
                }
              )
            );

            return getGames;
          }
        },
        enabled: !!(api && api.query.game),
      },
      {
        queryKey: ['collectionAccount'],
        queryFn: async () => {
          if (api && api.query.nfts && getAccount) {
            const res = await api.query.nfts.collectionAccount.entries(
              getAccount.address
            );

            const getCollections = await Promise.all(
              res.map(
                async ([
                  {
                    args: [owner, collection_id],
                  },
                ]): Promise<Web3CollectionsDataProps> => {
                  const collectionsOfGame = await api.query.game.gamesOf(
                    collection_id.toPrimitive()
                  );

                  return {
                    owner: owner.toHuman(),
                    game_id: collectionsOfGame.toPrimitive(),
                    collection_id: collection_id.toPrimitive(),
                  } as Web3CollectionsDataProps;
                }
              )
            );

            return getCollections;
          }
        },
        enabled: !!(api && api.query.nfts),
      },
      {
        queryKey: ['item'],
        queryFn: async () => {
          if (api && api.query.nfts && getAccount) {
            const res = await api.query.nfts.collectionAccount.entries(
              getAccount.address
            );

            const getCollections = res.map(
              ([
                {
                  args: [, collection_id],
                },
              ]) => collection_id.toPrimitive()
            );

            const getItems = await Promise.all(
              getCollections.map(async item => {
                const itemsOfCollection = await api.query.nfts.item.entries(
                  item
                );

                if (itemsOfCollection.length) {
                  return itemsOfCollection.map(
                    ([
                      {
                        args: [collection, item],
                      },
                    ]) => {
                      return {
                        collection_id: collection.toPrimitive(),
                        item_id: item.toPrimitive(),
                      } as Web3ItemsDataProps;
                    }
                  );
                }
              })
            );

            return getItems.filter(
              (item): item is Web3ItemsDataProps[] => !!item
            );
          }
        },
        enabled: !!(api && api.query.nfts),
      },
    ],
  });

  const games = data[0].data;
  const collections = data[1].data;
  const items = data[2].data;

  if (data[0].isLoading && data[1].isLoading && data[2].isLoading) {
    return (
      <Center py={24} gap={4}>
        <Spinner color="primary.a.500" size="md" />
        <Heading fontSize="lg" color="shader.a.600" fontWeight="medium">
          Loading
        </Heading>
      </Center>
    );
  }

  return (
    <>
      {games &&
      games.length &&
      collections &&
      collections.length &&
      items &&
      items.length ? (
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
                <Tab>Games {games.length}</Tab>

                <Tab position="relative">Collections {collections.length}</Tab>

                <Tab>
                  Items&nbsp;
                  {items
                    .map(item => item.length)
                    .reduce((prev, current) => prev + current)}
                </Tab>
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
                <Web3Games data={games} />
              </TabPanel>

              <TabPanel>
                <Web3Collections data={collections} />
              </TabPanel>

              <TabPanel>
                <Web3Items data={items} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DefaultWeb3>
      ) : (
        <Web3FirstBuild />
      )}
    </>
  );
}
