import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import React from 'react';
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import AcceptCollectionsModal from './AcceptCollectionsModal';
import GameOwner from 'components/Game/GameOwner';
import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';

export interface AcceptCollectionsFieldProps extends TypeSwitchAdmin {
  collection_id: string;
  game_id: string;
}

export default function AcceptCollections() {
  const { setValue, getValues } = useForm<AcceptCollectionsFieldProps>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner />

        <SwitchAdmin
          setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
        />

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
