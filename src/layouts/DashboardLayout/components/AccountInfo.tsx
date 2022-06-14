import { Button, Icon, Text, useToast } from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import { KeyringPair } from '@polkadot/keyring/types';
import { BN, formatBalance } from '@polkadot/util';
import { useCallback, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';

import Card from 'components/card/Card';
import {
  acctAddr,
  getFromAcct,
  getGAKIAccountAddress,
  handleTxError,
  shorten,
} from 'components/utils';
import { useSubstrate } from 'substrate-lib';

const AccountInfo = () => {
  const { account } = useWallet();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const {
    setCurrentAccount,
    state: { keyring, currentAccount, api, chainDecimal },
  } = useSubstrate();
  const [accountBalance, setAccountBalance] = useState(new BN(0));
  const pairs = keyring?.getPairs() || [];
  const setPolkadotAccount = useCallback(async () => {
    const response = await api?.query.proofAddressMapping.h160Mapping(account);
    const polkadotAccount = response?.toHuman() || '';
    const initPair = pairs.find(
      (pair: KeyringPair) =>
        getGAKIAccountAddress(pair.addressRaw) === polkadotAccount
    );

    if (initPair) {
      setCurrentAccount(initPair);
    } else if (pairs.length > 0) {
      setCurrentAccount(pairs[0]);
    }
  }, [account, api, keyring]);

  const setBalanceAccount = useCallback(async () => {
    let unsubscribe: any;
    if (currentAccount) {
      try {
        unsubscribe = await api?.query.system.account(
          acctAddr(currentAccount),
          (balance: any) => {
            setAccountBalance(balance.data.free);
          }
        );
      } catch (error: any) {
        toast({
          description: error.toString(),
          isClosable: true,
          status: 'error',
        });
      }
      return () => unsubscribe && unsubscribe();
    }
  }, [api, currentAccount]);

  useEffect(() => {
    setBalanceAccount();
  }, [setBalanceAccount]);

  useEffect(() => {
    setPolkadotAccount();
  }, [setPolkadotAccount]);
  const txResHandler = ({ status, events }: any) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
        isClosable: true,
        status: 'info',
      });
    }
  };

  // @ts-ignore
  const txErrHandler = err => {
    toast({
      description: t('TRANSACTION_FAILED', {
        errorMessage: err.toString(),
      }),
      isClosable: true,
      status: 'error',
    });
    setIsLoading(false);
  };

  const onFaucet = async () => {
    setIsLoading(true);
    if (currentAccount) {
      const [acc, options] = await getFromAcct(currentAccount);

      if (api) {
        const txExecute = api.tx.faucet.faucet();

        if (options) {
          const unsub = await txExecute
            .signAndSend(acc, options, txResHandler)
            .catch(txErrHandler);
        } else {
          const unsub = await txExecute
            .signAndSend(acc, txResHandler)
            .catch(txErrHandler);
        }
      }
    }
  };

  return (
    <Card sx={AccountInfoStyled}>
      <Text sx={titleStyled}>{t('YOUR_BALANCE')}</Text>
      {currentAccount && (
        <CopyToClipboard text={acctAddr(currentAccount)}>
          <Button
            sx={{ width: '100%' }}
            variant="ghost"
            rightIcon={
              <Icon w={5} h={5} color="primary">
                <path fill="currentColor" d={mdiContentCopy} />
              </Icon>
            }
          >
            {shorten(acctAddr(currentAccount))}
          </Button>
        </CopyToClipboard>
      )}

      <Text sx={balanceStyled}>
        {formatBalance(
          accountBalance,
          { withSi: false, forceUnit: '-' },
          chainDecimal
        )}
      </Text>
      <Button onClick={onFaucet} isLoading={isLoading} sx={faucetButtonStyled}>
        {t('FAUCET')}
      </Button>
    </Card>
  );
};

export default AccountInfo;

const AccountInfoStyled = {
  height: '40vh',
  flex: 2,
  alignItems: 'center',
  bg: 'white',
  display: 'flex',
  justifyContent: 'space-evenly',
};

const titleStyled = {
  fontSize: 'xl',
  fontWeight: 'medium',
  mb: 4,
  pt: 4,
};

const balanceStyled = {
  color: 'primary',
  fontWeight: 'bold',
  fontSize: '4xl',
  mt: 16,
};

const faucetButtonStyled = {
  mt: 22,
  width: '100%',
};
