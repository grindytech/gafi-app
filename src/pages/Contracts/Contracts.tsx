import { Box, Button, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { mdiCashMultiple } from '@mdi/js';
import keyring from '@polkadot/ui-keyring';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import ContractTable from './components/ContractTable';
import ModalClaimContract from './components/ModalClaimContract';

import Pagination from 'components/pagination';
import { acctAddr } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';
import * as constants from 'utils/constants';

export interface IResponseContract {
  owner: string;
  address: string;
}

const Contracts = () => {
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const captions = [
    { label: t('CONTRACT_ADDRESS'), fieldName: 'contractAddress' },
    { label: t('OWNER'), fieldName: 'poolOwner' },
    { label: t('ACTIONS'), fieldName: 'actions' },
  ];
  const [contractsDisplay, setContractsDisplay] =
    useState<IResponseContract[]>();

  const loadingContract = async () => {
    const response = await api?.query.gameCreator.contractOwner.entries();

    if (response) {
      let contractArray = response.map(([key, exposure]) => {
        const addresses = key.args.map(k => k.toHuman());
        const ownerAddress = keyring.getPair(
          exposure.toHuman()?.toString() || ''
        );
        return {
          owner: acctAddr(ownerAddress),
          address: addresses[0]?.toString() || '',
        };
      });
      if (currentAccount) {
        contractArray = contractArray.filter(
          contract => contract.owner === acctAddr(currentAccount)
        ) as IResponseContract[];
        return {
          contracts: contractArray as IResponseContract[],
          totalPage: contractArray.length
            ? Math.ceil(
                contractArray.length / constants.CONTRACT_AMOUNT_PER_PAGE
              )
            : 0,
        };
      }
    }
  };

  // loading contracts
  const { data, refetch, isLoading } = useQuery(
    ['loading-contract', currentAccount],
    loadingContract,
    {
      enabled: !!currentAccount,
    }
  );

  useEffect(() => {
    if (currentAccount) {
      setCurrentPage(1);
    }
  }, [currentAccount]);

  // display contracts
  useEffect(() => {
    setContractsDisplay(
      data?.contracts?.slice(
        (currentPage - 1) * constants.CONTRACT_AMOUNT_PER_PAGE,
        (currentPage - 1) * constants.CONTRACT_AMOUNT_PER_PAGE +
          constants.CONTRACT_AMOUNT_PER_PAGE
      )
    );
  }, [currentPage, data?.contracts]);

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <HStack mb={2} justifyContent="flex-end">
        <Button
          background="primary"
          color="white"
          variant="solid"
          leftIcon={
            <Icon>
              <path fill="currentColor" d={mdiCashMultiple} />
            </Icon>
          }
          onClick={onOpen}
        >
          {t('CLAIM_CONTRACT')}
        </Button>
      </HStack>

      <ContractTable
        contracts={contractsDisplay}
        title={t('CONTRACTS')}
        captions={captions}
        refreshData={refetch}
        isLoading={isLoading}
      >
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={data?.contracts.length || 0}
          resultsPerPage={constants.CONTRACT_AMOUNT_PER_PAGE}
          totalPage={data?.totalPage || 0}
          isLoading={isLoading}
        />
      </ContractTable>
      {isOpen && (
        <ModalClaimContract
          refreshData={refetch}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
};

export default Contracts;
