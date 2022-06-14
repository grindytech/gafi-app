import { Box, Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { mdiCogOutline } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import BlockNumber from '../../BlockNumber';
import Events from '../../ChainEvents';
import Metadata from '../../Metadata';
import NodeInfo from '../../NodeInfo';

import BlockInfo from './components/BlockInfo';
import EventInfo from './components/EventInfo';

import Card from 'components/card/Card';
import featureFlag from 'components/FeatureFlags';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      {featureFlag.isDisplayNewDashboardUI ? (
        <HStack spacing={4} alignItems="flex-start">
          <VStack spacing={4} flex={6}>
            <HStack spacing={4} w="full">
              <BlockInfo />
              <BlockInfo isFinalized />
            </HStack>
            <HStack spacing={4} w="full">
              <Card h="full" pb={0} flex={1}>
                <VStack alignItems="flex-start">
                  <Text mb={4} fontWeight="bold" color="primary">
                    {t('FRONTIER_NODE')}
                  </Text>
                  <Text fontSize="sm" fontWeight="light">
                    {t('GAKI_TESTNET')}
                  </Text>
                  <Text color="black">wss://ws.gafi.network</Text>
                  <HStack w="full" py={5} borderTop="1px solid #EEF1FF">
                    <Icon color="primary">
                      <path fill="currentColor" d={mdiCogOutline} />
                    </Icon>
                    <Text>v4.0.0-dev-3d816e8</Text>
                  </HStack>
                </VStack>
              </Card>
              <Card flex={1} h="full">
                <VStack alignItems="flex-start">
                  <Text mb={4} fontWeight="bold" color="primary">
                    {t('METADATA')}
                  </Text>
                  <Text fontSize="sm" fontWeight="light">
                    V14
                  </Text>
                  <Button w="full" variant="primary">
                    {t('SHOW_METAMASK')}
                  </Button>
                </VStack>
              </Card>
            </HStack>
          </VStack>
          <EventInfo />
        </HStack>
      ) : (
        <Box pt={{ base: '120px', md: '75px' }}>
          <VStack alignItems="stretch" gap={3}>
            <HStack alignItems="stretch">
              <NodeInfo />
              <Metadata />
              <BlockNumber />
              <BlockNumber finalized />
            </HStack>
            <Events />
          </VStack>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
