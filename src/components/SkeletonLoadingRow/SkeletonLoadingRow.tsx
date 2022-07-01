import { Skeleton, Td, Tr } from '@chakra-ui/react';
import React from 'react';

import useBreakPoint from 'hooks/useBreakPoint';

interface IProps {
  columnAmount: number;
}

const SkeletonLoadingRow: React.FC<IProps> = ({ columnAmount }) => {
  const { isMobile } = useBreakPoint();
  const columnArray = new Array(isMobile ? 3 : columnAmount).fill(0);
  return (
    <Tr>
      {React.Children.toArray(
        columnArray.map(() => (
          <Td>
            <Skeleton height="20px" />
          </Td>
        ))
      )}
    </Tr>
  );
};

export default SkeletonLoadingRow;
