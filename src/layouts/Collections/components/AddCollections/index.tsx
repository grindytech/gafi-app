import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

import AddCollectionsModal from './AddCollectionsModal';
import CollectionAdd from 'components/Collection/CollectionAdd';
import GameIDAdd from 'components/Game/GameIDAdd';
import GameOwner from 'components/Game/GameOwner';

export default function AddCollections() {
  const { setValue, getValues } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner />

        <SwitchAdmin setValue={setValue} />

        <CollectionAdd setValue={setValue} />

        <GameIDAdd setValue={setValue} />

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
        <AddCollectionsModal onClose={onClose} getValues={getValues} />
      )}
    </>
  );
}
