import {
  Box, Button, HStack, Icon, Text, useDisclosure
} from '@chakra-ui/react';
import { mdiPlus } from '@mdi/js';
import client from 'graphQL/client';
import { Scalars, SponsoredPool, useSponsoredPoolsQuery } from 'graphQL/generates';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalAddSponsoredPool from './components/ModalAddSponsoredPool';
import Pagination from 'components/pagination';
import SponsoredPoolTable from './components/SponsoredPoolTable';


const RESULT_PER_PAGE = 3;

const SponsoredPoolPage: React.FC = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);

  // Example for query data from graphql.

  const { data: sponsoredPoolData } = useSponsoredPoolsQuery(client, {
    first: RESULT_PER_PAGE,
    offset: (currentPage - 1) * RESULT_PER_PAGE,
  });
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
          t('OWNER'),
          t('DISCOUNT'),
          t('TRANSACTION_LIMIT', { minuteAmount: 30 }),
          t('BALANCE'),
          '',
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
        />
      )}
    </Box>
  );
};

export default SponsoredPoolPage;
