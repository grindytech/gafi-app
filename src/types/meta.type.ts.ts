export type TypeMetaCollection = {
  // general
  name: string;
  description: string;
  external_url: string;
  game: number[];

  // media
  logo: string;
  banner?: string;
  cover?: string;
};

export type TypeMetaGame = {
  // general
  name: string;
  category: 'Art' | 'Domain Names' | 'Gaming' | 'Memberships' | 'Music';
  description: string;
  website: string;
  twitter: string;
  discord: string;

  // media
  logo: string;
  banner?: string;
  cover?: string;
};

export type TypeMetaNFT = {
  // general
  name: string;
  image: string;
  external_url: string;
  description: string;
  attributes: Record<string, any>;
  animation_url: string;
};

export type TypeMetaPool = {
  // general
  title: string;
  begin_at: number; // start_block
  end_at: number; // end block
  description: string;

  // item
  type_pool: 'Dynamic Pool' | 'Stable Pool';
  minting_fee: string;
  supply: string | null;
};
