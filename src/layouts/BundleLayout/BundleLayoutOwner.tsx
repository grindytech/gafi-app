import { Heading, Text } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/useRedux';
import { shorten } from 'utils/utils';

interface BundleLayoutOwnerProps {
  owner: string;
}

export default function BundleLayoutOwner({ owner }: BundleLayoutOwnerProps) {
  const { account } = useAppSelector(state => state.injected.polkadot);

  return (
    <Heading fontSize="md" fontWeight="normal" color="shader.a.500" mb={6}>
      Owned by&nbsp;
      <Text as="span" color="primary.a.500" fontWeight="medium">
        {account?.address === owner ? 'You' : shorten(owner)}
      </Text>
    </Heading>
  );
}
