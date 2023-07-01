import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

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
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptCollectionsFieldProps>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onOpen)}
      flexDirection="column"
      gap={3}
    >
      <GameOwner />

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
          value="game_id"
          title="Game ID"
          register={register}
          isInvalid={!!errors.game_id}
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

      {isOpen && (
        <AcceptCollectionsModal onClose={onClose} getValues={getValues} />
      )}
    </Flex>
  );
}
