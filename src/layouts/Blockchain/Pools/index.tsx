import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import PoolsUpfront from './components/PoolsUpfront';
import PoolsStaking from './components/PoolsStaking';
import PoolsSponsored from './components/PoolsSponsored';
import theme from 'theme/theme';

export interface PoolsItemProps {
  type: 'Basic plan' | 'Medium plan' | 'Premium plan';
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
            overflowX: 'auto',
            button: {
              ...theme.components.Button.variants.cancel,
              whiteSpace: 'pre',
              _selected: {
                ...theme.components.Button.variants.primary,
                borderColor: 'transparent',
              },
            },
          }}
        >
          <Tab>Upfront Pools</Tab>
          <Tab>Staking Pools</Tab>
          <Tab>Sponsored Pools</Tab>
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
