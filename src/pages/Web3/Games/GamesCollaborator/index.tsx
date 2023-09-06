import { Box, Center, Icon } from '@chakra-ui/react';
import AvatarCollaborators from 'components/Avatar/AvatarCollaborators';
import { useAppSelector } from 'hooks/useRedux';
import CollaboratorsAdd from 'layouts/Collaborators/CollaboratorsAdd';
import CollaboratorsMenu from 'layouts/Collaborators/CollaboratorsMenu';
import { useState } from 'react';

import CloseIcon from 'public/assets/fill/close.svg';

import GamesCollaboratorAdding from './GamesCollaboratorAdding';

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
  const options = ['Admin', 'Freezer', 'Issuer'];

  const [collaborators, setCollaborators] = useState(
    new Set([['Admin', account.address, account.name]])
  );

  const full_role = [...collaborators.keys()].length < 3;
  const remove_collaborators = [...collaborators.keys()].length >= 2;

  return (
    <Box>
      <GamesCollaboratorAdding
        length_collaborator={[...collaborators.keys()].length}
        options={options}
      />

      {[...collaborators.keys()].map(meta => (
        <Center
          key={meta[0]}
          justifyContent="space-between"
          borderRadius="xl"
          bg="shader.a.900"
          position="relative"
          px={6}
          py={4}
          gap={2}
        >
          <AvatarCollaborators meta={meta} options={options} />

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
                  const instance = new Set(prev);

                  instance.delete(meta);

                  return instance;
                });
              }}
            />
          ) : null}

          <CollaboratorsMenu
            meta={meta}
            address={meta[1]}
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
    </Box>
  );
}
