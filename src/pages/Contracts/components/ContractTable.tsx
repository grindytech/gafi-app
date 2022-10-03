import {
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import TableContent from './TableContent';

import Card from 'components/card/Card';
import SkeletonLoadingRow from 'components/SkeletonLoadingRow';
import useLoadContracts from 'hooks/useLoadContracts';
import * as constants from 'utils/constants';

export interface ICaptions {
  label: string;
  fieldName: string;
}

const ContractsTable: React.FC = ({ children }) => {
  const SkeletonArray = new Array(constants.CONTRACT_AMOUNT_PER_PAGE).fill(0);
  const amountCharacter = useBreakpointValue({
    sm: 3,
    md: constants.CONTRACT_AMOUNT_PER_PAGE,
  });
  const { t } = useTranslation();

  const isDisplay = useBreakpointValue({
    md: true,
  });

  const breakpointsTablet = isDisplay ?? false;

  const captions = [
    {
      label: t('OWNER'),
      fieldName: 'poolOwner',
      display: true,
    },
    {
      label: t('CONTRACT_ADDRESS'),
      fieldName: 'contractAddress',
      display: breakpointsTablet,
    },
    {
      label: t('ACTIONS'),
      fieldName: 'actions',
      display: breakpointsTablet,
    },
  ];

  const { isLoading } = useLoadContracts();

  return (
    <>
      <Card p={0} mb={8} mt={4} overflowX={{ sm: 'scroll', xl: 'hidden' }}>
        <Table variant="simple" textAlign="center">
          <Thead>
            <Tr>
              {React.Children.toArray(
                captions.map(caption => (
                  <Th
                    sx={!caption.display ? { display: 'none' } : {}}
                    textAlign={caption.label === 'owner' ? 'left' : 'center'}
                    textTransform="capitalize"
                  >
                    {caption.label}
                  </Th>
                ))
              )}
            </Tr>
          </Thead>
          <Tbody justifyContent="flex-start">
            {!isLoading ? (
              <TableContent captionAmounts={captions.length} />
            ) : (
              React.Children.toArray(
                SkeletonArray.map(() => (
                  <SkeletonLoadingRow columnAmount={amountCharacter} />
                ))
              )
            )}
          </Tbody>
        </Table>
      </Card>

      {children}
    </>
  );
};

export default ContractsTable;
