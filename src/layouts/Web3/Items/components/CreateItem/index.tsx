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

import MaybeOptions from 'components/MaybeOptions/MaybeOptions';
import useToggleMultiple from 'hooks/useToggleMultiple';

export default function CreateItem() {
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm<CreateItemFieldProps>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setIsExpanded, isExpanded } = useToggleMultiple();

  React.useEffect(() => {
    if (!isExpanded[0]) {
      unregister(`maybeSupply`);
      setValue(`maybeSupply`, null);
    }
  }, [isExpanded]);

  return (
    <>
      <Flex
        as="form"
        onSubmit={handleSubmit(onOpen)}
        flexDirection="column"
        gap={3}
      >
        <GameOwner />

        <SwitchAdmin
          setValue={setValue as unknown as UseFormSetValue<TypeSwitchAdmin>}
        />

        <CardBox variant="createGames">
          <NumberInput
            value="collection_id"
            title="Collection ID"
            register={register}
            isInvalid={!!errors.collection_id}
            isRequired={true}
          />
        </CardBox>

        <CardBox variant="createGames">
          <NumberInput
            value="item_id"
            title="Item ID"
            register={register}
            isInvalid={!!errors.item_id}
            isRequired={true}
          />
        </CardBox>

        <MaybeOptions
          title="Supply"
          toggle={isExpanded[0]}
          switchClick={() => setIsExpanded(0)}
          childrenOption={
            <NumberInput
              value="maybeSupply"
              title="Amount"
              register={register}
              isInvalid={!!errors.maybeSupply}
              isRequired={isExpanded[0]}
            />
          }
        />

        <Button
          isDisabled={isOpen}
          margin="auto"
          px={6}
          variant="primary"
          type="submit"
        >
          Submit Transaction
        </Button>

        {isOpen && <CreateItemModal onClose={onClose} getValues={getValues} />}
      </Flex>
    </>
  );
}
