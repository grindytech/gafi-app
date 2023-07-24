import {
  Box,
  VStack,
  Image,
  HStack,
  Text,
  Button,
  Icon,
  Flex,
  ImageProps,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';

import GafiIcon from 'public/assets/token/gafi-token.svg';
import TimeIcon from 'public/assets/line/time.svg';
import VerifyIcon from 'public/assets/fill/verified.svg';

import { formatGAFI } from 'utils/utils';
import { TestDataProps3 } from 'layouts/MarketPlace/Home/HomeLiveAuction';
interface IProps {
  item: TestDataProps3;
  imageStyle?: ImageProps;
}
// This card use to activities,live auction section
const CardTypeThree = ({ item, imageStyle }: IProps) => {
  return (
    <>
      <CardBox
        padding={0}
        variant="baseStyle"
        boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
        role="group"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: 'rgba(0, 0, 0, 0.08) 7px 16px 16px',
        }}
        transition="box-shadow 0.25s ease-in-out 0s, transform 0.25s ease 0s"
      >
        <VStack color="shader.a.900" gap={0}>
          <Box position="relative" padding={2} width="full">
            <Box overflow="hidden" borderRadius="lg">
              <Image
                objectFit="cover"
                src={item.image}
                _groupHover={{
                  transform: 'scale(1.2)',
                  transition: ' 0.25s ease-in-out',
                }}
                alt={`Image ${item.name}`}
                h="12.5rem"
                width="full"
                {...imageStyle}
              />
            </Box>

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
                  <Text fontWeight="medium" noOfLines={1}>
                    {item.name}
                  </Text>
                  {item.isVerified && (
                    <Icon
                      as={VerifyIcon}
                      h={5}
                      w={5}
                      aria-label="Verifiled Icon"
                    />
                  )}
                </Flex>
              </HStack>
              <Text color="shader.a.600" fontSize="sm" fontWeight="medium">
                Current Auction:
              </Text>
              <HStack
                justifyContent="space-between"
                width="full"
                flexWrap="wrap"
              >
                <Flex gap={2} flexGrow={1} alignItems="center">
                  <Icon as={GafiIcon} h={5} w={5} />

                  <Box>
                    <Text fontWeight="medium">
                      {formatGAFI(item.currentAuction)}
                    </Text>
                    <Text fontSize="xs" color="shader.a.500">
                      ($502,333)
                    </Text>
                  </Box>
                </Flex>

                <Button variant="primary" flexGrow={1}>
                  Auction
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </CardBox>
    </>
  );
};

export default CardTypeThree;
