import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import { UseFormSetValue, useForm } from 'react-hook-form';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';
import CreateItemModal from './CreateItemModal';

export interface CreateItemFieldProps extends TypeSwitchAdmin {
  collection_id: number;
  item_id: number;
  maybeSupply: number | null;
}

import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';

export default function CreateItem() {
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemFieldProps>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="form"
        onSubmit={handleSubmit(onOpen)}
        flexDirection="column"
        gap={3}
      >
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

        <CardBox variant="createGames">
          <NumberInput
            value="maybeSupply"
            title="Supply"
            register={register}
            setValue={setValue}
          />
        </CardBox>

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
