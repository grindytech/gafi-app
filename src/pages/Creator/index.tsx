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

import ChakraBox from 'components/ChakraBox';
import { Outlet, useLocation } from 'react-router-dom';
import DefaultCreator from 'layouts/DefaultLayout/DefaultCreator';

import TabsGame from './Tabs/TabsGame';
import TabsCollection from './Tabs/TabsCollection';
import TabsNFT from './Tabs/TabsNFT';
import TabsPool from './Tabs/TabsPool';
import TabsFirstBuild from './Tabs/TabsFirstBuild';

export type TabsLoadingType = Record<
  'game' | 'collection' | 'nft' | 'pool',
  Partial<{
    isLoading: boolean;
    data: number | undefined;
  }>
>;

export interface TabsArgumentProps {
  type: 'tab' | 'panel';
  setLoading?: React.Dispatch<React.SetStateAction<TabsLoadingType>>;
}

export default () => {
  const { pathname } = useLocation();

  const [tab, setTab] = React.useState(0);
  const [loading, setLoading] = React.useState<TabsLoadingType>({
    game: { isLoading: true, data: undefined },
    collection: { isLoading: true, data: undefined },
    nft: { isLoading: true, data: undefined },
    pool: { isLoading: true, data: undefined },
  });

  const ListTab = [
    {
      id: 0,
      tab: <TabsGame type="tab" setLoading={setLoading} />,
      panel: <TabsGame type="panel" />,
      background: 'gradient.linear.2',
    },
    {
      id: 1,
      tab: <TabsCollection type="tab" setLoading={setLoading} />,
      panel: <TabsCollection type="panel" />,
      background: 'gradient.linear.3',
    },
    {
      id: 2,
      tab: <TabsNFT type="tab" setLoading={setLoading} />,
      panel: <TabsNFT type="panel" />,
      background: 'gradient.linear.4',
    },
    {
      id: 3,
      tab: <TabsPool type="tab" setLoading={setLoading} />,
      panel: <TabsPool type="panel" />,
      background: 'gradient.linear.6',
    },
  ];

  const transition: any = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  };

  const isLoading =
    loading.game.isLoading ||
    loading.collection.isLoading ||
    loading.nft.isLoading ||
    loading.pool.isLoading;

  const isFirstBuild =
    !loading.game?.data && !loading.collection?.data && !loading.pool?.data;

  const tabVisible = () => {
    if (isLoading) {
      return { width: 0, height: 0, overflow: 'hidden' };
    }

    if (!isLoading && isFirstBuild) {
      return { width: 0, height: 0, overflow: 'hidden' };
    }

    return undefined;
  };

  return (
    <>
      {pathname === '/creator' ? (
        <>
          {isLoading ? (
            <Center height="100vh">
              <CircularProgress isIndeterminate color="primary.a.400" />
            </Center>
          ) : null}

          {!isLoading && isFirstBuild ? <TabsFirstBuild /> : null}

          <DefaultCreator
            sx={{
              ...tabVisible(),
            }}
          >
            <Tabs
              variant="unstyled"
              onChange={index => setTab(index)}
              index={tab}
              {...tabVisible()}
            >
              <TabList>
                {ListTab.map(meta => (
                  <Tab
                    key={meta.id}
                    position="relative"
                    gap={2}
                    pt={0}
                    px={8}
                    pb={4}
                    color="shader.a.500"
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
                      span: { bg: 'shader.a.800' },
                      _before: { width: 'full' },
                    }}
                  >
                    {meta.tab}
                  </Tab>
                ))}
              </TabList>

              <TabPanels mt={6}>
                {ListTab.map(meta => (
                  <TabPanel key={meta.id} padding={0}>
                    {meta.id === tab ? (
                      <ChakraBox {...transition}>{meta.panel}</ChakraBox>
                    ) : null}
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </DefaultCreator>
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
