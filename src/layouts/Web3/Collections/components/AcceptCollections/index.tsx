import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import { UseFormSetValue, useForm } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import AcceptCollectionsModal from './AcceptCollectionsModal';

import CardBox from 'components/CardBox';
import NumberInput from 'components/NumberInput';
import { isNull } from '@polkadot/util';

export interface AcceptCollectionsFieldProps extends TypeSwitchAdmin {
  collection_id: string;
  game_id: string;
}

export default function AcceptCollections() {
  const { setValue, getValues, handleSubmit, control, watch, reset } =
    useForm<AcceptCollectionsFieldProps>();

  const { collection_id, game_id } = watch();
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
            value: 'game_id',
            isInvalid: isNull(game_id),
            isRequired: true,
          }}
          heading="Game ID"
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
        <AcceptCollectionsModal
          onClose={onClose}
          getValues={getValues}
          reset={reset}
        />
      )}
    </Flex>
  );
}
