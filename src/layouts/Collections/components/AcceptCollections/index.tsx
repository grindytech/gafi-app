import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import AcceptCollectionsModal from './AcceptCollectionsModal';
import CollectionAdd from 'components/Collection/CollectionAdd';
import GameIDAdd from 'components/Game/GameIDAdd';
import GameOwner from 'components/Game/GameOwner';

export default function AcceptCollections() {
  const { setValue, getValues } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner setValue={setValue} sx={{ padding: 4 }} />

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
        <AcceptCollectionsModal onClose={onClose} getValues={getValues} />
      )}
    </>
  );
}
