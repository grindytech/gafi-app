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

import Chevron01Icon from 'public/assets/line/chevron-01.svg';
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

import useSubscribeSystem from 'hooks/useSubscribeSystem';
import React from 'react';

import { Option, StorageKey, u32 } from '@polkadot/types';
import {
  PalletGameGameDetails,
  PalletNftsCollectionDetails,
} from '@polkadot/types/lookup';

export default function Web3() {
  const { event, setEvent } = useSubscribeSystem();

  const { pathname } = useLocation();
  const [tab, setTab] = React.useState(0);

  const { account } = useAppSelector(state => state.injected.polkadot);
  const { api } = useAppSelector(state => state.substrate);

  const [game, collection, item] = useQueries({
    queries: [
      {
        queryKey: ['gameAccount', account?.address],
        queryFn: async () => {
          if (api && account?.address) {
            const getGamesOfAccount = await api.query.game.game.entries();

            return Promise.all(
              getGamesOfAccount.map(
                async ([meta, config]: [
                  StorageKey<[u32]>,
                  Option<PalletGameGameDetails>
                ]) => {
                  const gameOfCollection = await api.query.game.gamesOf(
                    meta.args[0].toNumber()
                  );

                  const getOwner =
                    config.value.owner.toString() === account.address;

                  const getRole =
                    config.value.admin.toString() === account.address;

                  if (getOwner || getRole) {
                    return {
                      collection: gameOfCollection.toHuman(),
                      game_id: meta.args[0].toNumber(),
                      owner: config.value.owner.toString(),
                      role: config.value.admin.toString(),
                    };
                  }
                }
              )
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
          if (api && account?.address) {
            const getCollections = await api.query.nfts.collection.entries();

            return Promise.all(
              getCollections.map(
                async ([collection_id, service]: [
                  StorageKey<[u32]>,
                  Option<PalletNftsCollectionDetails>
                ]) => {
                  const getGamesOfCollection = await api.query.game.gamesOf(
                    collection_id.args[0].toNumber()
                  );

                  const getRoleOfCollections =
                    await api.query.nfts.collectionRoleOf.entries(
                      collection_id.args[0].toNumber()
                    );

                  const getRole = getRoleOfCollections.some(
                    ([meta]) => meta.args[1].toString() === account.address
                  );

                  const getOwner =
                    service.value.owner.toString() === account.address;

                  if (getOwner || getRole) {
                    return {
                      owner: service.value.owner.toString(),
                      role: getRoleOfCollections[0][0].args[1].toString(),
                      collection_id: collection_id.args[0].toNumber(),
                      getGamesOfCollection: getGamesOfCollection.toHuman(),
                    };
                  }
                }
              )
            ).then(data =>
              data.filter((item): item is Web3CollectionsDataProps => !!item)
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
            const getCollections = await api.query.nfts.collection.entries();

            return Promise.all(
              getCollections.map(async ([collection_id, owner]) => {
                const itemsOfCollection = await api.query.nfts.item.entries(
                  collection_id.args[0].toNumber()
                );

                const getRoleOfCollections =
                  await api.query.nfts.collectionRoleOf.entries(
                    collection_id.args[0].toNumber()
                  );

                const getRole = getRoleOfCollections.some(
                  ([meta]) => meta.args[1].toString() === account.address
                );

                const getOwner =
                  owner.value.owner.toString() === account.address;

                if (getOwner || getRole) {
                  return itemsOfCollection.map(([meta]) => ({
                    owner: owner.value.owner.toString(),
                    collection_id: meta.args[0].toNumber(),
                    nft_id: meta.args[1].toNumber(),
                  }));
                }
              })
            ).then(data =>
              data
                .filter((item): item is Web3ItemsDataProps[] => !!item?.length)
                .flat()
            );
          }

          return []; // undefined
        },
        enabled: !!(api && api.query.nfts),
      },
    ],
  });

  React.useEffect(() => {
    const subscribe = () => {
      if (event && account?.address) {
        event.some(({ eventName, eventValue }) => {
          switch (eventName) {
            /* ------------ Game --------------- */
            case 'game::GameCreated': {
              const [owner] = JSON.parse(eventValue);

              if (account.address === owner) {
                return game.refetch();
              }
              break;
            }

            /* ------------ Collection --------------- */
            case 'nfts::Created': {
              const [, owner, role] = JSON.parse(eventValue);

              if (account.address === role || account.address === owner) {
                return collection.refetch();
              }
              break;
            }

            /* ------------ NFT --------------- */
            case 'game::ItemCreated': {
              if (collection.data?.length) {
                const [, collection_id] = JSON.parse(eventValue);

                collection.data.some(data => {
                  if (data.collection_id === collection_id) {
                    item.refetch();
                  }
                });
              }
              break;
            }
          }

          setEvent([]);
        });
      }
    };

    subscribe();

    return () => subscribe();
  }, [event]);

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

  const ListTab = [
    {
      key: 0,
      data: game.data || [],
      component: (data: Web3GamesDataProps[]) => <Web3Games data={data} />,
    },
    {
      key: 1,
      data: collection.data || [],
      component: (data: Web3CollectionsDataProps[]) => (
        <Web3Collections data={data} />
      ),
    },
    {
      key: 2,
      data: item.data || [],
      component: (data: Web3ItemsDataProps[]) => <Web3Items data={data} />,
    },
  ];

  return (
    <>
      {pathname === '/web3' ? (
        game.data?.length || collection.data?.length || item.data?.length ? (
          <DefaultWeb3>
            <Tabs
              variant="unstyled"
              onChange={index => setTab(index)}
              index={tab}
            >
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
                    {item.data?.length || 0}
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
                        rightIcon={<Chevron01Icon />}
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
                tabIndex={tab}
                sx={{
                  '> div': {
                    px: 0,
                  },
                }}
              >
                {ListTab.map(item => (
                  <TabPanel key={item.key}>
                    {tab === item.key && item.data
                      ? item.component(item.data as keyof typeof item.component)
                      : null}
                  </TabPanel>
                ))}
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
