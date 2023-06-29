import React, { useEffect, useState } from 'react';
import { Text, TextProps } from '@chakra-ui/react';
interface IProps {
  blockNumber: string;
  sx?: TextProps;
}
const CountDown = ({ blockNumber, sx }: IProps) => {
  const [blockNumberTimer, setBlockNumberTimer] = useState(0);
  const timer = () => {
    setBlockNumberTimer(time => time + 1);
  };
  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setBlockNumberTimer(0);
  }, [blockNumber]);

  return (
    <Text color="primary.a.500" fontSize="sm" {...sx}>
      {blockNumberTimer}s
    </Text>
  );
};

export default CountDown;
