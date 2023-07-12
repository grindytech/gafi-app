import InternetIcon from 'public/assets/line/internet.svg';
import {
  testGameDetail,
  testOptionSort,
} from 'layouts/MarketPlace/Explorer/DataTest';
import VerfyIcon from 'public/assets/fill/verified.svg';
import {
  Box,
  Center,
  Grid,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import CardTypeOne from 'components/ProductCard/CardTypeOne';
import Collections from '../Collections';
const GameDetail = () => {
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
          <Image src={testGameDetail.bannerImage} />
          <Center flexDirection="column" gap={0} py={8}>
            <Box
              height={{ md: '136px', base: '90px' }}
              width={{ md: '136px', base: '90px' }}
              borderRadius="xl"
              border="0.625rem solid"
              borderColor="white"
              overflow="hidden"
              /*  position="absolute" */
              inset={0}
              marginTop={{ md: '-140px', base: '-90px' }}
              mb="24px"
            >
              <Image
                src={testGameDetail.avatar}
                height="full"
                width="full"
                objectFit="cover"
              />
            </Box>

            <HStack>
              <Text fontSize="1.5rem" lineHeight="2rem" fontWeight="bold">
                {testGameDetail.name}
              </Text>
              {testGameDetail.isVerified && <Icon as={VerfyIcon} h={5} w={5} />}
            </HStack>
            <HStack lineHeight="1.5rem">
              <Text color="shader.a.500">Created By</Text>
              <Text color="primary.a.500" fontWeight="medium">
                {testGameDetail.author}
              </Text>
            </HStack>
            <HStack gap={4} my={5}>
              {testGameDetail.website && (
                <Link
                  href={testGameDetail.website}
                  _hover={{
                    color: 'primary.a.500',
                  }}
                >
                  <Icon as={InternetIcon} height={6} w={6} />
                </Link>
              )}
              {testGameDetail.social.map(item => (
                <Link
                  key={item.key}
                  href={item.link}
                  _hover={{
                    color: 'primary.a.500',
                  }}
                >
                  <Icon as={item.icon} height={6} w={6} />
                </Link>
              ))}
            </HStack>
            <Box
              display="inline-flex"
              alignContent="flex-end"
              alignItems="flex-end"
            >
              <Text
                width="618px"
                noOfLines={getLine >= 2 && !isOpen ? 2 : undefined}
                ref={refDescription}
              >
                {testGameDetail.description}
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
          </Center>
        </Box>
      </Box>

      <Box color="shader.a.900" py={6}>
        <HStack justifyContent="space-between">
          <Heading variant="sub02">
            Total {testGameDetail.collections.length} Collections
          </Heading>
          <Select variant="formFilter" width="fit-content">
            {testOptionSort.map(item => (
              <>
                <option value={item.value}>{item.title}</option>
              </>
            ))}
          </Select>
        </HStack>
        <Grid
          gap={5}
          gridTemplateColumns={{
            lg: 'repeat(5,1fr)',
            md: 'repeat(3,1fr)',
            base: 'repeat(1,1fr)',
          }}
        >
          {testGameDetail.collections.map(item => (
            <CardTypeOne item={item} key={item.id} />
          ))}
        </Grid>
      </Box>

      <Box padding={6} bg="white" borderRadius="xl" width="full">
        <Heading variant="sub02" mb={6}>
          NFTs Overview
        </Heading>
        <Collections />
      </Box>
    </>
  );
};

export default GameDetail;
