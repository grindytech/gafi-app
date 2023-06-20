import { Button, Flex, VStack, useDisclosure } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import MaybeOptions from 'components/MaybeOptions/MaybeOptions';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import useForceMount from 'hooks/useForceMount';
import React from 'react';
import { useForm } from 'react-hook-form';

import PoolsCreateDynamicInput from './components/PoolsCreateDynamicInput';
import NumberInput from 'components/NumberInput';

export default function PoolsCreateDynamic() {
  const { isOpen, onOpen, onToggle } = useDisclosure();
  const { isOpen: optionOpen, onToggle: optionToggle } = useDisclosure();
  // const { mounting, setMounting } = useForceMount();

  const { setValue, getValues } = useForm();

  const ListFieldOptions = [
    {
      value: 'collection_id',
      title: 'Collections ID',
    },
    {
      value: 'item_id',
      title: 'Items ID',
    },
    {
      value: 'weight',
      title: 'Weight',
      required: true,
    },
  ];

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <MaybeOptions
          isOpen={optionOpen}
          onToggle={optionToggle}
          title="Supply"
        >
          {React.Children.toArray(
            ListFieldOptions.map(item => (
              <NumberInput
                value={item.value}
                title={item.title}
                setValue={setValue}
                required={item.required}
              />
            ))
          )}
        </MaybeOptions>

        <CardBox variant="createGames">
          <NumberInput value="fee" title="Mining fee" setValue={setValue} />
        </CardBox>

        <SwitchAdmin setValue={setValue} />

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {/* {isOpen && (
        <NewGamesAuthorize
          refetch={setMounting}
          onClose={onClose}
          getValues={getValues}
        />
      )} */}
    </>
  );
}
