import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import AccountSettingProfile from './AccountSettingProfile';

import { isNull } from '@polkadot/util';
import { useAppSelector } from 'hooks/useRedux';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';

export default function AccountSetting() {
  const { address } = useParams();
  const { account } = useAppSelector(state => state.injected.polkadot);
  const isLogged = localStorage.getItem(GAFI_WALLET_ACCOUNT_KEY);

  const navigation = useNavigate();

  // Check if not logged
  React.useEffect(() => {
    if (isNull(isLogged)) {
      navigation(`/account/${address}`);
    }
  }, [isLogged]);

  // Check if account.address is available and not empty
  React.useEffect(() => {
    if (account?.address && account.address !== address) {
      navigation(`/account/${address}`);
    }
  }, [address, account]);

  return (
    <>
      <Tabs variant="baseStyle">
        <TabList pl={0}>
          <Tab fontWeight="semibold" fontSize="xl">
            Profile
          </Tab>
          <Tab fontWeight="semibold" fontSize="xl">
            Account
          </Tab>
          <Tab fontWeight="semibold" fontSize="xl">
            Wallet
          </Tab>
          <Tab fontWeight="semibold" fontSize="xl">
            Notification
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel padding={0}>
            <AccountSettingProfile />
          </TabPanel>
          <TabPanel>1</TabPanel>
          <TabPanel>1</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
