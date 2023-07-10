import { Box, Text, Image, HStack, Icon } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';

import { SwiperSlide } from 'swiper/react';
import VerifyIcon from 'public/assets/fill/verified.svg';
import { CircleIcon } from 'components/Substrate/SubstrateNode';

const TestData = [
  {
    id: '20',
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    id: '20',
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/349040/ss_1167f11ce3f8a6a6a333856052d109d1ae3deb26.600x338.jpg?t=1683624653',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    id: '20',
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/292030/ss_b74d60ee215337d765e4d20c8ca6710ae2362cc2.600x338.jpg?t=1687959506',
    name: 'The Witcher 3',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    id: '20',
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    id: '20',
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
];
const NewRelease = () => {
  return (
    <Box>
      <Text
        color="shader.a.900"
        fontSize="2xl"
        fontWeight="bold"
        lineHeight="2"
      >
        New release
      </Text>
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
          {TestData.map((item, index) => (
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
                    {item.isVerified && <Icon as={VerifyIcon} h={6} w={6} />}

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
                  <Text fontSize="sm" color="rgba(255, 255, 255, 0.80)" mb={6}>
                    By {item.creator}
                  </Text>
                  <HStack fontSize="sm" fontWeight="medium" gap={2}>
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
  );
};

export default NewRelease;
