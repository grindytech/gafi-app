import {
  Box,
  Center,
  Flex,
  FlexProps,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import AvatarJazzicon from './AvatarJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { colors } from 'theme/theme';
import { convertHex } from 'utils/utils';

import Chevron01Icon from 'public/assets/line/chevron-01.svg';

interface AvatarProfileProps {
  address: string;
  name: string;
  division: 'Admin' | 'Freezer' | 'Issuer';
  sx?: FlexProps;
}

export default ({ address, name, division, sx }: AvatarProfileProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const getColor = (type: string): string => {
    if (type === 'Admin') return colors.primary.a[300];
    if (type === 'Freezer') return '#ffffff';
    if (type === 'Issuer') return '#ff7b00';

    return 'undefined';
  };

  const getDivision: AvatarProfileProps['division'][] = [
    'Admin',
    'Freezer',
    'Issuer',
  ];

  return (
    <Flex gap={4} {...sx}>
      <AvatarJazzicon
        address={address}
        sx={{ width: '2.25rem', height: '2.25rem' }}
      />

      <Box fontWeight="bold">
        <Flex gap={2}>
          <Text color="white">{name}</Text>

          <Center
            py={1}
            px={2}
            borderRadius="2xl"
            color={getColor(division)}
            bg={convertHex(getColor(division), 0.15)}
            onClick={onToggle}
            cursor="pointer"
          >
            {division}&nbsp;
            <Icon as={Chevron01Icon} width={4} height={4} />
          </Center>

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
            {getDivision
              .filter(data => data !== division)
              .map(meta => (
                <Text
                  key={meta}
                  color={getColor(meta)}
                  bg={convertHex(getColor(meta), 0.15)}
                  transitionDuration="ultra-slow"
                  cursor="pointer"
                  padding={2}
                  _hover={{
                    bg: 'shader.a.700',
                  }}
                  onClick={() => {
                    onClose();
                  }}
                >
                  {meta}
                </Text>
              ))}
          </Box>
        </Flex>

        <Flex gap={1} mt={2} color="shader.a.400" fontSize="sm">
          {address}
          <ButtonCopy value={address} />
        </Flex>
      </Box>
    </Flex>
  );
};
