import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';
import AddPriceItemModal from './AddPriceItemModal';

export interface AddPriceItemFieldProps extends TypeSwitchAdmin {
  collection_id: number;
  item_id: number;
  supply: number;
  price: number;
}

export default function AddPriceItem() {
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPriceItemFieldProps>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onOpen)}
      flexDirection="column"
      gap={3}
    >
      <SwitchAdmin
        setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
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
          value="supply"
          title="Supply"
          register={register}
          isInvalid={!!errors.supply}
          isRequired={true}
        />
      </CardBox>

      <CardBox variant="createGames">
        <NumberInput
          value="price"
          title="Price"
          register={register}
          isInvalid={!!errors.price}
          isRequired={true}
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

      {isOpen && <AddPriceItemModal onClose={onClose} getValues={getValues} />}
    </Flex>
  );
}
