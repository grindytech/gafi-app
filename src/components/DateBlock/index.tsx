import { Text, TextProps } from '@chakra-ui/react';
import { secondsToHours, secondsToMinutes } from 'date-fns';
import useBlockTime from 'hooks/useBlockTime';
import { BLOCK_TIME } from 'utils/constants';

interface DateBlockProps {
  endBlock: number;
  sx?: TextProps;
  end?: 'Expired' | 'Infinity';
}

export default function DateBlock({
  endBlock,
  end = 'Expired',
  sx,
}: DateBlockProps) {
  const { blockNumber: currentBlock } = useBlockTime('bestNumber');

  const time = (endBlock - currentBlock) * BLOCK_TIME;
  const expired = Math.sign(time) === -1;

  return (
    <Text {...sx}>
      {(function () {
        // outdated;
        if (expired) return end;

        // seconds (< 60 S)
        if (time <= 60) return `in ${time} seconds`;

        // minutes (< 60 M)
        if (time < 3600) return `in ${secondsToMinutes(time)} minutes`;

        // hours (< 24 H)
        if (time < 86400) return `in ${secondsToHours(time)} hours`;

        // days (< 30 D)
        if (time < 2505600) return `in ${Math.round(time / (3600 * 24))} day`;

        // months (> 30 D)
        if (time > 2505600)
          return `in ${Math.round(time / (2592000 * 1))} months`;
      })()}
    </Text>
  );
}
