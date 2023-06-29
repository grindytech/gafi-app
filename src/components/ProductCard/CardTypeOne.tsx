import { Image, VStack, Text, HStack, Box, Icon } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { TestPropsType1 } from 'layouts/MarketPlace/Explorer/components/TrendingSection';
import VerifyIcon from 'public/assets/fill/verified.svg';
interface IProps {
  item: TestPropsType1;
}
const CardTypeOne = ({ item }: IProps) => {
  return (
    <>
      <CardBox padding={0} variant="baseStyle">
        <VStack alignItems="flex-start">
          <Box width="full">
            <Image
              objectFit="cover"
              src={item.image}
              alt={`Image ${item.name}`}
              width="full"
              maxH="200px"
              borderTopRadius="xl"
              borderTopLeftRadius="xl"
            />
          </Box>

          <Box p={'16px'} width="full">
            <HStack gap={1.5}>
              <Text fontWeight="medium" fontSize="lg">
                {item.name}
              </Text>
              {item.isVerified && (
                <Icon as={VerifyIcon} height="20px" width="20px" />
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
