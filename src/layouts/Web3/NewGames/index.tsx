import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import GoBack from 'components/GoBack';

import NewGamesAuthorize from './components/NewGamesAuthorize';
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import GameOwner, { TypeGameOwner } from 'components/Game/GameOwner';
import GameID from 'components/Game/GameID';

export interface NewGamesFieldProps extends TypeSwitchAdmin, TypeGameOwner {
  game_id: string;
}

export default function NewGames() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setValue, getValues, handleSubmit, watch } =
    useForm<NewGamesFieldProps>();

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
          watch={watch().role}
        />

        <GameID setValue={setValue} />

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

      {isOpen && <NewGamesAuthorize onClose={onClose} getValues={getValues} />}
    </Box>
  );
}
