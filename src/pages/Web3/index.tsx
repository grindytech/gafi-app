import {
  Box,
  Center,
  CircularProgress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import DefaultWeb3 from 'layouts/DefaultLayout/DefaultWeb3';

import React from 'react';

import TabsGame, { TabsGameDataProps } from './Tabs/TabsGame';
import TabsGamePanel from './Tabs/TabsGame/TabsGamePanel';
import TabsCollection, { TabsCollectionDataProps } from './Tabs/TabsCollection';
import TabsCollectionPanel from './Tabs/TabsCollection/TabsCollectionPanel';
import TabsNFT, { TabsNFTDataProps } from './Tabs/TabsNFT';
import TabsNFTPanel from './Tabs/TabsNFT/TabsNFTPanel';
import { isUndefined } from '@polkadot/util';
import TabsFirstBuild from './Tabs/TabsFirstBuild';
import ChakraBox from 'components/ChakraBox';
import { Outlet, useLocation } from 'react-router-dom';

export interface Web3MetaProps {
  game?: TabsGameDataProps[] | undefined;
  collection?: TabsCollectionDataProps[] | undefined;
  nft?: TabsNFTDataProps[] | undefined;
}

export default function Web3() {
  const { pathname } = useLocation();
  const [tab, setTab] = React.useState(0);
  const [meta, setMeta] = React.useState<Web3MetaProps>({
    game: undefined,
    collection: undefined,
    nft: undefined,
  });

  const ListTab = [
    {
      id: 0,
      tab: <TabsGame setMeta={setMeta} />,
      panel: <TabsGamePanel meta={meta?.game} />,
      background: 'gradient.linear.2',
    },
    {
      id: 1,
      tab: <TabsCollection setMeta={setMeta} />,
      panel: <TabsCollectionPanel meta={meta?.collection} />,
      background: 'gradient.linear.3',
    },
    {
      id: 2,
      tab: <TabsNFT setMeta={setMeta} />,
      panel: <TabsNFTPanel meta={meta?.nft} />,
      background: 'gradient.linear.4',
    },
  ];

  const isLoading = isUndefined(meta.game) || isUndefined(meta.collection);
  const isEmpty = !meta.game?.length || !meta.collection?.length; // nft is not unnecessary to check (because nft in collection)
  const isFirstBuild = !isLoading && isEmpty; // loading should completed && isEmpty equal true

  return (
    <>
      {pathname === '/web3' ? (
        <>
          {isLoading && (
            <Center height="100vh">
              <CircularProgress isIndeterminate color="primary.a.400" />
            </Center>
          )}

          {isFirstBuild && <TabsFirstBuild />}

          <Box
            width={isLoading && isEmpty ? 0 : undefined}
            height={isLoading && isEmpty ? 0 : undefined}
            hidden={isFirstBuild}
            overflow="hidden"
            pb={24}
          >
            <DefaultWeb3>
              <Tabs
                variant="unstyled"
                onChange={index => setTab(index)}
                index={tab}
              >
                <TabList overflowX="auto" pb={6} gap={4}>
                  {ListTab.map(meta => (
                    <Tab
                      key={meta.id}
                      position="relative"
                      gap={2}
                      pt={0}
                      px={8}
                      pb={4}
                      color="shader.a.500"
                      fontWeight="medium"
                      sx={{
                        span: {
                          px: 2,
                        },
                      }}
                      _before={{
                        content: `''`,
                        position: 'absolute',
                        inset: 'auto 0 0 50%',
                        transform: 'translateX(-50%)',
                        transitionDuration: 'ultra-slow',
                        bg: meta.background,
                        width: 0,
                        height: '0.125rem',
                      }}
                      _selected={{
                        color: 'white',

                        span: {
                          borderRadius: 'md',
                          bg: 'shader.a.800',
                        },

                        _before: {
                          width: 'full',
                        },
                      }}
                    >
                      {meta.tab}
                    </Tab>
                  ))}
                </TabList>

                <TabPanels tabIndex={tab}>
                  {ListTab.map(meta => (
                    <TabPanel key={meta.id} padding={0}>
                      {meta.id === tab ? (
                        <ChakraBox
                          key={meta.id}
                          display="grid"
                          gap={5}
                          gridTemplateColumns={{
                            sm: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                            xl: 'repeat(4, 1fr)',
                          }}
                          initial={{
                            opacity: 0,
                            transform: 'translateX(-25%)',
                          }}
                          animate={{
                            opacity: 1,
                            transform: 'translateX(0%)',
                          }}
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          transition={{
                            type: 'spring',
                            delay: 0.15,
                          }}
                        >
                          {meta.panel}
                        </ChakraBox>
                      ) : null}
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </DefaultWeb3>
          </Box>
        </>
      ) : (
        <Box mt={5} pb={24}>
          <Outlet />
        </Box>
      )}
    </>
  );
}
