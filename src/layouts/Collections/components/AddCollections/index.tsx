import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

import AddCollectionsModal from './AddCollectionsModal';
import GameOwner from 'components/Game/GameOwner';
import NumberInput from 'components/NumberInput';
import CardBox from 'components/CardBox';

export default function AddCollections() {
  const { setValue, getValues } = useForm();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner />

        <SwitchAdmin setValue={setValue} />

        <CardBox variant="createGames">
          <NumberInput
            value="collection_id"
            title="Collection ID"
            setValue={setValue}
            required={true}
          />
        </CardBox>

        <CardBox variant="createGames">
          <NumberInput
            value="game_id"
            title="Game ID"
            setValue={setValue}
            required={true}
          />
        </CardBox>

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
