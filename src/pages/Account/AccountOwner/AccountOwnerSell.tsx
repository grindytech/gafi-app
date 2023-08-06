import { isNull } from '@polkadot/util';
import DurationBlock, { ListDurationProps } from 'components/DurationBlock';
import NumberInput from 'components/NumberInput';
import React from 'react';
import { Control, UseFormSetValue } from 'react-hook-form';
import { BLOCK_TIME } from 'utils/constants';

import { AccountOwnerFieldProps } from '.';

interface AccountOwnerSellProps {
  control: Control<any, any>;
  setValue: UseFormSetValue<AccountOwnerFieldProps>;
  price: number;
}

export default function AccountOwnerSell({
  control,
  price,
  setValue,
}: AccountOwnerSellProps) {
  const ListDuration: ListDurationProps[] = [
    {
      text: '1 Minutes',
      time: 60 / BLOCK_TIME,
    },
    {
      text: '5 Minutes',
      time: 300 / BLOCK_TIME,
    },
    {
      text: '1 Hours',
      time: 3600 / BLOCK_TIME,
    },
    {
      text: '1 Day',
      time: (86400 * 1) / BLOCK_TIME,
    },
    {
      text: '1 Week',
      time: (86400 * 7) / BLOCK_TIME,
    },
    {
      text: '2 Weeks',
      time: (86400 * 14) / BLOCK_TIME,
    },
    {
      text: '1 Month',
      time: (86400 * 30) / BLOCK_TIME,
    },
  ];

  const [duration, setDuration] = React.useState(ListDuration[0]);

  React.useEffect(() => {
    setValue('duration', duration.time);
  }, [duration]);

  return (
    <>
      <NumberInput
        formState={{
          control: control,
          value: 'price',
          isInvalid: isNull(price),
          isRequired: true,
        }}
        heading="Price"
        sx={{
          display: 'block',
          sx: {
            h2: { color: 'shader.a.500', mb: 2 },
          },
        }}
      />

      <DurationBlock
        listDuration={ListDuration}
        duration={duration}
        setCurrentDuration={setDuration}
        sx={{
          mt: 4,
          sx: {
            '> p': { fontSize: 'md' },
          },
        }}
      />
    </>
  );
}
