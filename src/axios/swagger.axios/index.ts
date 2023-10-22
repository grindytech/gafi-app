import axios from 'axios';
import {
  TypeSwaggerNFTData,
  TypeSwaggerNFTRequest,
  TypeSwaggerPoolData,
  TypeSwaggerPoolRequest,
  TypeSwaggerSearchCollectionData,
  TypeSwaggerSearchCollectionRequest,
  TypeSwaggerSearchGameData,
  TypeSwaggerSearchGameRequest,
  TypeSwaggerTradeData,
  TypeSwaggerTradeRequest,
} from 'types/swagger.type';

const create = axios.create({
  baseURL: `http://localhost:8080/api/v1/`,
  // baseURL: `https://mp-api.gafi.network/api/v1/`,
  // baseURL: 'http://192.1.23.21/',
});

const collectionSearch = async ({
  body,
}: {
  body?: Partial<TypeSwaggerSearchCollectionRequest>;
} = {}) => {
  const data = await create.post(`collection/search`, {
    search: '',
    page: 1,
    size: 10,
    order_by: 'created_at',
    desc: true,
    query: {},
    ...body,
  });

  return data.data as TypeSwaggerSearchCollectionData;
};

const gameSearch = async ({
  body,
}: {
  body?: Partial<TypeSwaggerSearchGameRequest>;
} = {}) => {
  const data = await create.post(`game/search`, {
    search: '',
    page: 1,
    size: 10,
    order_by: 'updated_at',
    desc: true,
    query: {},
    ...body,
  });

  return data.data as TypeSwaggerSearchGameData;
};

const tradeSearch = async ({
  body,
}: {
  body?: Partial<TypeSwaggerTradeRequest>;
} = {}) => {
  const data = await create.post(`trade/search`, {
    search: '',
    page: 1,
    size: 10,
    order_by: 'trade_id',
    desc: true,
    query: {},
    ...body,
  });

  return data.data as TypeSwaggerTradeData;
};

const poolSearch = async ({
  body,
}: {
  body?: Partial<TypeSwaggerPoolRequest>;
} = {}) => {
  const data = await create.post(`pool/search`, {
    search: '',
    page: 1,
    size: 10,
    order_by: 'created_at',
    desc: true,
    query: {},
    ...body,
  });

  return data.data as TypeSwaggerPoolData;
};

const nftSearch = async ({
  body,
}: {
  body?: Partial<TypeSwaggerNFTRequest>;
} = {}) => {
  const data = await create.post(`nft/search`, {
    search: '',
    page: 1,
    size: 10,
    order_by: 'created_at',
    desc: true,
    query: {},
    ...body,
  });

  return data.data as TypeSwaggerNFTData;
};

export default {
  create,

  // method
  collectionSearch,
  gameSearch,
  tradeSearch,
  poolSearch,
  nftSearch,
};
