/* eslint-disable import/no-unresolved */
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

import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import CollectionIcon from 'public/assets/line/collection-02.svg';
import ArrowIcon from 'public/assets/line/chevron-02.svg';
import { CircleIcon } from 'components/Substrate/SubstrateNode';
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

const HotCollection = () => {
  console.log(TestData[3]);
  return (
    <>
      <HStack
        mt={10} //test
        justifyContent="space-between"
        spacing={0}
        position="sticky"
        left={0}
      >
        <Flex gap={3}>
          <Icon as={CollectionIcon} height="1.5rem" width="1.5rem" />
          <Text color="shader.a.900" fontWeight="semibold" fontSize="xl">
            Hot Collections
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
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={3}
          breakpoints={{
            390: {
              slidesPerView: 1,
            },
            450: {
              slidesPerView: 1,
            },
            630: {
              slidesPerView: 2,
            },
            920: {
              slidesPerView: 2,
            },
            1232: {
              slidesPerView: 3,
            },
            1520: {
              slidesPerView: 3,
            },
          }}
        >
          {TestData.map((item, index) => (
            <SwiperSlide key={index}>
              <HStack color="shader.a.900" spacing={3}>
                <Text fontWeight="bold">{index}</Text>
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
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default HotCollection;
