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
import { useAppSelector } from 'hooks/useRedux';
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
const SubstrateNode = () => {
  const [nodeInfo, setNodeInfo] = useState<INodeInfo>();
  const { api } = useAppSelector(state => state.substrate);
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
  console.log(nodeInfo);

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
            <Text color="primary.a.500">2</Text>
          </HStack>
          <Select mb={3}></Select>
          <HStack>
            <Icon as={SettingIcon} />
            <Text color="shader.a.500">v4.0.0-dev-bb69deffd5</Text>
          </HStack>
        </Flex>
      </CardBox>
    </>
  );
};

export default SubstrateNode;
