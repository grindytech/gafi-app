import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import CollectionsID from './CollectionsID';
import { useForm } from 'react-hook-form';

import CollectionsGameID from './CollectionsGameID';
import CollectionsOwner from '../CollectionsOwner';
import CollectionsModal from './CollectionsModal';

export default function CollectionsAdd() {
  const { register, setValue, getValues } = useForm();
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

        <CollectionsID register={register} />

        <CollectionsGameID register={register} />

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
