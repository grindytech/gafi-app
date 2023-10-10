import { Center } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';

import CollaboratorsMenu from 'layouts/Collaborators/CollaboratorsMenu';
import { useEffect, useState } from 'react';

import { TypeCollaboratorsState } from 'layouts/Collaborators/CollaboratorsUtils';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { PoolsFieldProps } from '..';
import { useAccountContext } from 'contexts/contexts.account';

interface PoolsAdminProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
}

export default ({ setValue, watch }: PoolsAdminProps) => {
  const { collaborator } = watch();

  const [collaborators, setCollaborators] = useState<TypeCollaboratorsState>(
    []
  );
  const { account } = useAccountContext();

  // when reset form hook & initial value for 'collaborators'
  useEffect(() => {
    if (!collaborator && account.current) {
      setCollaborators([
        {
          role: 'Admin',
          account: {
            address: account.current.address,
            name: account.current.name as string,
          },
        },
      ]);
    }
  }, [collaborator, account.current]);

  useEffect(() => {
    setValue(`collaborator`, collaborators[0]);
  }, [collaborators]);

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

          {account.current?.address ? (
            <CollaboratorsMenu
              address={account.current.address}
              index={index}
              setCollaborators={setCollaborators}
            />
          ) : null}
        </Center>
      ))}
    </>
  );
};
