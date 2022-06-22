import { Table, TableCaption, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import TableContent from './TableContent';

import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import SkeletonLoadingRow from 'components/SkeletonLoadingRow';
import useLoadContracts from 'hooks/useLoadContracts';
import * as constants from 'utils/constants';

export interface ICaptions {
  label: string;
  fieldName: string;
}

const ContractsTable: React.FC = ({ children }) => {
  const SkeletonArray = new Array(constants.CONTRACT_AMOUNT_PER_PAGE).fill(0);
  const { t } = useTranslation();
  const captions = [
    { label: t('OWNER'), fieldName: 'poolOwner' },
    { label: t('CONTRACT_ADDRESS'), fieldName: 'contractAddress' },
    { label: t('ACTIONS'), fieldName: 'actions' },
  ];

  const { isLoading } = useLoadContracts();

  return (
    <Card pt={0} overflowX={{ sm: 'scroll', xl: 'hidden' }}>
      <CardBody>
        <Table variant="simple">
          <TableCaption>{children}</TableCaption>
          <Thead>
            <Tr>
              {React.Children.toArray(
                captions.map(caption => (
                  <Th textAlign={caption.label === 'owner' ? 'left' : 'center'}>
                    {caption.label}
                  </Th>
                ))
              )}
            </Tr>
          </Thead>
          <Tbody justifyContent="flex-start">
            {isLoading ? (
              React.Children.toArray(
                SkeletonArray.map(() => (
                  <SkeletonLoadingRow
                    columnAmount={constants.CONTRACT_AMOUNT_PER_PAGE}
                  />
                ))
              )
            ) : (
              <TableContent />
            )}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ContractsTable;
