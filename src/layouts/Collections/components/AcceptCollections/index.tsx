import Balance from 'components/Balance/Balance';
import CardBox from 'components/CardBox';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import useAccount from 'hooks/useAccount';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import AcceptCollectionsModal from './AcceptCollectionsModal';
import CollectionAdd from 'components/Collection/CollectionAdd';
import GameIDAdd from 'components/Game/GameIDAdd';

export default function AcceptCollections() {
  const { getAccounts } = useAccount();
  const { setValue, getValues } = useForm();

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
        <AcceptCollectionsModal onClose={onClose} getValues={getValues} />
      )}
    </>
  );
}
