import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import CreateCollectionsModal from './CreateCollectionsModal';
import { useForm } from 'react-hook-form';
import GameOwner from 'components/Game/GameOwner';
import CollectionID from 'components/Collection/CollectionID';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import useAccount from 'hooks/useAccount';

export default function CollectionsCreate() {
  const { setValue, getValues } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAccounts } = useAccount();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <GameOwner
          type="Owner"
          setValue={setValue}
          sx={{
            padding: 4,
          }}
        />

        <CollectionID setValue={setValue} />

        {getAccounts ? (
          <SwitchAdmin getAccounts={getAccounts} setValue={setValue} />
        ) : null}

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
