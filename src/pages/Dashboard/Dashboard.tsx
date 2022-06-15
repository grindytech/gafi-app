import {
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { mdiCogOutline } from '@mdi/js';
import { Text as PolText } from '@polkadot/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BlockNumber from '../../BlockNumber';
import Events from '../../ChainEvents';
import Metadata from '../../Metadata';
import NodeInfo from '../../NodeInfo';

import BlockInfo from './components/BlockInfo';
import EventInfo from './components/EventInfo';

import Card from 'components/card/Card';
import featureFlag from 'components/FeatureFlags';
import { useSubstrateState } from 'substrate-lib';

interface IMetadata {
  data: any;
  version: number;
}

interface INodeInfo {
  chain: PolText;
  nodeName: PolText;
  nodeVersion: PolText;
}

const Dashboard = () => {
  const { t } = useTranslation();
  const { api, socket } = useSubstrateState();
  const [metadata, setMetadata] = useState<IMetadata>();
  const [nodeInfo, setNodeInfo] = useState<INodeInfo>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await api?.rpc.state.getMetadata();
        setMetadata({ data, version: data?.version ? data?.version : 0 });
      } catch (e) {
        console.error(e);
      }
    };
    getMetadata();
  }, [api?.rpc.state]);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api?.rpc.system.chain(),
          api?.rpc.system.name(),
          api?.rpc.system.version(),
        ]);
        if (chain && nodeName && nodeVersion)
          setNodeInfo({ chain, nodeName, nodeVersion });
      } catch (e) {
        console.error(e);
      }
    };
    getInfo();
  }, [api?.rpc.system]);
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
                    {nodeInfo?.nodeName}
                  </Text>
                  <Text fontSize="sm" fontWeight="light">
                    {nodeInfo?.chain}
                  </Text>
                  <Text color="black">{socket}</Text>
                  <HStack w="full" py={5} borderTop="1px solid #EEF1FF">
                    <Icon color="primary">
                      <path fill="currentColor" d={mdiCogOutline} />
                    </Icon>
                    <Text>v{nodeInfo?.nodeVersion}</Text>
                  </HStack>
                </VStack>
              </Card>
              <Card flex={1} h="full">
                <VStack alignItems="flex-start">
                  <Text mb={4} fontWeight="bold" color="primary">
                    {t('METADATA')}
                  </Text>
                  <Text fontSize="sm" fontWeight="light">
                    v{metadata?.version}
                  </Text>
                  <Button onClick={onOpen} w="full" variant="primary">
                    {t('SHOW_METADATA')}
                  </Button>
                </VStack>
              </Card>
            </HStack>
          </VStack>
          <EventInfo />
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            size="6xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{t('RUNTIME_METADATA')}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <pre>
                  <code>{JSON.stringify(metadata?.data, null, 2)}</code>
                </pre>
              </ModalBody>
            </ModalContent>
          </Modal>
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
