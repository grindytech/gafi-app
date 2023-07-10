import {
  Image,
  VStack,
  Text,
  HStack,
  Box,
  Icon,
  Skeleton,
  ImageProps,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { TestPropsType1 } from 'layouts/MarketPlace/Home/Collections/components/TrendingSection';

import VerifyIcon from 'public/assets/fill/verified.svg';
interface IProps {
  item: TestPropsType1;
  imageStyle?: ImageProps;
}
const CardTypeOne = ({ item, imageStyle }: IProps) => {
  return (
    <>
      <CardBox
        mt={2}
        padding={0}
        variant="baseStyle"
        boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
        cursor="pointer"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: 'rgba(0, 0, 0, 0.08) 7px 4px 16px',
        }}
        transition="box-shadow 0.25s ease-in-out 0s, transform 0.25s ease 0s"
      >
        <VStack alignItems="flex-start" gap={0}>
          <Box width="full" padding={2}>
            <Image
              objectFit="cover"
              src={item.image}
              alt={`Image ${item.name}`}
              width="full"
              h="10.5rem"
              borderRadius="xl"
              {...imageStyle}
            />
          </Box>

          <Box
            p={4}
            width="full"
            borderTop="0.063rem solid "
            borderColor="shader.a.200"
          >
            <HStack gap={1.5} mb={3.5}>
              <Text fontWeight="medium" fontSize="lg">
                {item.name}
              </Text>
              {item.isVerified && (
                <Icon as={VerifyIcon} h={5} w={5} aria-label="Verifiled Icon" />
              )}
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