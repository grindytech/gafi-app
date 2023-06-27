import { Metadata, Text as PolText } from '@polkadot/types';
import {
  Box,
  Flex,
  VStack,
  Text,
  HStack,
  Select,
  Icon,
  IconProps,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { useState, useEffect } from 'react';
import SettingIcon from 'public/assets/line/setting.svg';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import config from 'config';
import { substrateConnect } from 'redux/substrate';
interface INodeInfo {
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
interface sIProps {
  socket: string;
}
const SubstrateNode = () => {
  const [nodeInfo, setNodeInfo] = useState<INodeInfo>();
  const { api, socket } = useAppSelector(state => state.substrate);

  const [currentSocket, setCurrentSocket] = useState(socket);
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
        console.error(e);
      }
    };
    getInfo();
  }, [api?.rpc.system]);
  const dispatch = useAppDispatch();
  /*  useEffect(() => {
    const setConnectSocket = async () => {
      dispatch(setConnectSocket({socket:{
        ap
      }}));
    };
    setConnectSocket();
  }, [currentSocket]); */
  return (
    <>
      <CardBox variant="baseStyle">
        <Flex flexDirection="column">
          <HStack mb={6}>
            <Text color="shader.a.900" fontWeight="medium" fontSize="lg">
              Substrate Node
            </Text>
            <CircleIcon boxSize={2} color="primary.a.500" />
            <Text>Total nodes: </Text>
            <Text color="primary.a.500">{nodeInfo?.peers}</Text>
          </HStack>

          <Select
            mb={3}
            defaultValue={socket}
            onChange={event => setCurrentSocket(event.target.value)}
          >
            {config.PROVIDER_SOCKETS.map(
              (socketAddress: string, index: number) => (
                <option key={index} value={socketAddress}>
                  {socketAddress}
                </option>
              )
            )}
          </Select>

          <HStack>
            <Icon as={SettingIcon} />
            <Text color="shader.a.500">{nodeInfo?.nodeVersion}</Text>
          </HStack>
        </Flex>
      </CardBox>
    </>
  );
};

export default SubstrateNode;
