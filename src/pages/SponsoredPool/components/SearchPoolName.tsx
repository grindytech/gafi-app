import {
  Box, Icon, Input, InputGroup, InputLeftElement, InputRightElement, ListItem, Stack, UnorderedList, useDisclosure, useOutsideClick,
} from '@chakra-ui/react';
import { mdiClose, mdiMagnify } from '@mdi/js';
import { hexToString, stringToHex } from '@polkadot/util';
import React, { LegacyRef, MutableRefObject, useMemo, useRef } from 'react';


import client from 'graphQL/client';
import { SponsoredPool, useSponsoredSearchPoolsQuery } from 'graphQL/generates';
import useSearchPoolName from 'hooks/useSearchPoolName';

interface ISearchPoolProps {
  setQueryValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchPoolName({ setQueryValue }: ISearchPoolProps) {
  const searchRef: LegacyRef<HTMLDivElement> | undefined | MutableRefObject<HTMLElement> = useRef(null);

  const { onOpen, isOpen, onClose } = useDisclosure();

  useOutsideClick({
    ref: searchRef,
    handler: () => {
      if (isOpen) {
        return onClose();
      }
    },
  });

  const { handlePressKey, handleInputChange, searchQuery, setSearchQuery } = useSearchPoolName({
    setQueryValue: setQueryValue,
    delay: 500,
  });

  const { data, isFetched } = useSponsoredSearchPoolsQuery(
    client,
    {
      first: 0,
      offset: 0,
      filter: {
        poolName: {
          includes: stringToHex(searchQuery.submit),
        },
      },
    },
    {
      enabled: !!searchQuery.submit
    }
  );

  const sponsoredSearch = useMemo(() =>
    (searchQuery.submit && searchQuery.submit.length && data)
      ? data.sponsoredPools?.nodes as SponsoredPool[]
      : []
    , [data]);


  const refetchData = ({ value, isClosed }: { value: string, isClosed: boolean }) => {
    if (isClosed) { onClose(); };

    setSearchQuery({
      text: value,
      submit: value
    });
    setQueryValue(value);
  };

  return (
    <Stack position="relative" ref={searchRef} w={{ base: 'full', md: 'auto' }}>
      <UnorderedList ms={0}>
        <InputGroup>
          <InputLeftElement
            height="44px"
            width="44px"
            pointerEvents="none"
            children={
              <Icon color="primary" fontSize="2xl">
                <path fill="currentColor" d={mdiMagnify} />
              </Icon>
            }
          />
          <Input
            type="text"
            value={searchQuery.text}
            onChange={event => {
              handleInputChange(event);
              if (event.target.value.length === 0) {
                refetchData({
                  value: '',
                  isClosed: false
                });
              };
            }}
            onFocus={() => onOpen()}
            onKeyUp={event => handlePressKey(event)}
            height="44px"
            variant="white"
            placeholder="Search"
            border="1px solid #E6E6E6"
            borderRadius={isOpen && sponsoredSearch.length ? '12px 12px 0 0' : '12px'}
            _placeholder={{ color: 'gray.400' }}
          />

          <InputRightElement
            height="44px"
            width="44px"
            onClick={() => refetchData({
              value: '',
              isClosed: true
            })}
            hidden={!sponsoredSearch.length}
            children={
              <Icon fontSize="2xl">
                <path fill="currentColor" d={mdiClose} />
              </Icon>
            }
          />
        </InputGroup>

        {(isOpen && isFetched) ? (
          <Box
            background="white"
            borderRadius="0 0 12px 12px"
            border={(isOpen && sponsoredSearch.length) ? 'solid #E6E6E6' : 'none'}
            borderWidth="0 1px 1px 1px"
            position="absolute"
            inset="auto 0 0 0"
            zIndex="1000"
            transform="translateY(100%)"
          >
            {sponsoredSearch.map(item =>
              <ListItem
                onClick={() => refetchData({
                  value: hexToString(item.poolName),
                  isClosed: true
                })}
                pl={3}
                pt={2.5}
                pb={2.5}
                key={item.id}
                listStyleType="none"
                _hover={{
                  background: '#EFF7FE',
                  transition: '1s ease',
                  cursor: 'pointer',
                }}
              >
                {hexToString(item.poolName)}
              </ListItem>

            )}
          </Box>
        ) : null}
      </UnorderedList>
    </Stack>
  );
}
