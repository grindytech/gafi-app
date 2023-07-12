import React, { useRef } from 'react';
import VerfyIcon from 'public/assets/fill/verified.svg';
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { testCollectionDetail } from 'layouts/MarketPlace/Explorer/DataTest';
import Collections from '.';
const CollectionDetail = () => {
  /**
   * The way to define and chek current view base on nodeOfLine setting
   */
  const refDescription = useRef<HTMLParagraphElement>(null);

  const getLine = Number(
    String(
      Math.round(
        Number(
          refDescription.current && refDescription.current.offsetHeight / 2
        )
      )
    )[0] // first digits
  );
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Box
        borderRadius="xl"
        overflow="hidden"
        boxShadow="0px 3px 14px 0px rgba(0, 0, 0, 0.05)"
        bg="white"
      >
        <Box position="relative">
          <Image src={testCollectionDetail.bannerImage} />
          <Box
            background="linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)"
            position="absolute"
            height="100px"
            width="full"
            marginTop="-100px"
          />
          <Center flexDirection="column" gap={0} py={8}>
            <Box
              height={{ md: '136px', base: '90px' }}
              width={{ md: '136px', base: '90px' }}
              borderRadius="xl"
              border="0.625rem solid"
              borderColor="white"
              overflow="hidden"
              zIndex={2}
              inset={0}
              marginTop={{ md: '-140px', base: '-90px' }}
              mb="24px"
            >
              <Image
                src={testCollectionDetail.avatar}
                height="full"
                width="full"
                objectFit="cover"
              />
            </Box>

            <HStack>
              <Text fontSize="1.5rem" lineHeight="2rem" fontWeight="bold">
                {testCollectionDetail.name}
              </Text>
              {testCollectionDetail.isVerified && (
                <Icon as={VerfyIcon} h={5} w={5} />
              )}
            </HStack>
            <HStack lineHeight="1.5rem">
              <Text color="shader.a.500">Owned By</Text>
              <Text color="primary.a.500" fontWeight="medium">
                {testCollectionDetail.author}
              </Text>
            </HStack>
            <Box
              py={5}
              display="inline-flex"
              alignContent="flex-end"
              alignItems="flex-end"
            >
              <Text
                width="618px"
                noOfLines={getLine >= 2 && !isOpen ? 2 : undefined}
                ref={refDescription}
              >
                {testCollectionDetail.description}
              </Text>
              {getLine >= 2 && (
                <Text
                  cursor="pointer"
                  onClick={onToggle}
                  fontSize="md"
                  color="primary.a.500"
                  zIndex={3}
                >
                  {isOpen ? 'Show Less' : 'Readmore'}
                </Text>
              )}
            </Box>
            <HStack
              px={6}
              py={4}
              gap={'64px'}
              borderRadius="xl"
              border="0.063rem solid"
              borderColor="shader.a.300"
            >
              <VStack alignItems="flex-start" lineHeight="1.5rem">
                <Text color="shader.a.500">Items</Text>
                <Text fontWeight="medium" color="shader.a.900">
                  10,000
                </Text>
              </VStack>
              <VStack alignItems="flex-start" lineHeight="1.5rem">
                <Text color="shader.a.500">Floor</Text>
                <Text fontWeight="medium" color="shader.a.900">
                  0.35 GAFI
                </Text>
              </VStack>
              <VStack alignItems="flex-start" lineHeight="1.5rem">
                <Text color="shader.a.500">Items</Text>
                <Text fontWeight="medium" color="shader.a.900">
                  190.25 GAFI
                </Text>
              </VStack>
              <VStack alignItems="flex-start" lineHeight="1.5rem">
                <Text color="shader.a.500">Items</Text>
                <Text fontWeight="medium" color="shader.a.900">
                  5000
                </Text>
              </VStack>
              <VStack alignItems="flex-start" lineHeight="1.5rem">
                <Text color="shader.a.500">Items</Text>
                <Text fontWeight="medium" color="shader.a.900">
                  195
                </Text>
              </VStack>
              <VStack alignItems="flex-start" lineHeight="1.5rem">
                <Text color="shader.a.500">Items</Text>
                <Text fontWeight="medium" color="shader.a.900">
                  245
                </Text>
              </VStack>
            </HStack>
          </Center>
        </Box>
        <Box
          padding={6}
          borderTop="0.063rem solid"
          borderTopColor="shader.a.200"
        >
          <Collections />
        </Box>
      </Box>
    </>
  );
};

export default CollectionDetail;
