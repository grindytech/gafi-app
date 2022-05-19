import {
  Box,
  HStack,
  Text,
  useToast,
  VStack,
  Button,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { mdiPlus } from '@mdi/js';
import { GafiPrimitivesPoolTicket } from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import ModalAddSponsoredPool from './components/ModalAddSponsoredPool';
import Card from 'components/card/Card';
import { getFromAcct, handleTxError } from 'components/utils';
import client from 'graphQL/client';
import { useSponsoredPoolsQuery } from 'graphQL/generates';
import { useSubstrateState } from 'substrate-lib';
import { PoolInfo } from 'gafi-dashboard/interfaces';
import { useTranslation } from 'react-i18next'
import SponsoredPoolTable from './components/SponsoredPoolTable';
import { SponsoredPool } from 'graphQL/generates';


const SponsoredPoolPage: React.FC = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  // Example for query data from graphql.
  const { data: sponsoredPoolData } = useSponsoredPoolsQuery(client);
  const sponsoredPools = sponsoredPoolData?.sponsoredPools
    ?.nodes as SponsoredPool[];
  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <HStack justifyContent="space-between">
        <Text fontWeight="bold" fontSize="2xl" mb={5}>
          {t("POOL.SPONSORED_POOL")}
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
          {t("ADD_POOL")}
        </Button>
      </HStack>
      {sponsoredPools && (
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
        />
      )}
      {isOpen && <ModalAddSponsoredPool isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default SponsoredPoolPage;
