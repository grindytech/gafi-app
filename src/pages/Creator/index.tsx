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

import React from 'react';

import TabsGame, { TabsGameDataProps } from './Tabs/TabsGame';
import TabsGamePanel from './Tabs/TabsGame/TabsGamePanel';
import TabsCollection, { TabsCollectionDataProps } from './Tabs/TabsCollection';
import TabsCollectionPanel from './Tabs/TabsCollection/TabsCollectionPanel';
import TabsNFT, { TabsNFTDataProps } from './Tabs/TabsNFT';
import TabsNFTPanel from './Tabs/TabsNFT/TabsNFTPanel';

import TabsFirstBuild from './Tabs/TabsFirstBuild';
import ChakraBox from 'components/ChakraBox';
import { Outlet, useLocation } from 'react-router-dom';
import DefaultCreator from 'layouts/DefaultLayout/DefaultCreator';

export interface CreatorProps {
  game?: TabsGameDataProps[] | undefined;
  collection?: TabsCollectionDataProps[] | undefined;
  nft?: TabsNFTDataProps[] | undefined;
}

export interface CreatorLoadingProps {
  game?: {
    loading: boolean;
    data: TabsGameDataProps[] | undefined;
  };
  collection?: {
    loading: boolean;
    data: TabsCollectionDataProps[] | undefined;
  };
  nft?: {
    loading: boolean;
    data: TabsNFTDataProps[] | undefined;
  };
}

export default () => {
  const { pathname } = useLocation();
  const [tab, setTab] = React.useState(0);
  const [loading, setLoading] = React.useState<CreatorLoadingProps>({
    game: undefined,
    collection: undefined,
    nft: undefined,
  });

  const ListTab = [
    {
      id: 0,
      tab: <TabsGame setLoading={setLoading} />,
      panel: <TabsGamePanel meta={loading?.game?.data} />,
      background: 'gradient.linear.2',
    },
    {
      id: 1,
      tab: <TabsCollection setLoading={setLoading} />,
      panel: <TabsCollectionPanel meta={loading?.collection?.data} />,
      background: 'gradient.linear.3',
    },
    {
      id: 2,
      tab: <TabsNFT setLoading={setLoading} />,
      panel: <TabsNFTPanel meta={loading?.nft?.data} />,
      background: 'gradient.linear.4',
    },
  ];

  const isLoading = loading.game?.loading || loading.collection?.loading;

  // nft is not unnecessary to check (because nft in collection)
  const isEmpty =
    !loading.game?.data?.length && !loading.collection?.data?.length;

  const isFirstBuild =
    !loading?.game?.data?.length &&
    !loading?.collection?.data?.length &&
    isEmpty; // loading should completed && isEmpty equal true

  const transition: any = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      {pathname === '/creator' ? (
        <>
          {isLoading ? (
            <Center height="100vh">
              <CircularProgress isIndeterminate color="primary.a.400" />
            </Center>
          ) : isFirstBuild ? (
            <TabsFirstBuild />
          ) : null}

          <ChakraBox
            {...transition}
            width={isLoading && isEmpty ? 0 : undefined}
            height={isLoading && isEmpty ? 0 : undefined}
            hidden={isFirstBuild}
            overflow="hidden"
            pb={24}
          >
            <DefaultCreator>
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
                          {...transition}
                        >
                          {meta.panel}
                        </ChakraBox>
                      ) : null}
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </DefaultCreator>
          </ChakraBox>
        </>
      ) : (
        <Box mt={5} pb={24}>
          <ChakraBox {...transition}>
            <Outlet />
          </ChakraBox>
        </Box>
      )}
    </>
  );
};
