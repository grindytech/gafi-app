import { HStack, Icon, Text } from '@chakra-ui/react';
import { mdiCog } from '@mdi/js';
import Card from './components/card/Card';
import CardHeader from './components/card/CardHeader';
import React, { useEffect, useState } from 'react';

import { useSubstrateState } from './substrate-lib';

function Main(props) {
  const { api, socket } = useSubstrateState();
  const [nodeInfo, setNodeInfo] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      try {
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
        ]);
        setNodeInfo({ chain, nodeName, nodeVersion });
      } catch (e) {
        console.error(e);
      }
    };
    getInfo();
  }, [api.rpc.system]);

  return (
    <Card>
      <CardHeader><Text fontWeight="bold">{nodeInfo.nodeName}</Text></CardHeader>
      <Text color="gray.500">{nodeInfo.chain}</Text>
      {socket}
      <HStack>

      <Icon color="gray.500">
        <path fill='currentColor' d={mdiCog} />
      </Icon><Text as="span" color="gray.500">v{nodeInfo.nodeVersion}</Text>
      </HStack>
    </Card>
  );
}

export default function NodeInfo(props) {
  const { api } = useSubstrateState();
  return api.rpc &&
    api.rpc.system &&
    api.rpc.system.chain &&
    api.rpc.system.name &&
    api.rpc.system.version ? (
    <Main {...props} />
  ) : null;
}
