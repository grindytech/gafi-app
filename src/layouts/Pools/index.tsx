import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import GoBack from 'components/GoBack';

import React from 'react';
import PoolsCreate from './components/PoolsCreate';

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
              fontSize: 'sm',
              fontWeight: 'medium',
              color: 'shader.a.900',
              borderRadius: 'lg',
              border: '0.0625rem solid',
              borderColor: 'shader.a.400',

              _selected: {
                color: 'white',
                borderColor: 'transparent',
                bg: 'primary.a.500',
                fontWeight: 'semibold',
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
