import {
  Button,
  HStack,
  Heading,
  useDisclosure,
  Text,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { Metadata } from '@polkadot/types/metadata';
import { useAppSelector } from 'hooks/useRedux';
import SettingIcon from 'public/assets/line/setting.svg';
import ReactJson from 'react-json-view';
import React, { useState, useEffect } from 'react';
import CardBox from 'components/CardBox';
import { useQuery } from '@tanstack/react-query';
interface IMetadata {
  data: Metadata | undefined;
  version: number;
}
const MetaData = () => {
  const [metadata, setMetadata] = useState<IMetadata>();
  const { api } = useAppSelector(state => state.substrate);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await api?.rpc.state.getMetadata();
        if (data) {
          setMetadata({ data, version: data?.version ? data?.version : 0 });
        }
      } catch (e) {
        console.error(e);
      }
    };
    getMetadata();
  }, [api?.rpc.state]);
  return (
    <>
      <CardBox variant="baseStyle">
        <Heading fontSize="lg" color="shader.a.900" mb={6}>
          Metadata
        </Heading>
        <Button
          variant="primary"
          mb={3}
          width="full"
          height="44px"
          onClick={() => onOpen()}
        >
          Show metadata
        </Button>
        <HStack>
          <Icon as={SettingIcon} />
          <Text color="shader.a.500">v{metadata?.version}</Text>
        </HStack>
      </CardBox>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader color="primary.a.500">Runtime Data</ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <ReactJson
              collapsed={4}
              style={{
                whiteSpace: 'pre',
                overflow: 'auto',
              }}
              src={
                metadata?.data
                  ? JSON.parse(metadata.data.toString())
                  : { data: 'loading...' }
              }
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MetaData;
