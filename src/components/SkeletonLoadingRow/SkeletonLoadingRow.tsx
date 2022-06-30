import { Skeleton, Td, Tr, useMediaQuery } from '@chakra-ui/react';
import React from 'react';

interface IProps {
  columnAmount: number;
}

const SkeletonLoadingRow: React.FC<IProps> = ({ columnAmount }) => {
  const [isMobile] = useMediaQuery('(max-width: 739px)');
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
