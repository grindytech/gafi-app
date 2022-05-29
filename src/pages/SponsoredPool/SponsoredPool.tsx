import {
  Box,
  Button,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { mdiPlus } from '@mdi/js';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryParam } from 'use-query-params';

import ModalAddSponsoredPool from './components/ModalAddSponsoredPool';
import SponsoredPoolTable from './components/SponsoredPoolTable';

import Pagination from 'components/pagination';
import { getGAKIAccountAddress } from 'components/utils';
import client from 'graphQL/client';
import {
  Scalars,
  SponsoredPool,
  useSponsoredPoolsQuery,
} from 'graphQL/generates';
import { useSubstrateState } from 'substrate-lib';

const RESULT_PER_PAGE = 5;

const SponsoredPoolPage: React.FC = () => {
  const { t } = useTranslation();
  const [type, setType] = useQueryParam('type');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const { currentAccount } = useSubstrateState();
  const isOwned = type === 'owned';

  // Example for query data from graphql.

  const { data: sponsoredPoolData, refetch } = useSponsoredPoolsQuery(
    client,
    {
      first: RESULT_PER_PAGE,
      offset: isOwned ? 0 : (currentPage - 1) * RESULT_PER_PAGE,
      filter: isOwned
        ? {
            poolOwner: {
              equalTo: currentAccount?.addressRaw
                ? getGAKIAccountAddress(currentAccount?.addressRaw)
                : '',
            },
          }
        : undefined,
    },
    { enabled: !!currentAccount?.addressRaw }
  );
  const sponsoredPools = sponsoredPoolData?.sponsoredPools
    ?.nodes as SponsoredPool[];
  const totalCount = sponsoredPoolData?.sponsoredPools
    ?.totalCount as Scalars['Int'];
  const totalPage = Math.ceil(totalCount / RESULT_PER_PAGE);
  const pageNumberOfNewPool = Math.ceil((totalCount + 1) / RESULT_PER_PAGE);

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <HStack justifyContent="space-between">
        <Text fontWeight="bold" fontSize="2xl" mb={5}>
          {t('POOL.SPONSORED_POOL')}
        </Text>
        <Button
          background="primary"
          color="white"
          variant="solid"
          leftIcon={
            <Icon>
              <path fill="currentColor" d={mdiPlus} />
            </Icon>
          }
          onClick={onOpen}
        >
          {t('ADD_POOL')}
        </Button>
      </HStack>
      <SponsoredPoolTable
        title="Sponsored Pools"
        captions={[
          { label: t('OWNER'), fieldName: 'poolOwner' },
          { label: t('DISCOUNT'), fieldName: 'discount' },
          {
            label: t('TRANSACTION_LIMIT', { minuteAmount: 30 }),
            fieldName: 'txLimit',
          },
          { label: t('BALANCE'), fieldName: 'amount' },
          { label: '', fieldName: '' },
        ]}
        sponsoredPools={sponsoredPools}
      >
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
          resultsPerPage={RESULT_PER_PAGE}
          totalPage={totalPage}
        />
      </SponsoredPoolTable>
      {isOpen && (
        <ModalAddSponsoredPool
          setCurrentPage={setCurrentPage}
          pageNumberOfNewPool={pageNumberOfNewPool}
          isOpen={isOpen}
          onClose={onClose}
          refetch={refetch}
        />
      )}
    </Box>
  );
};

export default SponsoredPoolPage;
