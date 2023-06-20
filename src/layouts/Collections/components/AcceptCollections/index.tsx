import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import AcceptCollectionsModal from './AcceptCollectionsModal';
import GameOwner from 'components/Game/GameOwner';
import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';

export default function AcceptCollections() {
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
        <AcceptCollectionsModal onClose={onClose} getValues={getValues} />
      )}
    </>
  );
}
