import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import { UseFormSetValue, useForm } from 'react-hook-form';

import AddSupplyModal from './AddSupplyModal';

import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';
import { isNull } from '@polkadot/util';

export interface AddSupplyFieldProps extends TypeSwitchAdmin {
  collection_id: number;
  item_id: number;
  supply: number;
}

export default function AddSupply() {
  const { getValues, setValue, handleSubmit, control, watch, reset } =
    useForm<AddSupplyFieldProps>();

  const { supply, collection_id, item_id } = watch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onOpen)}
      flexDirection="column"
      gap={3}
    >
      <SwitchAdmin
        setValue={setValue as keyof UseFormSetValue<TypeSwitchAdmin>}
      />

      <CardBox variant="createGames">
        <NumberInput
          formState={{
            control,
            value: 'collection_id',
            isInvalid: isNull(collection_id),
            isRequired: true,
          }}
          heading="Collection ID"
        />
      </CardBox>

      <CardBox variant="createGames">
        <NumberInput
          formState={{
            control,
            value: 'item_id',
            isInvalid: isNull(item_id),
            isRequired: true,
          }}
          heading="NFT ID"
        />
      </CardBox>

      <CardBox variant="createGames">
        <NumberInput
          formState={{
            control,
            value: 'supply',
            isInvalid: isNull(supply),
            isRequired: true,
          }}
          heading="Supply"
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

      {isOpen && (
        <AddSupplyModal onClose={onClose} getValues={getValues} reset={reset} />
      )}
    </Flex>
  );
}
