import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';

import { Dispatch, SetStateAction, useState } from 'react';
import { convertHex, shorten } from 'utils';
import AddIcon from 'public/assets/line/add.svg';
import JohnPopover from 'layouts/JohnPopover';

import UserIcon from 'public/assets/line/user.svg';
import { colors } from 'theme/theme';
import { useAccountContext } from 'contexts/contexts.account';
import { TypeCollaboratorState } from 'types/collaborator.type';

interface CollaboratorsMenuProps {
  address: string;
  index: number;
  setCollaborators: Dispatch<SetStateAction<TypeCollaboratorState>>;
}

export default ({
  index,
  address,
  setCollaborators,
}: CollaboratorsMenuProps) => {
  const { account } = useAccountContext();

  const toast = useToast();

  const { isOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: isError,
    onOpen: onError,
    onClose: closeError,
  } = useDisclosure();

  const [text, setText] = useState('');

  const onReset = () => {
    closeError();
    setText('');
    onClose();
  };

  const onChange = (address: string, name: string) => {
    if (address.length < 48) {
      onError();

      return toast({
        description: `address should be than 48 characters (you only ${address.length})`,
        position: 'top-right',
        isClosable: true,
        status: 'error',
      });
    }

    setCollaborators(prev => {
      const instance = [...prev];
      instance[index].account = { address, name };

      return instance;
    });

    onReset();
  };

  return (
    <>
      {account.all?.length ? (
        <JohnPopover
          isOpen={isOpen}
          onToggle={onToggle}
          onClose={() => {
            onClose();
            onReset();
          }}
          sx={{
            sx: {
              button: {
                color: 'primary.a.300',
              },
              '.chakra-popover__content': {
                height: account.all.length > 3 ? 72 : 'auto',
                bg: 'shader.a.900',
              },
            },
          }}
        >
          <Box padding={6}>
            <InputGroup height={10}>
              <InputLeftElement height="full">
                <Icon as={UserIcon} width={5} height={5} color="shader.a.500" />
              </InputLeftElement>

              <Input
                variant="unstyled"
                placeholder="Add more collaborators"
                color="shader.a.300"
                _placeholder={{ color: 'shader.a.500' }}
                border="0.0625rem solid"
                borderColor={isError ? 'second.red!' : 'shader.a.800'}
                bg={convertHex(colors.shader.a[800], 0.25)}
                pl={9}
                pr={9}
                borderRadius="lg"
                _focusVisible={{
                  borderColor: 'primary.a.400',
                }}
                value={text}
                onChange={({ target }) => setText(target.value)}
              />

              <InputRightElement
                height="full"
                opacity={text ? 1 : 0}
                pointerEvents={text ? undefined : 'none'}
                aria-label={`right-element ${!!text}`}
              >
                <Icon
                  as={AddIcon}
                  width={6}
                  height={6}
                  color="primary.a.300"
                  cursor="pointer"
                  onClick={() => onChange(text, '')}
                />
              </InputRightElement>
            </InputGroup>
          </Box>

          {account.all
            .filter(meta => meta.address !== address)
            .map(meta => (
              <Flex
                key={meta.address}
                px={6}
                py={4}
                gap={4}
                transitionDuration="ultra-slow"
                cursor="pointer"
                onClick={() => onChange(meta.address, meta.name as string)}
                _hover={{
                  bg: 'shader.a.700',
                }}
              >
                <AvatarJazzicon value={meta.address} size={36} />

                <Box fontWeight="bold">
                  <Text color="white">{meta.name}</Text>

                  <Text mt={2} color="shader.a.400" fontSize="sm">
                    {shorten(meta.address, 12)}
                  </Text>
                </Box>
              </Flex>
            ))}
        </JohnPopover>
      ) : null}
    </>
  );
};
