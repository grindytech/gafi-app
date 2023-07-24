import BellIcon from 'public/assets/line/bell.svg';
import SettingIcon from 'public/assets/line/setting.svg';
import DoneIcon from 'public/assets/fill/done.svg';

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'hooks/useRedux';
import useSubscribeSystem from 'hooks/useSubscribeSystem';
import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

interface setValueProps {
  type: 'create_collection';
  hash: string;
  link: string;
  message: string;
  timestamp: number;
}

import { shorten } from 'utils/utils';

export default function Notification() {
  const { event, setEvent } = useSubscribeSystem('nfts::Created');
  const { account } = useAppSelector(state => state.injected.polkadot);

  const [value, setValue] = React.useState<setValueProps[]>([]);

  React.useEffect(() => {
    const audio = new Audio('/public/notification.mp3');

    if (event && account?.address) {
      event.forEach(({ eventValue }) => {
        const [collection, owner, role] = JSON.parse(eventValue);

        if (account.address === owner) {
          setValue(prev => [
            {
              type: 'create_collection',
              hash: owner,
              link: `/web3/collection/${collection}`,
              message: `you has create successfuly collection ID <stronger>${collection}</stronger>`,
              timestamp: new Date().getTime(),
            },
            ...prev,
          ]);
          setEvent([]);
          audio.play();
          return;
        }

        if (account.address === role) {
          setValue(prev => [
            {
              type: 'create_collection',
              hash: owner,
              link: `/web3/collection/${collection}`,
              message: `
                  <stronger>${shorten(owner, 6)}</stronger>
                  just selected you as an admin for the collection ID
                  <stronger>${collection}</stronger>`,
              timestamp: new Date().getTime(),
            },
            ...prev,
          ]);
          setEvent([]);

          audio.play();
          return;
        }
      });
    }
  }, [event]);

  return (
    <>
      <Popover placement="bottom-end">
        {({ isOpen }) => (
          <>
            <PopoverTrigger>
              <Button
                variant="unstyled"
                position="relative"
                minWidth="auto"
                height="auto"
              >
                <BellIcon />

                <Box
                  px={1.5}
                  position="absolute"
                  inset="0 0 auto auto"
                  bg="second.red"
                  borderRadius="2rem"
                  py="0.0625rem"
                  transform="translate(20%, -50%)"
                  fontSize="xs"
                  color="white"
                >
                  {value.length}
                </Box>
              </Button>
            </PopoverTrigger>

            <Portal>
              <Box
                sx={{
                  '> div': {
                    zIndex: 'dropdown',
                  },
                }}
              >
                <PopoverContent
                  bg="white"
                  borderRadius="xl"
                  width="31.25rem"
                  overflow="hidden"
                  display={isOpen ? undefined : 'none'} // unmount for seconds (timestamp)
                >
                  <PopoverHeader
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={6}
                    pt={6}
                    pb={4}
                  >
                    <Heading
                      color="shader.a.900"
                      fontSize="lg"
                      fontWeight="medium"
                    >
                      Notification
                    </Heading>

                    <IconButton
                      aria-label="setting-icon"
                      variant="unstyled"
                      color="shader.a.900"
                      minWidth={6}
                      height={6}
                      icon={
                        <Icon
                          as={SettingIcon}
                          width="inherit"
                          height="inherit"
                        />
                      }
                    />
                  </PopoverHeader>

                  <PopoverBody padding={0}>
                    <List
                      overflowY="auto"
                      overflowX="hidden"
                      height={value.length >= 5 ? '31.25rem' : undefined}
                      sx={{
                        li: {
                          px: 6,
                          py: 4,
                        },
                      }}
                    >
                      {value.length ? (
                        React.Children.toArray(
                          value.map(data => (
                            <ListItem
                              transitionDuration="ultra-slow"
                              _hover={{
                                bg: 'shader.a.200',
                              }}
                            >
                              <Flex
                                as={Link}
                                to="#"
                                gap={4}
                                sx={{
                                  stronger: {
                                    color: 'shader.a.900',
                                  },
                                  p: {
                                    color: 'shader.a.600',
                                  },
                                }}
                              >
                                <Box>
                                  <Box position="relative">
                                    <AccountJazzicon address={data.hash} />

                                    <Box
                                      position="absolute"
                                      inset="50% auto auto -50%"
                                      transform="translate(50%, -50%)"
                                      bg="primary.a.500"
                                      borderRadius="full"
                                      width={2}
                                      height={2}
                                    />

                                    <Icon
                                      as={DoneIcon}
                                      width={5}
                                      height={5}
                                      position="absolute"
                                      right={0}
                                      transform="translate(50%, 100%)"
                                      borderRadius="full"
                                    />
                                  </Box>
                                </Box>

                                <Stack spacing={0}>
                                  <Text
                                    fontWeight="medium"
                                    width="sm"
                                    noOfLines={2}
                                    dangerouslySetInnerHTML={{
                                      __html: data.message,
                                    }}
                                  />

                                  <Text
                                    as="span"
                                    fontSize="xs"
                                    color="primary.a.500"
                                  >
                                    {formatDistanceToNowStrict(data.timestamp, {
                                      addSuffix: true,
                                    })}
                                  </Text>
                                </Stack>
                              </Flex>
                            </ListItem>
                          ))
                        )
                      ) : (
                        <ListItem>empty</ListItem>
                      )}
                    </List>
                  </PopoverBody>
                </PopoverContent>
              </Box>
            </Portal>
          </>
        )}
      </Popover>
    </>
  );
}
