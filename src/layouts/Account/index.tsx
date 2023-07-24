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
  Image,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import ButtonCopy from 'components/ButtonCopy';
import { useAppSelector } from 'hooks/useRedux';
import { shorten } from 'utils/utils';
import ExplorerCollections from 'layouts/MarketPlace/Explorer/ExplorerCollections';
import { Link } from 'react-router-dom';
import CameraIcon from 'public/assets/fill/camera.svg';
const AccountPage = () => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  return (
    <>
      <CardBox variant="baseStyle" padding={0} overflow="hidden">
        <Box position="relative" minH="12.5rem">
          <Box
            height="full"
            width="full"
            bg="shader.a.300"
            role="group"
            position="absolute"
            top={0}
          >
            <Center
              width="full"
              height="full"
              background="shader.a.900"
              opacity={0}
              transition="opacity 0.3s ease-in-out"
              _groupHover={{
                opacity: 0.5,
              }}
              position="absolute"
              zIndex={3}
            >
              <Icon
                as={CameraIcon}
                height={10}
                width={10}
                color="white"
                cursor="pointer"
              />
            </Center>
            <Box position="absolute" height="full" width="full">
              <Image
                src="https://i.seadn.io/gae/U584T8SUu66g60cVtv3z7k-q7UJNKoIRjZISmxo6AewpGl3pNN9uk3ZB804qoNPhvqVVYR5ecA5AiUJ2RYvMYyg6GWWg-jtNSsa1eg?auto=format&dpr=1&w=1920"
                height="full"
                width="full"
                objectFit="cover"
              />
            </Box>
            <Box
              background="linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)"
              bottom={0}
              position="absolute"
              height="6.25rem"
              width="full"
            />
          </Box>
          <Box
            zIndex={4}
            bottom={'-15%'}
            position="absolute"
            borderRadius="full"
            border="0.5rem solid"
            borderColor="white"
            bg="shader.a.300"
            left="1.5rem"
            overflow="hidden"
            height={40}
            width={40}
            role="group"
          >
            <Box position="absolute" height="full" width="full">
              <Image
                src="https://i.seadn.io/gae/VMG3VFncJG-pyqsRAwQznZGqYDw4RkPjJnJNJwrDERFhD4pWLh82q66JJ8Qh0vCPoovjoyigJwLqfFpa5tMAVV5ASIiR5nF1XkQFpec?auto=format&dpr=1&w=1920"
                height="full"
                width="full"
                objectFit="cover"
              />
            </Box>

            <Center
              width="full"
              height="full"
              background="shader.a.900"
              opacity={0}
              transition="opacity 0.3s ease-in-out"
              _groupHover={{
                opacity: 0.5,
              }}
              position="absolute"
              zIndex={3}
            >
              <Icon
                as={CameraIcon}
                height={10}
                width={10}
                color="white"
                cursor="pointer"
              />
            </Center>
          </Box>
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
