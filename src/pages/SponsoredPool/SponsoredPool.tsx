import { Button, HStack, Icon, useDisclosure } from '@chakra-ui/react';
import { mdiPlus } from '@mdi/js';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ModalAddSponsoredPool from './components/ModalAddSponsoredPool';
import SponsoredPoolTable from './components/SponsoredPoolTable';

import Banner from 'components/Banner';
import Pagination from 'components/pagination';
import useBreakPoint from 'hooks/useBreakPoint';
import useLoadSponsoredPool from 'hooks/useLoadSponsoredPool';
import * as constants from 'utils/constants';

const SponsoredPoolPage: React.FC = () => {
  const { t } = useTranslation();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { isMobile, isSmallScreen } = useBreakPoint();
  const isZoomOut = isMobile || isSmallScreen;
  const {
    isOwned,
    sponsoredPools,
    totalCount,
    totalPage,
    setCurrentPage,
    currentPage,
    isLoading,
  } = useLoadSponsoredPool();

  return (
    <>
      <Banner
        title={isOwned ? t('MY_SPONSORED_POOLS') : t('POOL.SPONSORED_POOL')}
        subTitle={
          isOwned
            ? t('POOL_DESCRIPTION.MY_SPONSORED_POOL')
            : t('POOL_DESCRIPTION.SPONSORED_POOL')
        }
        bannerBg="/assets/layout/sponsored-banner-bg.png"
        btnLink="https://wiki.gafi.network/learn/sponsored-pool"
      />
      <HStack justifyContent="flex-end">
        <Button
          size="xl"
          variant="primary"
          borderRadius="xl"
          fontWeight="bold"
          w={{ base: 'full', tablet: 'auto' }}
          rightIcon={
            !isMobile ? (
              <Icon>
                <path fill="currentColor" d={mdiPlus} />
              </Icon>
            ) : undefined
          }
          leftIcon={
            isMobile ? (
              <Icon>
                <path fill="currentColor" d={mdiPlus} />
              </Icon>
            ) : undefined
          }
          onClick={onOpen}
        >
          {t('ADD_POOL')}
        </Button>
      </HStack>
      <SponsoredPoolTable
        captions={[
          { label: t('OWNER'), fieldName: 'poolOwner', display: true },
          { label: t('DISCOUNT'), fieldName: 'discount', display: true },
          { label: '', fieldName: 'actions', display: isZoomOut },
          {
            label: t('TRANSACTION_LIMIT_AMOUNT_MINUTES', {
              minuteAmount: 30,
            }),
            fieldName: 'txLimit',
            display: !isZoomOut,
          },
          { label: t('BALANCE'), fieldName: 'amount', display: !isZoomOut },
          { label: t('ACTIONS'), fieldName: 'actions', display: !isZoomOut },
        ]}
        sponsoredPools={sponsoredPools}
        limitRow={constants.SPONSORED_POOL_AMOUNT_PER_PAGE}
        isLoading={isLoading}
      >
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalCount={totalCount}
          resultsPerPage={constants.SPONSORED_POOL_AMOUNT_PER_PAGE}
          totalPage={totalPage}
          isLoading={isLoading}
        />
      </SponsoredPoolTable>
      {isOpen && <ModalAddSponsoredPool isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default SponsoredPoolPage;
