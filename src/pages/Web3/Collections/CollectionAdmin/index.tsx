import { Center } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';
import { useAppSelector } from 'hooks/useRedux';
import CollaboratorsMenu from 'layouts/Collaborators/CollaboratorsMenu';
import { TypeCollaboratorsState } from 'layouts/Collaborators/CollaboratorsUtils';
import { useState } from 'react';

interface CollectionAdminServiceProps {
  account: {
    address: string;
    name: string;
  };
}

export default () => {
  const { account } = useAppSelector(state => state.injected.polkadot);

  return (
    <>
      {account?.address && account.name && (
        <CollectionAdminService
          account={account as CollectionAdminServiceProps['account']}
        />
      )}
    </>
  );
};

function CollectionAdminService({ account }: CollectionAdminServiceProps) {
  const [collaborators, setCollaborators] = useState<TypeCollaboratorsState>([
    { role: 'Admin', account },
  ]);

  console.log('collaborators', collaborators);

  return (
    <>
      {collaborators.map((meta, index) => (
        <Center
          key={meta.role}
          position="relative"
          justifyContent="space-between"
          borderRadius="xl"
          bg="shader.a.900"
          px={6}
          py={4}
          gap={2}
        >
          <AvatarCollaborators account={meta.account} role={meta.role} />

          <CollaboratorsMenu
            address={account.address}
            index={index}
            setCollaborators={setCollaborators}
          />
        </Center>
      ))}
    </>
  );
}
