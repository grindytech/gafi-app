import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import MintModal from './components/MintModal';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';
import GameOwner from 'components/Game/GameOwner';
import MintWeight from './components/MintWeight';
import NumberInput from 'components/NumberInput';
import CardBox from 'components/CardBox';
import MintBanner from './components/MintBanner';
import NumberInputLimit from 'components/NumberInput/NumberInputLimit';

export interface MintFieldProps extends TypeSwitchAdmin {
  amount: string;
  pool_id: string;
}

export default function Mint() {
  const { register, setValue, getValues, watch } = useForm<MintFieldProps>();
  const pool_id = watch('pool_id');

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={{ xl: 48 }}>
        <MintBanner />

        <Flex
          flexDirection="column"
          gap={3}
          px={12}
          transform="translateY(-2%)"
        >
          <GameOwner />

          <SwitchAdmin
            setValue={
              setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>
            }
          />

          <NumberInputLimit
            setValue={setValue}
            title="Amount"
            value="amount"
            min={0}
            max={10}
            required={true}
          />

          <CardBox variant="createGames">
            <NumberInput
              register={register}
              title="Pool ID"
              value="pool_id"
              required={true}
            />
          </CardBox>

          {pool_id ? <MintWeight pool_id={pool_id} /> : null}

          <Button
            variant="createGameSubmit"
            isDisabled={isOpen}
            onClick={onOpen}
            _hover={{}}
          >
            Submit Transaction
          </Button>
        </Flex>

        {isOpen ? <MintModal onClose={onClose} getValues={getValues} /> : null}
      </Box>
    </>
  );
}
