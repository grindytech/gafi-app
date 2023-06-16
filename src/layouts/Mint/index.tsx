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

import MintTo from './components/MintTo';
import MintAmount from './components/MintCollection';
import { useForm } from 'react-hook-form';
import MintCollection from './components/MintAmount';
import MintModal from './components/MintModal';
import MintOwner from './components/MintOwner';
import MintPercentItem from './components/MintPercentItem';

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
          sx={{
            h6: {
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'shader.a.600',
            },
          }}
        >
          <MintOwner setValue={setValue} />

          <MintTo setValue={setValue} />

          <MintAmount setValue={setValue} />

          <MintCollection register={register} />

          <MintPercentItem getValues={getValues} watch={watch} />

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
