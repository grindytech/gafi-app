import {
  Button,
  Td,
  Tr,
  Text,
  Icon,
  HStack,
  VStack,
  Avatar,
  IconButton,
} from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

import ModalChangeContractOwner from './ModalChangeContractOwner';

import { ClaimedContract } from 'graphQL/generates';
import useMessageToast from 'hooks/useMessageToast';
import { shorten } from 'utils';

interface IContractTableProps {
  contract: ClaimedContract;
}

const ContractsTableRow: React.FC<IContractTableProps> = ({ contract }) => {
  const { t } = useTranslation();
  const { copySuccessToast } = useMessageToast();
  const [contractChanging, setContractChanging] = useState('');
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <Tr>
        <Td>
          <HStack>
            <Avatar
              mr={4}
              w={14}
              h={14}
              name="Segun Adebayo"
              src="/assets/layout/contract-img-1.png"
            />
            <VStack ml={0} alignItems="flex-start">
              <Text fontWeight="bold" fontSize="md" minWidth="100%">
                {shorten(contract.accountId)}
              </Text>
              <Text fontSize="xs">Games</Text>
            </VStack>
          </HStack>
        </Td>

        <Td>
          <HStack justify="center">
            <Text>{shorten(contract.contractAddress)}</Text>
            <CopyToClipboard text={contract.contractAddress}>
              <IconButton
                aria-label="copy to clipboard"
                onClick={copySuccessToast}
                ml={4}
                variant="link"
                icon={
                  <Icon>
                    <path fill="currentColor" d={mdiContentCopy} />
                  </Icon>
                }
              />
            </CopyToClipboard>
          </HStack>
        </Td>

        <Td textAlign="center">
          <Button
            onClick={() => {
              const contractAddress = contract.contractAddress?.toString();
              if (contractAddress) {
                setContractChanging(contractAddress);
              }
            }}
            color="primary"
            size="sm"
            variant="outline"
          >
            {t('CHANGE_OWNER')}
          </Button>
        </Td>

        <Td>
          <ModalChangeContractOwner
            contractAddress={contractChanging}
            setIsPending={setIsPending}
            onClose={() => (isPending ? null : setContractChanging(''))}
          />
        </Td>
      </Tr>
    </>
  );
};

export default ContractsTableRow;
