import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import CreateCollectionsModal from './CreateCollectionsModal';
import { useForm } from 'react-hook-form';

import CollectionID from 'components/Collection/CollectionID';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import useAccount from 'hooks/useAccount';

export default function CollectionsCreate() {
  const { setValue, getValues } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAccounts } = useAccount();
  // onClose();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        {getAccounts ? (
          <SwitchAdmin getAccounts={getAccounts} setValue={setValue} />
        ) : null}

        <CollectionID setValue={setValue} refetch={onClose} />

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
        <CreateCollectionsModal onClose={onClose} getValues={getValues} />
      )}
    </>
  );
}
