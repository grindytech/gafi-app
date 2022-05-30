import { Skeleton, Td, Tr } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  columnAmount: number;
}

const SkeletonLoadingRow: React.FC<IProps> = ({ columnAmount }) => {
  const columnArray = new Array(columnAmount).fill(0);
  return (
    <Tr>
      {columnArray.map(index => (
        <Td key={index}>
          <Skeleton height="20px" />
        </Td>
      ))}
    </Tr>
  );
};

export default SkeletonLoadingRow;
