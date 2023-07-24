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

export const DataTestNftAttributes = [
  {
    name: 'Shiny Red',
    attr: 'Color',
    rarity: '15',
  },
  {
    name: 'Shiny Red',
    attr: 'Wheel',
    rarity: '15',
  },
  {
    name: 'Shiny Red',
    attr: 'Headlight',
    rarity: '15',
  },
  {
    name: 'Shiny Red',
    attr: 'SSS',
    rarity: '15',
  },
  {
    name: 'Shiny Red',
    attr: 'Normal',
    rarity: '15',
  },
];

export const DataTestNftAuctions = [
  {
    image: '',
    address: '',
    timestamp: '',
    type: 'Floor auction',
    status: 'Expires',
    amount: '0.055',
  },
];

export interface TestDataProps2 {
  image: string;
  name: string;
  id: string;
  minted: string;
  volume: string;
  price: string;
  isVerified?: boolean;
}
export const TestDataTopPool: TestDataProps2[] = [
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '16',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '100',
    isVerified: true,
  },
  {
    image:
      'https://cdn.tgdd.vn/Files/2020/12/26/1316151/overwatchdangduocmienphi4-_1920x1080-800-resize.jpg',
    name: 'Overwatch: Gun',
    id: '17',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '200',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Rush War: Gun & Gear',
    id: '18',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://img-cdn.2game.vn/pictures/xemgame/2019/08/27/rush-war-1.jpg',
    name: 'Call Of Duty 2027',
    id: '19',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'SoG: Weapon',
    id: '20',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://img-cdn.2game.vn/pictures/xemgame/2019/08/27/rush-war-1.jpg',
    name: 'Azuki 2020',
    id: '21',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Azuki 2020',
    id: '22',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '23',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/42700/capsule_616x353.jpg?t=1654809667',
    name: 'Call Of Duty 2027',
    id: '24',
    volume: '119.5M',
    minted: '10,0789,663',
    price: '300',
  },
];

export const TestDataBundleDetails = {
  name: 'Gear Club 2',
  owner: '0x3b5a...6b10e',
  isVerifiled: true,
  bundleName: 'Top 10 Super Warrior',
  auction: true,
  price: '1,550,000',
  auctionDate: 3 * 24 * 60 * 60 * 1000 + NOW_TIME,
  like: 20,
  view: 144,
  items: [
    {
      id: '3',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/d8c6d9896ff5a79b640dc3763eefeaff.png?auto=format&dpr=1&w=1000',
      rarity: '30',
      quantity: '5',
    },
    {
      id: '4',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/bb5123ecc94a8353e51da42f0f5cc055.png?auto=format&dpr=1&w=1000',
      rarity: '72',
      quantity: '25',
    },
    {
      id: '5',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/97aa43ddb68f5ca4ca87391efab81beb.png?auto=format&dpr=1&w=1000',
      rarity: '27',
      quantity: '25',
    },
    {
      id: '6',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/1d403ab7cffba128e801254f1fea7da9.png?auto=format&dpr=1&w=1000',
      rarity: '16',
      quantity: '4',
    },
    {
      id: '7',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/195a2605290a0b3c30fd1d72afa57a81.png?auto=format&dpr=1&w=1000',
      rarity: '2',
      quantity: '1',
    },
    {
      id: '8',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/17d5f64f4a7e291038e67f7ebdcb00e8.png?auto=format&dpr=1&w=1000',
      rarity: '46',
      quantity: '20',
    },
    {
      id: '9',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/0b1f50e2183ef180c9495ea3ec16049d.png?auto=format&dpr=1&w=1000',
      rarity: '80',
      quantity: '25',
    },
    {
      id: '10',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/281bb1659fafbd3bca4b6577f08a20d1.png?auto=format&dpr=1&w=1000',

      rarity: '80',
      quantity: '25',
    },
    {
      id: '11',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/c60c3a90099d4c4fc5dae7c187bb35a7.png?auto=format&dpr=1&w=1000',
      rarity: '80',
      quantity: '25',
    },
    {
      id: '12',
      name: 'BMW i3',
      image:
        'https://i.seadn.io/gcs/files/a02b7edb69d385bbf416914e656adb10.png?auto=format&dpr=1&w=1000',
      rarity: '0.002',
      quantity: '1',
    },
  ],
};
