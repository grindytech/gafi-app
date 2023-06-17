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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';

import Chevron01Icon from 'public/assets//line/chevron-01.svg';

import ButtonCopy from 'components/ButtonCopy';
import NewGamesProfile from 'layouts/NewGames/components/NewGamesProfile';

import { stateAccountProps } from 'hooks/useAccount';
import { shorten } from 'utils/utils';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';

interface SwitchAdmin {
  getAccounts: stateAccountProps[];
  setValue: UseFormSetValue<FieldValues>;
  type?: 'Admin' | 'Mint to';
  sx?: BoxProps;
}

export default function SwitchAdmin({
  getAccounts,
  setValue,
  type = 'Admin',
  sx,
}: SwitchAdmin) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [currentAccount, setCurrentAccount] = React.useState(
    getAccounts[0] || 'undefined'
  );

  const loadAccount = getAccounts
    ? getAccounts.filter(item => item.address != currentAccount.address)
    : null;

  React.useEffect(() => {
    setValue('admin', {
      address: currentAccount.address,
      name: currentAccount.name,
    });
  }, [currentAccount]);

  return (
    <>
      {loadAccount && loadAccount.length ? (
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
                <AccountJazzicon address={currentAccount.address} />

                <Box flex={1}>
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
                    flexWrap="wrap"
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
                  {loadAccount &&
                    loadAccount.map(item => (
                      <ListItem
                        key={item.address}
                        padding={4}
                        onClick={() => {
                          onClose();
                          setCurrentAccount(item);
                        }}
                        cursor="pointer"
                        _hover={{
                          transitionDuration: 'ultra-slow',
                          bg: 'shader.a.200',
                        }}
                      >
                        <NewGamesProfile
                          hash={item.address}
                          account={item.name}
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
      ) : null}
    </>
  );
}
