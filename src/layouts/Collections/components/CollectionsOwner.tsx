import Web3Owner from 'components/Web3Owner/Web3Owner';

import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface CollectionsOwnerProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function CollectionsOwner({ setValue }: CollectionsOwnerProps) {
  const owner = 'Alex pham';
  const value = '5DPA2URG1G8....ScaFqiuu3hb9';

  setValue('owner', {
    account: owner,
    hash: value,
  });

  return <Web3Owner account={owner} hash={value} balance="1,499,034.999 " />;
}
