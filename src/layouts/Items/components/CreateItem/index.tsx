import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { useForm } from 'react-hook-form';

import useAccount from 'hooks/useAccount';

import CollectionAdd from 'components/Collection/CollectionAdd';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import CreateItemModal from './CreateItemModal';
import ItemAdd from '../ItemAdd';

export default function CreateItem() {
  const { setValue, getValues } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAccounts } = useAccount();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        {getAccounts ? (
          <SwitchAdmin getAccounts={getAccounts} setValue={setValue} />
        ) : null}

        <CollectionAdd setValue={setValue} />

        <ItemAdd setValue={setValue} />

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && <CreateItemModal onClose={onClose} getValues={getValues} />}
    </>
  );
}