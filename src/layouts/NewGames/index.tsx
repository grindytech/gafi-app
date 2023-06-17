import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import GoBack from 'components/GoBack';

import NewGamesAuthorize from './components/NewGamesAuthorize';
import { useForm } from 'react-hook-form';
import GameOwner from 'components/Game/GameOwner';
import GameID from 'components/Game/GameID';
import useAccount from 'hooks/useAccount';
import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import NewGamesUpload from './components/NewGamesUpload';
import NewGamesTitle from './components/NewGamesTitle';

export default function NewGames() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAccounts } = useAccount();

  const { register, setValue, getValues } = useForm();

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
        <GameOwner type="Owner" setValue={setValue} />

        {/* hidden */}
        {/* <NewGamesUpload register={register} /> */}

        {/* hidden */}
        {/* <NewGamesTitle register={register} /> */}

        <GameID setValue={setValue} />

        {getAccounts ? (
          <SwitchAdmin getAccounts={getAccounts} setValue={setValue} />
        ) : null}

        <Button
          variant="createGameSubmit"
          isDisabled={isOpen}
          onClick={onOpen}
          _hover={{}}
        >
          Submit Transaction
        </Button>
      </Flex>

      {isOpen && <NewGamesAuthorize onClose={onClose} getValues={getValues} />}
    </Box>
  );
}
