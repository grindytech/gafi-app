import { Flex, useDisclosure } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import MaybeOptions from 'components/MaybeOptions/MaybeOptions';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import useForceMount from 'hooks/useForceMount';
import React from 'react';
import { useForm } from 'react-hook-form';

import PoolsCreateDynamicInput from './components/PoolsCreateDynamicInput';

export default function PoolsCreateDynamic() {
  const { isOpen, onOpen, onToggle } = useDisclosure();

  const { mounting, setMounting } = useForceMount();
  const { setValue, getValues } = useForm();

  return (
    <>
      <Flex flexDirection="column" gap={3}>
        <MaybeOptions isOpen={isOpen} onToggle={onToggle} title="Supply">
          123
          {/*  */}
        </MaybeOptions>

        <PoolsCreateDynamicInput
          value="weight"
          title="Weight"
          setValue={setValue}
        />

        <PoolsCreateDynamicInput
          value="mining_fee"
          title="Mining fee"
          setValue={setValue}
        />

        <SwitchAdmin setValue={setValue} />
      </Flex>
    </>
  );
}
