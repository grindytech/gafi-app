import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import PoolsUpfront from './components/PoolsUpfront';
import PoolsStaking from './components/PoolsStaking';
import PoolsSponsored from './components/PoolsSponsored';

export interface PoolsItemProps {
  type: string;
  discount: string;
  rate: {
    txLimit: number;
    minute: number;
  };
  fee: {
    gaki: number;
    minute: number;
  };
}
[];

export default function Pools() {
  return (
    <>
      <Tabs variant="unstyled">
        <TabList
          gap={4}
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
          <Tab>Upfront</Tab>
          <Tab>Staking</Tab>
          <Tab>Sponsored</Tab>
        </TabList>

        <TabPanels
          sx={{
            '> div': {
              px: 0,
            },
          }}
        >
          <TabPanel>
            <PoolsUpfront />
          </TabPanel>

          <TabPanel>
            <PoolsStaking />
          </TabPanel>

          <TabPanel>
            <PoolsSponsored />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
