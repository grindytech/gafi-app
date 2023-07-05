import { Image, VStack, Text, HStack, Box, Icon } from '@chakra-ui/react';
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

export default CardTypeOne;
