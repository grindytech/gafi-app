import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { useAppSelector } from 'hooks/useRedux';
import { useRef } from 'react';
import { shorten } from 'utils/utils';
import AddIcon from 'public/assets/line/add.svg';
import JohnPopover from 'layouts/John/JohnPopover';

interface CollaboratorsMenuProps {
  setCollaborators: React.Dispatch<React.SetStateAction<Set<string[]>>>;
  meta: string[];
  address: string;
}

export default ({
  meta,
  address,
  setCollaborators,
}: CollaboratorsMenuProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const { allAccount } = useAppSelector(state => state.injected.polkadot);

  const ref_input = useRef<HTMLInputElement>(null);

  const onChange = (address: string, name: string) => {
    setCollaborators(prev => {
      const instance = new Set(prev);

      // remove old
      instance.delete(meta);

      // add new
      instance.add([meta[0], address, name]);

      return instance;
    });

    onClose();
  };

  return (
    <>
      {allAccount?.length ? (
        <>
          <JohnPopover
            isOpen={isOpen}
            onToggle={onToggle}
            onClose={onClose}
            sx={{
              sx: {
                button: {
                  color: 'primary.a.300',
                },
                '.chakra-popover__content': {
                  height: allAccount.length > 3 ? 72 : 'auto',
                  bg: 'shader.a.900',
                },
              },
            }}
          >
            <Box padding={6}>
              <InputGroup>
                <Input
                  variant="validate"
                  placeholder="Ex: 0x100"
                  border="0.0625rem solid"
                  borderColor="shader.a.700"
                  borderRadius="lg"
                  ref={ref_input}
                />

                <InputRightElement>
                  <Icon
                    as={AddIcon}
                    width={6}
                    height={6}
                    color="primary.a.300"
                    cursor="pointer"
                    onClick={() => {
                      if (ref_input.current) {
                        onChange(ref_input.current.value, '-');
                      }
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>

            {allAccount
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
                  <AvatarJazzicon
                    address={meta.address}
                    sx={{ width: '2.25rem', height: '2.25rem' }}
                  />

                  <Box fontWeight="bold">
                    <Text color="white">{meta.name}</Text>

                    <Flex gap={1} mt={2} color="shader.a.400" fontSize="sm">
                      {shorten(meta.address, 12)}
                      <ButtonCopy value={meta.address} />
                    </Flex>
                  </Box>
                </Flex>
              ))}
          </JohnPopover>
        </>
      ) : null}
    </>
  );
};
