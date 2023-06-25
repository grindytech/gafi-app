import {
  Box,
  Center,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import GoBack from 'components/GoBack';
import React from 'react';
import LineAddIcon from 'public/assets/line/add.svg';

import CreateItem from './components/CreateItem';
import AddSupply from './components/AddSupply';

export default function Items() {
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
          <Tab>Create Item</Tab>

          <Tab>
            <Center gap={2}>
              <Icon as={LineAddIcon} width={4} height={4} />
              <Text>Add Supply</Text>
            </Center>
          </Tab>
        </TabList>

        <TabPanels
          sx={{
            '> div': {
              padding: 0,
            },
          }}
        >
          <TabPanel>
            <CreateItem />
          </TabPanel>

          <TabPanel>
            <AddSupply />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
