import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import GoBack from 'components/GoBack';

import NewGamesUpload from './components/NewGamesUpload';
import NewGamesAccount from './components/NewGamesAccount';
import NewGamesTitle from './components/NewGamesTitle';
import NewsGamesID from './components/NewsGamesID';
import NewGamesAdmin from './components/NewGamesAdmin';
import NewGamesAuthorize from './components/NewGamesAuthorize';
import { useForm } from 'react-hook-form';
export default function NewGames() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

      <Flex
        flexDirection="column"
        gap={3}
        sx={{
          h6: {
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'shader.a.600',
          },
        }}
      >
        <NewGamesAccount setValue={setValue} />

        {/* hidden */}
        <NewGamesUpload register={register} />

        {/* hidden */}
        <NewGamesTitle register={register} />

        <NewsGamesID setValue={setValue} />

        <NewGamesAdmin setValue={setValue} />

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
