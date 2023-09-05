import { Center, Icon, Text } from '@chakra-ui/react';
import AddIcon from 'public/assets/line/add.svg';

interface CollaboratorsAddProps {
  options: string[];
  collaborators: Set<(string | null)[]>;
  setCollaborators: React.Dispatch<
    React.SetStateAction<Set<(string | null)[]>>
  >;
  account: {
    address: string;
    name: string | null;
  };
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
            // value existed ['owner', address] that mean item[0] === options[i]
            const map_existed = [...collaborators].some(
              meta => meta[0] === options[i]
            );

            if (!map_existed) {
              // The option does not exist in metaSet, so add it.
              setCollaborators(prev => {
                const instance = new Set(prev);
                instance.add([options[i], account.address, account.name]);

                return instance;
              });
              break;
            }
          }
        }}
      />
    </Center>
  );
};
