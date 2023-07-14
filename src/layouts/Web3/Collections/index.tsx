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

import LineAddIcon from 'public/assets/line/add.svg';

import theme from 'theme/theme';
import CollectionsCreate from './components/CreateCollections';
import AddCollections from './components/AddCollections';
import AcceptCollections from './components/AcceptCollections';
import AddMetadataCollection from './components/AddMetadataCollection';

export default function Collections() {
  return (
    <Box
      px={{
        lg: 48,
      }}
    >
      <GoBack />

      <Tabs variant="unstyled">
        <TabList
          gap={{
            base: 2,
            md: 4,
          }}
          mt={8}
          mb={4}
          flexWrap="wrap"
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
          <Tab>Create Collection</Tab>

          <Tab>
            <Center gap={2}>
              <Icon as={LineAddIcon} width={4} height={4} />
              <Text>Add collection</Text>
            </Center>
          </Tab>

          <Tab>Add Accept Adding</Tab>

          <Tab>Add Metadata</Tab>
        </TabList>

        <TabPanels
          sx={{
            '> div': {
              padding: 0,
            },
          }}
        >
          <TabPanel>
            <CollectionsCreate />
          </TabPanel>

          <TabPanel>
            <AddCollections />
          </TabPanel>

          <TabPanel>
            <AcceptCollections />
          </TabPanel>

          <TabPanel>
            <AddMetadataCollection />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
