import { Center, Icon, Stack } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';
import CollaboratorsMenu from 'layouts/Collaborators/CollaboratorsMenu';

import { useEffect, useState } from 'react';

import CollaboratorsRoleSwitch from 'layouts/Collaborators/CollaboratorsRoleSwitch';

import CloseIcon from 'public/assets/fill/close.svg';
import CollaboratorsAdd from 'layouts/Collaborators/CollaboratorsAdd';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CollectionsFieldProps } from '.';
import { useAccountContext } from 'contexts/contexts.account';
import { InjectedAccount } from 'types/polkadot.type';
import {
  TypeCollaboratorRoles,
  TypeCollaboratorState,
} from 'types/collaborator.type';

interface CollectionAdminProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
}

interface CollectionAdminServiceProps extends CollectionAdminProps {
  account: InjectedAccount;
}

export default ({ setValue, watch }: CollectionAdminProps) => {
  const { account } = useAccountContext();

  return (
    <>
      {account.current?.address && (
        <CollectionAdminService
          account={account.current}
          setValue={setValue}
          watch={watch}
        />
      )}
    </>
  );
};

function CollectionAdminService({
  account,
  setValue,
  watch,
}: CollectionAdminServiceProps) {
  const options: TypeCollaboratorRoles[] = ['Admin', 'Freezer', 'Issuer'];

  const { collaborator: watch_collaborator } = watch();
  const [collaborators, setCollaborators] = useState<TypeCollaboratorState>([]);

  // when reset form hook & initial value for 'collaborators'
  useEffect(() => {
    if (!watch_collaborator) {
      setCollaborators([
        {
          role: 'Admin',
          account: {
            address: account.address,
            name: account.name as string,
          },
        },
      ]);
    }
  }, [watch_collaborator]);

  useEffect(() => {
    setValue(`collaborator`, collaborators);
  }, [collaborators]);

  const remove_collaborators = collaborators.length >= 2;
  const full_role = collaborators.length < 3;

  return (
    <Stack>
      {collaborators.map(({ role, account }, index) => (
        <Center
          key={role}
          justifyContent="space-between"
          borderRadius="xl"
          bg="shader.a.900"
          position="relative"
          px={6}
          py={4}
          gap={2}
        >
          <AvatarCollaborators
            role={role}
            account={account}
            changeRole={
              <CollaboratorsRoleSwitch
                options={options.filter(meta => meta !== role)}
                roleOf={role}
                setCollaborators={setCollaborators}
                index={index}
              />
            }
          />

          {remove_collaborators ? (
            <Icon
              as={CloseIcon}
              width={5}
              height={5}
              cursor="pointer"
              color="shader.a.400"
              position="absolute"
              inset="0 0 auto auto"
              transform="translate(25%, -25%)"
              onClick={() => {
                setCollaborators(prev => {
                  const filter = prev.filter(meta => meta.role !== role);

                  return filter;
                });
              }}
            />
          ) : null}

          <CollaboratorsMenu
            address={account.address}
            index={index}
            setCollaborators={setCollaborators}
          />
        </Center>
      ))}

      {full_role ? (
        <CollaboratorsAdd
          options={options}
          collaborators={collaborators}
          setCollaborators={setCollaborators}
          account={account}
        />
      ) : null}
    </Stack>
  );
}