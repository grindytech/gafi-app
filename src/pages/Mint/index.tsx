import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

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
import NumberInputMaxLength from 'components/NumberInput/NumberInputMaxLength';

export interface MintFieldProps extends TypeSwitchAdmin {
  amount: string;
  pool_id: string;
}

export default function Mint() {
  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MintFieldProps>();

  const pool_id = watch('pool_id');

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={{ xl: 48 }}>
      <MintBanner />

      <Flex
        onSubmit={handleSubmit(onOpen)}
        as="form"
        flexDirection="column"
        gap={3}
        px={12}
        transform="translateY(-5%)"
      >
        <GameOwner />

        <SwitchAdmin
          setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
        />

        <CardBox variant="createGames">
          <NumberInputMaxLength
            control={control}
            title="Amount"
            value="amount"
            isInvalid={!!errors.amount}
            isRequired={true}
            max={10}
          />
        </CardBox>

        <CardBox variant="createGames">
          <NumberInput
            register={register}
            title="Pool ID"
            value="pool_id"
            isInvalid={!!errors.pool_id}
            isRequired={true}
          />
        </CardBox>

        {pool_id ? <MintWeight pool_id={pool_id} /> : null}

        <Button
          isDisabled={isOpen}
          margin="auto"
          px={6}
          variant="primary"
          type="submit"
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen ? <MintModal onClose={onClose} getValues={getValues} /> : null}
    </Box>
  );
}
