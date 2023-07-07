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

import Chevron02Icon from 'public/assets/line/chevron-02.svg';
import LayoutGridIcon from 'public/assets/line/layout-grid.svg';
import LayoutRowIcon from 'public/assets/line/layout-row.svg';
import { useQueries } from '@tanstack/react-query';

import { useAppSelector } from 'hooks/useRedux';
import Web3Games, { Web3GamesDataProps } from './components/Web3Games';
import Web3Items from './components/Web3Items';
import Web3FirstBuild from './components/Web3FirstBuild';
import Web3Collections, {
  Web3CollectionsDataProps,
} from './components/Web3Collections';
import DefaultWeb3 from 'layouts/DefaultLayout/DefaultWeb3';
import { Outlet, useLocation } from 'react-router-dom';
import theme from 'theme/theme';
import { TypeMetadataOfCollection } from 'types';

export default function Web3() {
  const { pathname } = useLocation();
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { api } = useAppSelector(state => state.substrate);

  const data = useQueries({
    queries: [
      {
        queryKey: ['gameAccount', account?.address],
        queryFn: async () => {
          if (api && api.query.game && account?.address) {
            const res = await api.query.game.gameAccount.entries(
              account.address
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

          return []; // undefined
        },
        enabled: !!(api && api.query.game),
      },
      {
        queryKey: ['collectionAccount', account?.address],
        queryFn: async () => {
          if (api && api.query.game && account && account.address) {
            const res = await api.query.nfts.collectionAccount.entries(
              account.address
            );

            return Promise.all(
              res.map(
                async ([
                  {
                    args: [owner, collection_id],
                  },
                ]) => {
                  const metadataOfCollection = (await api.query.nfts
                    .collectionMetadataOf(collection_id.toNumber())
                    .then(item => {
                      const data = item.value.toHuman();

                      if (data) {
                        return JSON.parse(String(data.data));
                      }
                    })) as TypeMetadataOfCollection;

                  const gamesOfCollection = await api.query.game
                    .gamesOf(collection_id.toNumber())
                    .then(data => {
                      const collection = data.toHuman() as number[];

                      return collection;
                    });

                  const adminOfCollection =
                    await api.query.nfts.collectionRoleOf
                      .entries(collection_id.toNumber())
                      .then(item => {
                        const data = item[0][0].toHuman() as string[];

                        return data[1];
                      });

                  return {
                    admin: adminOfCollection,
                    owner: owner.toHuman(),
                    collection_id: collection_id.toNumber(),
                    metadataOfCollection,
                    game_id: gamesOfCollection,
                  } as Web3CollectionsDataProps;
                }
              )
            );
          }

          return []; // undefined
        },
        enabled: !!api && !!(api.query.game || api.query.nfts),
      },
      {
        queryKey: ['item', account?.address],
        queryFn: async () => {
          if (api && api.query.nfts && account?.address) {
            const getCollections = await api.query.nfts.collectionAccount
              .entries(account.address)
              .then(item =>
                item.map(
                  ([
                    {
                      args: [, collection],
                    },
                  ]) => ({
                    collection_id: collection.toNumber(),
                  })
                )
              );

            const getItems = await Promise.all(
              getCollections.map(async item => {
                const itemsOfCollection = await api.query.nfts.item.entries(
                  item
                );

                return Promise.all(
                  itemsOfCollection.map(
                    async ([
                      {
                        args: [collection, item],
                      },
                    ]) => {
                      const metadataOfItem = (await api.query.nfts
                        .itemMetadataOf(collection, collection)
                        .then(item => {
                          const data = item.value.toHuman();

                          if (data) {
                            return JSON.parse(String(data.data));
                          }
                        })) as TypeMetadataOfCollection;

                      return {
                        collection_id: collection.toNumber(),
                        item_id: item.toNumber(),
                        metadataOfItem,
                      };
                    }
                  )
                );
              })
            );

            return getItems;
          }

          return []; // undefined
        },
        enabled: !!(api && api.query.nfts),
      },
    ],
  });

  const games = data[0].data;
  const collections = data[1].data;
  const items = data[2].data;

  const gamesLength = games && games.length;
  const collectionsLength = collections && collections.length;
  const itemsLength = items && items.length;

  const index = pathname === '/web3';

  if (index && data[0].isLoading) {
    return (
      <Center height="full" gap={4}>
        <Spinner color="primary.a.500" size="md" />
        <Heading fontSize="lg" color="shader.a.600" fontWeight="medium">
          Loading
        </Heading>
      </Center>
    );
  }

  return (
    <>
      {index ? (
        gamesLength || collectionsLength || itemsLength ? (
          <DefaultWeb3>
            <Tabs variant="unstyled">
              <TabList flexWrap="wrap-reverse" gap={4}>
                <Flex
                  overflowX="auto"
                  whiteSpace="pre"
                  gap={3}
                  sx={{
                    button: {
                      ...theme.components.Button.variants.cancel,

                      _selected: {
                        ...theme.components.Button.variants.primary,
                        borderColor: 'transparent',
                      },
                    },
                  }}
                >
                  {gamesLength ? <Tab>Games {games.length}</Tab> : null}

                  {collectionsLength ? (
                    <Tab position="relative">
                      Collections {collections.length}
                    </Tab>
                  ) : null}

                  {itemsLength ? (
                    <Tab>
                      Items&nbsp;
                      {items
                        .map(item => item.length)
                        .reduce((prev, current) => prev + current)}
                    </Tab>
                  ) : null}
                </Flex>

                <Flex
                  alignItems="center"
                  justifyContent="flex-end"
                  fontSize="sm"
                  gap={3}
                  flex={{
                    md: 1,
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
                    as={LayoutGridIcon}
                    color="primary.a.500"
                    width={6}
                    height={6}
                  />

                  <Icon
                    as={LayoutRowIcon}
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
                {gamesLength && (
                  <TabPanel>
                    <Web3Games data={games} />
                  </TabPanel>
                )}

                {collectionsLength && (
                  <TabPanel>
                    <Web3Collections data={collections} />
                  </TabPanel>
                )}

                {itemsLength && (
                  <TabPanel>
                    <Web3Items data={items} />
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </DefaultWeb3>
        ) : (
          <Web3FirstBuild />
        )
      ) : (
        <Outlet />
      )}
    </>
  );
}
