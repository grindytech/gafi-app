import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { useForm } from 'react-hook-form';

import CollectionAdd from 'components/Collection/CollectionAdd';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import CreateItemModal from './CreateItemModal';
import ItemAdd from '../ItemAdd';
import GameOwner from 'components/Game/GameOwner';

import CreateItemMaybeSupply from './CreateItemMaybeSupply';
import MaybeOptions from 'components/MaybeOptions/MaybeOptions';

export default function CreateItem() {
  const { setValue, getValues, reset } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: optionOpen, onToggle: optionToggle } = useDisclosure();

  React.useEffect(() => {
    if (!optionOpen) {
      reset(prev => ({
        ...prev,
        maybeSupply: null,
      }));
    }
  }, [optionOpen]);

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner />

        <SwitchAdmin setValue={setValue} />

        <CollectionAdd setValue={setValue} />

        <ItemAdd setValue={setValue} />

        <MaybeOptions
          title="Supply"
          isOpen={optionOpen}
          onToggle={optionToggle}
        >
          <CreateItemMaybeSupply setValue={setValue} />
        </MaybeOptions>

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && <CreateItemModal onClose={onClose} getValues={getValues} />}
    </>
  );
}
