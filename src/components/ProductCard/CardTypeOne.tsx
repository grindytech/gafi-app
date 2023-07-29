import {
  Image,
  VStack,
  Text,
  HStack,
  Box,
  Skeleton,
  ImageProps,
  Flex,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { TestPropsType1 } from 'hooks/DataTest';
import { Link } from 'react-router-dom';

interface IProps {
  item: TestPropsType1;
  link?: string;
  imageStyle?: ImageProps;
}
// This Card use for collection , game

const CardTypeOne = ({ item, imageStyle, link }: IProps) => {
  return (
    <>
      <Link to={link || `/marketplace/collection/${item.id}`}>
        <CardBox
          mt={2}
          padding={0}
          variant="baseStyle"
          boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
          cursor="pointer"
          role="group"
          _hover={{
            transform: 'translateY(-5px)',
            boxShadow: 'rgba(0, 0, 0, 0.08) 7px 4px 16px',
          }}
          transition="all 0.1s ease 0s"
        >
          <VStack alignItems="flex-start" gap={0}>
            <Box width="full" padding={2}>
              <Box overflow="hidden" borderRadius="lg">
                <Image
                  objectFit="cover"
                  _groupHover={{
                    transform: 'scale(1.1)',
                  }}
                  transition="transform 0.4s ease 0s"
                  src={item.image}
                  alt={`Image ${item.name}`}
                  width="full"
                  h="10.5rem"
                  {...imageStyle}
                />
              </Box>
            </Box>

            <Box
              p={4}
              width="full"
              borderTop="0.063rem solid "
              borderColor="shader.a.200"
            >
              <HStack gap={1.5} mb={3.5} justifyContent="space-between">
                <Text fontWeight="medium" fontSize="lg" noOfLines={1}>
                  {item.name}
                </Text>
                <Flex>
                  <Text color="shader.a.600">ID:</Text>
                  <Text>{item.id}</Text>
                </Flex>
              </HStack>

              <HStack justifyContent="space-between" width="full">
                <Box>
                  <Text color="shader.a.600" fontSize="sm">
                    Floor:
                  </Text>
                  <Text fontWeight="medium">{item.floor} GAFI</Text>
                </Box>
                <Box>
                  <Text color="shader.a.600" fontSize="sm">
                    Volume:
                  </Text>
                  <Text fontWeight="medium">{item.volume} GAFI</Text>
                </Box>
              </HStack>
            </Box>
          </VStack>
        </CardBox>
      </Link>
    </>
  );
};

export const CardTypeOneSkeleton = () => {
  const bgSkeleton =
    'linear-gradient(90deg, #E4E4E7 0%, rgba(228, 228, 231, 0.15) 62.77%, #E4E4E7 100%)';
  return (
    <CardBox
      padding={0}
      variant="baseStyle"
      boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
      cursor="pointer"
      transition="all linear 0.6s"
    >
      <Box w="full" padding={2}>
        <Skeleton width="full" h="10.5rem" borderRadius="xl" bg={bgSkeleton} />
      </Box>

      <Box
        p={4}
        width="full"
        borderTop="0.063rem solid "
        borderColor="shader.a.200"
      >
        <HStack gap={1.5} mb={3.5} justifyContent="space-between">
          <Box>
            <Skeleton
              bg={bgSkeleton}
              w="2.5rem"
              height="1rem"
              borderRadius="16px"
              mb={1}
            />
            <Skeleton
              bg={bgSkeleton}
              w="4rem"
              height="1rem"
              borderRadius="16px"
            />
          </Box>
          <VStack alignItems="flex-end" gap={0}>
            <Skeleton
              bg={bgSkeleton}
              w="2.5rem"
              height="1rem"
              borderRadius="16px"
              mb={1}
            />
            <Skeleton
              bg={bgSkeleton}
              w="4rem"
              height="1rem"
              borderRadius="16px"
            />
          </VStack>
        </HStack>
      </Box>
    </CardBox>
  );
};
export default CardTypeOne;
