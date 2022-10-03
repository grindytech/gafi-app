import React from 'react';

import ContractTableRow from './ContractTableRow';

import EmptyRow from 'components/EmptyRow';
import useLoadContracts from 'hooks/useLoadContracts';

interface ITableContentProps {
  captionAmounts: number;
}

const TableContent = ({ captionAmounts }: ITableContentProps) => {
  const { listContract } = useLoadContracts();

  return (
    <>
      {listContract?.length ? (
        React.Children.toArray(
          listContract?.map(contract => (
            <ContractTableRow contract={contract} />
          ))
        )
      ) : (
        <EmptyRow columnAmount={captionAmounts} />
      )}
    </>
  );
};

export default TableContent;
