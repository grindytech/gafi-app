import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { useForm } from 'react-hook-form';

import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import CreateItemModal from './CreateItemModal';
import GameOwner from 'components/Game/GameOwner';

import MaybeOptions from 'components/MaybeOptions/MaybeOptions';
import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';

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

        <MaybeOptions
          title="Supply"
          isOpen={optionOpen}
          onToggle={optionToggle}
        >
          <NumberInput
            value="maybeSupply"
            title="Amount"
            setValue={setValue}
            sx={{
              sx: {
                h2: {
                  fontSize: 'sm',
                  fontWeight: 'normal',
                  color: 'shader.,a.500',
                },
              },
            }}
          />
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
