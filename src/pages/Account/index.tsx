import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import CardBox from 'components/CardBox';

import React from 'react';
import AccountInformation from './AccountInformation';
import AccountOwner from './AccountOwner';

export default function Account() {
  const [tab, setTab] = React.useState(0);

  const ListTab = [
    {
      key: 0,
      tab: 'Onwer',
      panel: <AccountOwner />,
    },
  ];

  return (
    <>
      <CardBox variant="createGames" padding={0}>
        <AccountInformation />
      </CardBox>

      <CardBox variant="createGames" padding={0} mt={4}>
        <Tabs variant="baseStyle" onChange={e => setTab(e)} index={tab}>
          <TabList flexWrap="wrap">
            {ListTab.map(({ key, tab }) => (
              <Tab key={key}>{tab}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {ListTab.map(({ key, panel }) =>
              key === tab ? (
                <TabPanel padding={6} key={key}>
                  {panel}
                </TabPanel>
              ) : null
            )}
          </TabPanels>
        </Tabs>
      </CardBox>
    </>
  );
}
