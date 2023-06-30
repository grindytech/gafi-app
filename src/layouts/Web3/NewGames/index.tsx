import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';

import GoBack from 'components/GoBack';

import NewGamesAuthorize from './components/NewGamesAuthorize';
import { FieldValues, UseFormSetValue, useForm } from 'react-hook-form';

import SwitchAdmin, {
  TypeSwitchAdmin,
} from 'components/SwitchAdmin/SwitchAdmin';

import useForceMount from 'hooks/useForceMount';
import GameOwner from 'components/Game/GameOwner';
import GameID from 'components/Game/GameID';

export interface NewGamesFieldProps extends TypeSwitchAdmin {
  game_id: string;
}

export default function NewGames() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mounting, setMounting } = useForceMount();
  const { setValue, getValues } = useForm<NewGamesFieldProps>();

  return (
    <Box
      px={{
        lg: 48,
      }}
    >
      <GoBack />

      <Heading
        fontSize="xl"
        fontWeight="bold"
        color="shader.a.900"
        mt={8}
        mb={6}
      >
        🎮 Create games
      </Heading>

      <Flex flexDirection="column" gap={3}>
        <GameOwner />

        <SwitchAdmin
          setValue={setValue as FieldValues as UseFormSetValue<TypeSwitchAdmin>}
        />

        <GameID setValue={setValue} refetch={mounting} />

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
        <NewGamesAuthorize
          refetch={setMounting}
          onClose={onClose}
          getValues={getValues}
        />
      )}
    </Box>
  );
}
