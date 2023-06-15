import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import React from 'react';
import { useForm } from 'react-hook-form';
import ItemsOwner from '../ItemsOwner';
import ItemCollectionID from '../CreateItem/ItemCollectionID';

import ItemAmount from '../CreateItem/ItemAmount';
import ItemID from './ItemID';
import ItemModal from '../CreateItem/ItemModal';

export default function AddItem() {
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
        <ItemsOwner setValue={setValue} />

        <ItemCollectionID register={register} />

        <ItemID register={register} />

        <ItemAmount register={register} />

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && <ItemModal onClose={onClose} getValues={getValues} />}
    </>
  );
}
