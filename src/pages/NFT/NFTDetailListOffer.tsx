import { Table, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import React from 'react';
import { formatCurrency, shorten } from 'utils/utils';

import NFTDetailAcceptOffer from './NFTDetailAcceptOffer';
import { getTradeConfigProps } from './index';

import GafiAmount from 'components/GafiAmount';
import DateBlock from 'components/DateBlock';
import CancelTrade from 'components/CancelTrade';

interface NFTDetailListOfferProps {
  lowestSetBuy: getTradeConfigProps[] | undefined;
  refetch?: () => void;
}

export default function NFTDetailListOffer({
  lowestSetBuy,
  refetch,
}: NFTDetailListOfferProps) {
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
        {lowestSetBuy?.length ? (
          React.Children.toArray(
            lowestSetBuy.map(meta => (
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

                  <DateBlock endBlock={meta.endBlock.value.toNumber()} />
                </Td>

                <Td textAlign="right">
                  <CancelTrade
                    trade_id={meta.trade_id}
                    refetch={refetch}
                    type="SetBuy"
                    sx={{ mr: 4 }}
                  />

                  <NFTDetailAcceptOffer
                    trade_id={meta.trade_id}
                    refetch={refetch}
                    price={meta.maybePrice.value.toNumber()}
                    amount={meta.amount}
                    sx={{
                      fontSize: 'sm',
                      fontWeight: 'medium',
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
