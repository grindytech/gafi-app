/**
 *  Can Use Observer API intersection or Use Infinite query of Tanstack query
 *
 */
import TelegramIcon from 'public/assets/fill/telegram-fill.svg';
import TwitterIcon from 'public/assets/fill/twitter-fill.svg';
import DiscordIcon from 'public/assets/fill/discord.svg';
import YoutubeIcon from 'public/assets/fill/youtube.svg';
import GithubIcon from 'public/assets/fill/github.svg';

/**---------------------------Test Data Collections--------------------------------- */
export interface TestPropsType1 {
  image: string;
  name: string;
  floor: string;
  volume: string;
  isVerified?: boolean;
  id: string;
}
export const TestDataCollections: TestPropsType1[] = [
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRibpCPA7GQED-pJueP6IzIEUAp-nmwg033g&usqp=CAU',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '18',
  },
  {
    image:
      'https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '17',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '16',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '15',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '14',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '13',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '12',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '3',
  },
];
/**--------------------------- Option Fiter Test--------------------------------- */
export const testOption1 = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Single NFT 2',
    value: 'single-nft-2',
  },
  {
    title: 'Single NFT 3',
    value: 'single-nft-3',
  },
  {
    title: 'Single NFT 4',
    value: 'single-nft-4',
  },
];
export const testOption2 = [
  {
    title: 'Auction',
    value: 'auction',
  },
  {
    title: 'Auction 2',
    value: 'auction-2',
  },
  {
    title: 'Auction 3',
    value: 'auction-3',
  },
  {
    title: 'Auction 4',
    value: 'auction-4',
  },
];

export const testOptionSort = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'Newest',
    value: 'newest',
  },
  {
    title: 'Recently Sold',
    value: 'recently-sold',
  },
  {
    title: 'Price High To Low',
    value: 'price-high-low',
  },
  {
    title: 'Price Low to High',
    value: 'price-low-high',
  },
  {
    title: 'Most Viewed',
    value: 'most-viewed',
  },
];
export const objectSocial = [
  {
    link: `https://github.com`,
    icon: GithubIcon,
  },

  {
    link: `https://twitter.com`,
    icon: TwitterIcon,
  },
  {
    link: 'https://www.youtube.com/',
    icon: YoutubeIcon,
  },

  {
    link: `https://t.me`,
    icon: TelegramIcon,
  },
  {
    link: ``,
    icon: DiscordIcon,
  },
];
/**------------------------------------------------------------ */
export const testGameDetail = {
  name: 'Topia World',
  isVerifiled: true,
  author: 'Electronic Sports',
  bannerImage:
    'https://i.seadn.io/gcs/files/f51ce486cbe70d8c98f5ebc31b80ea35.png?auto=format&dpr=1&w=1920',
  avatar:
    'https://i.seadn.io/gcs/files/00ace38ffb8ca117f59a02e140951ffe.png?auto=format&dpr=1&w=256',
  social: [
    {
      key: 'tele',
      link: '#',
      icon: TelegramIcon,
    },
    {
      key: 'twitter',
      link: '#',
      icon: TwitterIcon,
    },
    {
      key: 'discord',
      link: '#',
      icon: DiscordIcon,
    },
    {
      key: 'youtube',
      link: '#',
      icon: YoutubeIcon,
    },
  ],
  website: 'https://gafi.network/',
  description:
    "TOPIA is a game and creator platform developed by Minecraft modding experts, aiming to overcome Minecraft's limitations and become 'the next Minecraft.' The platform promotes innovation and collaboration among players, creators, and contributors, fostering an interconnected ecosystem with a new game engine and resources. TOPIA's mission is to enable diverse and immersive gaming experiences previously unattainable in Minecraft.",
  collections: TestDataCollections,
  isVerified: true,
};

export const testCollectionDetail = {
  name: 'Lil Pudgys',
  isVerifiled: true,
  author: 'Thegology Company',
  bannerImage:
    'https://i.seadn.io/gcs/files/ff12374123ac5e8571b01d03874e8a76.png?auto=format&dpr=1&w=1920',
  avatar:
    'https://i.seadn.io/gae/s4Td3KYsUlCblO6lQKAGAWdKwsCuumcxYpebM_YL-Pex-BP886JYAWjKBLeB5StNopAAD6kVx3QHqWm9AmudXyCaCZszHbt8SdteEQ?auto=format&dpr=1&w=256',

  website: 'https://gafi.network/',
  description:
    'With the pedal to the metal, race along more than 3,000 kilometers of tracks that’s or along the coast, defend your position in more than 250 races, with With the pedal to the metal, race along more than 3,000 kilometers of tracks that’s or along the coast, defend your position in more than 250 races, with ',
  collections: TestDataCollections,
  isVerified: true,
};

/**------------- Data Test Article*/
//1 day: 24 * 60 * 60 * 1000;
const NOW_TIME = new Date().getTime();

export const DataTestArticle = [
  {
    image:
      'https://cdn1.epicgames.com/offer/fn/EN_25BR_ZeroBuild_EGS_2560x1440_2560x1440-ce5c18ffe40b92cb6e3c8dac19dfd001',
    link: '#',
    title: 'Fornite Zero Build Give Away',
    targetDate: 24 * 60 * 60 * 1000 + NOW_TIME,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://bfs3bucket.s3.amazonaws.com/wp-content/uploads/2023/06/LEGO-2K-Drive-Season-1-key-art-featured-800x445.jpg',
    link: '#',
    title: 'Lego 2K Driver Season 1',
    targetDate: 15 * 60 * 1000 + NOW_TIME,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://cdn1.epicgames.com/offer/fn/EN_25BR_ZeroBuild_EGS_2560x1440_2560x1440-ce5c18ffe40b92cb6e3c8dac19dfd001',
    link: '#',
    targetDate: 30 * 60 * 1000 + NOW_TIME,
    title: 'Fornite Zero Build Give Away',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://bfs3bucket.s3.amazonaws.com/wp-content/uploads/2023/06/LEGO-2K-Drive-Season-1-key-art-featured-800x445.jpg',
    link: '#',
    title: 'Lego 2K Driver Season 1',
    targetDate: 45 * 60 * 1000 + NOW_TIME,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://cdn1.epicgames.com/offer/fn/EN_25BR_ZeroBuild_EGS_2560x1440_2560x1440-ce5c18ffe40b92cb6e3c8dac19dfd001',
    link: '#',
    title: 'Fornite Zero Build Give Away',
    targetDate: 1 * 60 * 60 * 1000 + NOW_TIME,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://bfs3bucket.s3.amazonaws.com/wp-content/uploads/2023/06/LEGO-2K-Drive-Season-1-key-art-featured-800x445.jpg',
    link: '#',
    title: 'Lego 2K Driver Season 1',
    targetDate: 15 * 60 * 1000 + NOW_TIME,
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
];

export const TestDataRelease = [
  {
    id: '20',
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    id: '20',
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/349040/ss_1167f11ce3f8a6a6a333856052d109d1ae3deb26.600x338.jpg?t=1683624653',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    id: '20',
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/292030/ss_b74d60ee215337d765e4d20c8ca6710ae2362cc2.600x338.jpg?t=1687959506',
    name: 'The Witcher 3',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    id: '20',
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    id: '20',
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
];
