import { Center } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';
import { useAppSelector } from 'hooks/useRedux';

import CollaboratorsMenu from 'layouts/Collaborators/CollaboratorsMenu';
import { useEffect, useState } from 'react';

import { TypeCollaboratorsState } from 'layouts/Collaborators/CollaboratorsUtils';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { PoolsFieldProps } from '..';

interface PoolsAdminProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
}

interface PoolsAdminServiceProps extends PoolsAdminProps {
  account: {
    address: string;
    name: string;
  };
}

export default ({ setValue, watch }: PoolsAdminProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);

  return (
    <>
      {account?.address && account.name ? (
        <GamesCollaboratorsService
          account={account as PoolsAdminServiceProps['account']}
          setValue={setValue}
          watch={watch}
        />
      ) : null}
    </>
  );
};

function GamesCollaboratorsService({
  account,
  setValue,
  watch,
}: PoolsAdminServiceProps) {
  const { collaborator: watch_collaborator } = watch();
  const [collaborators, setCollaborators] = useState<TypeCollaboratorsState>(
    []
  );

  // when reset form hook & initial value for 'collaborators'
  useEffect(() => {
    if (!watch_collaborator) {
      setCollaborators([{ role: 'Admin', account }]);
    }
  }, [watch_collaborator]);

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
