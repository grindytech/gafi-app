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
  const { setValue, getValues } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: optionOpen, onToggle: optionToggle } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner setValue={setValue} sx={{ padding: 4 }} />

        <SwitchAdmin setValue={setValue} />

        <CollectionAdd setValue={setValue} />

        <ItemAdd setValue={setValue} />

        <MaybeOptions
          isOpen={optionOpen}
          onToggle={optionToggle}
          sx={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
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
