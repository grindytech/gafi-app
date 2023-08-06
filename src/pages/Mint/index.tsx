import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import { UseFormSetValue, useForm } from 'react-hook-form';

import MintModal from './components/MintModal';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import MintWeight from './components/MintWeight';
import NumberInput from 'components/NumberInput';
import CardBox from 'components/CardBox';
import MintBanner from './components/MintBanner';
import NumberInputMaxLength from 'components/NumberInput/NumberInputMaxLength';
import { isNull } from '@polkadot/util';

export interface MintFieldProps extends TypeSwitchAdmin {
  amount: string;
  pool_id: string;
}

export default function Mint() {
  const { setValue, getValues, watch, handleSubmit, control, reset } =
    useForm<MintFieldProps>();

  const { amount, pool_id } = watch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={{ xl: 32 }}>
      <MintBanner />

      <Flex
        onSubmit={handleSubmit(onOpen)}
        as="form"
        flexDirection="column"
        gap={3}
        px={5}
        transform="translateY(-5%)"
      >
        <SwitchAdmin
          type="Owner"
          setValue={setValue as keyof UseFormSetValue<TypeSwitchAdmin>}
        />

        <CardBox variant="createGames">
          <NumberInputMaxLength
            formState={{
              control,
              value: 'amount',
              isInvalid: isNull(amount),
              isRequired: true,
              min: 1,
              max: 10,
            }}
            heading="Amount"
          />
        </CardBox>

        <CardBox variant="createGames">
          <NumberInput
            formState={{
              control,
              value: 'pool_id',
              isInvalid: isNull(pool_id),
              isRequired: true,
            }}
            heading="Pool ID"
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

      {isOpen ? (
        <MintModal onClose={onClose} getValues={getValues} reset={reset} />
      ) : null}
    </Box>
  );
}
