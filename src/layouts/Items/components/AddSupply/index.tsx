import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

import React from 'react';
import { useForm } from 'react-hook-form';

import AddSupplyModal from './AddSupplyModal';
import GameOwner from 'components/Game/GameOwner';
import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';

export default function AddSupply() {
  const { getValues, setValue } = useForm();

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
            value="item_id"
            title="Item ID"
            setValue={setValue}
            required={true}
          />
        </CardBox>

        <CardBox variant="createGames">
          <NumberInput
            value="amount"
            title="Amount"
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

      {isOpen && <AddSupplyModal onClose={onClose} getValues={getValues} />}
    </>
  );
}
