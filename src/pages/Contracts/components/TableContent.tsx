import React from 'react';

import ContractTableRow from './ContractTableRow';

import EmptyRow from 'components/EmptyRow';
import { ClaimedContract } from 'graphQL/generates';

interface ITableContentProps {
  captionAmounts: number;
  listContract: ClaimedContract[];
}

const TableContent = ({ captionAmounts, listContract }: ITableContentProps) => (
  <>
    {listContract?.length ? (
      React.Children.toArray(
        listContract?.map(contract => <ContractTableRow contract={contract} />)
      )
    ) : (
      <EmptyRow columnAmount={captionAmounts} />
    )}
  </>
);

export default TableContent;
