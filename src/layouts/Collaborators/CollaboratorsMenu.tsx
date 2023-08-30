import {
  Box,
  Flex,
  FlexProps,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { useAppSelector } from 'hooks/useRedux';
import Chevron01Icon from 'public/assets/line/chevron-01.svg';
import { useRef } from 'react';
import { shorten } from 'utils/utils';
import AddIcon from 'public/assets/line/add.svg';
import { CollaboratorsServiceProps } from '.';

interface CollaboratorsMenuProps {
  index: number;
  setCollaborators: React.Dispatch<
    React.SetStateAction<CollaboratorsServiceProps['initial']>
  >;
  sx?: FlexProps;
}

export default ({ setCollaborators, index, sx }: CollaboratorsMenuProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const { allAccount } = useAppSelector(state => state.injected.polkadot);

  const ref_container = useRef(null);
  const ref_input = useRef<HTMLInputElement>(null);

  useOutsideClick({
    ref: ref_container,
    handler: () => onClose(),
    enabled: isOpen,
  });

  const onChange = (address: string, name: string) => {
    setCollaborators(prev => {
      const shallow_array = [...prev];

      shallow_array[index] = { address, name, role: prev[index].role };

      return shallow_array;
    });

    onClose();
  };

  return (
    <Box ref={ref_container} {...sx}>
      <Icon
        as={Chevron01Icon}
        width={6}
        height={6}
        color="primary.a.300"
        cursor="pointer"
        onClick={onToggle}
      />

      <Box
        opacity={isOpen ? 1 : 0}
        pointerEvents={isOpen ? undefined : 'none'}
        position="absolute"
        inset="auto 0 0 0"
        transform="translateY(98%)"
        zIndex="docked"
        bg="shader.a.900"
        borderRadius="0 0 0.75rem 0.75rem"
        transitionDuration="ultra-slow"
        overflow="hidden"
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

        {allAccount?.map(meta => (
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
      </Box>
    </Box>
  );
};
