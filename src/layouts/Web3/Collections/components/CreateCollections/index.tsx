import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import CreateCollectionsModal from './CreateCollectionsModal';
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import CollectionID from 'components/Collection/CollectionID';
import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import GameOwner, { TypeGameOwner } from 'components/Game/GameOwner';

export interface CreateCollectionFieldProps
  extends TypeSwitchAdmin,
    TypeGameOwner {
  collection_id: string;
}

export default function CollectionsCreate() {
  const { setValue, getValues, handleSubmit, watch } =
    useForm<CreateCollectionFieldProps>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      onSubmit={handleSubmit(onOpen)}
      as="form"
      flexDirection="column"
      gap={3}
    >
      <GameOwner
        setValue={setValue as FieldValues as UseFormSetValue<TypeGameOwner>}
      />

      <SwitchAdmin
        setValue={setValue as unknown as UseFormSetValue<TypeSwitchAdmin>}
        type="Admin"
        watch={watch().role}
      />

      <CollectionID setValue={setValue} />

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
        <CreateCollectionsModal onClose={onClose} getValues={getValues} />
      )}
    </Flex>
  );
}
