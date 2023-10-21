// collection
export type TypeSwaggerSearchCollectionData = {
  message: string;
  page: number;
  size: number;
  total: number;
  data: [
    {
      banner: string;
      cover: string;
      logo: string;

      name: string;
      category: string;
      external_url: string;

      collection_id: number;
      created_at: number;
      games: number[];
      id: number;
      is_verified: boolean;
      owner: string;
      slug: string;
      updated_at: number;
    }
  ];
};

export type TypeSwaggerSearchCollectionRequest = {
  search: string;
  page: number;
  size: number;
  order_by: 'created_at';
  desc: boolean;
  query: Partial<{
    name: string;
    owner: string;
    collection_id: string;
    game_id: string[];
  }>;
};

// game
export type TypeSwaggerSearchGameData = {
  message: string;
  page: number;
  size: number;
  total: number;
  data: [
    {
      banner: string;
      cover: string;
      logo: string;

      category: string;
      description: string;
      name: string;

      collections: number[];
      game_id: number;
      id: number;
      is_verified: boolean;
      owner: string;
      social: {
        discord: string;
        twitter: string;
        web: string;
      };
      updated_at: number;
    }
  ];
};

export type TypeSwaggerSearchGameRequest = {
  search: string;
  page: number;
  size: number;
  order_by: 'updated_at';
  desc: boolean;
  query: Partial<{
    game_id: string;
    owner: string;
    collection: number;
    name: string;
  }>;
};

// trade
export type TypeSwaggerTradeData = {
  data: [
    {
      duration: number;
      end_block: number;
      highest_bid: string;
      owner: string;
      price: string;
      start_block: number;
      status: string;
      trade_id: number;
      trade_type: string;
      bundle: [{ amount: number; collection: number; item: number }];
      maybe_required: [{ amount: number; collection: number; item: number }];
      nft: { amount: number; collection: number; item: number };
      source: [{ amount: number; collection: number; item: number }];
      wish_list: [{ amount: number; collection: number; item: number }];
    }
  ];
  message: string;
  page: number;
  size: number;
  total: number;
};

export type TypeSwaggerTradeRequest = {
  search: string;
  page: number;
  size: number;
  order_by: 'trade_id';
  desc: boolean;
  query: Partial<{
    trade_id: number;
    token_id: number | string;
    trade_type: 'SetPrice' | 'SetAuction';
  }>;
};

// pool

export type TypeSwaggerPoolData = {
  data: [
    {
      admin: string;
      begin_at: number;
      created_at: number;
      end_at: number;

      minting_fee: string;
      owner: string;
      owner_deposit: string;
      pool_id: number;
      type_pool: string;
      updated_at: number;
      loot_table: [
        {
          nft: { collection: number; item: number };
          weight: number;
        }
      ];
    }
  ];
  message: string;
  page: number;
  size: number;
  total: number;
};

export type TypeSwaggerPoolRequest = {
  search: string;
  page: number;
  size: number;
  order_by: 'created_at';
  desc: boolean;
  query: Partial<{
    pool_id: number;
    owner: string;
    type_pool: string;
    admin: string;
    owner_deposit: string;
  }>;
};

// nft
export type TypeSwaggerNFTRequest = {
  search: string;
  page: number;
  size: number;
  order_by: 'created_at';
  desc: boolean;
  query: Partial<{
    name: string;
    token_id: string;
    collection_id: string;
    created_by: string;
    price: string;
    attributes: [
      { key: 'tier'; value: '"King"' },
      { key: 'elo'; value: '2700' }
    ];
  }>;
};

export type TypeSwaggerNFTData = {
  message: string;
  page: number;
  size: number;
  total: number;
  data: [
    {
      animation_url: string;
      attributes: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
      };

      image: string;
      name: string;
      description: string;
      external_url: string;

      collection_id: number;
      created_at: number;
      created_by: string;
      favorite_count: number;
      id: string;

      is_burn: boolean;
      price: string;
      status: string;
      supply: number;
      token_id: string;
      updated_at: number;
      visitor_count: number;
    }
  ];
};
