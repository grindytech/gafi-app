import { Center, Icon } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';

import CloseIcon from 'public/assets/fill/close.svg';

import CollaboratorsMenu from './CollaboratorsMenu';
import { useAppSelector } from 'hooks/useRedux';

import React, { useEffect, useState } from 'react';
import { shorten } from 'utils/utils';
import CollaboratorsAdd from './CollaboratorsAdd';
import { UseFormSetValue } from 'react-hook-form';

export interface CollaboratorsServiceProps {
  initial: {
    address: string;
    name: string | undefined;
    role: 'Admin' | 'Freezer' | 'Issuer';
  }[];
  setValue: UseFormSetValue<any>;
}

interface CollaboratorsProps {
  setValue: UseFormSetValue<any>;
}

export default ({ setValue }: CollaboratorsProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);

  const initial: CollaboratorsServiceProps['initial'] = [
    {
      address: account?.address as string,
      name: account?.name as string,
      role: 'Admin',
    },
  ];

  return (
    <>
      {account?.address ? (
        <CollaboratorsService setValue={setValue} initial={initial} />
      ) : null}
    </>
  );
};

function CollaboratorsService({
  initial,
}: // setValue,
CollaboratorsServiceProps) {
  const [collaborators, setCollaborators] = useState(initial);

  // const full_role = 3;
  const remove_collaborators = 1;

  useEffect(() => {
    // setValue(`collaborators`, collaborators);
  }, [collaborators]);

  return (
    <>
      {React.Children.toArray(
        collaborators.map((meta, index) => (
          <Center
            justifyContent="space-between"
            borderRadius="xl"
            bg="shader.a.900"
            position="relative"
            px={6}
            py={4}
            gap={2}
            _notFirst={{
              mt: 2,
            }}
          >
            <AvatarCollaborators
              address={shorten(meta.address, 12)}
              name={meta.name || '-'}
              division={meta.role}
            />

            {collaborators.length > remove_collaborators ? (
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
                  const filter = collaborators.filter(
                    (_, ind) => index !== ind
                  );

                  setCollaborators(filter);
                }}
              />
            ) : null}

            <CollaboratorsMenu
              index={index}
              setCollaborators={setCollaborators}
            />
          </Center>
        ))
      )}

      <CollaboratorsAdd />
    </>
  );
}
