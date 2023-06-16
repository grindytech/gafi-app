import SwitchAdmin2 from 'components/SwitchAdmin/SwitchAdmin2';
import React, { useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

export interface currentAccountProps {
  account: string;
  hash: string;
  id: number;
}

interface MintToProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function MintTo({ setValue }: MintToProps) {
  const value = '5DPA2URG1G8....ScaFqiuu3hb9';
  const admin = 'Alex Pham';

  const ListAccounts = [
    {
      account: `${admin}-0`,
      hash: `${value}123`,
      id: 0,
    },
    {
      account: `${admin}-1`,
      hash: `${value}456`,
      id: 1,
    },
    {
      account: `${admin}-2`,
      hash: `${value}789`,
      id: 2,
    },
    {
      account: `${admin}-3`,
      hash: `${value}102`,
      id: 3,
    },
  ];

  const [currentAccount, setCurrentAccount] = useState<currentAccountProps>(
    ListAccounts[0]
  );

  React.useEffect(() => {
    if (ListAccounts) {
      setValue('mint', {
        account: currentAccount.account,
        hash: currentAccount.hash,
        id: currentAccount.id,
      });
    }
  }, [currentAccount]);

  return (
    <>
      {ListAccounts ? (
        <SwitchAdmin2
          accounts={ListAccounts}
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
        />
      ) : null}
    </>
  );
}
