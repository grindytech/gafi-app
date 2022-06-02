import {
  Table,
  TableCaption,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import CardHeader from 'components/card/CardHeader';
import React from 'react';
import { IResponseContract } from '../Contracts';
import ContractTableRow from './ContractTableRow';
import * as constants from 'utils/constants';
import SkeletonLoadingRow from 'components/SkeletonLoadingRow';
import EmptyRow from 'components/EmptyRow';

export interface ICaptions {
  label: string;
  fieldName: string;
}

interface IProps {
  contracts?: IResponseContract[];
  title: string;
  captions: ICaptions[];
  refreshData: () => void;
  isLoading: boolean;
}

const ContractsTable: React.FC<IProps> = ({
  title,
  children,
  captions,
  contracts,
  refreshData,
  isLoading,
}) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const SkeletonArray = new Array(constants.CONTRACT_AMOUNT_PER_PAGE).fill(0);
  return (
    <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
      <CardHeader p={[2, 0, 6, 0]}>
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" textAlign="center" color={textColor}>
          <TableCaption>{children}</TableCaption>
          <Thead>
            <Tr my={3} pl={0} color="gray.400">
              {React.Children.toArray(
                captions.map(caption => (
                  <Th color="gray.400">{caption.label}</Th>
                ))
              )}
            </Tr>
          </Thead>
          <Tbody justifyContent="flex-start">
            {React.Children.toArray(
              !isLoading ? (
                !!contracts?.length ? (
                  contracts?.map(contract => (
                    <ContractTableRow
                      refreshData={refreshData}
                      contract={contract}
                    />
                  ))
                ) : (
                  <EmptyRow columnAmount={3} />
                )
              ) : (
                SkeletonArray.map(() => (
                  <SkeletonLoadingRow
                    columnAmount={constants.CONTRACT_AMOUNT_PER_PAGE}
                  />
                ))
              )
            )}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ContractsTable;
