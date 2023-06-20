import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import MiningIcon from 'public/assets/art/mining.svg';

import { useForm } from 'react-hook-form';

import MintModal from './components/MintModal';

import MintAmount from './components/MintAmount';

import MintPoolID from './components/MintPoolID';

import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';
import GameOwner from 'components/Game/GameOwner';
import MintWeight from './components/MintWeight';

export default function Mint() {
  const { register, setValue, getValues, watch } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={{ xl: 48 }}>
        <Flex
          justifyContent="space-between"
          border="1px solid #E4E4E7"
          bg="shader.a.200"
          borderRadius="xl"
        >
          <Box padding={6}>
            <Heading fontSize="xl" fontWeight="bold" color="shader.a.900">
              Minning
            </Heading>

            <Text fontSize="sm" color="shader.a.600" whiteSpace="pre-line">
              {`Lorem ipsum dolor sit amet consectetur. 
              Neque velit commodo convallis`}
            </Text>
          </Box>

          <Box pr={24}>
            <MiningIcon />
          </Box>
        </Flex>

        <Flex
          flexDirection="column"
          gap={3}
          px={12}
          transform="translateY(-10%)"
        >
          <GameOwner />

          <SwitchAdmin setValue={setValue} type="Mint to" />

          <MintAmount setValue={setValue} watch={watch} />

          <MintPoolID register={register} />

          <MintWeight watch={watch} />

          <Button
            variant="createGameSubmit"
            isDisabled={isOpen}
            onClick={onOpen}
            _hover={{}}
          >
            Submit Transaction
          </Button>
        </Flex>

        {isOpen && <MintModal onClose={onClose} getValues={getValues} />}
      </Box>
    </>
  );
}
