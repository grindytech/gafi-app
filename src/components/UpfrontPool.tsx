import { Box, Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { GafiPrimitivesPoolTicket } from '@polkadot/types/lookup';
import { ISubmittableResult } from '@polkadot/types/types';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { useSubstrate, useSubstrateState } from '../substrate-lib';

import { PoolInfo } from 'gafi-dashboard/interfaces';
import Card from './card/Card';
import { getFromAcct, handleTxError } from './utils';
import { BN, formatBalance } from '@polkadot/util';
import { Trans, useTranslation } from 'react-i18next'


export interface TicketType {
  upfront?: string;
  staking?: string;
}

const JoinPool = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { api, currentAccount, chainDecimal } = useSubstrateState();
  const [selectedPool, setSelectedPool] = useState('');
  const { data: joinedPoolInfo, refetch } = useQuery(
    ['getJoinedUpfrontPool', currentAccount],
    async (): Promise<GafiPrimitivesPoolTicket | undefined> => {
      if (api) {
        const res = await api.query.upfrontPool.tickets(
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

  const { data: poolInfo } = useQuery(
    'getPoolInfo',
    async (): Promise<PoolInfo | undefined> => {
      if (api) {
        const basic = await api.query.upfrontPool.services('Basic');
        const medium = await api.query.upfrontPool.services('Medium');
        const advance = await api.query.upfrontPool.services('Advance');
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
      const txExecute = api.tx.pool.join({ Upfront: poolPackage });
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
    if (api) {
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
        } finally {
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
        } finally {
        }
      }
    }
  };

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <Text fontWeight="bold" fontSize="2xl" mb={5}>
        {t("POOL.UPFRONT_POOL")}
      </Text>
      {joinedPoolInfo && (
        <VStack>
          {/* <Text>Joined pool type: {joinedPoolInfo.ticketType.upfront}</Text> */}
          <Text>
            Time:{' '}
            {new Date(joinedPoolInfo.joinTime.toNumber()).toLocaleString()}
          </Text>
        </VStack>
      )}
      <HStack p={5} gap={5}>
        <Card>
          <Text textAlign="center" fontWeight="bold" mb={5}>
            {t("POOL_TYPE.BASIC")}
          </Text>
          <VStack>
            {poolInfo?.basic?.service?.txLimit && (
              <Text>
                <Trans i18nKey="TRANSACTIONS_PER_MINUTE">
                  Transactions per minute:{' '}
                  {{
                    transactionAmount:
                      poolInfo.basic.service.txLimit.toNumber(),
                  }}
                </Trans>
              </Text>
            )}
            {poolInfo?.basic?.service?.discount && (
              <Text>
                <Trans i18nKey="DISCOUNT_FEE">
                  Discount fee:{' '}
                  {{
                    discountPercent: poolInfo.basic.service.discount.toNumber(),
                  }}{' '}
                  %
                </Trans>
              </Text>
            )}
            {poolInfo?.basic.value && (
              <Text>
                <Trans i18nKey="POOL_FEE">
                  Fee:{' '}
                  {{
                    poolFee: formatBalance(
                      poolInfo?.basic.value.toString(),
                      { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                      chainDecimal
                    ),
                  }}{' '}
                  / 30 minute
                </Trans>
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.type === 'Basic' ? (
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
            {poolInfo?.medium.service.txLimit && (
              <Text>
                <Trans i18nKey="TRANSACTIONS_PER_MINUTE">
                  Transactions per minute:{' '}
                  {{
                    transactionAmount:
                      poolInfo.medium.service.txLimit.toNumber(),
                  }}
                </Trans>
              </Text>
            )}
            {poolInfo?.medium.service.discount && (
              <Text>
                <Trans i18nKey="DISCOUNT_FEE">
                  Discount fee:{' '}
                  {{
                    discountPercent:
                      poolInfo.medium.service.discount.toNumber(),
                  }}{' '}
                  %
                </Trans>
              </Text>
            )}
            {poolInfo?.medium.value && (
              <Text>
                <Trans i18nKey="POOL_FEE">
                  Fee:{' '}
                  {{
                    poolFee: formatBalance(
                      poolInfo?.medium.value.toString(),
                      { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                      chainDecimal
                    ),
                  }}{' '}
                  / 30 minute
                </Trans>
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.isMedium ? (
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
              <Trans i18nKey="TRANSACTIONS_PER_MINUTE">
                Transactions per minute:{' '}
                {{
                  transactionAmount:
                    poolInfo.advance.service.txLimit.toNumber(),
                }}
              </Trans>
            )}
            {poolInfo?.advance?.service.discount && (
              <Text>
                <Trans i18nKey="DISCOUNT_FEE">
                  Discount fee:{' '}
                  {{
                    discountPercent: poolInfo.advance.service.discount.toNumber(),
                  }}{' '}
                  %
                </Trans>
              </Text>
            )}
            {poolInfo?.advance.value && (
              <Text>
               <Trans i18nKey="POOL_FEE">
                  Fee:{' '}
                  {{
                    poolFee: formatBalance(
                      poolInfo?.advance.value.toString(),
                      { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
                      chainDecimal
                    ),
                  }}{' '}
                  / 30 minute
                </Trans>
              </Text>
            )}

            {joinedPoolInfo?.ticketType.asUpfront.isAdvance ? (
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
    </Box>
  );
};

export default JoinPool;
