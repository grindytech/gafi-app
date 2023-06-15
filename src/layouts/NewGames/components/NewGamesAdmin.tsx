import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { useState } from 'react';

import Chevron01Icon from 'public/assets//line/chevron-01.svg';
import UserProfileIcon from 'public/assets/header/user-profile.svg';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import ButtonCopy from 'components/ButtonCopy';
import NewGamesProfile from './NewGamesProfile';

interface NewGamesAdminProps {
  setValue: UseFormSetValue<FieldValues>;
}

export default function NewGamesAdmin({ setValue }: NewGamesAdminProps) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const value = '5DPA2URG1G8....ScaFqiuu3hb9';
  const admin = 'Alex Pham';

  setValue('admin', {
    account: admin,
    hash: value,
  });

  const ListAccounts = [
    {
      account: `${admin}-0`,
      hash: `${value}123`,
      id: 0,
    },
    {
      account: `${admin}-1`,
      hash: `${value}456`,
      id: 1,
    },
    {
      account: `${admin}-2`,
      hash: `${value}789`,
      id: 2,
    },
    {
      account: `${admin}-3`,
      hash: `${value}102`,
      id: 3,
    },
  ];

  const [currentAccount, setCurrentAccount] = useState(ListAccounts[0]);

  const GetCurrentAccount = ListAccounts.filter(
    item => item.hash !== currentAccount.hash
  );

  return (
    <CardBox variant="createGames" padding={0}>
      <Heading
        padding={4}
        as="h4"
        fontSize="sm"
        fontWeight="semibold"
        color="primary.a.500"
      >
        Admin
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
            <UserProfileIcon />

            <Box flex={1}>
              <Heading
                as="h6"
                fontSize="md"
                fontWeight="semibold"
                color="shader.a.900"
              >
                {currentAccount.account}
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
                {currentAccount.hash}

                <ButtonCopy value={currentAccount.hash} />
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
              {GetCurrentAccount.map(item => (
                <ListItem
                  key={item.id}
                  padding={4}
                  onClick={() => {
                    setCurrentAccount(item);
                    onClose();
                  }}
                  cursor="pointer"
                  _hover={{
                    transitionDuration: 'ultra-slow',
                    bg: 'shader.a.200',
                  }}
                >
                  <NewGamesProfile
                    hash={item.hash}
                    account={item.account}
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
  );
}
