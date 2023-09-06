import { Text as PolText } from '@polkadot/types';
import { Text, HStack, Select, Icon, IconProps, Box } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
import SettingIcon from 'public/assets/line/setting.svg';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import config from 'config';
import { setConnectSocket } from 'redux/substrate';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';

interface nodeInfoProps {
  chain: PolText;
  nodeName: PolText;
  nodeVersion: PolText;
  peers: number;
}

export const CircleIcon = (props: IconProps) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

export default function HomeSubstrateNode() {
  const [nodeInfo, setNodeInfo] = useState<nodeInfoProps>();
  const { api, socket } = useAppSelector(state => state.substrate);

  useEffect(() => {
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
  }, [api?.rpc.system]);
  const dispatch = useAppDispatch();

  const setConnect = async (value: string) => {
    dispatch(
      setConnectSocket({
        apiState: undefined,
        socket: value,
        payload: null,
      })
    );
  };

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
          defaultValue={socket}
          color="white"
          fontWeight="medium"
          borderColor="shader.a.800"
          bg={convertHex(colors.shader.a[800], 0.25)}
          borderRadius="xl"
          outline="unset"
          onChange={event => {
            setConnect(event.target.value);
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
