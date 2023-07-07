import {
  Box,
  VStack,
  Image,
  HStack,
  Text,
  Button,
  Icon,
  Flex,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';

import GafiIcon from 'public/assets/token/gafi-token.svg';
import TimeIcon from 'public/assets/line/time.svg';
import VerifyIcon from 'public/assets/fill/verified.svg';
import { TestDataProps3 } from 'layouts/MarketPlace/Home/Collections/components/LiveAuction';
interface IProps {
  item: TestDataProps3;
}
const CardTypeThree = ({ item }: IProps) => {
  return (
    <>
      <CardBox
        padding={0}
        variant="baseStyle"
        boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
      >
        <VStack color="shader.a.900" gap={0}>
          <Box position="relative" padding={2} width="full">
            <Image
              objectFit="cover"
              src={item.image}
              alt={`Image ${item.name}`}
              /*       h="12.5rem"
               */
              borderRadius="xl"
            />
            <Box
              position="absolute"
              background="rgba(0, 0, 0, 0.70)"
              borderRadius="1.125rem"
              backdropFilter="blur(5px)"
              bottom={3}
              left={3}
            >
              <HStack py={1.5} px={2} color="white" gap={0.5} fontSize="sm">
                <Icon as={TimeIcon} h={5} w={5} />
                <Text>End in </Text>
                <Text fontWeight="medium">0h 32m 13s</Text>
              </HStack>
            </Box>
          </Box>
          <Box
            padding={4}
            w="full"
            borderTop="0.063rem solid "
            borderColor="shader.a.200"
          >
            <VStack alignItems="start" w="full">
              <HStack justifyContent="space-between" w="full">
                <Flex alignItems="center" gap={1}>
                  <Text fontWeight="medium">{item.name}</Text>
                  {item.isVerified && (
                    <Icon
                      as={VerifyIcon}
                      h={5}
                      w={5}
                      aria-label="Verifiled Icon"
                    />
                  )}
                </Flex>

                <Flex>
                  <Text color="shader.a.600">ID:</Text>
                  <Text>{item.id}</Text>
                </Flex>
              </HStack>
              <Text color="shader.a.600" fontSize="sm" fontWeight="medium">
                Current Auction:
              </Text>
              <HStack justifyContent="space-between" width="full">
                <Flex gap={2}>
                  <Icon as={GafiIcon} h={5} w={5} />
                  <Box>
                    <Text fontWeight="medium">{item.currentAuction}</Text>
                    <Text fontSize="xs" color="shader.a.500">
                      ($502,333)
                    </Text>
                  </Box>
                </Flex>

                <Button variant="primary">Auction</Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </CardBox>
    </>
  );
};

export default CardTypeThree;
