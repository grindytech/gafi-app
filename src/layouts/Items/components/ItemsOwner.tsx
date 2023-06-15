import OwnerProfile from 'components/OwnerProfile/OwnerProfile';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface ItemsOwnerProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function ItemsOwner({ setValue }: ItemsOwnerProps) {
  const owner = 'Alex pham';
  const value = '5DPA2URG1G8....ScaFqiuu3hb9';

  setValue('owner', {
    account: owner,
    hash: value,
  });

  return <OwnerProfile account={owner} hash={value} balance="1,499,034.999 " />;
}
