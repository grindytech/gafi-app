import {
  Box,
  VStack,
  Image,
  HStack,
  Text,
  Button,
  Icon,
  Flex,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { TestDataProps2 } from 'layouts/MarketPlace/Home/Collections/components/TopPool';

import VerifyIcon from 'public/assets/fill/verified.svg';
interface IProps {
  item: TestDataProps2;
}
const CardTypeTwo = ({ item }: IProps) => {
  return (
    <>
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
              <HStack justifyContent="space-between" w="full" fontSize="sm">
                <Box>
                  <Text color="shader.a.600">Minted:</Text>
                  <Text fontWeight="medium">{item.minted}</Text>
                </Box>
                <Box>
                  <Text textAlign="right" color="shader.a.600" fontSize="sm">
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
    </>
  );
};

export default CardTypeTwo;
