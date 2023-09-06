import { Box, Center, Flex, FlexProps, Text } from '@chakra-ui/react';
import AvatarJazzicon from './AvatarJazzicon';
import ButtonCopy from 'components/ButtonCopy';

import { ColorOfCollaborator, convertHex, shorten } from 'utils/utils';

import { TypeCollaboratorsRole } from 'layouts/Collaborators/CollaboratorsUtils';
import React from 'react';

interface AvatarProfileProps {
  role: TypeCollaboratorsRole;
  account: { address: string; name: string };
  changeRole?: React.ReactNode;
  sx?: FlexProps;
}

export default ({ role, account, changeRole, sx }: AvatarProfileProps) => {
  return (
    <Flex gap={4} {...sx}>
      <AvatarJazzicon
        address={account.address}
        sx={{ width: '2.25rem', height: '2.25rem' }}
      />

      <Box fontWeight="bold">
        <Flex gap={2}>
          <Text color="white">{account.name}</Text>

          <Center
            py={1}
            px={3}
            borderRadius="2xl"
            color={ColorOfCollaborator(role)}
            bg={convertHex(ColorOfCollaborator(role), 0.15)}
          >
            {role}

            {changeRole ? changeRole : null}
          </Center>
        </Flex>

        <Flex gap={2} mt={2} color="shader.a.400" fontSize="sm">
          {shorten(account.address, 12)}
          <ButtonCopy value={account.address} />
        </Flex>
      </Box>
    </Flex>
  );
};
