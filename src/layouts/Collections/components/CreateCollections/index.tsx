import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import CreateCollectionsModal from './CreateCollectionsModal';
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import useForceMount from 'hooks/useForceMount';
import GameOwner from 'components/Game/GameOwner';
import CollectionID from 'components/Collection/CollectionID';

export interface CreateCollectionFieldProps extends TypeSwitchAdmin {
  collection_id: string;
}

export default function CollectionsCreate() {
  const { setValue, getValues } = useForm<CreateCollectionFieldProps>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mounting, setMounting } = useForceMount();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner />

        <SwitchAdmin
          setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
        />

        <CollectionID setValue={setValue} refetch={mounting} />

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && (
        <CreateCollectionsModal
          refetch={setMounting}
          onClose={onClose}
          getValues={getValues}
        />
      )}
    </>
  );
}
