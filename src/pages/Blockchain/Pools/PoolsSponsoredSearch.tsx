import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

import SearchIcon from 'public/assets/line/search.svg';

export default function PoolsSponsoredSearch() {
  return (
    <InputGroup width={80}>
      <InputLeftElement
        height="full"
        //
        pl={2}
      >
        <Icon as={SearchIcon} width={5} height={5} color="primary.a.500" />
      </InputLeftElement>

      <Input
        py={5}
        borderRadius="lg"
        borderColor="shader.a.300"
        placeholder="Search..."
        fontSize="sm"
        color="shader.a.600"
      />
    </InputGroup>
  );
}
