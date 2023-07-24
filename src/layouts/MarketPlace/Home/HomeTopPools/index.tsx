import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  Icon,
  Button,
  VStack,
  Image,
} from '@chakra-ui/react';

import VerifyIcon from 'public/assets/fill/verified.svg';
import GameIcon from 'public/assets/line/game.svg';
import ArrowIcon from 'public/assets/line/chevron-02.svg';
import Carousel from 'components/Carousel/Carousel';

import { SwiperSlide } from 'swiper/react';
import CardBox from 'components/CardBox';
import { TestDataTopPool } from 'hooks/DataTest';

export default function HomeTopPools() {
  return (
    <Box>
      <HStack
        justifyContent="space-between"
        spacing={0}
        position="sticky"
        left={0}
      >
        <Flex gap={3} alignItems="center">
          <Icon
            as={GameIcon}
            height={6}
            width={6}
            sx={{
              path: {
                stroke: 'url(#GameLinear06)',
              },
            }}
          />
          <Text color="shader.a.900" fontWeight="semibold" fontSize="xl">
            Top Pools
          </Text>
        </Flex>

        <Link href="#">
          <Button
            variant="more"
            fontSize="sm"
            rightIcon={
              <Icon
                as={ArrowIcon}
                transform="rotate(180deg)"
                color="primary.a.500"
                height={5}
                width={5}
              />
            }
          >
            more
          </Button>
        </Link>
      </HStack>
      <Box mt={5}>
        <Carousel>
          {TestDataTopPool.map(item => (
            <SwiperSlide key={item.id}>
              <CardBox
                padding={0}
                variant="baseStyle"
                boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
                height="full"
              >
                <VStack color="shader.a.900" gap={0}>
                  <Box padding={2} width="full">
                    <Image
                      objectFit="cover"
                      src={item.image}
                      alt={`Image ${item.name}`}
                      h="12.5rem"
                      borderRadius="xl"
                      width="full"
                    />
                  </Box>
                  <Box
                    padding={4}
                    w="full"
                    borderTop="0.063rem solid "
                    borderColor="shader.a.200"
                  >
                    <VStack alignItems="start" gap="12px" mb="24px" w="full">
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
                      <HStack
                        justifyContent="space-between"
                        w="full"
                        fontSize="sm"
                      >
                        <Box>
                          <Text color="shader.a.600">Minted:</Text>
                          <Text fontWeight="medium">{item.minted}</Text>
                        </Box>
                        <Box>
                          <Text
                            textAlign="right"
                            color="shader.a.600"
                            fontSize="sm"
                          >
                            Volume:
                          </Text>
                          <Text fontWeight="medium">{item.volume} GAFI</Text>
                        </Box>
                      </HStack>
                    </VStack>
                    <Button width="full" variant="primary">
                      Mint for {item.price}
                    </Button>
                  </Box>
                </VStack>
              </CardBox>
            </SwiperSlide>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
