import { Box, HStack, VStack } from '@chakra-ui/react';
import React from 'react';

import BlockNumber from '../../BlockNumber';
import Events from '../../ChainEvents';
import Metadata from '../../Metadata';
import NodeInfo from '../../NodeInfo';
import TemplateModule from 'TemplateModule';

const Dashboard = () => (
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
);

export default Dashboard;
