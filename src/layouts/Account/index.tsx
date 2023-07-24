import ShareIcon from 'public/assets/line/share.svg';
import DotIcon from 'public/assets/line/menu.svg';
import InternetIcon from 'public/assets/line/internet.svg';
import TwitterIcon from 'public/assets/fill/twitter-fill.svg';

import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import ButtonCopy from 'components/ButtonCopy';
import { useAppSelector } from 'hooks/useRedux';
import { shorten } from 'utils/utils';
import ExplorerCollections from 'layouts/MarketPlace/Explorer/ExplorerCollections';
import { Link } from 'react-router-dom';
import SettingProfileImage from './Settings/SettingProfileImage';

const AccountPage = () => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  return (
    <>
      <CardBox variant="baseStyle" padding={0} overflow="hidden">
        <Box position="relative" minH="12.5rem">
          <SettingProfileImage />
          <HStack position="absolute" bottom={10} right="1.5rem" zIndex={4}>
            <IconButton
              variant="baseStyle"
              bg="white"
              border="none"
              icon={<Icon as={InternetIcon} height={6} w={6} />}
              aria-label="Website Icon"
            />
            <IconButton
              variant="baseStyle"
              bg="white"
              border="none"
              icon={<Icon as={TwitterIcon} height={6} w={6} />}
              aria-label="Twitter Icon"
            />
          </HStack>
        </Box>
        <HStack justifyContent="space-between" px={6} py={10}>
          <Flex flexDirection="column" gap={2}>
            {account && account.address ? (
              <>
                <Text fontWeight="semibold" fontSize="xl">
                  {account?.name}
                </Text>
                <HStack>
                  <Text fontSize="lg">{shorten(account.address, 10)}</Text>
                  <ButtonCopy value={account?.address || ''} />
                </HStack>
              </>
            ) : null}

            <Text color="shader.a.500">Joined in 12/07/2023</Text>
          </Flex>
          <Flex gap={2}>
            <Link to="/account/setting">
              <Button variant="baseStyle">Edit Profile</Button>
            </Link>

            <IconButton
              variant="baseStyle"
              icon={
                <Icon as={ShareIcon} color="shader.a.900" height={6} w={6} />
              }
              aria-label="Share Icon"
            />
            <IconButton
              variant="baseStyle"
              icon={<Icon as={DotIcon} color="shader.a.900" height={6} w={6} />}
              aria-label="Menu Icon"
            />
          </Flex>
        </HStack>
      </CardBox>
      <CardBox variant="baseStyle" padding={0} mt={4}>
        <Tabs variant="baseStyle">
          <TabList flexWrap="wrap">
            <Tab>On Sale</Tab>
            <Tab>Owner</Tab>
            <Tab>Created</Tab>
            <Tab>Auctions</Tab>
            <Tab>Activities</Tab>
          </TabList>
          <TabPanels>
            <TabPanel padding={6}>
              <ExplorerCollections />
            </TabPanel>
            <TabPanel padding={0}>Auctions</TabPanel>
            <TabPanel padding={0}>Static</TabPanel>
          </TabPanels>
        </Tabs>
      </CardBox>
    </>
  );
};

export default AccountPage;
