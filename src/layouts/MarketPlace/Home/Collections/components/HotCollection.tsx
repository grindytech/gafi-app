import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Navigation, Mousewheel } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import CollectionIcon from 'public/assets/line/collection-02.svg';
import ArrowIcon from 'public/assets/line/chevron-02.svg';
import { CircleIcon } from 'components/Substrate/SubstrateNode';
import 'swiper/css/mousewheel';
interface TestProps {
  image: string;
  name: string;
  floor: string;
  vol: string;
}
const TestData: TestProps[] = [
  {
    image:
      'https://i.seadn.io/gcs/files/d8952ba88532e51cccd5d683ecb2d723.png?auto=format&dpr=1&w=256',
    name: 'reepz1',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/96b6b321ab6d829e19f831cf21f13341.png?auto=format&dpr=1&w=285',
    name: 'reepz1',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/d8952ba88532e51cccd5d683ecb2d723.png?auto=format&dpr=1&w=256',
    name: 'reepz1',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/96b6b321ab6d829e19f831cf21f13341.png?auto=format&dpr=1&w=285',
    name: 'reepz2',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/d8952ba88532e51cccd5d683ecb2d723.png?auto=format&dpr=1&w=256',
    name: 'reepz2',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/96b6b321ab6d829e19f831cf21f13341.png?auto=format&dpr=1&w=285',
    name: 'reepz2',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/d8952ba88532e51cccd5d683ecb2d723.png?auto=format&dpr=1&w=256',
    name: 'reepz3',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/96b6b321ab6d829e19f831cf21f13341.png?auto=format&dpr=1&w=285',
    name: 'reepz3',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/d8952ba88532e51cccd5d683ecb2d723.png?auto=format&dpr=1&w=256',
    name: 'reepz3',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/96b6b321ab6d829e19f831cf21f13341.png?auto=format&dpr=1&w=285',
    name: 'reepz',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/d8952ba88532e51cccd5d683ecb2d723.png?auto=format&dpr=1&w=256',
    name: 'reepz',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/96b6b321ab6d829e19f831cf21f13341.png?auto=format&dpr=1&w=285',
    name: 'reepz',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/d8952ba88532e51cccd5d683ecb2d723.png?auto=format&dpr=1&w=256',
    name: 'reepz',
    floor: '0.08',
    vol: '13475',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/96b6b321ab6d829e19f831cf21f13341.png?auto=format&dpr=1&w=285',
    name: 'reepz',
    floor: '0.08',
    vol: '13475',
  },
];

const slidePerPage = (objectArray: TestProps[]) => {
  const itemsPerPage = 3; //setting item each page is 3
  const totalSlides = Math.ceil(objectArray.length / itemsPerPage);
  return (
    <div>
      {[...Array(totalSlides)].map((_, slideIndex) => (
        <SwiperSlide key={slideIndex}>
          <VStack gap={8} alignItems="flex-start">
            {objectArray
              .slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage)
              .map((item, index) => (
                <>
                  <HStack
                    color="shader.a.900"
                    spacing={3}
                    key={` ${slideIndex * itemsPerPage + index + 1}`}
                  >
                    <Text fontWeight="bold">{` ${
                      slideIndex * itemsPerPage + index + 1
                    }`}</Text>

                    <Image
                      src={item.image}
                      height={14}
                      width={14}
                      borderRadius="xl"
                    />
                    <VStack alignItems="flex-start">
                      <Text fontWeight="bold">{item.name}</Text>
                      <HStack>
                        <Flex>
                          <Text>Floor Price:</Text>
                          <Text fontWeight="bold">{item.floor}</Text>
                        </Flex>
                        <CircleIcon height="8px" />
                        <Flex>
                          <Text>Vol:</Text>
                          <Text fontWeight="bold">{item.floor}</Text>
                        </Flex>
                      </HStack>
                    </VStack>
                  </HStack>
                </>
              ))}
          </VStack>
        </SwiperSlide>
      ))}
    </div>
  );
};

const HotCollection = () => {
  return (
    <>
      <Box color="shader.a.900">
        <HStack
          justifyContent="space-between"
          spacing={0}
          position="sticky"
          left={0}
        >
          <Flex gap={3} alignItems="center">
            <Icon
              as={CollectionIcon}
              h={6}
              w={6}
              sx={{
                path: {
                  stroke: 'url(#CollectionLinear06)',
                },
              }}
            />
            <Text fontWeight="semibold" fontSize="xl">
              Trending Collections
            </Text>
          </Flex>

          <Link href="/marketplace/explorer/collections">
            <Button
              variant="more"
              fontSize="sm"
              rightIcon={
                <Icon
                  as={ArrowIcon}
                  transform="rotate(180deg)"
                  color="primary.a.500"
                  height="1.25rem"
                  width="1.25rem"
                />
              }
            >
              more
            </Button>
          </Link>
        </HStack>
        <Box my={4}>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Mousewheel]}
            spaceBetween={20}
            mousewheel={{
              forceToAxis: true,
            }}
            slidesPerView={3.5}
            breakpoints={{
              370: {
                slidesPerView: 1,
              },
              450: {
                slidesPerView: 1,
              },
              630: {
                slidesPerView: 2,
              },
              920: {
                slidesPerView: 2.5,
              },
              1520: {
                slidesPerView: 3.5,
              },
            }}
          >
            {slidePerPage(TestData)}
          </Swiper>
        </Box>
      </Box>
    </>
  );
};

export default HotCollection;
