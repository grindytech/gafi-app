import { Center } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';
import { useAppSelector } from 'hooks/useRedux';

import CollaboratorsMenu from 'layouts/Collaborators/CollaboratorsMenu';
import { useState } from 'react';

import { TypeCollaboratorsState } from 'layouts/Collaborators/CollaboratorsUtils';

interface GamesCollaboratorPropsServiceProps {
  account: {
    address: string;
    name: string;
  };
}

export default () => {
  const { account } = useAppSelector(state => state.injected.polkadot);

  return (
    <>
      {account?.address && account.name ? (
        <GamesCollaboratorPropsService
          account={account as GamesCollaboratorPropsServiceProps['account']}
        />
      ) : null}
    </>
  );
};

function GamesCollaboratorPropsService({
  account,
}: GamesCollaboratorPropsServiceProps) {
  const [collaborators, setCollaborators] = useState<TypeCollaboratorsState>([
    { role: 'Admin', account },
  ]);

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
