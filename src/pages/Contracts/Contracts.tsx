import { Button, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { mdiCashMultiple } from '@mdi/js';
import { useTranslation } from 'react-i18next';

import ContractTable from './components/ContractTable';
import ModalClaimContract from './components/ModalClaimContract';

import Banner from 'components/Banner';
import Pagination from 'components/pagination';
import useLoadContracts from 'hooks/useLoadContracts';
import * as constants from 'utils/constants';

const Contracts = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { currentPage, setCurrentPage, isLoading, maxCount } =
    useLoadContracts();

  return (
    <>
      <Banner
        title={t('GAME_CREATOR')}
        subTitle={t('GAME_CREATOR_DESCRIPTION')}
        bannerBg="/assets/layout/game-creator-banner.png"
        btnLink="https://wiki.gafi.network/learn/game-creator"
      />
      <HStack mb={4} justifyContent="flex-end">
        <Button
          background="primary"
          size="sm"
          color="white"
          variant="solid"
          rightIcon={
            <Icon>
              <path fill="currentColor" d={mdiCashMultiple} />
            </Icon>
          }
          onClick={onOpen}
        >
          {t('CLAIM_CONTRACT')}
        </Button>
      </HStack>

      <ContractTable>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={maxCount || 0}
          resultsPerPage={constants.CONTRACT_AMOUNT_PER_PAGE}
          isLoading={isLoading}
        />
      </ContractTable>
      {isOpen && <ModalClaimContract isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Contracts;
