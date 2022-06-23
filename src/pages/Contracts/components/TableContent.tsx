import React from 'react';

import ContractTableRow from './ContractTableRow';

import EmptyRow from 'components/EmptyRow';
import useLoadContracts from 'hooks/useLoadContracts';

const TableContent = () => {
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
        <EmptyRow columnAmount={3} />
      )}
    </>
  );
};

export default TableContent;
