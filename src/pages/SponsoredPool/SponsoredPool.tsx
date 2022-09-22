import {
  Box,
  Button,
  HStack,
  Icon,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

// Hooks
import { mdiPlus } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ModalAddSponsoredPool from './components/ModalAddSponsoredPool';

// Components
import SponsoredPoolTable from './components/SponsoredPoolTable';

import Banner from 'components/Banner';
import Pagination from 'components/pagination';
import useAnalyticsEventTracker from 'hooks/useAnalyticsEventTracker';
import useLoadSponsoredPool from 'hooks/useLoadSponsoredPool';

// Translation

// Mdi

// Utils
import * as constants from 'utils/constants';

// React

const SponsoredPoolPage: React.FC = () => {
  const { t } = useTranslation();

  const gaEventTracker = useAnalyticsEventTracker('Sponsored pool');

  const { isOpen, onClose, onOpen } = useDisclosure();

  const isDisplay = useBreakpointValue({
    sm: true,
    '2xl': false,
  });

  const {
    isOwned,
    sponsoredPools,
    totalCount,
    setCurrentPage,
    currentPage,
    isLoading,
  } = useLoadSponsoredPool();

  const captions = [
    {
      label: t('OWNER'),
      fieldName: 'poolOwner',
      display: true,
    },
    {
      label: t('DISCOUNT'),
      fieldName: 'discount',
      display: true,
    },
    {
      label: '',
      fieldName: 'actions',
      display: !!isDisplay,
    },
    {
      label: t('TRANSACTION_LIMIT_AMOUNT_MINUTES', {
        minuteAmount: 30,
      }),
      fieldName: 'txLimit',
      display: !isDisplay,
    },
    {
      label: t('BALANCE'),
      fieldName: 'amount',
      display: !isDisplay,
    },
    {
      label: t('ACTIONS'),
      fieldName: 'actions',
      display: !isDisplay,
    },
  ];

  return (
    <>
      <Banner
        title={isOwned ? t('MY_SPONSORED_POOLS') : t('POOL.SPONSORED_POOL')}
        subTitle={
          isOwned
            ? t('POOL_DESCRIPTION.MY_SPONSORED_POOL')
            : t('POOL_DESCRIPTION.SPONSORED_POOL')
        }
        bannerBg="/assets/layout/sponsored-banner-bg.svg"
        btnLink="https://wiki.gafi.network/learn/sponsored-pool"
      />

      <Box p={{ sm: 4, md: 0 }}>
        <HStack justifyContent="flex-end">
          <Button
            size="xl"
            variant="primary"
            borderRadius="xl"
            fontWeight="bold"
            w={{ base: 'full', md: 'auto' }}
            rightIcon={
              !isDisplay ? (
                <Icon>
                  <path fill="currentColor" d={mdiPlus} />
                </Icon>
              ) : undefined
            }
            leftIcon={
              isDisplay ? (
                <Icon>
                  <path fill="currentColor" d={mdiPlus} />
                </Icon>
              ) : undefined
            }
            onClick={() => {
              gaEventTracker({ action: 'Click Add sponsored pool' });
              onOpen();
            }}
          >
            {t('ADD_POOL')}
          </Button>
        </HStack>

        <SponsoredPoolTable
          captions={captions}
          sponsoredPools={sponsoredPools}
          limitRow={constants.SPONSORED_POOL_AMOUNT_PER_PAGE}
          isLoading={isLoading}
        >
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={totalCount}
            resultsPerPage={constants.SPONSORED_POOL_AMOUNT_PER_PAGE}
            isLoading={isLoading}
          />
        </SponsoredPoolTable>
      </Box>

      {isOpen && <ModalAddSponsoredPool isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default SponsoredPoolPage;
