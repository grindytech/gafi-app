import { Box, Button, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import Dropzone from './components/Dropzone';

import Banner from 'components/Banner';
import Card from 'components/card/Card';
import useAnalyticsEventTracker from 'hooks/useAnalyticsEventTracker';
import useDeploy from 'hooks/useDeploy';
import useMessageToast from 'hooks/useMessageToast';
import { shorten } from 'utils';

const DeployContract = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contractFiles, setContractFiles] = useState<any>([]);
  const { copySuccessToast } = useMessageToast();
  const gaEventTracker = useAnalyticsEventTracker('Deploy contract');
  const { t } = useTranslation();
  const { deploy, contractAddresses, txnFee, isLoading, isConnected } =
    useDeploy();

  return (
    <>
      <Banner
        title={t('DEPLOY_CONTRACT')}
        subTitle={t('DEPLOY_CONTRACT_DESCRIPTION')}
        bannerBg="/assets/layout/deploycontract-banner.svg"
        btnLink="https://wiki.gafi.network/learn/demo"
      />
      <Box p={{ sm: 4, md: 0 }}>
        <Card>
          <VStack gap={4}>
            <Dropzone
              onUploadFile={files =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setContractFiles((prevContractFiles: any) => [
                  ...prevContractFiles,
                  ...files,
                ])
              }
            />
            {contractAddresses.length && (
              <Card
                bg="greyBg"
                width={{ base: 'full', md: '50%' }}
                boxShadow="none"
                border="1px dashed #B4CAFF"
                alignItems="center"
              >
                {contractAddresses.map(contractAddress => (
                  <HStack mb={3}>
                    <Text>{shorten(contractAddress)}</Text>
                    <CopyToClipboard text={contractAddress}>
                      <Icon
                        onClick={copySuccessToast}
                        cursor="pointer"
                        ml={4}
                        color="primary"
                      >
                        <path fill="currentColor" d={mdiContentCopy} />
                      </Icon>
                    </CopyToClipboard>
                  </HStack>
                ))}
                {txnFee && (
                  <Text
                    sx={{
                      span: {
                        color: 'primary',
                        fontWeight: 'bold',
                      },
                    }}
                  >
                    {t('TOTAL_TRANSACTION_FEE')}{' '}
                    <span>{(txnFee / 10 ** 18).toFixed(5)}</span>
                  </Text>
                )}
              </Card>
            )}
            <VStack gap={2}>
              <Button
                px={8}
                onClick={() => {
                  gaEventTracker({ action: 'Click Deploy contract' });
                  deploy(contractFiles);
                }}
                isLoading={isLoading}
                disabled={contractFiles.length === 0 || !isConnected()}
              >
                {t('DEPLOY')}
              </Button>
            </VStack>
          </VStack>
        </Card>
      </Box>
    </>
  );
};

export default DeployContract;
