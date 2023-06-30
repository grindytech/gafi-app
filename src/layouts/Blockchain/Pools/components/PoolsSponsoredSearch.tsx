import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { NumberInputStyle } from 'components/NumberInput';
import UploadIcon from 'public/assets/line/upload.svg';

export default function PoolsSponsoredSearch() {
  return (
    <InputGroup>
      <InputLeftElement>
        <Icon as={UploadIcon} width={4} height={4} />
      </InputLeftElement>
      <Input placeholder="Search" width="auto" {...NumberInputStyle} />
    </InputGroup>
  );
}
