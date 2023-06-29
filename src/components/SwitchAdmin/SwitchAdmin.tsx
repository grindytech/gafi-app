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
import React, { useState } from 'react';
import Chevron01Icon from 'public/assets//line/chevron-01.svg';

import ButtonCopy from 'components/ButtonCopy';
import NewGamesProfile from 'layouts/Web3/NewGames/components/NewGamesProfile';

import { shorten } from 'utils/utils';
import { UseFormSetValue } from 'react-hook-form';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import { useAppSelector } from 'hooks/useRedux';

export type TypeSwitchAdmin = Record<
  'admin',
  {
    address: string;
    name: string;
  }
>;

interface SwitchAdmin {
  setValue: UseFormSetValue<TypeSwitchAdmin>;
  type?: 'Admin' | 'Mint to';
  sx?: BoxProps;
}

export default function SwitchAdmin({
  setValue,
  type = 'Admin',
  sx,
}: SwitchAdmin) {
  const { account, allAccount } = useAppSelector(
    state => state.injected.polkadot
  );

  const { isOpen, onClose, onToggle } = useDisclosure();

  const [currentAccount, setCurrentAccount] = useState(account);

  React.useEffect(() => {
    if (currentAccount && currentAccount.address) {
      setValue('admin', {
        address: currentAccount.address,
        name: currentAccount.name as string,
      });
    }
  }, [currentAccount]);

  React.useEffect(() => {
    if (currentAccount && !currentAccount.address) {
      setCurrentAccount(account);
    }

    if (account && !account.address) {
      setCurrentAccount({});
    }
  }, [account]);

  return (
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

      {allAccount && currentAccount && currentAccount.address ? (
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
                <AccountJazzicon address={currentAccount.address} />

                <Box>
                  <Heading
                    as="h6"
                    fontSize="md"
                    fontWeight="semibold"
                    color="shader.a.900"
                  >
                    {currentAccount.name}
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
                    {shorten(currentAccount.address, 12)}

                    <ButtonCopy value={currentAccount.address} />
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
      ) : (
        <Stack padding={4}>
          <Skeleton height={4} />
          <Skeleton height={4} />
          <Skeleton height={4} />
        </Stack>
      )}
    </CardBox>
  );
}
