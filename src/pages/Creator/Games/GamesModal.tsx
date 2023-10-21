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
import { UseFormGetValues } from 'react-hook-form';
import { GamesFieldProps } from '.';
import { convertHex } from 'utils';
import { colors } from 'theme/theme';

import useSignAndSend from 'hooks/useSignAndSend';
import cloudinary_axios, {
  cloudinary_config,
  cloudinary_upload_type,
  cloundinary_link,
} from 'axios/cloudinary_axios';
import { useSubstrateContext } from 'contexts/contexts.substrate';
import { useAccountContext } from 'contexts/contexts.account';

interface GamesModalProps {
  isDisabled: boolean;
  getValues: UseFormGetValues<GamesFieldProps>;
  onSuccess: () => void;
}

export default ({ onSuccess, getValues, isDisabled }: GamesModalProps) => {
  const { account } = useAccountContext();
  const { api } = useSubstrateContext();

  const {
    category,
    collaborator,
    description,
    discord,
    logo,
    name,
    twitter,
    website,
  } = getValues();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { isLoading, setIsLoading, mutation } = useSignAndSend({
    key: [`create_collection`, account.current?.address as string],
    address: account.current?.address as string,
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

      <Modal
        isOpen={isOpen}
        size="lg"
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />

        <ModalContent borderRadius="xl" bg="shader.a.900">
          <ModalHeader
            padding={6}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="white" fontSize="lg" fontWeight="medium">
              Create Game
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
                  formData.append('file', logo);
                  formData.append(
                    'upload_preset',
                    String(cloudinary_config.preset_key)
                  );

                  setIsLoading(true);

                  cloudinary_axios
                    .post(cloudinary_upload_type.image, formData)
                    .then(item => {
                      const parse: Omit<
                        GamesFieldProps,
                        'logo' | 'banner' | 'cover' | 'collaborator'
                      > & {
                        logo: string;
                        banner?: string;
                        cover?: string;
                      } = {
                        // general
                        name,
                        category,
                        description,
                        website,
                        twitter,
                        discord,

                        // media
                        logo: cloundinary_link(
                          `v${item.data.version}/${item.data.public_id}.${item.data.format}`
                        ),
                        banner: undefined,
                        cover: undefined,
                      };

                      mutation(
                        api?.tx.game.createGameWithData(
                          collaborator.account.address,
                          JSON.stringify(parse)
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
    </>
  );
};
