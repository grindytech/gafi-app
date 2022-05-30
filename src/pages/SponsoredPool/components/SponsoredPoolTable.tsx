// Chakra imports
import {
  Button,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { mdiContentCopy } from '@mdi/js';
import Card from 'components/card/Card';
import CardBody from 'components/card/CardBody';
import CardHeader from 'components/card/CardHeader';
import { shorten } from 'components/utils';
import { SponsoredPool } from 'graphQL/generates';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import SkeletonLoadingRow from 'components/SkeletonLoadingRow';
import SponsoredPoolTableRow from './SponsoredPoolTableRow';

export interface ISponsoredPool {
  id: string | undefined;
  amount: string | undefined;
  owner: string | undefined;
  discount: number | undefined;
  limit: number | undefined;
}

export interface TableCaption {
  label: string;
  fieldName: string;
}

interface ISponsoredPoolTableProps {
  title: string;
  captions: TableCaption[];
  sponsoredPools: SponsoredPool[];
  children: React.ReactNode;
  limitRow: number;
}

const SponsoredPoolTable = (props: ISponsoredPoolTableProps) => {
  const { t } = useTranslation();
  const { title, captions, sponsoredPools, children, limitRow } = props;
  const textColor = useColorModeValue('gray.700', 'white');
  const [selectedPool, setSelectedPool] = useState<SponsoredPool | undefined>();
  const SkeletonArray = new Array(limitRow).fill(0);
  return (
    <>
      <Card overflowX={{ sm: 'scroll', xl: 'hidden' }}>
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            {title}
          </Text>
        </CardHeader>

        <CardBody>
          <Table variant="simple" textAlign="center" color={textColor}>
            <TableCaption>{children}</TableCaption>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                {React.Children.toArray(
                  captions.map(caption => (
                    <Th color="gray.400">{caption.label}</Th>
                  ))
                )}
              </Tr>
            </Thead>
            <Tbody justifyContent="flex-start">
              {React.Children.toArray(
                sponsoredPools
                  ? sponsoredPools.map(pool => (
                      <SponsoredPoolTableRow
                        pool={pool}
                        onClick={() => setSelectedPool(pool)}
                      />
                    ))
                  : SkeletonArray.map(() => (
                      <SkeletonLoadingRow columnAmount={limitRow} />
                    ))
              )}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Modal
        isOpen={!!selectedPool}
        onClose={() => setSelectedPool(undefined)}
        scrollBehavior="inside"
        size="2xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedPool?.poolId &&
              t('POOL_POOL_NAME', { poolName: shorten(selectedPool?.poolId) })}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>{t('SPONSORED_CONTRACTS')}</Text>
            <VStack alignItems="flex-start">
              {React.Children.toArray(
                selectedPool?.targets.map((target: string) => (
                  <InputGroup width="300px">
                    <Input value={shorten(target)} readOnly />
                    <InputRightElement>
                      <CopyToClipboard text={target}>
                        <IconButton
                          aria-label="copy-button"
                          icon={
                            <Icon>
                              <path d={mdiContentCopy} />
                            </Icon>
                          }
                        />
                      </CopyToClipboard>
                    </InputRightElement>
                  </InputGroup>
                ))
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setSelectedPool(undefined)}
            >
              {t('CLOSE')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SponsoredPoolTable;
