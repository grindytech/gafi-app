import {
  Box,
  VStack,
  Image,
  HStack,
  Text,
  Icon,
  ImageProps,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import { TestPropsType1 } from 'hooks/DataTest';

import VerifyIcon from 'public/assets/fill/verified.svg';
interface IProps {
  item: TestPropsType1;
  imageStyle?: ImageProps;
}
// This card will use to nft

const CardTypeTwo = ({ item, imageStyle }: IProps) => {
  return (
    <>
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
            <HStack gap={1.5} fontSize="sm">
              <Text fontWeight="medium" noOfLines={1}>
                {item.name}
              </Text>

              {item.isVerified && (
                <Icon as={VerifyIcon} h={5} w={5} aria-label="Verifiled Icon" />
              )}
            </HStack>
            <HStack mb={3.5} fontWeight="medium" fontSize="sm">
              <Text noOfLines={1}>{item.name}</Text>
              <Text>#34444</Text>
            </HStack>

            <HStack justifyContent="space-between" width="full" fontSize="sm">
              <Box>
                <Text color="shader.a.600">Prices:</Text>
                <Text fontWeight="medium">0.002 GAFI</Text>
              </Box>
              <Box>
                <Text color="shader.a.600">Auction:</Text>
                <Text fontWeight="medium">No auction</Text>
              </Box>
            </HStack>
          </Box>
        </VStack>
      </CardBox>
    </>
  );
};

export default CardTypeTwo;
