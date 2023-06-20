import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import CollectionAdd from 'components/Collection/CollectionAdd';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

import React from 'react';
import { useForm } from 'react-hook-form';
import ItemAdd from '../ItemAdd';
import AddSupplyAmount from './AddSupplyAmount';
import AddSupplyModal from './AddSupplyModal';
import GameOwner from 'components/Game/GameOwner';

export default function AddSupply() {
  const { getValues, setValue } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner setValue={setValue} sx={{ padding: 4 }} />

        <SwitchAdmin setValue={setValue} />

        <CollectionAdd setValue={setValue} />

        <ItemAdd setValue={setValue} />

        <AddSupplyAmount setValue={setValue} />

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && <AddSupplyModal onClose={onClose} getValues={getValues} />}
    </>
  );
}
