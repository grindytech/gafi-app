import {
  testGameDetail,
  testOptionSort,
  TestDataRelease,
} from 'hooks/DataTest';
import VerfyIcon from 'public/assets/fill/verified.svg';
import {
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  Image,
  Select,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import Collections from '../ExplorerCollections';
import { SwiperSlide } from 'swiper/react';
import Carousel from 'components/Carousel/Carousel';
import { CircleIcon } from 'components/Substrate/SubstrateNode';
import NavLinkSocial from 'components/Link/NavLinkSocial';

export default function ExplorerGamesDetail() {
  /**
   * The way to define and chek current view base on nodeOfLine setting
   */
  const refDescription = useRef<HTMLParagraphElement>(null);
  const [isOverflown, setIsOverflown] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = refDescription.current!;
    const compare = element
      ? element.offsetWidth < element.scrollWidth ||
        element.offsetHeight < element.scrollHeight
      : false;

    setIsOverflown(compare);
  }, []);

  return (
    <>
      <Box
        borderRadius="xl"
        overflow="hidden"
        boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
        bg="white"
      >
        <Box position="relative">
          <Image src={testGameDetail.bannerImage} />
          <Center flexDirection="column" gap={0} py={8}>
            <Box
              height={{ md: '136px', base: '90px' }}
              width={{ md: '136px', base: '90px' }}
              borderRadius="xl"
              border="0.625rem solid"
              borderColor="white"
              overflow="hidden"
              /*  position="absolute" */
              inset={0}
              marginTop={{ md: '-140px', base: '-90px' }}
              mb="24px"
            >
              <Image
                src={testGameDetail.avatar}
                height="full"
                width="full"
                objectFit="cover"
              />
            </Box>

            <HStack>
              <Text fontSize="1.5rem" lineHeight="2rem" fontWeight="bold">
                {testGameDetail.name}
              </Text>
              {testGameDetail.isVerified && <Icon as={VerfyIcon} h={5} w={5} />}
            </HStack>
            <HStack lineHeight="1.5rem">
              <Text color="shader.a.500">Created By</Text>
              <Text color="primary.a.500" fontWeight="medium">
                {testGameDetail.author}
              </Text>
            </HStack>

            <NavLinkSocial sx={{ my: 5 }} />

            <Box
              display="inline-flex"
              alignContent="flex-end"
              alignItems="flex-end"
              gap={0}
            >
              <Text width="618px" noOfLines={2} ref={refDescription}>
                {testGameDetail.description}
              </Text>
              {isOverflown && (
                <Text
                  cursor="pointer"
                  fontSize="md"
                  color="primary.a.500"
                  zIndex={3}
                >
                  Read More
                </Text>
              )}
            </Box>
          </Center>
        </Box>
      </Box>

      <Box color="shader.a.900" py={6}>
        <HStack justifyContent="space-between">
          <Heading variant="sub02">
            Total {testGameDetail.collections.length} Collections
          </Heading>
          <Select variant="formFilter" width="fit-content">
            {testOptionSort.map(item => (
              <option key={item.title} value={item.value}>
                {item.title}
              </option>
            ))}
          </Select>
        </HStack>
        {/*   <Grid
          gap={5}
          gridTemplateColumns={{
            lg: 'repeat(5,1fr)',
            md: 'repeat(3,1fr)',
            base: 'repeat(1,1fr)',
          }}
        >
          {testGameDetail.collections.map(item => (
            <CardTypeOne item={item} key={item.id} />
          ))}
        </Grid> */}
        <Box mt={4}>
          <Carousel
            options={{
              breakpoints: {
                360: {
                  slidesPerView: 1,
                },
                630: {
                  slidesPerView: 1.2,
                },
                920: {
                  slidesPerView: 1.2,
                },

                1440: {
                  slidesPerView: 2.2,
                },
              },
            }}
          >
            {TestDataRelease.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  width="full"
                  position="relative"
                  overflow="hidden"
                  borderRadius="xl"
                >
                  <Image
                    objectFit="cover"
                    src={item.image}
                    alt={`Image ${item.name}`}
                    width="full"
                    h="328px"
                  />
                  <Box
                    position="absolute"
                    width="full"
                    bottom="20%"
                    height="40%"
                    background="linear-gradient(180deg, rgba(24, 24, 27, 0.00) 0%, #18181B 100%)"
                  />
                  <Box
                    position="absolute"
                    width="full"
                    bottom="0"
                    height="20%"
                    background="#18181B"
                  />

                  <Box px="26px" position="absolute" bottom={5}>
                    <HStack gap={2}>
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color="shader.a.100"
                        lineHeight="2rem"
                      >
                        {item.name}
                      </Text>
                      {/*  {item.isVerified && <Icon as={VerifyIcon} h={6} w={6} />} */}

                      <Text
                        borderLeft="0.063rem solid"
                        pl={2}
                        color="rgba(255, 255, 255, 0.80)"
                        fontWeight="medium"
                        lineHeight="1.5rem"
                      >
                        ID: {item.id}
                      </Text>
                    </HStack>
                    <Text
                      fontSize="sm"
                      color="rgba(255, 255, 255, 0.80)"
                      mb={6}
                    >
                      By {item.creator}
                    </Text>
                    <HStack
                      fontSize="sm"
                      fontWeight="medium"
                      gap={2}
                      color="white"
                    >
                      <Text>Collections: {item.collection}</Text>
                      <CircleIcon width="0.25rem" height="0.25rem" />
                      <Text>Items: {item.items}</Text>
                      <CircleIcon width="0.25rem" height="0.25rem" />
                      <Text>Floor: {item.floor} GAFI</Text>
                    </HStack>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Carousel>
        </Box>
      </Box>

      <Box padding={6} bg="white" borderRadius="xl" width="full">
        <Heading variant="sub02" mb={6}>
          NFTs Overview
        </Heading>
        <Collections />
      </Box>
    </>
  );
}
