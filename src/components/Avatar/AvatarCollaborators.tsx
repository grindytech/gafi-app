import {
  Box,
  Center,
  Flex,
  FlexProps,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import AvatarJazzicon from './AvatarJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { colors } from 'theme/theme';
import { convertHex, shorten } from 'utils/utils';

import JohnPopover from 'layouts/John/JohnPopover';

interface AvatarProfileProps {
  meta: string[];
  options?: string[];
  sx?: FlexProps;
}

export default ({ meta, options, sx }: AvatarProfileProps) => {
  const [role, address, name] = meta;

  const { isOpen, onToggle, onClose } = useDisclosure();

  const getColor = (type: string): string => {
    if (type === 'Admin') return colors.primary.a[300];
    if (type === 'Freezer') return '#ffffff';
    if (type === 'Issuer') return '#ff7b00';

    return 'undefined';
  };

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
            color={getColor(role)}
            bg={convertHex(getColor(role), 0.15)}
          >
            {role}

            {options?.length ? (
              <>
                &nbsp;
                <JohnPopover
                  isOpen={isOpen}
                  onClose={onClose}
                  onToggle={onToggle}
                  sx={{
                    sx: {
                      '> button': {
                        svg: {
                          width: 5,
                          height: 5,
                          color: getColor(role),
                        },
                      },
                      '.chakra-popover__content': {
                        height: 'auto',
                      },
                    },
                  }}
                >
                  {options
                    .filter(meta => meta !== role)
                    .map(option => (
                      <Text
                        key={option}
                        color={getColor(option)}
                        bg={convertHex(getColor(option), 0.15)}
                        cursor="pointer"
                        padding={2}
                        onClick={() => {
                          onClose();
                        }}
                      >
                        {option}
                      </Text>
                    ))}
                </JohnPopover>
              </>
            ) : null}
          </Center>
        </Flex>

        <Flex gap={2} mt={2} color="shader.a.400" fontSize="sm">
          {shorten(address, 12)}
          <ButtonCopy value={address} />
        </Flex>
      </Box>
    </Flex>
  );
};
