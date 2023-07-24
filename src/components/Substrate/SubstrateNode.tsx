import { Text as PolText } from '@polkadot/types';
import { Flex, Text, HStack, Select, Icon, IconProps } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { useState, useEffect } from 'react';
import SettingIcon from 'public/assets/line/setting.svg';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import config from 'config';
import { setConnectSocket } from 'redux/substrate';

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

          <HStack>
            <Icon as={SettingIcon} width={4} height={4} color="primary.a.500" />
            <Text color="shader.a.500">{nodeInfo?.nodeVersion}</Text>
          </HStack>
        </Flex>
      </CardBox>
    </>
  );
};

export default SubstrateNode;
