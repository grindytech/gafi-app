import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
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
import NftActivityTable from 'layouts/MarketPlace/NFT/NftActivityTable';
import TopFightGames from 'layouts/MarketPlace/Home/Games/components/TopFightGames';
import { TestDataBundleDetails } from 'layouts/MarketPlace/Explorer/DataTest';
import { useState } from 'react';
import ThumbsProducts from 'components/Carousel/ThumbsProducts';
import ThumbProductImage from 'components/Carousel/ThumbProductImage';
import BundleListDetails from 'layouts/MarketPlace/Bundle/BundleListDetails';

const BundleDetail = () => {
  const data = TestDataBundleDetails;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
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
          top="6rem"
          overflow="hidden"
          height="fit-content"
        >
          <Box
            overflow="hidden"
            borderRadius="16px"
            border="0.063rem solid"
            borderColor="shader.a.300"
          >
            <ThumbProductImage items={data.items} thumbsSwiper={thumbsSwiper} />
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
              <Flex gap={2} alignItems="center">
                <Icon as={ShareIcon} h={5} w={5} />
                <Text fontWeight="medium">Share</Text>
              </Flex>
            </HStack>
          </Box>
          <Box mt={6}>
            <ThumbsProducts
              items={data.items}
              setThumbsSwiper={setThumbsSwiper}
            />
          </Box>
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
            <CardBox variant="baseStyle" padding={0} mb={4}>
              <HStack
                px={6}
                py={4}
                borderBottom="0.063rem solid"
                borderColor="shader.a.200"
              >
                <Text>Auction ends at </Text>
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
            <BundleListDetails items={data.items} />
          </CardBox>
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
  );
};

export default BundleDetail;
