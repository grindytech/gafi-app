import OwnerProfile from 'components/OwnerProfile/OwnerProfile';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface MintOwnerProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function MintOwner({ setValue }: MintOwnerProps) {
  const account = 'Jimmy3030';
  const hash = '5DPA2URG1G8....ScaFqiuu3hb9';
  const balance = '450,034.999 ';

  setValue('owner', {
    account,
    hash,
  });

  return (
    <OwnerProfile
      account={account}
      hash={hash}
      balance={balance}
      sx={{
        sx: {
          '.balance': {
            fontSize: 'md',
            color: 'shader.a.600',
            fontWeight: 'medium',
          },
        },
      }}
    />
  );
}
