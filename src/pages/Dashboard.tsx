import { Box, HStack } from '@chakra-ui/react';
import React from 'react';

import BlockNumber from '../BlockNumber';
import Metadata from '../Metadata';
import NodeInfo from '../NodeInfo';
import TemplateModule from '../TemplateModule';

const Dashboard = () => (
  <Box pt={{ base: '120px', md: '75px' }}>
    <HStack>
      <NodeInfo />
      <Metadata />
      <BlockNumber />
      <BlockNumber finalized />
    </HStack>
  </Box>
);

export default Dashboard;
