import { Center } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';
import { useAppSelector } from 'hooks/useRedux';
import CollaboratorsMenu from 'layouts/Collaborators/CollaboratorsMenu';
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
  const [collaborators, setCollaborators] = useState(
    new Set([['Admin', account.address, account.name]])
  );

  return (
    <>
      {[...collaborators.keys()].map(meta => (
        <Center
          key={meta[0]}
          position="relative"
          justifyContent="space-between"
          borderRadius="xl"
          bg="shader.a.900"
          px={6}
          py={4}
          gap={2}
        >
          <AvatarCollaborators meta={meta} />

          <CollaboratorsMenu
            meta={meta}
            address={meta[1]}
            setCollaborators={setCollaborators}
          />
        </Center>
      ))}
    </>
  );
}
