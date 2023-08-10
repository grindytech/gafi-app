import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tr,
  Image,
} from '@chakra-ui/react';

import useSignAndSend from 'hooks/useSignAndSend';
import { AddMetadataCollectionFieldProps } from './index';

import cloudinary_axios, {
  cloudinary_config,
  cloudinary_upload_type,
} from 'axios/cloudinary_axios';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useAppSelector } from 'hooks/useRedux';
import AuthorizeProfile from 'layouts/AuthorizeProfile';

interface AddMetadataCollectionModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<AddMetadataCollectionFieldProps>;
  reset: UseFormReset<AddMetadataCollectionFieldProps>;
}
export default function AddMetadataCollectionModal({
  getValues,
  onClose,
  reset,
}: AddMetadataCollectionModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { collection_id, role, image, external_url, title } = getValues();

  const { setIsLoading, isLoading, mutation } = useSignAndSend({
    address: role.address,
    key: ['CollectionMetadataSet', collection_id],
    onSuccess() {
      reset({
        role: { ...role },
        collection_id: undefined,
        image: undefined,
        title: undefined,
        external_url: undefined,
      });
      onClose();
    },
    onError() {
      onClose();
    },
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size="xl"
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay />

      <ModalContent
        padding={{
          base: 4,
          md: 6,
        }}
        mx={3}
      >
        <ModalHeader px={0} pt={0} pb={6}>
          <Center justifyContent="space-between" pb={8}>
            <Heading fontWeight="bold" fontSize="xl" color="shader.a.900">
              Add Metadata Collection
            </Heading>

            <ModalCloseButton
              _hover={{}}
              _active={{}}
              position="unset"
              size="sm"
            />
          </Center>

          <AuthorizeProfile account={role.name} hash={role.address} />
        </ModalHeader>

        <ModalBody
          padding={0}
          borderWidth="0.0625rem 0 0.0625rem 0"
          borderColor="shader.a.300"
        >
          <Table variant="createGameSubmit">
            <Tbody>
              <Tr>
                <Td>Collection ID</Td>
                <Td>{collection_id}</Td>
              </Tr>

              <Tr>
                <Td>Image</Td>
                <Td>
                  <Image
                    src={URL.createObjectURL(image)}
                    height={20}
                    width={32}
                    objectFit="contain"
                    marginLeft="auto"
                  />
                </Td>
              </Tr>

              <Tr>
                <Td>Title</Td>
                <Td>{title}</Td>
              </Tr>

              <Tr>
                <Td>External URL</Td>
                <Td>{external_url}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="primary"
            isLoading={isLoading}
            _hover={{}}
            margin="unset"
            onClick={() => {
              if (api) {
                const formData = new FormData();
                formData.append('file', image);
                formData.append(
                  'upload_preset',
                  String(cloudinary_config.preset_key)
                );

                setIsLoading(true);

                cloudinary_axios
                  .post(cloudinary_upload_type.image, formData)
                  .then(item => {
                    const metaData = {
                      title: title,
                      image: `v${item.data.version}/${item.data.public_id}.${item.data.format}`,
                      external_url: external_url,
                    };

                    mutation(
                      api.tx.game.setCollectionMetadata(
                        collection_id,
                        JSON.stringify(metaData)
                      )
                    );
                  });
              }
            }}
          >
            Sign & Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}