import {
  Button,
  HStack,
  useDisclosure,
  Text,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from '@chakra-ui/react';
import { Metadata } from '@polkadot/types/metadata';
import SettingIcon from 'public/assets/line/setting.svg';
import ReactJson from 'react-json-view';
import { useState, useEffect } from 'react';
import { useSubstrateContext } from 'contexts/contexts.substrate';

interface MetadataProps {
  data: Metadata | undefined;
  version: number;
}

export default function HomeMetaData() {
  const { api } = useSubstrateContext();

  const [metadata, setMetadata] = useState<MetadataProps>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (api?.isConnected) {
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
    }
  }, [api?.rpc.state]);

  return (
    <>
      <Box
        borderRadius="xl"
        border="0.0625rem solid"
        borderColor="shader.a.800"
        bg="shader.a.900"
        width="full"
        padding={4}
      >
        <Text color="white" fontWeight="medium">
          Metadata
        </Text>

        <Button mt={6} width="full" variant="primary" onClick={onOpen}>
          Show metadata
        </Button>

        <HStack mt={3}>
          <Icon as={SettingIcon} width={4} height={4} color="primary.a.500" />

          <Text fontSize="sm" color="shader.a.500">
            v{metadata?.version}
          </Text>
        </HStack>
      </Box>

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
              style={{ whiteSpace: 'pre', overflow: 'auto' }}
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
}
