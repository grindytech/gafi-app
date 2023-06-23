import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { UseFormSetValue, useForm } from 'react-hook-form';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';
import CreateItemModal from './CreateItemModal';
import GameOwner from 'components/Game/GameOwner';

export interface CreateItemFieldProps extends TypeSwitchAdmin {
  collection_id: number;
  item_id: number;
  maybeSupply: number | null;
}

import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';

import useMaybeOption from 'hooks/useMaybeOption';
import MaybeOptions from 'components/MaybeOptions/MaybeOptions';

export default function CreateItem() {
  const { setValue, getValues } = useForm<CreateItemFieldProps>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setIsExpanded, isExpanded } = useMaybeOption();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner />

        <SwitchAdmin
          setValue={setValue as unknown as UseFormSetValue<TypeSwitchAdmin>}
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
            value="item_id"
            title="Item ID"
            setValue={setValue}
            required={true}
          />
        </CardBox>

        <MaybeOptions
          title={`Supply`}
          arrow={{
            isChecked: isExpanded[0],
            onClick: () => setIsExpanded(0),
          }}
        >
          <NumberInput value="maybeSupply" title="Amount" setValue={setValue} />
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
