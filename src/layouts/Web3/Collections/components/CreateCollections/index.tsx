import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import CreateCollectionsModal from './CreateCollectionsModal';
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import CollectionID from 'components/Collection/CollectionID';
import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import { useOutletContext } from 'react-router-dom';
import { Web3OutletContextProps } from 'pages/Web3';
import GameOwner, { TypeGameOwner } from 'components/Game/GameOwner';

export interface CreateCollectionFieldProps extends TypeSwitchAdmin {
  collection_id: string;
}

export default function CollectionsCreate() {
  const { collection } = useOutletContext<Web3OutletContextProps>();

  const { setValue, getValues, handleSubmit } =
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
        add={true}
      />

      <CollectionID setValue={setValue} refetch={collection} />

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
        <CreateCollectionsModal
          refetch={collection}
          onClose={onClose}
          getValues={getValues}
        />
      )}
    </Flex>
  );
}
