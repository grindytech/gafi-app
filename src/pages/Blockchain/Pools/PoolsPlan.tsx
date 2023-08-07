import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import DoneIcon from 'public/assets/fill/done.svg';

import { colors } from 'theme/theme';
import { convertHex } from 'utils/utils';
import { PoolsItemProps } from './index';

interface PoolsPlanProps {
  pools: PoolsItemProps[];
}

type TypePoolsType = PoolsPlanProps['pools'][number]['type'];

export default function PoolsPlan({ pools }: PoolsPlanProps) {
  const colorVectorDone = (type: TypePoolsType) => {
    if (type === 'Basic plan' || type === 'Medium plan') {
      return 'primary.a.500';
    }

    if (type === 'Premium plan') {
      return '#B98DFE';
    }
  };

  const colorButtonPlan = (type: TypePoolsType) => {
    if (type === 'Basic plan' || type === 'Medium plan') {
      return 'primary.a.500';
    }

    if (type === 'Premium plan') {
      return 'gradient.linear.9';
    }
  };

  return (
    <SimpleGrid
      columns={{
        sm: 2,
        lg: 3,
      }}
      gap={4}
    >
      {pools.map(pool => (
        <Box
          key={pool.type}
          borderRadius="xl"
          border="0.0625rem solid"
          borderColor="shader.a.300"
        >
          <Box
            bg="shader.a.200"
            padding={20}
            borderBottom="0.0625rem solid"
            borderColor="shader.a.300"
          />

          <Box padding={6}>
            <Box
              pb={6}
              borderBottom="0.0625rem solid"
              borderColor="shader.a.200"
            >
              <Flex alignItems="center" gap={2}>
                {pool.type === 'Medium plan' ? (
                  <Text
                    fontWeight="semibold"
                    fontSize="xs"
                    color="primary.a.500"
                    borderRadius="3xl"
                    bg={convertHex(colors.primary.a[500], 0.05)}
                    border="0.0625rem solid"
                    borderColor="primary.a.400"
                    py={1}
                    px={2}
                  >
                    Popular
                  </Text>
                ) : null}

                <Heading
                  bg={colorButtonPlan(pool.type)}
                  sx={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  fontSize="lg"
                  fontWeight="medium"
                >
                  {pool.type}
                </Heading>
              </Flex>

              <Heading
                mt={4}
                as="h6"
                fontSize="2xl"
                color="shader.a.900"
                fontWeight="bold"
              >
                Discount fee {pool.discount}%
              </Heading>
            </Box>

            <List
              my={6}
              sx={{
                li: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,

                  _notFirst: {
                    mt: 2,
                  },
                },
                svg: {
                  width: 5,
                  height: 5,
                  color: colorVectorDone(pool.type),
                },
                p: {
                  fontSize: 'md',
                  fontWeight: 'normal',
                  color: 'shader.a.900',
                },
              }}
            >
              <ListItem>
                <Icon as={DoneIcon} />
                <Text>{pool.rate.minute} Minutes</Text>
              </ListItem>
              <ListItem>
                <Icon as={DoneIcon} />
                <Text>Rate: {pool.rate.txLimit} Transactions</Text>
              </ListItem>

              <ListItem>
                <Icon as={DoneIcon} />

                <Text>Fee: {pool.fee.gaki} GAKI</Text>
              </ListItem>
            </List>

            <Button
              variant="primary"
              width="full"
              bg={colorButtonPlan(pool.type)}
              _hover={
                pool.type === 'Premium plan'
                  ? {
                      opacity: 0.8,
                    }
                  : undefined
              }
            >
              Join Plan
            </Button>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}
