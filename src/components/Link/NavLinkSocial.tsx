import InternetIcon from 'public/assets/line/internet.svg';
import TelegramIcon from 'public/assets/fill/telegram-fill.svg';
import TwitterIcon from 'public/assets/fill/twitter-fill.svg';
import GithubIcon from 'public/assets/fill/github.svg';
import YouTubeIcon from 'public/assets/fill/youtube.svg';
import DiscordIcon from 'public/assets/fill/discord.svg';
import { HStack, Icon, StackProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
/* const dataSocial = [
  {
    link: '#',
    icon: InternetIcon,
    key: 'web',
  },
  {
    link: `https://github.com`,
    icon: GithubIcon,
    key: 'github',
  },

  {
    link: `https://twitter.com`,
    icon: TwitterIcon,
    key: 'twitter',
  },
  {
    link: 'https://www.youtube.com/',
    icon: YouTubeIcon,
    key: 'youtube',
  },
  {
    link: `https://t.me`,
    icon: TelegramIcon,
    key: 'telegram',
  },
  {
    link: '#',
    icon: DiscordIcon,
    key: 'discord',
  },
]; */
interface IProps {
  sx?: StackProps;
}
const NavLinkSocial = ({ sx }: IProps) => {
  const SocialData = [
    { link: '#', icon: InternetIcon, alt: 'Host Website' },
    { link: '#', icon: TelegramIcon, alt: 'Telegram icon' },
    {
      link: '#',
      icon: TwitterIcon,
      alt: 'Twitter icon',
    },
    { link: '#', icon: GithubIcon, alt: 'Github icon' },
    { link: '#', icon: YouTubeIcon, alt: 'YouTub icon' },
    { link: '#', icon: DiscordIcon, alt: 'Discord icon' },
  ];
  return (
    <>
      <HStack gap={4} {...sx}>
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
    </>
  );
};

export default NavLinkSocial;
