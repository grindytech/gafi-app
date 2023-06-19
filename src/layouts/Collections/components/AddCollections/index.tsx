import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import useAccount from 'hooks/useAccount';
import AddCollectionsModal from './AddCollectionsModal';
import CollectionAdd from 'components/Collection/CollectionAdd';
import GameIDAdd from 'components/Game/GameIDAdd';

export default function AddCollections() {
  const { setValue, getValues } = useForm();
  const { getAccounts } = useAccount();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        {getAccounts ? (
          <SwitchAdmin getAccounts={getAccounts} setValue={setValue} />
        ) : null}

        <CollectionAdd setValue={setValue} />

        <GameIDAdd setValue={setValue} />

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
        <AddCollectionsModal onClose={onClose} getValues={getValues} />
      )}
    </>
  );
}
