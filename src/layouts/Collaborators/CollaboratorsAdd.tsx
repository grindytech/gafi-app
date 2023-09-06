import { Center, Icon, Text } from '@chakra-ui/react';
import AddIcon from 'public/assets/line/add.svg';
import {
  TypeCollaboratorsRole,
  TypeCollaboratorsState,
} from './CollaboratorsUtils';
import { Dispatch, SetStateAction } from 'react';

interface CollaboratorsAddProps {
  options: TypeCollaboratorsRole[];
  collaborators: TypeCollaboratorsState;
  setCollaborators: Dispatch<SetStateAction<TypeCollaboratorsState>>;
  account: { address: string; name: string };
}

export default ({
  options,
  collaborators,
  setCollaborators,
  account,
}: CollaboratorsAddProps) => {
  return (
    <Center
      mt={2}
      justifyContent="space-between"
      borderRadius="xl"
      bg="shader.a.900"
      px={6}
      py={4}
      gap={2}
    >
      <Text color="shader.a.300" fontSize="sm" fontWeight="medium">
        Add collaborators
      </Text>

      <Icon
        as={AddIcon}
        width={6}
        height={6}
        color="primary.a.300"
        cursor="pointer"
        onClick={() => {
          for (let i = 0; i < options.length; i++) {
            const map_existed = collaborators.some(
              ({ role }) => role === options[i]
            );

            if (!map_existed) {
              setCollaborators(prev => [
                ...prev,
                { role: options[i], account },
              ]);
              break;
            }
          }
        }}
      />
    </Center>
  );
};
