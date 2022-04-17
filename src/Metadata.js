import {
  Text,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Divider,
} from '@chakra-ui/react';
import CardHeader from './components/card/CardHeader';
import React, { useEffect, useState } from 'react';

import { useSubstrateState } from './substrate-lib';
import Card from './components/card/Card';

function Main(props) {
  const { api } = useSubstrateState();
  const [metadata, setMetadata] = useState({ data: null, version: null });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const data = await api.rpc.state.getMetadata();
        setMetadata({ data, version: data.version });
      } catch (e) {
        console.error(e);
      }
    };
    getMetadata();
  }, [api.rpc.state]);

  return (
    <Card justifyContent="space-between">
      <CardHeader>
        <Text fontSize="xl" fontWeight="bold">Metadata</Text>
      </CardHeader>
      <Text mb={5} color="gray.500">v{metadata.version}</Text>
      <Divider />
      <Button mt={5} onClick={onOpen}>Show Metadata</Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Runtime Metadata</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <pre>
              <code>{JSON.stringify(metadata.data, null, 2)}</code>
            </pre>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default function Metadata(props) {
  const { api } = useSubstrateState();
  return api.rpc && api.rpc.state && api.rpc.state.getMetadata ? (
    <Main {...props} />
  ) : null;
}
