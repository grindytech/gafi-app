import CameraIcon from 'public/assets/fill/camera.svg';
import ShareIcon from 'public/assets/line/share.svg';
import DotIcon from 'public/assets/line/menu.svg';
import InternetIcon from 'public/assets/line/internet.svg';
import TwitterIcon from 'public/assets/fill/twitter-fill.svg';

import {
  Box,
  Button,
  Center,
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
import Collections from 'pages/MarketPlace/Explorer/Collections';
import { Link } from 'react-router-dom';
const Account = () => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  return (
    <>
      <CardBox variant="baseStyle" padding={0} overflow="hidden">
        <Box position="relative" height="200px">
          <Box
            height="full"
            width="full"
            bg="shader.a.300"
            position="absolute"
            transition="all linear 3s"
            _hover={{
              background: 'shader.a.400',
              svg: {
                opacity: 1,
              },
            }}
            top={0}
          >
            <Center height="full">
              <Icon
                opacity={0}
                as={CameraIcon}
                height={10}
                width={10}
                color="white"
                cursor="pointer"
              />
            </Center>
          </Box>
          <Box
            bottom={'-15%'}
            position="absolute"
            borderRadius="full"
            border="0.5rem solid"
            borderColor="white"
            bg="shader.a.300"
            left="1.5rem"
            height={40}
            width={40}
            _hover={{
              background: 'shader.a.400',
              svg: {
                opacity: 1,
              },
            }}
          >
            <Center height="full">
              <Icon
                opacity={0}
                as={CameraIcon}
                height={10}
                width={10}
                color="white"
                cursor="pointer"
              />
            </Center>
          </Box>
          <HStack position="absolute" bottom={10} right="1.5rem">
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
          <TabList>
            <Tab>On Sale</Tab>
            <Tab>Owner</Tab>
            <Tab>Created</Tab>
            <Tab>Auctions</Tab>
            <Tab>Activities</Tab>
          </TabList>
          <TabPanels>
            <TabPanel padding={6}>
              <Collections />
            </TabPanel>
            <TabPanel padding={0}>Auctions</TabPanel>
            <TabPanel padding={0}>Static</TabPanel>
          </TabPanels>
        </Tabs>
      </CardBox>
    </>
  );
};

export default Account;
