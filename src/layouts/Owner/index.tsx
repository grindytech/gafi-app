import {
  Box,
  Center,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { useAppSelector } from 'hooks/useRedux';
import { colors } from 'theme/theme';
import { convertHex, formatCurrency, shorten } from 'utils/utils';

import GafiTokenIcon from 'public/assets/token/gafi-token.svg';
import useBalance from 'hooks/useBalance';

const ShieldIcon = () => (
  <Icon width="12px" height="12px" viewBox="0 0 12 12">
    <path
      d="M6.01221 0.500183C5.91551 0.497165 5.82139 0.531629 5.74951 0.596374C5.74951 0.596374 3.87254 2.25018 1.625 2.25018C1.52555 2.25019 1.43017 2.2897 1.35985 2.36003C1.28952 2.43035 1.25001 2.52573 1.25 2.62518V5.69012C1.25 7.35964 2.02235 10.1068 5.85449 11.7209C5.90055 11.7403 5.95002 11.7503 6 11.7503C6.04998 11.7503 6.09945 11.7403 6.14551 11.7209C9.97765 10.1068 10.75 7.35964 10.75 5.69012V2.62518C10.75 2.52573 10.7105 2.43035 10.6402 2.36003C10.5698 2.2897 10.4745 2.25019 10.375 2.25018C8.12746 2.25018 6.25049 0.596374 6.25049 0.596374C6.18487 0.537251 6.10048 0.503187 6.01221 0.500183ZM6 3.25018C6.68925 3.25018 7.25 3.81093 7.25 4.50018C7.25 5.18943 6.68925 5.75018 6 5.75018C5.31075 5.75018 4.75 5.18943 4.75 4.50018C4.75 3.81093 5.31075 3.25018 6 3.25018ZM4.375 6.75018H7.625C7.9695 6.75018 8.25 7.03068 8.25 7.37518V7.62518C8.25 7.73668 8.2374 7.84613 8.2124 7.95038C8.19615 8.01813 8.16083 8.08009 8.11133 8.12909C7.54358 8.69084 6.794 9.00018 6 9.00018C5.206 9.00018 4.45617 8.69108 3.88867 8.12958C3.83917 8.08058 3.80434 8.01862 3.78809 7.95087C3.76284 7.84637 3.75 7.73668 3.75 7.62518V7.37518C3.75 7.03068 4.0305 6.75018 4.375 6.75018Z"
      fill="currentColor"
    />
  </Icon>
);

export default () => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { balance } = useBalance({
    account: account?.address,
  });

  return (
    <>
      <Box borderRadius="xl" bg="shader.a.900" fontWeight="bold">
        {account?.address ? (
          <>
            <Flex
              gap={4}
              padding={6}
              borderBottom="0.0625rem solid"
              borderColor="shader.a.800"
            >
              <AvatarJazzicon
                address={account.address}
                sx={{ width: '2.25rem', height: '2.25rem' }}
              />

              <Box>
                <Flex gap={2}>
                  <Text color="white">{account.name}</Text>

                  <Center
                    color="second.green"
                    borderRadius="2xl"
                    fontSize="xs"
                    bg={convertHex(colors.second.green, 0.15)}
                    px={2}
                    py={1}
                    gap={1}
                  >
                    <ShieldIcon />
                    Owner
                  </Center>
                </Flex>

                <Flex mt={2} fontSize="sm" color="shader.a.400">
                  {shorten(account.address, 12)}&nbsp;
                  <ButtonCopy value={account.address} />
                </Flex>
              </Box>
            </Flex>

            <Center
              justifyContent="space-between"
              bg={convertHex(colors.shader.a[800], 0.25)}
              py={4}
              px={6}
            >
              <Text color="white">Balance</Text>

              <Box textAlign="right">
                <Center gap={1}>
                  <Icon as={GafiTokenIcon} width={4} height={4} />

                  <Text color="white" fontSize="lg">
                    {balance}
                  </Text>
                </Center>

                <Text fontSize="sm" color="shader.a.500">
                  {formatCurrency(Number(balance?.replaceAll(',', '')))}
                </Text>
              </Box>
            </Center>
          </>
        ) : (
          <>
            <Flex gap={4} padding={6}>
              <Box>
                <SkeletonCircle size="2.25rem" />
              </Box>

              <Box width="full">
                <Skeleton height={2} />
                <Skeleton height={2} mt={2} />
              </Box>
            </Flex>

            <Flex justifyContent="space-between" py={4} px={6}>
              <Skeleton width="3.625rem" height={2} />

              <Box>
                <Skeleton width="3.625rem" height={2} />
                <Skeleton width="3.625rem" height={2} mt={2} />
              </Box>
            </Flex>
          </>
        )}
      </Box>
    </>
  );
};
