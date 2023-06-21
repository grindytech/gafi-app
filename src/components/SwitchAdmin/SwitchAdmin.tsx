import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { useMemo } from 'react';

import Chevron01Icon from 'public/assets//line/chevron-01.svg';

import ButtonCopy from 'components/ButtonCopy';
import NewGamesProfile from 'layouts/NewGames/components/NewGamesProfile';

import { shorten } from 'utils/utils';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import { useConnectWallet } from 'components/ConnectWallet/ConnectWalletProvider';

interface SwitchAdmin {
  setValue: UseFormSetValue<FieldValues>;
  type?: 'Admin' | 'Mint to';
  sx?: BoxProps;
}

export default function SwitchAdmin({
  setValue,
  type = 'Admin',
  sx,
}: SwitchAdmin) {
  const { account, allAccount } = useConnectWallet();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [currentAccount, setCurrentAccount] = React.useState(
    allAccount
      ? allAccount[0]
      : {
          address: account,
        }
  );

  const loadAccounts = useMemo(() => {
    if (currentAccount && allAccount) {
      const [{ address, name }] = allAccount.filter(item => {
        return item.address === currentAccount.address;
      });

      return { address, name };
    }
  }, [currentAccount, allAccount]);

  React.useEffect(() => {
    if (loadAccounts) {
      setValue('admin', {
        address: loadAccounts.address,
        name: loadAccounts.name,
      });
    }
  }, [loadAccounts]);

  return (
    <>
      {allAccount && loadAccounts ? (
        <CardBox variant="createGames" padding={0} {...sx}>
          <Heading
            pt={4}
            px={4}
            as="h4"
            fontSize="sm"
            fontWeight="semibold"
            color="primary.a.500"
          >
            {type}
          </Heading>

          <Accordion index={isOpen ? 0 : 1}>
            <AccordionItem border="unset">
              <Flex
                padding={4}
                flexWrap="wrap"
                wordBreak="break-all"
                gap={{
                  base: 2,
                  md: 4,
                }}
              >
                <Box
                  display={{
                    sm: 'flex',
                  }}
                  gap={4}
                  flex={1}
                >
                  <AccountJazzicon address={loadAccounts.address} />

                  <Box>
                    <Heading
                      as="h6"
                      fontSize="md"
                      fontWeight="semibold"
                      color="shader.a.900"
                    >
                      {loadAccounts.name}
                    </Heading>

                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color="shader.a.600"
                      display="flex"
                      gap={1}
                      alignItems={{
                        base: 'flex-start',
                        sm: 'center',
                      }}
                    >
                      {shorten(loadAccounts.address, 12)}

                      <ButtonCopy value={loadAccounts.address} />
                    </Text>
                  </Box>
                </Box>

                <Box>
                  <AccordionButton padding={0} _hover={{}} onClick={onToggle}>
                    <Icon
                      as={Chevron01Icon as any}
                      width={6}
                      height={6}
                      color="primary.a.500"
                      transitionDuration="slower"
                      transform={isOpen ? 'rotate(-180deg)' : undefined}
                    />
                  </AccordionButton>
                </Box>
              </Flex>

              <AccordionPanel padding={0}>
                <List>
                  {allAccount
                    .filter(item => item.address !== currentAccount.address)
                    .map(account => (
                      <ListItem
                        key={account.address}
                        padding={4}
                        onClick={() => {
                          onClose();
                          setCurrentAccount(account);
                        }}
                        cursor="pointer"
                        _hover={{
                          transitionDuration: 'ultra-slow',
                          bg: 'shader.a.200',
                        }}
                      >
                        <NewGamesProfile
                          hash={account.address}
                          account={String(account.name)}
                          sx={{
                            sx: {
                              button: {
                                display: 'none',
                              },
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardBox>
      ) : (
        <CardBox variant="createGames" as={Stack}>
          <Skeleton height={4} />
          <Skeleton height={4} />
          <Skeleton height={4} />
        </CardBox>
      )}
    </>
  );
}
