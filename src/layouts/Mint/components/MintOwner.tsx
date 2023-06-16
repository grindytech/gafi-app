import OwnerProfile from 'components/OwnerProfile/OwnerProfile';
import React from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

interface MintOwnerProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function MintOwner({ setValue }: MintOwnerProps) {
  const currentAccount = {
    account: 'Jimmy3030',
    hash: '5DPA2URG1G8....ScaFqiuu3hb9',
    balance: '450,034.999 ',
  };

  React.useEffect(() => {
    setValue('owner', {
      account: currentAccount.account,
      hash: currentAccount.hash,
    });
  }, [currentAccount]);

  return (
    <OwnerProfile
      account={currentAccount.account}
      hash={currentAccount.hash}
      balance={currentAccount.balance}
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
