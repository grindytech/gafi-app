import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import HeartIcon from 'public/assets/line/heart.svg';
import EyesIcon from 'public/assets/line/eye.svg';
import ShareIcon from 'public/assets/line/share.svg';
import VerifyIcon from 'public/assets/fill/verified.svg';
import Cart02Icon from 'public/assets/line/cart-02.svg';
import HistoryIcon from 'public/assets/line/history.svg';
import CardBox from 'components/CardBox';
import NftTabDetail from 'layouts/MarketPlace/NFT/NftTabDetail';
import TopFightGames from 'layouts/MarketPlace/Home/Games/components/TopFightGames';
import NftActivityTable from 'layouts/MarketPlace/NFT/NftActivityTable';
import { CircleIcon } from 'components/Substrate/SubstrateNode';

import TimeReminder from 'components/Time/TimeReminder';

const NFTDetail = () => {
  const NOW_TIME = new Date().getTime();

  return (
    <>
      <Box pb={4} width="full">
        <Grid
          display={{ md: 'grid', base: 'block' }}
          gridTemplateColumns={{
            lg: 'repeat(2,1fr)',
            md: 'repeat(1,1fr)',
          }}
          gap={5}
          mb={4}
        >
          <Box
            position={{ lg: 'sticky', md: 'inherit' }}
            mb={{ md: 0, base: 4 }}
            top="6rem" //4.5rem header height + 1.5rem padding top
            borderRadius="16px"
            border="0.063rem solid"
            borderColor="shader.a.300"
            overflow="hidden"
            height="fit-content"
          >
            <Box overflow="hidden">
              <Image src="https://i.seadn.io/gcs/files/4b9b6f6f69766d364262b19ce05d572e.png?auto=format&dpr=1&w=1000" />
            </Box>
            <HStack padding={6} justifyContent="space-between" bg="white">
              <HStack gap={6}>
                <Flex gap={2}>
                  <Icon as={HeartIcon} h={5} w={5} color="primary.a.500" />
                  <Text fontWeight="medium">12</Text>
                </Flex>
                <Flex gap={2}>
                  <Icon as={EyesIcon} h={5} w={5} />
                  <Text fontWeight="medium">144</Text>
                </Flex>
              </HStack>
              <Flex gap={2}>
                <Icon as={ShareIcon} h={5} w={5} />
                <Text fontWeight="medium">Share</Text>
              </Flex>
            </HStack>
          </Box>
          <VStack alignItems="flex-start" gap={4}>
            <CardBox variant="baseStyle">
              <VStack alignItems="flex-start" gap={2} mb={6}>
                <HStack>
                  <Text color="primary.a.500" fontWeight="medium" fontSize="lg">
                    Gear Club 2
                  </Text>
                  <Icon as={VerifyIcon} height={5} w={5} />
                </HStack>
                <Text fontSize="2xl" fontWeight="bold">
                  Lamborghini #599
                </Text>
                <HStack>
                  <Text color="shader.a.500">Owned by</Text>
                  <Text color="primary.a.500" fontWeight="medium">
                    0x3b5a...6b10e
                  </Text>
                </HStack>
              </VStack>
              <CardBox variant="baseStyle" padding={0}>
                <HStack
                  px={6}
                  py={4}
                  borderBottom="0.063rem solid"
                  borderColor="shader.a.200"
                >
                  <CircleIcon w={4} h={4} />
                  <Text>Auction ends at </Text>
                  <TimeReminder targetDate={24 * 60 * 60 * 1000 + NOW_TIME} />
                </HStack>
                <Flex flexDirection="column" gap={6} padding={6}>
                  <Box
                    padding={4}
                    bg="shader.a.200"
                    borderRadius="xl"
                    border="0.063rem solid"
                    borderColor="shader.a.300"
                  >
                    <Text
                      fontSize="xl"
                      fontWeight="semibold"
                      color="shader.a.900"
                    >
                      0.015 GAFI
                    </Text>
                    <Text>$451,023</Text>
                  </Box>
                  <Text color="shader.a.600">Last Sale price 0.045 GAFI</Text>
                  <HStack gap={2}>
                    <IconButton
                      icon={<Icon as={Cart02Icon} h={5} w={5} />}
                      aria-label="Cart Icon"
                      borderRadius="full"
                      bg="none"
                      border="0.063rem solid"
                      borderColor="shader.a.300"
                      cursor="pointer"
                    />

                    <Button
                      variant="baseStyle"
                      px={6}
                      borderRadius="3xl"
                      transition="all 0.5s ease-in-out"
                      _hover={{
                        borderColor: 'shader.a.900',
                      }}
                    >
                      Make offer
                    </Button>
                    <Button variant="primary" px={6} borderRadius="3xl">
                      Buy Now
                    </Button>
                  </HStack>
                </Flex>
              </CardBox>
            </CardBox>
            <NftTabDetail />
          </VStack>
        </Grid>
        <CardBox variant="baseStyle" padding={0}>
          <Tabs variant="baseStyle">
            <TabList>
              <Tab
                display="flex"
                gap={2}
                sx={{
                  _selected: {
                    color: 'shader.a.900',
                    svg: {
                      color: 'primary.a.500',
                    },
                  },
                }}
              >
                <Icon as={HistoryIcon} h={5} w={5} />
                <Text> Activitys</Text>
              </Tab>
              <Tab>Auctions</Tab>
              <Tab>Statics</Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding={6}>
                <NftActivityTable />
              </TabPanel>
              <TabPanel padding={0}>Auctions</TabPanel>
              <TabPanel padding={0}>Static</TabPanel>
            </TabPanels>
          </Tabs>
        </CardBox>
        <TopFightGames />
      </Box>
    </>
  );
};

export default NFTDetail;