import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';
import TopAuctions from './TopAuctions';
import TopBundles from './TopBundles';

export default function AuctionsAndBundles() {
  const [tab, setTab] = useState(0);

  const ListTab = [
    {
      id: 0,
      tab: 'Top Bundles',
      component: <TopBundles />,
    },
    {
      id: 1,
      tab: 'Top Auctions',
      component: <TopAuctions />,
    },
  ];

  return (
    <Tabs variant="unstyled" onChange={index => setTab(index)} index={tab}>
      <TabList gap={2}>
        {ListTab.map(meta => (
          <Tab
            color="shader.a.900"
            border="0.0625rem solid"
            borderColor="shader.a.400"
            fontSize="sm"
            fontWeight="medium"
            borderRadius="lg"
            key={meta.id}
            _selected={{
              bg: 'primary.a.500',
              color: 'shader.a.100',
              borderColor: 'transparent',
            }}
          >
            {meta.tab}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {ListTab.map(meta => (
          <TabPanel key={meta.id} padding={0} pt={6}>
            {meta.id === tab ? meta.component : null}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
