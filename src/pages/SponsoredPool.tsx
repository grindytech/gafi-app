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

import ModalAddSponsoredPool from './ModalAddSponsoredPool';
import Table from './Table';

import Card from 'components/card/Card';
import { getFromAcct, handleTxError } from 'components/utils';
import client from 'graphQL/client';
import { useSponsoredPoolsQuery } from 'graphQL/generates';
import { useSubstrateState } from 'substrate-lib';
import { PoolInfo } from 'gafi-dashboard/interfaces';
import { useTranslation } from 'react-i18next'


export const tablesTableData = [
  {
    name: 'Esthera Jackson',
    email: 'alexa@simmmple.com',
    subdomain: 'Manager',
    domain: 'Organization',
    status: 'Online',
    date: '14/06/21',
  },
  {
    name: 'Alexa Liras',
    email: 'laurent@simmmple.com',
    subdomain: 'Programmer',
    domain: 'Developer',
    status: 'Offline',
    date: '12/05/21',
  },
  {
    name: 'Laurent Michael',
    email: 'laurent@simmmple.com',
    subdomain: 'Executive',
    domain: 'Projects',
    status: 'Online',
    date: '07/06/21',
  },
  {
    name: 'Freduardo Hill',
    email: 'freduardo@simmmple.com',
    subdomain: 'Manager',
    domain: 'Organization',
    status: 'Online',
    date: '14/11/21',
  },
  {
    name: 'Daniel Thomas',
    email: 'daniel@simmmple.com',
    subdomain: 'Programmer',
    domain: 'Developer',
    status: 'Offline',
    date: '21/01/21',
  },
  {
    name: 'Mark Wilson',
    email: 'mark@simmmple.com',
    subdomain: 'Designer',
    domain: 'UI/UX Design',
    status: 'Offline',
    date: '04/09/20',
  },
];

const SponsoredPool: React.FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedStakingPool', currentAccount],
    async (): Promise<GafiPrimitivesPoolTicket | undefined> => {
      if (api) {
        const res = await api.query.stakingPool.tickets(
          currentAccount.address as string
        );
        if (res.isSome) {
          return res.unwrap();
        }
        return undefined;
      }
    },
    {
      enabled: !!currentAccount,
    }
  );

  // Example for query data from graphql.
  const { data: sponsoredPool } = useSponsoredPoolsQuery(client);

  const { data: poolInfo } = useQuery(
    'getStakingPoolInfo',
    async (): Promise<PoolInfo | undefined> => {
      if (api) {
        const basic = await api.query.stakingPool.services('Basic');
        const medium = await api.query.stakingPool.services('Medium');
        const advance = await api.query.stakingPool.services('Advance');

        return {
          basic: basic.unwrap(),
          medium: medium.unwrap(),
          advance: advance.unwrap(),
        };
      }
    }
  );

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
        isClosable: true,
        status: 'success',
      });
      refetch();
      setSelectedPool('');
    } else {
      toast({
        description: `Current transaction status: ${status.type}`,
        isClosable: true,
        status: 'info',
      });
    }
  };

  const onJoinPool = async (poolPackage: string) => {
    setSelectedPool(poolPackage);
    const [account, options] = await getFromAcct(currentAccount);
    if (api && account) {
      const txExecute = api.tx.pool.join({ Staking: poolPackage });
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setSelectedPool('');
        }
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
          setSelectedPool('');
        }
      }
    }
  };

  const onLeavePool = async () => {
    const [account, options] = await getFromAcct(currentAccount);
    if (api && account) {
      const txExecute = api.tx.pool.leave();
      if (options) {
        try {
          await txExecute.signAndSend(account, options, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
        }
      } else {
        try {
          await txExecute.signAndSend(account, txCallback);
        } catch (err: any) {
          toast({
            description: `😞 Transaction Failed: ${err.toString()}`,
            isClosable: true,
            status: 'error',
          });
        }
      }
    }
  };

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
          Add Pool
        </Button>
      </HStack>
      {joinedPoolInfo && (
        <VStack>
          <Text>
            Joined pool type: {joinedPoolInfo.ticketType.asStaking.type}
          </Text>
          <Text>
            Time: {new Date(Number(joinedPoolInfo.joinTime)).toLocaleString()}
          </Text>
        </VStack>
      )}
      <Table
        title="Sponsored Pools"
        captions={['Author', 'Function', 'Status', 'Employed', '']}
        data={tablesTableData}
      />
      <HStack p={5} gap={5}>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            {t("POOL_TYPE.BASIC")}
          </Text>
          <VStack>
            {poolInfo?.basic?.service.txLimit && (
              <Text>
                Transactions per minute:{' '}
                {poolInfo.basic.service.txLimit.toNumber()}
              </Text>
            )}
            {poolInfo?.basic?.service.discount && (
              <Text>
                {t("DISCOUNT_FEE")}: {poolInfo.basic.service.discount.toNumber()} %
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asStaking.type === 'Basic' ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Basic')}
                isLoading={selectedPool === 'Basic'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            {t("POOL_TYPE.MEDIUM")}
          </Text>
          <VStack>
            {poolInfo?.medium?.service.txLimit && (
              <Text>
                Transactions per minute:{' '}
                {poolInfo.medium.service.txLimit.toNumber()}
              </Text>
            )}
            {poolInfo?.medium?.service.discount && (
              <Text>
                {t("DISCOUNT_FEE")}: {poolInfo.medium.service.discount.toNumber()} %
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asStaking.isMedium ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Medium')}
                isLoading={selectedPool === 'Medium'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            {t("POOL_TYPE.ADVANCE")}
          </Text>
          <VStack>
            {poolInfo?.advance?.service.txLimit && (
              <Text>Transactions per minute: Maximum</Text>
            )}
            {poolInfo?.advance?.service.discount && (
              <Text>
                {t("DISCOUNT_FEE")}: {poolInfo.advance.service.discount.toNumber()} %
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asStaking.isAdvance ? (
              <Button variant="solid" color="red.300" onClick={onLeavePool}>
                Leave
              </Button>
            ) : (
              <Button
                color="primary"
                variant="solid"
                onClick={() => onJoinPool('Advance')}
                isLoading={selectedPool === 'Advance'}
              >
                Join
              </Button>
            )}
          </VStack>
        </Card>
      </HStack>
      {isOpen && <ModalAddSponsoredPool isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default SponsoredPool;
