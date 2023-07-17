import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import GoBack from 'components/GoBack';

import NewGamesAuthorize from './components/NewGamesAuthorize';
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import useForceMount from 'hooks/useForceMount';
import GameOwner, { TypeGameOwner } from 'components/Game/GameOwner';
import GameID from 'components/Game/GameID';

export interface NewGamesFieldProps extends TypeSwitchAdmin, TypeGameOwner {
  game_id: string;
  title: string;
}

export default function NewGames() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mounting, setMounting } = useForceMount();
  const { setValue, getValues, handleSubmit } = useForm<NewGamesFieldProps>();

  return (
    <Box
      px={{
        lg: 48,
      }}
    >
      <GoBack />

      <Flex
        onSubmit={handleSubmit(onOpen)}
        as="form"
        flexDirection="column"
        gap={3}
        mt={8}
      >
        <GameOwner
          setValue={setValue as FieldValues as UseFormSetValue<TypeGameOwner>}
        />

        <SwitchAdmin
          setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
          add={true}
        />

        <GameID setValue={setValue} refetch={mounting} />

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

      {isOpen && (
        <NewGamesAuthorize
          refetch={setMounting}
          onClose={onClose}
          getValues={getValues}
        />
      )}
    </Box>
  );
}
