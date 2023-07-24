import {
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import SettingProfileForm from 'layouts/Account/Settings/SettingProfileForm';

const OwnerSetting = () => {
  return (
    <Tabs variant="baseStyle">
      <Box>
        <Text color="shader.a.400" fontWeight="medium">
          Settings
        </Text>

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
      </Box>

      <TabPanels>
        <TabPanel padding={0}>
          <SettingProfileForm />
        </TabPanel>
        <TabPanel>1</TabPanel>
        <TabPanel>1</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default OwnerSetting;
