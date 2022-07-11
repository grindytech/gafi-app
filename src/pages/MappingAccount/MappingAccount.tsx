import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Switch,
  Text,
  useToken,
  VStack,
} from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';

import Banner from 'components/Banner';
import Card from 'components/card/Card';
import { useSubstrateState } from 'contexts/substrateContext';
import useMappingAccount from 'hooks/useMappingAccount';
import useMessageToast from 'hooks/useMessageToast';
import { shorten } from 'utils';

function MappingAccount() {
  const { t } = useTranslation();
  const { account, connect, isConnected } = useWallet();
  const { currentAccount } = useSubstrateState();
  const [isWithdraw, setIsWithdraw] = useState(true);
  const { copySuccessToast } = useMessageToast();
  const { isLoading, mappingAccount } = useMappingAccount();
  const borderBottom = useToken('colors', 'borderBottom');

  return (
    <>
      <Banner
        title={t('MAPPING_ACCOUNT')}
        subTitle={t('MAPPING_ACCOUNT_DESCRIPTION')}
        bannerBg="/assets/layout/mapping-account-banner.png"
        btnLink="https://wiki.gafi.network/learn/proof-address-mapping"
      />
      <Box p={{ sm: 4, md: 0 }}>
        <Card>
          <VStack width="full" gap={2}>
            <SimpleGrid
              w="full"
              columns={{ sm: 1, md: 2, lg: 1, xl: 2 }}
              spacing={4}
            >
              <Card
                border={`2px solid ${borderBottom}`}
                boxShadow="none"
                py={{ sm: 8, lg: 12 }}
                px={{ sm: 4, lg: 12 }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <HStack mb={6}>
                  <Heading size="sm">{t('METAMASK_ADDRESS')}</Heading>
                  <Box>
                    <Image src="/assets/layout/metamask.png" />
                  </Box>
                </HStack>
                {isConnected() ? (
                  account && (
                    <CopyToClipboard text={account.toString()}>
                      <Button
                        mb={4}
                        variant="ghost"
                        onClick={copySuccessToast}
                        w={{ sm: 'full' }}
                        rightIcon={
                          <Icon color="primary">
                            <path fill="currentColor" d={mdiContentCopy} />
                          </Icon>
                        }
                      >
                        {shorten(account.toString())}
                      </Button>
                    </CopyToClipboard>
                  )
                ) : (
                  <Button
                    mb={4}
                    variant="primary"
                    w="full"
                    onClick={() => connect('injected')}
                  >
                    {t('CONNECT_METAMASK')}
                  </Button>
                )}
              </Card>
              <Card
                border={`2px solid ${borderBottom}`}
                boxShadow="none"
                py={{ sm: 8, lg: 12 }}
                px={{ sm: 4, lg: 12 }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <HStack mb={6}>
                  <Heading size="sm">{t('POLKADOT_ADDRESS')}</Heading>
                  <Box>
                    <Image src="/assets/layout/polkadot.png" />
                  </Box>
                </HStack>
                {currentAccount && (
                  <CopyToClipboard text={currentAccount.address.toString()}>
                    <Button
                      mb={4}
                      variant="ghost"
                      w="full"
                      onClick={copySuccessToast}
                      rightIcon={
                        <Icon color="primary">
                          <path fill="currentColor" d={mdiContentCopy} />
                        </Icon>
                      }
                    >
                      {shorten(currentAccount.address.toString())}
                    </Button>
                  </CopyToClipboard>
                )}
              </Card>
            </SimpleGrid>
            <Flex
              w="full"
              direction={{ sm: 'row', md: 'column' }}
              h={24}
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControl
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Switch
                  checked={isWithdraw}
                  defaultChecked
                  onChange={event => setIsWithdraw(event.target.checked)}
                  size="lg"
                  id="isWithdraw"
                />
                <FormLabel htmlFor="isWithdraw" ml={4} mb={0}>
                  <Text>{t('WITHDRAW')}</Text>
                </FormLabel>
              </FormControl>
              <Button
                variant="solid"
                px={{ sm: 6, md: 20 }}
                onClick={() => {
                  mappingAccount(isWithdraw);
                }}
                isLoading={isLoading}
              >
                {t('MAPPING')}
              </Button>
            </Flex>
          </VStack>
        </Card>
      </Box>
    </>
  );
}

export default MappingAccount;
