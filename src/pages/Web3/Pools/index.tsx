import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import GoBack from 'components/GoBack';

import PoolsCreate from './components/PoolsCreate';
import theme from 'theme/theme';

export default function Pools() {
  return (
    <Box
      px={{
        lg: 48,
      }}
    >
      <GoBack />

      <Tabs variant="unstyled">
        <TabList
          gap={4}
          mt={8}
          mb={4}
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
          <Tab>Create Dynamic Pool</Tab>

          <Tab>Create Stable Pool</Tab>
        </TabList>

        <TabPanels
          sx={{
            '> div': {
              padding: 0,
            },
          }}
        >
          <TabPanel>
            <PoolsCreate type="createDynamicPool" />
          </TabPanel>

          <TabPanel>
            <PoolsCreate type="createStablePool" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
