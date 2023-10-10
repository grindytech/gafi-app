import { Text as PolText } from '@polkadot/types';
import { Text, HStack, Select, Icon, Box } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import SettingIcon from 'public/assets/line/setting.svg';
import config from 'config';
import { convertHex } from 'utils';
import { colors } from 'theme/theme';
import { useSubstrateContext } from 'contexts/contexts.substrate';

interface nodeInfoProps {
  chain: PolText;
  nodeName: PolText;
  nodeVersion: PolText;
  peers: number;
}

export default function HomeSubstrateNode() {
  const { api, PROVIDER_SOCKET, setSubstrate } = useSubstrateContext();

  const [nodeInfo, setNodeInfo] = useState<nodeInfoProps>();

  useEffect(() => {
    if (api?.isConnected) {
      const getInfo = async () => {
        try {
          const [chain, nodeName, nodeVersion, health] = await Promise.all([
            api?.rpc.system.chain(),
            api?.rpc.system.name(),
            api?.rpc.system.version(),
            api?.rpc.system.health(),
          ]);

          if (chain && nodeName && nodeVersion)
            setNodeInfo({
              chain,
              nodeName,
              nodeVersion,
              peers: (health?.peers.toNumber() || 0) + 1,
            });
        } catch (e) {
          /*    console.error(e); */
        }
      };

      getInfo();
    }
  }, [api?.rpc.system]);

  return (
    <Box
      borderRadius="xl"
      border="0.0625rem solid"
      borderColor="shader.a.800"
      bg="shader.a.900"
      width="full"
      padding={4}
    >
      <HStack mb={6} color="white">
        <Text color="white" fontWeight="medium" fontSize="lg">
          Substrate Node
        </Text>

        <Box
          width="0.3125rem"
          height="0.3125rem"
          bg="primary.a.400"
          borderRadius="full"
        />

        <Text>
          Total nodes:&nbsp;
          <Text as="span" color="primary.a.400" fontWeight="medium">
            {nodeInfo?.peers}
          </Text>
        </Text>
      </HStack>

      <Box>
        <Select
          defaultValue={PROVIDER_SOCKET}
          color="white"
          fontWeight="medium"
          borderColor="shader.a.800"
          bg={convertHex(colors.shader.a[800], 0.25)}
          borderRadius="xl"
          outline="unset"
          onChange={event => {
            setSubstrate(prev => ({
              ...prev,
              PROVIDER_SOCKET: event.target.value,
            }));
          }}
        >
          {config.PROVIDER_SOCKETS?.map((socketAddress: string) => (
            <option key={socketAddress} value={socketAddress}>
              {socketAddress}
            </option>
          ))}
        </Select>

        <HStack mt={3}>
          <Icon as={SettingIcon} width={4} height={4} color="primary.a.500" />

          <Text fontSize="sm" color="shader.a.500">
            {nodeInfo?.nodeVersion}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
