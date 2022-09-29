import {
  Button,
  HStack,
  Table,
  TableCaption,
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
import CardBody from 'components/card/CardBody';
import SkeletonLoadingRow from 'components/SkeletonLoadingRow';
import useLoadContracts from 'hooks/useLoadContracts';
import * as constants from 'utils/constants';

export interface ICaptions {
  label: string;
  fieldName: string;
}

interface IContractTableProps {
  children: React.ReactNode;
}

const ContractsTable: React.FC<IContractTableProps> = ({ children }) => {
  const SkeletonArray = new Array(constants.CONTRACT_AMOUNT_PER_PAGE).fill(0);
  const amountCharacter = useBreakpointValue({
    sm: 3,
    md: constants.CONTRACT_AMOUNT_PER_PAGE,
  });
  const { t } = useTranslation();

  const isDisplay = useBreakpointValue({
    md: true,
  });

  const breakpoints = isDisplay || false;

  const captions = [
    {
      label: t('OWNER'),
      fieldName: 'poolOwner',
      display: true,
    },
    {
      label: t('CONTRACT_ADDRESS'),
      fieldName: 'contractAddress',
      display: breakpoints,
    },
    {
      label: t('ACTIONS'),
      fieldName: 'actions',
      display: breakpoints,
    },
  ];

  const { isLoading } = useLoadContracts();

  return (
    <>
      <Card
        px={0}
        p={0}
        mb={8}
        mt={4}
        overflowX={{ sm: 'scroll', xl: 'hidden' }}
      >
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
              <TableContent captions={captions.length} />
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
