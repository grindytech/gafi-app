import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import CreateCollectionsModal from './CreateCollectionsModal';
import { UseFormSetValue, useForm } from 'react-hook-form';

import useForceMount from 'hooks/useForceMount';
import CollectionID from 'components/Collection/CollectionID';
import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

export interface CreateCollectionFieldProps extends TypeSwitchAdmin {
  collection_id: string;
}

export default function CollectionsCreate() {
  const { setValue, getValues, handleSubmit } =
    useForm<CreateCollectionFieldProps>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mounting, setMounting } = useForceMount();

  return (
    <Flex
      onSubmit={handleSubmit(onOpen)}
      as="form"
      flexDirection="column"
      gap={3}
    >
      <SwitchAdmin
        setValue={setValue as unknown as UseFormSetValue<TypeSwitchAdmin>}
        type="Owner"
      />

      <CollectionID setValue={setValue} refetch={mounting} />

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
          refetch={setMounting}
          onClose={onClose}
          getValues={getValues}
        />
      )}
    </Flex>
  );
}
