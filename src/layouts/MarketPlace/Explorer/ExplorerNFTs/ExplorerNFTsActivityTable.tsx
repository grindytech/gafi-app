import {
  Box,
  Flex,
  Grid,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import NavLinkSocial from 'components/Link/NavLinkSocial';
import { DataTestNftAttributes } from 'hooks/DataTest';

export default function ExplorerNFTsActivityTable() {
  return (
    <CardBox variant="baseStyle" padding={0}>
      <Tabs variant="baseStyle">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Atributes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <Flex flexDirection="column" gap={5} padding={6}>
              <CardBox variant="baseStyle" padding={4}>
                <Text fontWeight="medium" color="black" mb={4}>
                  Description
                </Text>
                <HStack mb={2}>
                  <Text color="shader.a.500">Created by</Text>
                  <Text color="primary.a.500" fontWeight="medium">
                    Hyperizre
                  </Text>
                </HStack>
                <Text color="shader.a.700">
                  Gear Club 2 pedal to the metal, race along more than 3,000
                  kilometers.
                </Text>
              </CardBox>
              <CardBox variant="baseStyle" padding={4}>
                <Text fontWeight="medium" color="black" mb={4}>
                  About Gear Club 2: Super Car
                </Text>
                <Text noOfLines={3} mb={5}>
                  Gear Club 2 pedal to the metal, race along more than 3,000
                  kilometers of tracks Each Mara, with the ingestion of a
                  Seasonal Catalyst, can become a Kodamara that’s or along the
                  coast, defend your position in more. with the ingestion of a
                  Seasonal Catalyst, can become a Kodamara that’s or along the
                  coast, defend your position in more.
                </Text>
                <NavLinkSocial />
              </CardBox>

              <CardBox variant="baseStyle" padding={4}>
                <Text fontWeight="medium" color="black" mb={2}>
                  Details
                </Text>
                <Flex flexDirection="column" gap={2.5}>
                  <HStack justifyContent="space-between">
                    <Text>Contract</Text>
                    <Text color="primary.a.500">0x3b5a...6b10e</Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text>Token ID</Text>
                    <Text color="primary.a.500">599</Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text>Token Standard</Text>
                    <Text>ERC-721</Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text>Chain</Text>
                    <Text>Etherum</Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text>Last Updated</Text>
                    <Text>2 hours ago</Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text>Creator Earning</Text>
                    <Text>8%</Text>
                  </HStack>
                </Flex>
              </CardBox>
            </Flex>
          </TabPanel>
          <TabPanel padding={6}>
            <Grid
              gridTemplateColumns={{
                md: 'repeat(3,1fr)',
                base: 'repeat(2,1fr)',
              }}
              gridGap={2.5}
            >
              {DataTestNftAttributes.map((item, index) => (
                <Box
                  borderRadius="xl"
                  border="0.063rem solid"
                  borderColor="shader.a.300"
                  bg="shader.a.100"
                  key={index}
                  padding={4}
                >
                  <Text fontSize="sm" color="shader.a.500">
                    {item.attr}
                  </Text>
                  <HStack>
                    <Text fontWeight="medium">{item.name}</Text>
                    <Text color="second.purple" fontSize="sm">
                      {item.rarity}%
                    </Text>
                  </HStack>
                </Box>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CardBox>
  );
}
