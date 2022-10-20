import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  Stack,
  UnorderedList,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import { mdiMagnify } from '@mdi/js';
import { hexToString, stringToHex } from '@polkadot/util';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

import { useSearchPoolContext } from 'contexts/searchPoolContext/searchPoolContext';
import client from 'graphQL/client';
import { SponsoredPool, useSponsoredPoolsQuery } from 'graphQL/generates';

export default function SearchPoolName() {
  const debounceRef = useRef<any>();
  const searchRef = useRef<any>();
  const [inputValue, setInputValue] = useState<string>('');
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { searchPoolValue, setSearchPool } = useSearchPoolContext();

  const { data } = useSponsoredPoolsQuery(client, {
    first: 0,
    offset: 0,
    filter: {
      poolName: {
        includes: stringToHex(searchPoolValue.text),
      },
    },
  });
  const sponsoredSearch = data
    ? (data.sponsoredPools?.nodes as SponsoredPool[])
    : [];

  const handlePressKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      return setSearchPool(prev => ({
        ...prev,
        submit: inputValue,
      }));
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    // unsubscribe for ref
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setInputValue(value);

    debounceRef.current = setTimeout(
      () =>
        setSearchPool(prev => ({
          ...prev,
          text: value,
        })),
      400
    );
  };

  useOutsideClick({
    ref: searchRef,
    handler: () => {
      if (isOpen) {
        return onClose();
      }
    },
  });

  return (
    <Stack ref={searchRef} position="relative" w={{ base: 'full', md: 'auto' }}>
      <InputGroup>
        <InputLeftElement
          height="44px"
          width="44px"
          pointerEvents="none"
          children={
            <Icon color="primary" fontSize="2xl">
              {' '}
              <path fill="currentColor" d={mdiMagnify} />
            </Icon>
          }
        />
        <Input
          type="text"
          value={inputValue}
          onChange={event => handleInputChange(event)}
          onFocus={() => onOpen()}
          onKeyUp={handlePressKey}
          height="44px"
          borderRadius="12px"
          placeholder="Search"
          _placeholder={{ color: 'gray.400' }}
        />
      </InputGroup>

      {isOpen && (
        <Box
          position="absolute"
          inset="auto 0 0 0"
          zIndex="1000"
          background="gray.100"
          transform="translateY(100%)"
        >
          <UnorderedList ms={0}>
            {sponsoredSearch.length && searchPoolValue.text?.length
              ? sponsoredSearch.map((item: SponsoredPool) => (
                  <ListItem
                    onClick={() => {
                      setInputValue(hexToString(item.poolName));
                      setSearchPool(prev => ({
                        ...prev,
                        text: hexToString(item.poolName),
                      }));
                      onClose();
                    }}
                    pl={12}
                    key={item.id}
                    listStyleType="none"
                  >
                    {hexToString(item.poolName)}
                  </ListItem>
                ))
              : null}
          </UnorderedList>
        </Box>
      )}
    </Stack>
  );
}
