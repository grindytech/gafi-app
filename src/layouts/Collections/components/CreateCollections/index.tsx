import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import CreateCollectionsModal from './CreateCollectionsModal';
import { useForm } from 'react-hook-form';

import CollectionID from 'components/Collection/CollectionID';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

import useForceMount from 'hooks/useForceMount';
import GameOwner from 'components/Game/GameOwner';

export default function CollectionsCreate() {
  const { setValue, getValues } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mounting, setMounting } = useForceMount();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner />

        <SwitchAdmin setValue={setValue} />

        <CollectionID setValue={setValue} refetch={mounting} />

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && (
        <CreateCollectionsModal
          refetch={setMounting}
          onClose={onClose}
          getValues={getValues}
        />
      )}
    </>
  );
}
