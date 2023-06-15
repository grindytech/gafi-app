import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import CollectionsOwner from '../CollectionsOwner';
import CollectionsID from './CollectionsID';
import CollectionsAdmin from './CollectionsAdmin';
import CollectionsModal from './CollectionsModal';
import { useForm } from 'react-hook-form';
import CollectionsMining from './CollectionsMining';

export default function CollectionsCreate() {
  const { setValue, getValues, register } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        flexDirection="column"
        gap={3}
        sx={{
          h6: {
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'shader.a.600',
          },
        }}
      >
        <CollectionsOwner setValue={setValue} />

        <CollectionsID setValue={setValue} />

        <CollectionsMining register={register} />

        <CollectionsAdmin setValue={setValue} />

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && <CollectionsModal onClose={onClose} getValues={getValues} />}
    </>
  );
}
