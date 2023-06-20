import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import GoBack from 'components/GoBack';

import NewGamesAuthorize from './components/NewGamesAuthorize';
import { useForm } from 'react-hook-form';

import GameID from 'components/Game/GameID';

import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

import useForceMount from 'hooks/useForceMount';
import GameOwner from 'components/Game/GameOwner';

export default function NewGames() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mounting, setMounting } = useForceMount();
  const { setValue, getValues } = useForm();

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
        <GameOwner setValue={setValue} />
        <SwitchAdmin setValue={setValue} />

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
