import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import { ISponsoredPool } from 'gafi-dashboard/pages/SponsoredPool/components/SponsoredPoolTable';
import { t } from 'i18next';
import { useSubstrateState } from 'substrate-lib';
import { shorten } from 'components/utils';

function SponsoredPoolTableRow(props: { SponsoredPool: ISponsoredPool }) {
  const { owner, discount, limit, amount } = props.SponsoredPool;
  const textColor = useColorModeValue('gray.700', 'white');
  const { chainDecimal } = useSubstrateState();

  return (
    <Tr>
      <Td minWidth={{ sm: '250px' }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {shorten(owner || '')}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {discount} %
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {limit}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {formatBalance(
            amount,
            { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
            chainDecimal || 18
          )}
        </Text>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover">
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            {t("JOIN")}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default SponsoredPoolTableRow;
