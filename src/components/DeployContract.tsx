import { Box, Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { BigNumber } from '@ethersproject/bignumber';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';
import { ContractSendMethod } from 'web3-eth-contract';

import { useSubstrateState } from '../substrate-lib';

import Card from './card/Card';
import { shorten } from './utils';

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
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const fileList = files.map(file => (
    <Box>{`${file.name} - ${file.size / 1024} kb`}</Box>
  ));

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Text color="gray.500">Drop the files here ...</Text>
        ) : (
          <Text color="gray.500">
            Drag and drop contract files here, or click to select files
          </Text>
        )}
      </div>
      {fileList.length > 0 && <Text pt={4}>Files</Text>}
      {React.Children.toArray(fileList)}
    </>
  );
};

async function addAdditionalGas(contract: ContractSendMethod, address: string) {
  const gasLimit = await contract.estimateGas({ from: address });
  const additionalGas = BigNumber.from(gasLimit.toString())
    .mul('50')
    .div('100');
  return BigNumber.from(gasLimit.toString()).add(additionalGas).toString();
}

const DeployContract = () => {
  const toast = useToast();
  const { account, connect, isConnected, reset, balance, ethereum } =
    useWallet();
  const [txnFee, setTxnFee] = useState(0);
  const { api, keyring, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const [contractFiles, setContractFiles] = useState<any>([]);

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
            console.log('result', result);
            const newBalance = await web3.eth.getBalance(account);
            setTxnFee(
              prevTxnFee =>
                prevTxnFee + Number(beforeBalance) - Number(newBalance)
            );
            toast({
              description: `Deploy new contract success!`,
              isClosable: true,
              status: 'success',
            });
          } catch (error) {
            console.log('error :>> ', error);
          }
        })
      );
      setIsLoading(false);
    }
  };

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <HStack justifyContent="space-between" mb={5}>
        <Text fontWeight="bold" fontSize="2xl">
          Deploy Contract
        </Text>
        {isConnected() ? (
          <HStack>
            <Text id="metamask">{shorten(account || '')}</Text>
            <Button onClick={() => reset()}>Disconnect Metamask</Button>
          </HStack>
        ) : (
          <Button onClick={() => connect('injected')}>Connect Metamask</Button>
        )}
      </HStack>
      <Card>
        <VStack minW="400px" gap={4}>
          <Box>
            <Dropzone
              onUploadFile={files =>
                setContractFiles((prevContractFiles: any) => [
                  ...prevContractFiles,
                  ...files,
                ])
              }
            />
          </Box>
          <VStack gap={2}>
            {txnFee && <Text>Total transaction fee: {txnFee / 10 ** 18}</Text>}
            <Button
              colorScheme="teal"
              onClick={onDeploy}
              isLoading={isLoading}
              disabled={contractFiles.length === 0 || !isConnected()}
            >
              Deploy contract
            </Button>
          </VStack>
        </VStack>
      </Card>
    </Box>
  );
};

export default DeployContract;
