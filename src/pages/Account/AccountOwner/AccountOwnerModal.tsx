import {
  Box,
  Center,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import RatioPicture from 'components/RatioPicture';

import { cloundinary_link } from 'axios/cloudinary_axios';
import AccountOwnerIncrement from './AccountOwnerIncrement';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { AccountOwnerFieldProps } from '.';
import AccountOwnerSell from './AccountOwnerSell';
import AccountOwnerSubmit from './AccountOwnerSubmit';
import { useState } from 'react';

interface AccountOwnerModalProps {
  onClose: () => void;
  onSuccess: () => void;
  formState: {
    control: Control<AccountOwnerFieldProps, any>;
    setValue: UseFormSetValue<AccountOwnerFieldProps>;
    watch: UseFormWatch<AccountOwnerFieldProps>;
  };
}

export default function AccountOwnerModal({
  formState,
  onClose,
  onSuccess,
}: AccountOwnerModalProps) {
  const { duration, price, product: productState } = formState.watch();
  const product = Object.values(productState).map(meta => ({ ...meta }));

  const [tab, setTab] = useState(0);

  const ListTab = [
    {
      id: 0,
      heading: 'Ordinary Sale',
      body: `Sale your NFTs with your set price.`,
      submit: (
        <AccountOwnerSell
          setValue={formState.setValue}
          price={price}
          control={formState.control}
        />
      ),
    },
    {
      id: 1,
      heading: 'Auction',
      body: `The highest bid wins when the auction ends.`,
      submit: (
        <AccountOwnerSell
          setValue={formState.setValue}
          price={price}
          control={formState.control}
        />
      ),
    },
    {
      id: 2,
      heading: 'Candles auction',
      body: `Auction ends unknown, highest bid wins.`,
      isDisabled: true,
    },
  ];

  return (
    <Modal isOpen={true} onClose={onClose} size="3xl" isCentered>
      <ModalOverlay />

      <ModalContent as="form">
        <ModalHeader fontWeight="medium" paddingBottom={4}>
          <Center justifyContent="space-between">
            <Heading fontSize="lg" color="shader.a.900" fontWeight="inherit">
              Sale NFTs
            </Heading>

            <ModalCloseButton position="unset" />
          </Center>

          <Text fontSize="sm" color="shader.a.500">
            NFT selected&nbsp;
            <Text as="span" color="primary.a.500">
              {product.length} Items
            </Text>
          </Text>
        </ModalHeader>

        <ModalBody padding={0}>
          <List
            borderWidth="0.0625rem 0px 0.0625rem 0px"
            borderColor="shader.a.300"
            py={4}
            px={6}
            height={{
              base: product.length > 3 ? 72 : undefined,
              md: product.length > 4 ? 72 : undefined,
            }}
            overflowY="auto"
            display="grid"
            gridTemplateColumns={{
              md: 'repeat(2, 1fr)',
            }}
            gap={2}
          >
            {product.map(meta => {
              const key = `${meta.collection.id}/${meta.nft.id}`;

              return (
                <ListItem
                  key={key}
                  border="0.0625rem solid"
                  borderColor="shader.a.300"
                  borderRadius="xl"
                  display="flex"
                  alignItems="start"
                  padding={2}
                  gap={4}
                >
                  <RatioPicture
                    src={
                      meta.nft?.image ? cloundinary_link(meta.nft.image) : null
                    }
                    sx={{ pt: 0, width: 20, height: 20 }}
                  />

                  <Box
                    fontWeight="medium"
                    color="shader.a.900"
                    flex={1}
                    width={24}
                    wordBreak="break-word"
                  >
                    <Text fontSize="sm" color="shader.a.500">
                      {meta.collection?.title || '-'}
                    </Text>

                    <Text as="strong">
                      {meta.nft?.title || '-'}&nbsp;
                      <Text as="span" fontWeight="normal" color="shader.a.700">
                        ID: {meta.nft.id}
                      </Text>
                    </Text>

                    <Text fontSize="xs" fontWeight="normal">
                      x{meta.nft?.amount}
                    </Text>
                  </Box>

                  <AccountOwnerIncrement
                    formState={{
                      control: formState.control,
                      setValue: formState.setValue,
                      value: `product.${key}.nft.selected`,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>

          <Tabs variant="unstyled" onChange={e => setTab(e)} index={tab}>
            <TabList gap={2} overflowX="auto" padding={6} paddingBottom={4}>
              {ListTab.map(meta => (
                <Tab
                  key={meta.heading}
                  isDisabled={meta.isDisabled}
                  flex={1}
                  borderRadius="xl"
                  textAlign="unset"
                  padding={4}
                  gap={4}
                  _selected={{
                    borderColor: 'primary.a.500',

                    strong: {
                      bg: 'primary.a.500',

                      _before: {
                        borderColor: 'primary.a.500',
                      },
                    },
                  }}
                >
                  <Box
                    as="strong"
                    position="relative"
                    width={4}
                    height={4}
                    borderRadius="full"
                    _before={{
                      content: `''`,
                      position: 'absolute',
                      inset: 0,
                      border: '0.0625rem solid',
                      borderColor: 'shader.a.500',
                      borderRadius: 'inherit',
                      transform: 'scale(1.4)',
                    }}
                  />

                  <Box width={36}>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="shader.a.900"
                    >
                      {meta.heading}
                    </Text>

                    <Text as="span" fontSize="xs" color="shader.a.600">
                      {meta.body}
                    </Text>
                  </Box>
                </Tab>
              ))}
            </TabList>

            <TabPanels pt={2} px={6} pb={6}>
              {ListTab.map(meta => (
                <TabPanel key={meta.id} padding={0}>
                  {meta.id === tab ? meta.submit : null}
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter
          display="block"
          borderTop="0.0625rem solid"
          borderColor="shader.a.300"
        >
          {(function () {
            if (tab === 0) {
              return (
                <AccountOwnerSubmit
                  onSuccess={onSuccess}
                  price={price}
                  product={product}
                  duration={duration}
                  type={product.length >= 2 ? 'Bundle' : 'SetPrice'}
                />
              );
            }

            if (tab === 1) {
              return (
                <AccountOwnerSubmit
                  onSuccess={onSuccess}
                  price={price}
                  product={product}
                  duration={duration}
                  type="Auction"
                />
              );
            }
          })()}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
