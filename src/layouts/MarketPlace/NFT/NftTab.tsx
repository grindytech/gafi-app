import {
  Box,
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';

const NftTab = () => {
  return (
    <CardBox variant="baseStyle" padding={0}>
      <Tabs variant="baseStyle">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Atributes</Tab>
          <Tab>Auctions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel padding={0}>
            <Flex flexDirection="column" gap={5} padding={6}>
              <Box>
                <Text fontWeight="medium" color="black" mb={2}>
                  Description
                </Text>
                <Text noOfLines={3}>
                  Gear Club 2 pedal to the metal, race along more than 3,000
                  kilometers of tracks Each Mara, with the ingestion of a
                  Seasonal Catalyst, can become a Kodamara that’s or along the
                  coast, defend your position in more. with the ingestion of a
                  Seasonal Catalyst, can become a Kodamara that’s or along the
                  coast, defend your position in more.
                </Text>
              </Box>
              <HStack>
                <Text color="shader.a.500">Owned by</Text>
                <Text color="primary.a.500" fontWeight="medium">
                  0x3b5a...6b10e
                </Text>
              </HStack>
              <CardBox variant="baseStyle" padding={4}>
                <Text fontWeight="medium" color="black" mb={2}>
                  Details
                </Text>
                <Flex flexDirection="column" gap={2.5}>
                  <HStack justifyContent="space-between">
                    <Text>Contract</Text>
                    <Text>0x3b5a...6b10e</Text>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Text>Token ID</Text>
                    <Text>599</Text>
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
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CardBox>
  );
};

export default NftTab;
