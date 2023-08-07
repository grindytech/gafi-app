import {
  Box,
  BoxProps,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { useState } from 'react';
import Chevron01Icon from 'public/assets//line/chevron-01.svg';

import { UseFormSetValue } from 'react-hook-form';
import { useAppSelector } from 'hooks/useRedux';
import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';
import SwitchAdminAdd from './SwitchAdminAdd';
import AuthorizeProfile from 'layouts/AuthorizeProfile';

export type TypeSwitchAdmin = Record<
  'role',
  {
    address: string;
    name: string;
  }
>;

interface SwitchAdminProps {
  setValue: UseFormSetValue<TypeSwitchAdmin>;
  watch?: {
    address: string;
    name: string;
  };
  type?: 'Admin' | 'Owner';
  sx?: BoxProps;
}

export default function SwitchAdmin({
  setValue,
  type = 'Admin',
  sx,
  watch,
}: SwitchAdminProps) {
  const { account, allAccount } = useAppSelector(
    state => state.injected.polkadot
  );

  const { isOpen, onClose, onToggle } = useDisclosure();

  const [currentAccount, setCurrentAccount] = useState(account);

  React.useEffect(() => {
    if (currentAccount && currentAccount.address) {
      setValue('role', {
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
      <Box position="relative">
        <Heading
          fontSize="sm"
          px={4}
          pt={4}
          fontWeight="semibold"
          color="primary.a.500"
        >
          {type}
        </Heading>

        {allAccount && currentAccount && currentAccount.address ? (
          <>
            <Center
              justifyContent="space-between"
              padding={4}
              pb={6}
              flexWrap="wrap-reverse"
              gap={4}
            >
              <AuthorizeProfile
                hash={watch?.address || currentAccount.address}
                account={watch?.name || String(currentAccount.name)}
              />

              <Flex gap={4} flexWrap="wrap">
                {watch ? (
                  <SwitchAdminAdd setValue={setValue} value="role" />
                ) : null}

                <IconButton
                  aria-label="arrow-chevron"
                  onClick={onToggle}
                  transitionDuration="ultra-slow"
                  _hover={{
                    bg: convertHex(colors.primary.a[500], 0.1),
                  }}
                  icon={
                    <Icon
                      as={Chevron01Icon}
                      width={6}
                      height={6}
                      color="primary.a.500"
                      transitionDuration="inherit"
                      transform={isOpen ? 'rotate(-180deg)' : undefined}
                    />
                  }
                />
              </Flex>
            </Center>

            <List
              transform="translateY(-2%)"
              borderBottomLeftRadius="xl"
              borderBottomRightRadius="xl"
              border="0.0625rem solid"
              borderColor="shader.a.300"
              bg="white"
              transitionDuration="ultra-slow"
              position="absolute"
              zIndex="dropdown"
              width="full"
              opacity={isOpen ? 1 : 0}
              pointerEvents={isOpen ? undefined : 'none'}
            >
              {allAccount
                .filter(item => item.address !== currentAccount.address)
                .map(account => (
                  <ListItem
                    key={account.address}
                    padding={4}
                    transitionDuration="ultra-slow"
                    cursor="pointer"
                    sx={{
                      button: {
                        display: 'none',
                      },
                    }}
                    _hover={{
                      transitionDuration: 'inherit',
                      bg: 'shader.a.200',
                    }}
                    onClick={() => {
                      onClose();
                      setCurrentAccount(account);
                    }}
                  >
                    <AuthorizeProfile
                      hash={account.address}
                      account={String(account.name)}
                    />
                  </ListItem>
                ))}
            </List>
          </>
        ) : (
          <Stack padding={4}>
            <Skeleton height={4} />
            <Skeleton height={4} />
            <Skeleton height={4} />
          </Stack>
        )}
      </Box>
    </CardBox>
  );
}
