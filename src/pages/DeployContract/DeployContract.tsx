import {
  Box,
  Button,
  HStack,
  Icon,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { BigNumber } from '@ethersproject/bignumber';
import { mdiCloudUploadOutline, mdiContentCopy } from '@mdi/js';
import React, { useCallback, useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';
import { ContractSendMethod } from 'web3-eth-contract';

import Banner from 'components/Banner';
import Card from 'components/card/Card';
import { shorten } from 'components/utils';

interface DropzoneProps {
  onUploadFile: React.Dispatch<React.SetStateAction<any>>;
}

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#A0AEC0',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  height: '200px',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const Dropzone: React.FC<DropzoneProps> = ({ onUploadFile }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { t } = useTranslation();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        if (acceptedFiles.length + files.length > 5) {
          return;
        }
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
        const filesParsed = await Promise.all(
          acceptedFiles.map(async acceptedFile =>
            JSON.parse(await acceptedFile.text())
          )
        );
        onUploadFile(filesParsed);
      }
      // Do something with the files
    },
    [files]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 5, accept: 'application/json' });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
      border: 'none',
      background: '#F5F7FB',
      boxShadow: 'none',
      borderRadius: '16px',
      padding: '60px',
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const fileList = files.map(file => (
    <Box>{`${file.name} - ${file.size / 1024} kb`}</Box>
  ));

  return (
    <Card {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <Icon mb={4} color="primary" w={24} h={18}>
        <path fill="currentColor" d={mdiCloudUploadOutline} />
      </Icon>
      {isDragActive ? (
        <Text color="gray.500">Drop the files here ...</Text>
      ) : (
        <Box display="flex">
          <Text color="primary">Drag & drop</Text>
          <Text ml={2} color="black">
            contract files here, or click to select files.
          </Text>
        </Box>
      )}
      {React.Children.toArray(
        fileList.map(file => (
          <Text mt={3} color="grey">
            {t('FILE_FILE_NAME', {
              fileName: file.props.children,
            })}
          </Text>
        ))
      )}
    </Card>
  );
};

export async function addAdditionalGas(
  contract: ContractSendMethod,
  address: string
) {
  const gasLimit = await contract.estimateGas({ from: address });
  const additionalGas = BigNumber.from(gasLimit.toString())
    .mul('50')
    .div('100');
  return BigNumber.from(gasLimit.toString()).add(additionalGas).toString();
}

const DeployContract = () => {
  const [contractAddresses, setContractAddresses] = useState<string[]>([]);
  const toast = useToast();
  const { account, connect, isConnected, reset, balance, ethereum } =
    useWallet();
  const [txnFee, setTxnFee] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [contractFiles, setContractFiles] = useState<any>([]);
  const { t } = useTranslation();

  const onDeploy = async () => {
    setIsLoading(true);
    if (account && ethereum && contractFiles) {
      const web3 = new Web3(ethereum);
      const beforeBalance = await web3.eth.getBalance(account);
      await Promise.all(
        contractFiles.map(async (contractFile: any) => {
          const userContract = new web3.eth.Contract(contractFile.abi);
          const contractData = await userContract.deploy({
            data: contractFile.bytecode,
            arguments: [],
          });

          const options = {
            from: account,
            data: contractData.encodeABI(),
            gas: await addAdditionalGas(contractData, account),
            gasPrice: await web3.eth.getGasPrice(),
          };
          try {
            const result = await web3.eth.sendTransaction(options);
            setContractAddresses(prevState => [
              ...prevState,
              result.contractAddress || '',
            ]);
            const newBalance = await web3.eth.getBalance(account);
            setTxnFee(
              prevTxnFee =>
                prevTxnFee + Number(beforeBalance) - Number(newBalance)
            );
            toast({
              description: t('DEPLOY_NEW_CONTRACT_SUCCESS'),

              isClosable: true,
              status: 'success',
            });
          } catch (error) {
            setIsLoading(false);
            console.log('error :>> ', error);
          }
        })
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <Banner
        title={t('DEPLOY_CONTRACT')}
        subTitle={t('DEPLOY_CONTRACT_DESCRIPTION')}
        bannerBg="/assets/layout/deploycontract-banner.png"
      />
      <Card>
        <VStack minW="400px" gap={4}>
          <Dropzone
            onUploadFile={files =>
              setContractFiles((prevContractFiles: any) => [
                ...prevContractFiles,
                ...files,
              ])
            }
          />
          {contractAddresses.length && (
            <Card
              bg="greyBg"
              width="50%"
              boxShadow="none"
              border="1px dashed #B4CAFF"
              alignItems="center"
            >
              {contractAddresses.map(contractAddress => (
                <HStack mb={3}>
                  <Text>{shorten(contractAddress)}</Text>
                  <CopyToClipboard text={contractAddress}>
                    <Icon cursor="pointer" ml={4} color="primary" w={5} h={5}>
                      <path fill="currentColor" d={mdiContentCopy} />
                    </Icon>
                  </CopyToClipboard>
                </HStack>
              ))}
              {txnFee && (
                <HStack>
                  <Text>{t('TOTAL_TRANSACTION_FEE')}</Text>
                  <Text fontWeight="bold" color="primary">
                    {(txnFee / 10 ** 18).toFixed(5)}
                  </Text>
                </HStack>
              )}
            </Card>
          )}

          <VStack gap={2}>
            {isConnected() ? (
              account && (
                <CopyToClipboard text={account.toString()}>
                  <Button mb={4} variant="outline">
                    {shorten(account.toString())}
                  </Button>
                </CopyToClipboard>
              )
            ) : (
              <Button
                mb={4}
                variant="outline"
                onClick={() => connect('injected')}
              >
                {t('CONNECT_METAMASK')}
              </Button>
            )}
            <Button
              size="sm"
              px={8}
              fontSize="md"
              fontWeight="bold"
              colorScheme="greyBg"
              onClick={onDeploy}
              isLoading={isLoading}
              disabled={contractFiles.length === 0 || !isConnected()}
            >
              {t('DEPLOY')}
            </Button>
          </VStack>
        </VStack>
      </Card>
    </>
  );
};

export default DeployContract;
