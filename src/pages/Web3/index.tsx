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
import Web3Items, { Web3ItemsDataProps } from './components/Web3Items';
import Web3FirstBuild from './components/Web3FirstBuild';
import Web3Collections, {
  Web3CollectionsDataProps,
} from './components/Web3Collections';
import DefaultWeb3 from 'layouts/DefaultLayout/DefaultWeb3';
import { Outlet, useLocation } from 'react-router-dom';
import theme from 'theme/theme';
import { TypeMetadataOfItem } from 'types';

export interface Web3OutletContextProps {
  collection: () => void;
  item: () => void;
  game: () => void;
}

export default function Web3() {
  const { pathname } = useLocation();
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { api } = useAppSelector(state => state.substrate);

  const [game, collection, item] = useQueries({
    queries: [
      {
        queryKey: ['gameAccount', account?.address],
        queryFn: async () => {
          if (api && api.query.game && account?.address) {
            const getGamesOfAccount = await api.query.game.game.entries();

            return Promise.all(
              getGamesOfAccount.map(async item => {
                const game_owner = item[1].toHuman() as { owner: string };
                const game_id = item[0].toHuman() as number[];

                const roleOfGame = await api.query.game.gameRoleOf
                  .entries(game_id)
                  .then(item => {
                    const data = item[0][0].toHuman() as string[];

                    return {
                      game_id: Number(data[0]),
                      role: data[1],
                    };
                  });

                const collectionOfGame = await api.query.game
                  .collectionsOf(game_id)
                  .then(item => item.toHuman() as number[]);

                const getRole = roleOfGame.role === account.address;
                const getOwner = game_owner.owner === account.address;

                if (getRole || getOwner) {
                  return {
                    role: roleOfGame.role,
                    owner: game_owner.owner,
                    game_id: roleOfGame.game_id,
                    collections: collectionOfGame,
                  };
                }
              })
            ).then(data =>
              data.filter((item): item is Web3GamesDataProps => !!item)
            );
          }

          return []; // undefined
        },
        enabled: !!(api && api.query.game),
      },
      {
        queryKey: ['collectionAccount', account?.address],
        queryFn: async () => {
          if (api && api.query.game && account && account.address) {
            const getCollections = (
              await api.query.nfts.collection.entries()
            ).map(([parmas1, parmas2]) => {
              const collection_owner = parmas2.toHuman() as { owner: string };
              const collection_id = parmas1.toHuman() as string[];

              return {
                collection_id: Number(collection_id[0]),
                collection_owner: String(collection_owner.owner),
              };
            });

            return Promise.all(
              getCollections.map(async data => {
                const getGamesOfCollection = await api.query.game.gamesOf(
                  data.collection_id
                );

                const metadataOfCollections = await api.query.nfts
                  .collectionMetadataOf(data.collection_id)
                  .then(item => {
                    const metadata = item.value.toHuman();

                    if (metadata) {
                      return JSON.parse(metadata.data);
                    }
                  });

                const getRoleOfCollections =
                  await api.query.nfts.collectionRoleOf
                    .entries(data.collection_id)
                    .then(item =>
                      item.map(([owner]) => owner.toHuman() as string)
                    );

                const getOwner = data.collection_owner === account.address;
                const getRole = getRoleOfCollections[0][1] === account.address;

                if (getRole || getOwner) {
                  return {
                    owner: data.collection_owner,
                    role: getRoleOfCollections[0][1],
                    collection_id: data.collection_id,
                    getGamesOfCollection: getGamesOfCollection.toHuman(),
                    metadata: metadataOfCollections,
                  };
                }
              })
            ).then(item =>
              item.filter((item): item is Web3CollectionsDataProps => !!item)
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
            const getCollections = (
              await api.query.nfts.collection.entries()
            ).map(([parmas1, parmas2]) => {
              const collection_owner = parmas2.toHuman() as { owner: string };
              const collection_id = parmas1.toHuman() as string[];

              return {
                collection_id: Number(collection_id[0]),
                collection_owner: String(collection_owner.owner),
              };
            });

            return Promise.all(
              getCollections.map(
                async ({ collection_id, collection_owner }) => {
                  const itemsOfCollection = await api.query.nfts.item
                    .entries(collection_id)
                    .then(data =>
                      data.map(item => {
                        const data = item[0].toHuman() as number[];
                        return {
                          item_id: data[1],
                          collection_id: data[0],
                        };
                      })
                    );

                  const roleOfCollections =
                    await api.query.nfts.collectionRoleOf
                      .entries(collection_id)
                      .then(item =>
                        item.map(([address]) => address.toHuman() as string)
                      );

                  const getRole = account.address === roleOfCollections[0][1];
                  const getOwner = account.address === collection_owner;

                  if (getOwner || getRole) {
                    return Promise.all(
                      itemsOfCollection.map(
                        async ({ item_id, collection_id }) => {
                          const metadataOfItem = (await api.query.nfts
                            .itemMetadataOf(collection_id, item_id)
                            .then(item => {
                              const metadata = item.value.toHuman();

                              if (metadata) {
                                return JSON.parse(String(metadata.data));
                              }
                            })) as TypeMetadataOfItem;

                          const supplyOfItem = await api.query.game
                            .supplyOf(collection_id, item_id)
                            .then(item => item.toHuman() as string | null);

                          return {
                            collection_id: collection_id,
                            metadata: metadataOfItem,
                            item_id,
                            supply: supplyOfItem,
                          };
                        }
                      )
                    );
                  }
                }
              )
            ).then(then =>
              then.filter((item): item is Web3ItemsDataProps[] => !!item)
            );
          }

          return []; // undefined
        },
        enabled: !!(api && api.query.nfts),
      },
    ],
  });

  if (game.isLoading || collection.isLoading) {
    return (
      <Center height="100vh" gap={4}>
        <Spinner color="primary.a.500" size="md" />
        <Heading fontSize="lg" color="shader.a.600" fontWeight="medium">
          Loading
        </Heading>
      </Center>
    );
  }

  return (
    <>
      {pathname === '/web3' ? (
        game.data?.length || collection.data?.length || item.data?.length ? (
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
                  <Tab>Games {game.data?.length}</Tab>

                  <Tab>Collections {collection.data?.length}</Tab>

                  <Tab>
                    Items&nbsp;
                    {item.data && item.data.length
                      ? item.data
                          .map(item => item.length)
                          .reduce((prev, current) => prev + current)
                      : 0}
                  </Tab>
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
                {game.data && (
                  <TabPanel>
                    <Web3Games data={game.data} />
                  </TabPanel>
                )}

                {collection.data && (
                  <TabPanel>
                    <Web3Collections data={collection.data} />
                  </TabPanel>
                )}

                {item.data && (
                  <TabPanel>
                    <Web3Items data={item.data} />
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </DefaultWeb3>
        ) : (
          <Web3FirstBuild />
        )
      ) : (
        <Outlet
          context={{
            collection: collection.refetch,
            item: item.refetch,
            game: game.refetch,
          }}
        />
      )}
    </>
  );
}
