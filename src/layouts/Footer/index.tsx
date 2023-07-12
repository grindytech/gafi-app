import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import LogoGafi from 'public/assets/logo/gafi-app.svg';
import InternetIcon from 'public/assets/line/internet.svg';
import TelegramIcon from 'public/assets/fill/telegram-fill.svg';
import TwiterIcon from 'public/assets/fill/twitter-fill.svg';
import GithubIcon from 'public/assets/fill/github.svg';
import YouTubeIcon from 'public/assets/fill/youtube.svg';
import DiscordIcon from 'public/assets/fill/discord.svg';
import { Link } from 'react-router-dom';
import React from 'react';
interface NavLinkProps {
  title: string;
  subLink: {
    title: string;
    link: string;
  }[];
}

const SocialData = [
  { link: '#', icon: InternetIcon, alt: 'Host Website' },
  { link: '#', icon: TelegramIcon, alt: 'Telegram icon' },
  {
    link: 'https://twitter.com/SpaceIDProtocol',
    icon: TwiterIcon,
    alt: 'Twitter icon',
  },
  { link: '#', icon: GithubIcon, alt: 'Github icon' },
  { link: '#', icon: YouTubeIcon, alt: 'YouTub icon' },
  { link: '#', icon: DiscordIcon, alt: 'Discord icon' },
];
const NavLinkData: NavLinkProps[] = [
  {
    title: 'Marketplace',
    subLink: [
      { title: 'Games', link: '#' },
      { title: 'Collections', link: '#' },
      { title: 'NFTs', link: '#' },
      { title: 'Minting pools', link: '#' },
    ],
  },
  {
    title: 'My Account',
    subLink: [
      { title: 'Profile', link: '#' },
      { title: 'Favourites', link: '#' },
      { title: 'My Collections', link: '#' },
      { title: 'Settings', link: '#' },
    ],
  },
  {
    title: 'Resources',
    subLink: [
      { title: 'Partners', link: '#' },
      { title: 'Blog', link: '#' },
      { title: 'Learn', link: '#' },
      { title: 'Help center', link: '#' },
    ],
  },
  {
    title: 'Market',
    subLink: [
      { title: 'Buy NFTs', link: '#' },
      { title: 'Sell NFTs', link: '#' },
      { title: 'Loan NFTs', link: '#' },
      { title: 'Auction NFTs', link: '#' },
    ],
  },
];
export default function Footer() {
  return (
    <Box
      as="footer"
      position="relative"
      _before={{
        content: `''`,
        bg: 'white',
        borderTop: '0.0625rem solid',
        borderColor: 'shader.a.300',
        position: 'absolute',
        height: 'full',
        width: '200vw',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <Box position="relative">
        <Grid
          py={12}
          gridTemplateColumns={{
            sm: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)',
          }}
          gap={{
            base: 8,
            lg: 6,
          }}
          color="shader.a.600"
        >
          <VStack alignItems="flex-start" gap={0}>
            <Icon as={LogoGafi} height={10} width="auto" mb={6} />
            <Text fontSize="sm" mb={4}>
              Lorem ipsum dolor sit amet consectetur. Diam bibendum justo
              sollicitudin rutrum. Neque velit commodo.
            </Text>
            <HStack gap={4}>
              {SocialData.map(item => (
                <Link key={item.alt} to={item.link} target="_blank">
                  <Icon
                    as={item.icon}
                    h={6}
                    w={6}
                    _hover={{
                      color: 'primary.a.500',
                      transition: 'linear 0.5s',
                    }}
                  />
                </Link>
              ))}
            </HStack>
          </VStack>
          <VStack
            gap={0}
            alignItems="flex-start"
            gridRow={{ base: 1, md: 'inherit' }}
          >
            <Text fontSize="xl" color="shader.a.900" fontWeight="semibold">
              Stay in the loop
            </Text>
            <Text mb={9}>
              Join our newsletter, get valuable NFT data at the first time!
            </Text>
            <HStack
              width="full"
              border="0.063rem solid"
              borderColor="shader.a.300"
              borderRadius="xl"
              overflow="hidden"
              display="flex"
              alignItems="center"
              p={1}
            >
              <Input
                px={4}
                color="shader.a.400"
                py={3.5}
                placeholder="Enter your email address"
                _placeholder={{ color: 'shader.a.400' }}
                outline="none"
                border="none"
              />

              <Button p={4} bg="shader.a.800" color="white" px={4}>
                Subcribes
              </Button>
            </HStack>
          </VStack>
        </Grid>

        <Box
          borderTopWidth="0.063rem"
          borderBottomWidth="0.063rem"
          borderColor="shader.a.200"
          py={6}
        >
          <Box width={{ lg: '50%', base: 'full' }}>
            <Grid
              gridTemplateColumns={{
                base: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
              }}
              gap={{ base: 4, lg: 8 }}
            >
              {React.Children.toArray(
                NavLinkData.map(item => (
                  <VStack alignItems="flex-start" gap={2} color="shader.a.600">
                    <Text
                      color="shader.a.900"
                      fontWeight="medium"
                      lineHeight="1.5rem"
                    >
                      {item.title}
                    </Text>

                    {React.Children.toArray(
                      item.subLink.map(subItem => (
                        <Text fontSize="sm" as={Link} to={subItem.link}>
                          {subItem.title}
                        </Text>
                      ))
                    )}
                  </VStack>
                ))
              )}
            </Grid>
          </Box>
        </Box>

        <HStack justifyContent="space-between" flexWrap="wrap">
          <Text
            py={4}
            as={Center}
            fontSize="sm"
            gap={1}
            color="shader.a.900"
            fontWeight="350"
          >
            © 2023 Powered by
            <Text as="span" color="primary.a.500" fontWeight="medium">
              Grindy Technologies
            </Text>
          </Text>
          <Flex gap={4} color="shader.a.600" fontSize="sm">
            <Text as={Link} to="#">
              Privacy Policy
            </Text>
            <Text as={Link} to="#">
              Term of Services
            </Text>
          </Flex>
        </HStack>
      </Box>
    </Box>
  );
}
