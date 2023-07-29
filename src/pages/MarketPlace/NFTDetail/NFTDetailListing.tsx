import { Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';
import { formatCurrency, shorten } from 'utils/utils';

import { getTradeConfigProps } from './index';
import NFTDetailBuy from './NFTDetailBuy';

import GafiAmount from 'components/GafiAmount';
import DateBlock from 'components/DateBlock';
import CancelTrade from 'components/CancelTrade';
import useBlockTime from 'hooks/useBlockTime';

interface NFTDetailListingProps {
  newestSetPrice: getTradeConfigProps[] | undefined;
  refetch?: () => void;
}

export default function NFTDetailListing({
  newestSetPrice,
  refetch,
}: NFTDetailListingProps) {
  const { blockNumber } = useBlockTime('bestNumber');

  return (
    <Table
      variant="unstyled"
      fontSize="sm"
      whiteSpace="pre"
      sx={{
        p: {
          fontWeight: 'medium',
          color: 'shader.a.900',
        },
        span: {
          color: 'shader.a.500',
        },
      }}
    >
      <Tbody>
        {newestSetPrice?.length ? (
          React.Children.toArray(
            newestSetPrice
              .sort(
                (a, b) =>
                  a.maybePrice.value.toNumber() - b.maybePrice.value.toNumber()
              )
              .map(meta => (
                <Tr>
                  <Td>
                    <GafiAmount
                      amount={meta.maybePrice.value.toNumber()}
                      sx={{
                        sx: {
                          '&, span': {
                            color: 'shader.a.900',
                            fontSize: 'sm',
                          },
                        },
                      }}
                    />

                    <Text as="span">
                      {formatCurrency(meta.maybePrice.value.toNumber(), 'usd')}
                    </Text>
                  </Td>

                  <Td>
                    <Text as="span">Quantity</Text>

                    <Text>{meta.amount}</Text>
                  </Td>

                  <Td>
                    <Text as="span">From</Text>

                    <Text color="primary.a.500!">
                      {shorten(meta.owner.toString(), 12)}
                    </Text>
                  </Td>

                  <Td>
                    <Text as="span">Date</Text>

                    <DateBlock
                      time={meta.endBlock.value.toNumber() - blockNumber}
                    />
                  </Td>

                  <Td textAlign="right">
                    <CancelTrade
                      trade_id={meta.trade_id}
                      type="SetPrice"
                      refetch={refetch}
                      sx={{ mr: 4 }}
                    />

                    <NFTDetailBuy
                      amount={meta.amount}
                      fee={meta.maybePrice.value.toNumber()}
                      trade_id={meta.trade_id}
                      refetch={refetch}
                      sx={{
                        borderRadius: 'lg',
                      }}
                    />
                  </Td>
                </Tr>
              ))
          )
        ) : (
          <Tr>
            <Td textAlign="center">Empty</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
}
