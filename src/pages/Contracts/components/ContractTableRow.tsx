import { Button, Td, Tr } from '@chakra-ui/react';
import { shorten } from 'components/utils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IResponseContract } from '../Contracts';
import ModalChangeContractOwner from './ModalChangeContractOwner';

interface IProps {
  contract: IResponseContract;
  refreshData: () => void;
}
const ContractsTableRow: React.FC<IProps> = ({ contract, refreshData }) => {
  const { t } = useTranslation();
  const [contractChanging, setContractChanging] = useState('');
  return (
    <>
      <Tr>
        <Td>{shorten(contract.address)}</Td>
        <Td>{shorten(contract.owner)}</Td>
        <Td>
          <Button
            onClick={() => {
              const contractAddress = contract.address?.toString();
              if (contractAddress) {
                setContractChanging(contractAddress);
              }
            }}
            color="primary"
            variant="solid"
          >
            {t('CHANGE_OWNER')}
          </Button>
        </Td>
      </Tr>
      <ModalChangeContractOwner
        contractChanging={contractChanging}
        onClose={() => {
          setContractChanging('');
        }}
        refreshData={refreshData}
      />
    </>
  );
};

export default ContractsTableRow;
