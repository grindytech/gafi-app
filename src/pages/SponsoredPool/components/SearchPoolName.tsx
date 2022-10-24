import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ListItem,
  Stack,
  UnorderedList,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import { mdiClose, mdiMagnify } from '@mdi/js';
import { hexToString, stringToHex } from '@polkadot/util';
import {
  ChangeEvent,
  KeyboardEvent,
  LegacyRef,
  MutableRefObject,
  useRef,
  useState,
} from 'react';

import { useSearchPoolContext } from 'contexts/searchPoolContext/searchPoolContext';
import client from 'graphQL/client';
import { useSponsoredPoolSearch } from 'graphQL/generates';

export default function SearchPoolName() {
  const searchRef:
    | LegacyRef<HTMLDivElement>
    | undefined
    | MutableRefObject<HTMLElement> = useRef(null);

  const debounceRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

  const [inputValue, setInputValue] = useState<string>('');

  useOutsideClick({
    ref: searchRef,
    handler: () => {
      if (isOpen) {
        return onClose();
      }
    },
  });

  const { setSearchPool, searchPoolValue } = useSearchPoolContext();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const { data } = useSponsoredPoolSearch(client, {
    first: 0,
    offset: 0,
    filter: {
      poolName: {
        includes: stringToHex(searchPoolValue.text),
      },
    },
  });

  const sponsoredSearch =
    data && searchPoolValue.text ? data.sponsoredPools?.nodes : [];

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
    setInputValue(value);

    // unsubscribe for ref
    if (debounceRef.current) clearTimeout(debounceRef.current);

    // subscribe
    debounceRef.current = setTimeout(
      () =>
        setSearchPool(prev => ({
          ...prev,
          text: value,
        })),
      400
    );
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
            value={inputValue}
            onChange={event => handleInputChange(event)}
            onFocus={() => onOpen()}
            onKeyUp={handlePressKey}
            height="44px"
            variant="white"
            placeholder="Search"
            border="1px solid #E6E6E6"
            borderRadius={
              isOpen && sponsoredSearch.length ? '12px 12px 0 0' : '12px'
            }
            _placeholder={{ color: 'gray.400' }}
          />

          <InputRightElement
            height="44px"
            width="44px"
            onClick={() => {
              setSearchPool(prev => ({ ...prev, text: '' }));
              setInputValue('');
              onClose();
            }}
            hidden={!(isOpen && sponsoredSearch.length)}
            children={
              <Icon fontSize="2xl">
                <path fill="currentColor" d={mdiClose} />
              </Icon>
            }
          />
        </InputGroup>

        {isOpen && sponsoredSearch.length ? (
          <Box
            background="white"
            borderRadius="0 0 12px 12px"
            border="solid #E6E6E6"
            borderWidth="0 1px 1px 1px"
            position="absolute"
            inset="auto 0 0 0"
            zIndex="1000"
            transform="translateY(100%)"
          >
            {sponsoredSearch.map(item => (
              <ListItem
                onClick={() => {
                  setSearchPool(prev => ({
                    ...prev,
                    text: hexToString(item.poolName),
                  }));
                  setInputValue(hexToString(item.poolName));
                  onClose();
                }}
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
            ))}
          </Box>
        ) : null}
      </UnorderedList>
    </Stack>
  );
}
