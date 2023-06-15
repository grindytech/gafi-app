import React from 'react';

import { FieldValues, UseFormSetValue } from 'react-hook-form';

import SwitchAdmin from 'components/SwitchAdmin/SwitchAdmin';

interface NewGamesAdminProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function NewGamesAdmin({ setValue }: NewGamesAdminProps) {
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

  return (
    <>
      <SwitchAdmin accounts={ListAccounts} setValue={setValue} />
    </>
  );
}
