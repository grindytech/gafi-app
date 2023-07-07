import {
  Image,
  VStack,
  Text,
  HStack,
  Box,
  Icon,
  Skeleton,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { TestPropsType1 } from 'layouts/MarketPlace/Home/Collections/components/TrendingSection';

import VerifyIcon from 'public/assets/fill/verified.svg';
interface IProps {
  item: TestPropsType1;
}
const CardTypeOne = ({ item }: IProps) => {
  return (
    <>
      <CardBox
        padding={0}
        variant="baseStyle"
        boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
        cursor="pointer"
        transition="all linear 0.6s"
      >
        <VStack alignItems="flex-start" gap={0}>
          <Box width="full" padding={2}>
            <Image
              _hover={{
                objectFit: 'contain',
              }}
              transition="all linear 0.6s"
              objectFit="cover"
              src={item.image}
              alt={`Image ${item.name}`}
              width="full"
              h="10.5rem"
              borderRadius="xl"
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
