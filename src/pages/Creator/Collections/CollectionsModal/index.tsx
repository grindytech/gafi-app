import { UseFormGetValues } from 'react-hook-form';
import { CollectionsFieldProps } from '..';
import {
  Button,
  Center,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';
import { TypeCollaboratorsRole } from 'layouts/Collaborators/CollaboratorsUtils';
import cloudinary_axios, {
  cloudinary_config,
  cloudinary_upload_type,
} from 'axios/cloudinary_axios';

interface CollectionsModalProps {
  isDisabled: boolean;
  getValues: UseFormGetValues<CollectionsFieldProps>;
  onSuccess: () => void;
}

export default ({
  onSuccess,
  getValues,
  isDisabled,
}: CollectionsModalProps) => {
  const {
    general_collection_title,
    general_description,
    general_external_url,
    media_avatar,
    media_banner,
    media_cover,
    collaborator,
    general_join_game,
  } = getValues();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, setIsLoading, mutation } = useSignAndSend({
    key: [`create_collection`, account?.address as string],
    address: account?.address as string,
    onSuccess() {
      onSuccess();
      onClose();
    },
  });

  return (
    <>
      <Button variant="primary" onClick={onOpen} isDisabled={isDisabled}>
        Sign & Submit
      </Button>

      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalOverlay />

        <ModalContent borderRadius="xl" bg="shader.a.900">
          <ModalHeader
            padding={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="white" fontSize="lg" fontWeight="medium">
              Create Collection
            </Text>

            <ModalCloseButton
              position="unset"
              width={6}
              height={6}
              color="white"
            />
          </ModalHeader>

          <ModalFooter
            padding={6}
            bg={convertHex(colors.shader.a[800], 0.25)}
            borderTop="0.0625rem solid"
            borderColor="shader.a.800"
            display="block"
          >
            <Center justifyContent="space-between" mb={6}>
              <Text color="shader.a.500">Transaction fee</Text>

              <Text as="span" color="white" fontWeight="semibold">
                50,6895 GAFI
              </Text>
            </Center>

            <Button
              width="full"
              variant="primary"
              isLoading={isLoading}
              onClick={() => {
                if (api) {
                  const formData = new FormData();
                  formData.append('file', media_avatar);
                  formData.append(
                    'upload_preset',
                    String(cloudinary_config.preset_key)
                  );

                  setIsLoading(true);

                  cloudinary_axios
                    .post(cloudinary_upload_type.image, formData)
                    .then(item => {
                      const parse = JSON.stringify({
                        title: general_collection_title,
                        description: general_description,
                        external_url: general_external_url,
                        avatar: `v${item.data.version}/${item.data.public_id}.${item.data.format}`,
                        banner: media_banner,
                        cover: media_cover,
                      });

                      mutation(
                        api?.tx.game.createCollectionWithData(
                          group('Admin') as string,
                          parse,
                          group('Issuer'),
                          group('Freezer'),
                          general_join_game?.game_id || null
                        )
                      );
                    });
                }

                const group = (type: TypeCollaboratorsRole) => {
                  return (
                    collaborator.find(({ role }) => role === type)?.account
                      .address || null
                  );
                };
              }}
            >
              Sign & Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
