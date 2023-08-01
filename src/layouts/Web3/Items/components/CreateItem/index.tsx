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
import MaybeOptions from 'components/MaybeOptions/MaybeOptions';
import useToggleMultiple from 'hooks/useToggleMultiple';
import { isNull } from '@polkadot/util';

export default function CreateItem() {
  const { setValue, getValues, handleSubmit, watch, reset, control } =
    useForm<CreateItemFieldProps>();

  const { collection_id, item_id } = watch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isExpanded, setIsExpanded } = useToggleMultiple();

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

      <MaybeOptions
        title="Supply"
        toggle={isExpanded[0]}
        switchClick={() => setIsExpanded(0)}
        childrenOption={
          <NumberInput
            formState={{
              control,
              value: 'maybeSupply',
            }}
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

      {isOpen && (
        <CreateItemModal
          onClose={onClose}
          getValues={getValues}
          reset={reset}
        />
      )}
    </Flex>
  );
}
