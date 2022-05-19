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
import { SponsoredPool } from 'gafi-dashboard/graphQL/generates';

function SponsoredPoolTableRow(props: { SponsoredPool: SponsoredPool }) {
  const { poolOwner, discount, txLimit, amount } = props.SponsoredPool;
  const textColor = useColorModeValue('gray.700', 'white');
  const { chainDecimal } = useSubstrateState();

  return (
    <Tr>
      <Td minWidth={{ sm: '250px' }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Text fontSize="md" color={textColor} minWidth="100%">
            {shorten(poolOwner || '')}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor}>
          {discount} %
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor}>
          {txLimit}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} pb=".5rem">
          {formatBalance(
            amount,
            { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
            chainDecimal || 18
          )}
        </Text>
      </Td>
      <Td>
        <Button
          color="primary"
          variant="solid"
          onClick={() => {}}
          isLoading={false}
        >
          {t("JOIN")}
        </Button>
      </Td>
    </Tr>
  );
}

export default SponsoredPoolTableRow;
