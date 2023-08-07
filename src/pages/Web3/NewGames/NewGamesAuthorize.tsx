import {
  Button,
  Center,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { UseFormGetValues } from 'react-hook-form';

import useSignAndSend from 'hooks/useSignAndSend';
import { NewGamesFieldProps } from './index';
import { useAppSelector } from 'hooks/useRedux';
import AuthorizeProfile from 'layouts/AuthorizeProfile';

interface NewGamesAuthorizeProps {
  onClose: () => void;
  getValues: UseFormGetValues<NewGamesFieldProps>;
}

export default function NewGamesAuthorize({
  onClose,
  getValues,
}: NewGamesAuthorizeProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { game_id, role, owner } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: owner.address,
    key: ['createGame', game_id],
    onSuccess() {
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
              Authorize transaction
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

        <ModalFooter px={0} pb={0}>
          <Button
            variant="primary"
            isLoading={isLoading}
            _hover={{}}
            margin="unset"
            onClick={async () => {
              if (api) {
                mutation(api.tx.game.createGame(role.address));
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
