import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import CollectionAdd from 'components/Collection/CollectionAdd';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import useAccount from 'hooks/useAccount';
import React from 'react';
import { useForm } from 'react-hook-form';
import ItemAdd from '../ItemAdd';
import AddSupplyAmount from './AddSupplyAmount';
import AddSupplyModal from './AddSupplyModal';

export default function AddSupply() {
  const { getValues, setValue } = useForm();
  const { getAccounts } = useAccount();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        {getAccounts ? (
          <SwitchAdmin getAccounts={getAccounts} setValue={setValue} />
        ) : null}

        <CollectionAdd setValue={setValue} />

        <ItemAdd setValue={setValue} />

        <AddSupplyAmount setValue={setValue} />

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && <AddSupplyModal onClose={onClose} getValues={getValues} />}
    </>
  );
}
