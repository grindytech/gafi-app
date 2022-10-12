import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: any;
  /**
   * A signed eight-byte integer. The upper big integer values are greater than the
   * max value for a JavaScript number. Therefore all big integers will be output as
   * strings and not numbers.
   */
  BigInt: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** The day, does not include a time. */
  Date: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

/** A filter to be used against BigFloat fields. All fields are combined with a logical ‘and.’ */
export type BigFloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['BigFloat']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigFloat']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['BigFloat']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigFloat']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['BigFloat']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['BigFloat']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['BigFloat']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['BigFloat']>>;
};

/** A connection to a list of `BlockEntity` values. */
export type BlockEntitiesConnection = {
  __typename?: 'BlockEntitiesConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<BlockEntityAggregates>;
  /** A list of edges which contains the `BlockEntity` and cursor to aid in pagination. */
  edges: Array<BlockEntitiesEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<BlockEntityAggregates>>;
  /** A list of `BlockEntity` objects. */
  nodes: Array<Maybe<BlockEntity>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `BlockEntity` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `BlockEntity` values. */
export type BlockEntitiesConnectionGroupedAggregatesArgs = {
  groupBy: Array<BlockEntitiesGroupBy>;
  having?: InputMaybe<BlockEntitiesHavingInput>;
};

/** A `BlockEntity` edge in the connection. */
export type BlockEntitiesEdge = {
  __typename?: 'BlockEntitiesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `BlockEntity` at the end of the edge. */
  node?: Maybe<BlockEntity>;
};

/** Grouping methods for `BlockEntity` for usage during aggregation. */
export enum BlockEntitiesGroupBy {
  Field1 = 'FIELD1',
  Field4 = 'FIELD4',
  Field4TruncatedToDay = 'FIELD4_TRUNCATED_TO_DAY',
  Field4TruncatedToHour = 'FIELD4_TRUNCATED_TO_HOUR',
  Field5 = 'FIELD5',
  Field6 = 'FIELD6'
}

export type BlockEntitiesHavingAverageInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

export type BlockEntitiesHavingDistinctCountInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `BlockEntity` aggregates. */
export type BlockEntitiesHavingInput = {
  AND?: InputMaybe<Array<BlockEntitiesHavingInput>>;
  OR?: InputMaybe<Array<BlockEntitiesHavingInput>>;
  average?: InputMaybe<BlockEntitiesHavingAverageInput>;
  distinctCount?: InputMaybe<BlockEntitiesHavingDistinctCountInput>;
  max?: InputMaybe<BlockEntitiesHavingMaxInput>;
  min?: InputMaybe<BlockEntitiesHavingMinInput>;
  stddevPopulation?: InputMaybe<BlockEntitiesHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<BlockEntitiesHavingStddevSampleInput>;
  sum?: InputMaybe<BlockEntitiesHavingSumInput>;
  variancePopulation?: InputMaybe<BlockEntitiesHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<BlockEntitiesHavingVarianceSampleInput>;
};

export type BlockEntitiesHavingMaxInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

export type BlockEntitiesHavingMinInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

export type BlockEntitiesHavingStddevPopulationInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

export type BlockEntitiesHavingStddevSampleInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

export type BlockEntitiesHavingSumInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

export type BlockEntitiesHavingVariancePopulationInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

export type BlockEntitiesHavingVarianceSampleInput = {
  field1?: InputMaybe<HavingIntFilter>;
  field4?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `BlockEntity`. */
export enum BlockEntitiesOrderBy {
  Field1Asc = 'FIELD1_ASC',
  Field1Desc = 'FIELD1_DESC',
  Field4Asc = 'FIELD4_ASC',
  Field4Desc = 'FIELD4_DESC',
  Field5Asc = 'FIELD5_ASC',
  Field5Desc = 'FIELD5_DESC',
  Field6Asc = 'FIELD6_ASC',
  Field6Desc = 'FIELD6_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type BlockEntity = Node & {
  __typename?: 'BlockEntity';
  field1?: Maybe<Scalars['Int']>;
  field4?: Maybe<Scalars['Datetime']>;
  field5?: Maybe<Scalars['Boolean']>;
  field6?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type BlockEntityAggregates = {
  __typename?: 'BlockEntityAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<BlockEntityAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<BlockEntityDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<BlockEntityMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<BlockEntityMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<BlockEntityStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<BlockEntityStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<BlockEntitySumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<BlockEntityVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<BlockEntityVarianceSampleAggregates>;
};

export type BlockEntityAverageAggregates = {
  __typename?: 'BlockEntityAverageAggregates';
  /** Mean average of field1 across the matching connection */
  field1?: Maybe<Scalars['BigFloat']>;
};

export type BlockEntityDistinctCountAggregates = {
  __typename?: 'BlockEntityDistinctCountAggregates';
  /** Distinct count of field1 across the matching connection */
  field1?: Maybe<Scalars['BigInt']>;
  /** Distinct count of field4 across the matching connection */
  field4?: Maybe<Scalars['BigInt']>;
  /** Distinct count of field5 across the matching connection */
  field5?: Maybe<Scalars['BigInt']>;
  /** Distinct count of field6 across the matching connection */
  field6?: Maybe<Scalars['BigInt']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `BlockEntity` object types. All fields are combined with a logical ‘and.’ */
export type BlockEntityFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<BlockEntityFilter>>;
  /** Filter by the object’s `field1` field. */
  field1?: InputMaybe<IntFilter>;
  /** Filter by the object’s `field4` field. */
  field4?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `field5` field. */
  field5?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `field6` field. */
  field6?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<BlockEntityFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<BlockEntityFilter>>;
};

export type BlockEntityMaxAggregates = {
  __typename?: 'BlockEntityMaxAggregates';
  /** Maximum of field1 across the matching connection */
  field1?: Maybe<Scalars['Int']>;
};

export type BlockEntityMinAggregates = {
  __typename?: 'BlockEntityMinAggregates';
  /** Minimum of field1 across the matching connection */
  field1?: Maybe<Scalars['Int']>;
};

export type BlockEntityStddevPopulationAggregates = {
  __typename?: 'BlockEntityStddevPopulationAggregates';
  /** Population standard deviation of field1 across the matching connection */
  field1?: Maybe<Scalars['BigFloat']>;
};

export type BlockEntityStddevSampleAggregates = {
  __typename?: 'BlockEntityStddevSampleAggregates';
  /** Sample standard deviation of field1 across the matching connection */
  field1?: Maybe<Scalars['BigFloat']>;
};

export type BlockEntitySumAggregates = {
  __typename?: 'BlockEntitySumAggregates';
  /** Sum of field1 across the matching connection */
  field1: Scalars['BigInt'];
};

export type BlockEntityVariancePopulationAggregates = {
  __typename?: 'BlockEntityVariancePopulationAggregates';
  /** Population variance of field1 across the matching connection */
  field1?: Maybe<Scalars['BigFloat']>;
};

export type BlockEntityVarianceSampleAggregates = {
  __typename?: 'BlockEntityVarianceSampleAggregates';
  /** Sample variance of field1 across the matching connection */
  field1?: Maybe<Scalars['BigFloat']>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type ClaimedContract = Node & {
  __typename?: 'ClaimedContract';
  /** Reads a single `User` that is related to this `ClaimedContract`. */
  account?: Maybe<User>;
  accountId: Scalars['String'];
  contractAddress: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export type ClaimedContractAggregates = {
  __typename?: 'ClaimedContractAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<ClaimedContractDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']>>;
};

export type ClaimedContractDistinctCountAggregates = {
  __typename?: 'ClaimedContractDistinctCountAggregates';
  /** Distinct count of accountId across the matching connection */
  accountId?: Maybe<Scalars['BigInt']>;
  /** Distinct count of contractAddress across the matching connection */
  contractAddress?: Maybe<Scalars['BigInt']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `ClaimedContract` object types. All fields are combined with a logical ‘and.’ */
export type ClaimedContractFilter = {
  /** Filter by the object’s `accountId` field. */
  accountId?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ClaimedContractFilter>>;
  /** Filter by the object’s `contractAddress` field. */
  contractAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ClaimedContractFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ClaimedContractFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `ClaimedContract` values. */
export type ClaimedContractsConnection = {
  __typename?: 'ClaimedContractsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<ClaimedContractAggregates>;
  /** A list of edges which contains the `ClaimedContract` and cursor to aid in pagination. */
  edges: Array<ClaimedContractsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<ClaimedContractAggregates>>;
  /** A list of `ClaimedContract` objects. */
  nodes: Array<Maybe<ClaimedContract>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ClaimedContract` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `ClaimedContract` values. */
export type ClaimedContractsConnectionGroupedAggregatesArgs = {
  groupBy: Array<ClaimedContractsGroupBy>;
  having?: InputMaybe<ClaimedContractsHavingInput>;
};

/** A `ClaimedContract` edge in the connection. */
export type ClaimedContractsEdge = {
  __typename?: 'ClaimedContractsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ClaimedContract` at the end of the edge. */
  node?: Maybe<ClaimedContract>;
};

/** Grouping methods for `ClaimedContract` for usage during aggregation. */
export enum ClaimedContractsGroupBy {
  AccountId = 'ACCOUNT_ID',
  ContractAddress = 'CONTRACT_ADDRESS',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type ClaimedContractsHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ClaimedContractsHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `ClaimedContract` aggregates. */
export type ClaimedContractsHavingInput = {
  AND?: InputMaybe<Array<ClaimedContractsHavingInput>>;
  OR?: InputMaybe<Array<ClaimedContractsHavingInput>>;
  average?: InputMaybe<ClaimedContractsHavingAverageInput>;
  distinctCount?: InputMaybe<ClaimedContractsHavingDistinctCountInput>;
  max?: InputMaybe<ClaimedContractsHavingMaxInput>;
  min?: InputMaybe<ClaimedContractsHavingMinInput>;
  stddevPopulation?: InputMaybe<ClaimedContractsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<ClaimedContractsHavingStddevSampleInput>;
  sum?: InputMaybe<ClaimedContractsHavingSumInput>;
  variancePopulation?: InputMaybe<ClaimedContractsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<ClaimedContractsHavingVarianceSampleInput>;
};

export type ClaimedContractsHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ClaimedContractsHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ClaimedContractsHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ClaimedContractsHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ClaimedContractsHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ClaimedContractsHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type ClaimedContractsHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `ClaimedContract`. */
export enum ClaimedContractsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  ContractAddressAsc = 'CONTRACT_ADDRESS_ASC',
  ContractAddressDesc = 'CONTRACT_ADDRESS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type CreatedContract = Node & {
  __typename?: 'CreatedContract';
  /** Reads a single `User` that is related to this `CreatedContract`. */
  account?: Maybe<User>;
  accountId: Scalars['String'];
  contractAddress: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export type CreatedContractAggregates = {
  __typename?: 'CreatedContractAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<CreatedContractDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']>>;
};

export type CreatedContractDistinctCountAggregates = {
  __typename?: 'CreatedContractDistinctCountAggregates';
  /** Distinct count of accountId across the matching connection */
  accountId?: Maybe<Scalars['BigInt']>;
  /** Distinct count of contractAddress across the matching connection */
  contractAddress?: Maybe<Scalars['BigInt']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `CreatedContract` object types. All fields are combined with a logical ‘and.’ */
export type CreatedContractFilter = {
  /** Filter by the object’s `accountId` field. */
  accountId?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CreatedContractFilter>>;
  /** Filter by the object’s `contractAddress` field. */
  contractAddress?: InputMaybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CreatedContractFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CreatedContractFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `CreatedContract` values. */
export type CreatedContractsConnection = {
  __typename?: 'CreatedContractsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<CreatedContractAggregates>;
  /** A list of edges which contains the `CreatedContract` and cursor to aid in pagination. */
  edges: Array<CreatedContractsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<CreatedContractAggregates>>;
  /** A list of `CreatedContract` objects. */
  nodes: Array<Maybe<CreatedContract>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CreatedContract` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `CreatedContract` values. */
export type CreatedContractsConnectionGroupedAggregatesArgs = {
  groupBy: Array<CreatedContractsGroupBy>;
  having?: InputMaybe<CreatedContractsHavingInput>;
};

/** A `CreatedContract` edge in the connection. */
export type CreatedContractsEdge = {
  __typename?: 'CreatedContractsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CreatedContract` at the end of the edge. */
  node?: Maybe<CreatedContract>;
};

/** Grouping methods for `CreatedContract` for usage during aggregation. */
export enum CreatedContractsGroupBy {
  AccountId = 'ACCOUNT_ID',
  ContractAddress = 'CONTRACT_ADDRESS',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type CreatedContractsHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CreatedContractsHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `CreatedContract` aggregates. */
export type CreatedContractsHavingInput = {
  AND?: InputMaybe<Array<CreatedContractsHavingInput>>;
  OR?: InputMaybe<Array<CreatedContractsHavingInput>>;
  average?: InputMaybe<CreatedContractsHavingAverageInput>;
  distinctCount?: InputMaybe<CreatedContractsHavingDistinctCountInput>;
  max?: InputMaybe<CreatedContractsHavingMaxInput>;
  min?: InputMaybe<CreatedContractsHavingMinInput>;
  stddevPopulation?: InputMaybe<CreatedContractsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<CreatedContractsHavingStddevSampleInput>;
  sum?: InputMaybe<CreatedContractsHavingSumInput>;
  variancePopulation?: InputMaybe<CreatedContractsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<CreatedContractsHavingVarianceSampleInput>;
};

export type CreatedContractsHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CreatedContractsHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CreatedContractsHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CreatedContractsHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CreatedContractsHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CreatedContractsHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type CreatedContractsHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `CreatedContract`. */
export enum CreatedContractsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  ContractAddressAsc = 'CONTRACT_ADDRESS_ASC',
  ContractAddressDesc = 'CONTRACT_ADDRESS_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
};

export type HavingBigfloatFilter = {
  equalTo?: InputMaybe<Scalars['BigFloat']>;
  greaterThan?: InputMaybe<Scalars['BigFloat']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['BigFloat']>;
  lessThan?: InputMaybe<Scalars['BigFloat']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['BigFloat']>;
  notEqualTo?: InputMaybe<Scalars['BigFloat']>;
};

export type HavingDatetimeFilter = {
  equalTo?: InputMaybe<Scalars['Datetime']>;
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  lessThan?: InputMaybe<Scalars['Datetime']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
};

export type HavingIntFilter = {
  equalTo?: InputMaybe<Scalars['Int']>;
  greaterThan?: InputMaybe<Scalars['Int']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  lessThan?: InputMaybe<Scalars['Int']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  notEqualTo?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Contained by the specified JSON. */
  containedBy?: InputMaybe<Scalars['JSON']>;
  /** Contains the specified JSON. */
  contains?: InputMaybe<Scalars['JSON']>;
  /** Contains all of the specified keys. */
  containsAllKeys?: InputMaybe<Array<Scalars['String']>>;
  /** Contains any of the specified keys. */
  containsAnyKeys?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified key. */
  containsKey?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['JSON']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['JSON']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['JSON']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['JSON']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['JSON']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['JSON']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['JSON']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['JSON']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['JSON']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['JSON']>>;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  _metadata?: Maybe<_Metadata>;
  /** Reads and enables pagination through a set of `BlockEntity`. */
  blockEntities?: Maybe<BlockEntitiesConnection>;
  blockEntity?: Maybe<BlockEntity>;
  /** Reads a single `BlockEntity` using its globally unique `ID`. */
  blockEntityByNodeId?: Maybe<BlockEntity>;
  claimedContract?: Maybe<ClaimedContract>;
  /** Reads a single `ClaimedContract` using its globally unique `ID`. */
  claimedContractByNodeId?: Maybe<ClaimedContract>;
  /** Reads and enables pagination through a set of `ClaimedContract`. */
  claimedContracts?: Maybe<ClaimedContractsConnection>;
  createdContract?: Maybe<CreatedContract>;
  /** Reads a single `CreatedContract` using its globally unique `ID`. */
  createdContractByNodeId?: Maybe<CreatedContract>;
  /** Reads and enables pagination through a set of `CreatedContract`. */
  createdContracts?: Maybe<CreatedContractsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  sponsoredPool?: Maybe<SponsoredPool>;
  /** Reads a single `SponsoredPool` using its globally unique `ID`. */
  sponsoredPoolByNodeId?: Maybe<SponsoredPool>;
  /** Reads and enables pagination through a set of `SponsoredPool`. */
  sponsoredPools?: Maybe<SponsoredPoolsConnection>;
  transfer?: Maybe<Transfer>;
  /** Reads a single `Transfer` using its globally unique `ID`. */
  transferByNodeId?: Maybe<Transfer>;
  /** Reads and enables pagination through a set of `Transfer`. */
  transfers?: Maybe<TransfersConnection>;
  user?: Maybe<User>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
  userJoinedPool?: Maybe<UserJoinedPool>;
  /** Reads a single `UserJoinedPool` using its globally unique `ID`. */
  userJoinedPoolByNodeId?: Maybe<UserJoinedPool>;
  /** Reads and enables pagination through a set of `UserJoinedPool`. */
  userJoinedPools?: Maybe<UserJoinedPoolsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<BlockEntityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BlockEntitiesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockEntityArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBlockEntityByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimedContractArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimedContractByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryClaimedContractsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ClaimedContractFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ClaimedContractsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCreatedContractArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreatedContractByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCreatedContractsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CreatedContractFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CreatedContractsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySponsoredPoolArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySponsoredPoolByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySponsoredPoolsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SponsoredPoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SponsoredPoolsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTransferArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTransferByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTransfersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<TransferFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TransfersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserJoinedPoolArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserJoinedPoolByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserJoinedPoolsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserJoinedPoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserJoinedPoolsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type SponsoredPool = Node & {
  __typename?: 'SponsoredPool';
  amount: Scalars['BigFloat'];
  createdAt?: Maybe<Scalars['Datetime']>;
  discount: Scalars['Int'];
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  poolOwner: Scalars['String'];
  targets: Scalars['JSON'];
  totalUsers: Scalars['Int'];
  txLimit: Scalars['Int'];
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads and enables pagination through a set of `UserJoinedPool`. */
  userJoinedPoolsByPoolId: UserJoinedPoolsConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByUserJoinedPoolPoolIdAndAccountId: SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdManyToManyConnection;
};


export type SponsoredPoolUserJoinedPoolsByPoolIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserJoinedPoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserJoinedPoolsOrderBy>>;
};


export type SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type SponsoredPoolAggregates = {
  __typename?: 'SponsoredPoolAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<SponsoredPoolAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<SponsoredPoolDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<SponsoredPoolMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<SponsoredPoolMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<SponsoredPoolStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<SponsoredPoolStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<SponsoredPoolSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<SponsoredPoolVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<SponsoredPoolVarianceSampleAggregates>;
};

export type SponsoredPoolAverageAggregates = {
  __typename?: 'SponsoredPoolAverageAggregates';
  /** Mean average of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Mean average of discount across the matching connection */
  discount?: Maybe<Scalars['BigFloat']>;
  /** Mean average of totalUsers across the matching connection */
  totalUsers?: Maybe<Scalars['BigFloat']>;
  /** Mean average of txLimit across the matching connection */
  txLimit?: Maybe<Scalars['BigFloat']>;
};

export type SponsoredPoolDistinctCountAggregates = {
  __typename?: 'SponsoredPoolDistinctCountAggregates';
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']>;
  /** Distinct count of discount across the matching connection */
  discount?: Maybe<Scalars['BigInt']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']>;
  /** Distinct count of poolOwner across the matching connection */
  poolOwner?: Maybe<Scalars['BigInt']>;
  /** Distinct count of targets across the matching connection */
  targets?: Maybe<Scalars['BigInt']>;
  /** Distinct count of totalUsers across the matching connection */
  totalUsers?: Maybe<Scalars['BigInt']>;
  /** Distinct count of txLimit across the matching connection */
  txLimit?: Maybe<Scalars['BigInt']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `SponsoredPool` object types. All fields are combined with a logical ‘and.’ */
export type SponsoredPoolFilter = {
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<BigFloatFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SponsoredPoolFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `discount` field. */
  discount?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SponsoredPoolFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SponsoredPoolFilter>>;
  /** Filter by the object’s `poolOwner` field. */
  poolOwner?: InputMaybe<StringFilter>;
  /** Filter by the object’s `targets` field. */
  targets?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `totalUsers` field. */
  totalUsers?: InputMaybe<IntFilter>;
  /** Filter by the object’s `txLimit` field. */
  txLimit?: InputMaybe<IntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type SponsoredPoolMaxAggregates = {
  __typename?: 'SponsoredPoolMaxAggregates';
  /** Maximum of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Maximum of discount across the matching connection */
  discount?: Maybe<Scalars['Int']>;
  /** Maximum of totalUsers across the matching connection */
  totalUsers?: Maybe<Scalars['Int']>;
  /** Maximum of txLimit across the matching connection */
  txLimit?: Maybe<Scalars['Int']>;
};

export type SponsoredPoolMinAggregates = {
  __typename?: 'SponsoredPoolMinAggregates';
  /** Minimum of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Minimum of discount across the matching connection */
  discount?: Maybe<Scalars['Int']>;
  /** Minimum of totalUsers across the matching connection */
  totalUsers?: Maybe<Scalars['Int']>;
  /** Minimum of txLimit across the matching connection */
  txLimit?: Maybe<Scalars['Int']>;
};

export type SponsoredPoolStddevPopulationAggregates = {
  __typename?: 'SponsoredPoolStddevPopulationAggregates';
  /** Population standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of discount across the matching connection */
  discount?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of totalUsers across the matching connection */
  totalUsers?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of txLimit across the matching connection */
  txLimit?: Maybe<Scalars['BigFloat']>;
};

export type SponsoredPoolStddevSampleAggregates = {
  __typename?: 'SponsoredPoolStddevSampleAggregates';
  /** Sample standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of discount across the matching connection */
  discount?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of totalUsers across the matching connection */
  totalUsers?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of txLimit across the matching connection */
  txLimit?: Maybe<Scalars['BigFloat']>;
};

export type SponsoredPoolSumAggregates = {
  __typename?: 'SponsoredPoolSumAggregates';
  /** Sum of amount across the matching connection */
  amount: Scalars['BigFloat'];
  /** Sum of discount across the matching connection */
  discount: Scalars['BigInt'];
  /** Sum of totalUsers across the matching connection */
  totalUsers: Scalars['BigInt'];
  /** Sum of txLimit across the matching connection */
  txLimit: Scalars['BigInt'];
};

/** A connection to a list of `User` values, with data from `UserJoinedPool`. */
export type SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdManyToManyConnection = {
  __typename?: 'SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdManyToManyConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UserAggregates>;
  /** A list of edges which contains the `User`, info from the `UserJoinedPool`, and the cursor to aid in pagination. */
  edges: Array<SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UserAggregates>>;
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `User` values, with data from `UserJoinedPool`. */
export type SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdManyToManyConnectionGroupedAggregatesArgs = {
  groupBy: Array<UsersGroupBy>;
  having?: InputMaybe<UsersHavingInput>;
};

/** A `User` edge in the connection, with data from `UserJoinedPool`. */
export type SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdManyToManyEdge = {
  __typename?: 'SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserJoinedPool`. */
  userJoinedPoolsByAccountId: UserJoinedPoolsConnection;
};


/** A `User` edge in the connection, with data from `UserJoinedPool`. */
export type SponsoredPoolUsersByUserJoinedPoolPoolIdAndAccountIdManyToManyEdgeUserJoinedPoolsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserJoinedPoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserJoinedPoolsOrderBy>>;
};

export type SponsoredPoolVariancePopulationAggregates = {
  __typename?: 'SponsoredPoolVariancePopulationAggregates';
  /** Population variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Population variance of discount across the matching connection */
  discount?: Maybe<Scalars['BigFloat']>;
  /** Population variance of totalUsers across the matching connection */
  totalUsers?: Maybe<Scalars['BigFloat']>;
  /** Population variance of txLimit across the matching connection */
  txLimit?: Maybe<Scalars['BigFloat']>;
};

export type SponsoredPoolVarianceSampleAggregates = {
  __typename?: 'SponsoredPoolVarianceSampleAggregates';
  /** Sample variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of discount across the matching connection */
  discount?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of totalUsers across the matching connection */
  totalUsers?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of txLimit across the matching connection */
  txLimit?: Maybe<Scalars['BigFloat']>;
};

/** A connection to a list of `SponsoredPool` values. */
export type SponsoredPoolsConnection = {
  __typename?: 'SponsoredPoolsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<SponsoredPoolAggregates>;
  /** A list of edges which contains the `SponsoredPool` and cursor to aid in pagination. */
  edges: Array<SponsoredPoolsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<SponsoredPoolAggregates>>;
  /** A list of `SponsoredPool` objects. */
  nodes: Array<Maybe<SponsoredPool>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SponsoredPool` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `SponsoredPool` values. */
export type SponsoredPoolsConnectionGroupedAggregatesArgs = {
  groupBy: Array<SponsoredPoolsGroupBy>;
  having?: InputMaybe<SponsoredPoolsHavingInput>;
};

/** A `SponsoredPool` edge in the connection. */
export type SponsoredPoolsEdge = {
  __typename?: 'SponsoredPoolsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SponsoredPool` at the end of the edge. */
  node?: Maybe<SponsoredPool>;
};

/** Grouping methods for `SponsoredPool` for usage during aggregation. */
export enum SponsoredPoolsGroupBy {
  Amount = 'AMOUNT',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  Discount = 'DISCOUNT',
  PoolOwner = 'POOL_OWNER',
  Targets = 'TARGETS',
  TotalUsers = 'TOTAL_USERS',
  TxLimit = 'TX_LIMIT',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type SponsoredPoolsHavingAverageInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SponsoredPoolsHavingDistinctCountInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `SponsoredPool` aggregates. */
export type SponsoredPoolsHavingInput = {
  AND?: InputMaybe<Array<SponsoredPoolsHavingInput>>;
  OR?: InputMaybe<Array<SponsoredPoolsHavingInput>>;
  average?: InputMaybe<SponsoredPoolsHavingAverageInput>;
  distinctCount?: InputMaybe<SponsoredPoolsHavingDistinctCountInput>;
  max?: InputMaybe<SponsoredPoolsHavingMaxInput>;
  min?: InputMaybe<SponsoredPoolsHavingMinInput>;
  stddevPopulation?: InputMaybe<SponsoredPoolsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<SponsoredPoolsHavingStddevSampleInput>;
  sum?: InputMaybe<SponsoredPoolsHavingSumInput>;
  variancePopulation?: InputMaybe<SponsoredPoolsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<SponsoredPoolsHavingVarianceSampleInput>;
};

export type SponsoredPoolsHavingMaxInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SponsoredPoolsHavingMinInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SponsoredPoolsHavingStddevPopulationInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SponsoredPoolsHavingStddevSampleInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SponsoredPoolsHavingSumInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SponsoredPoolsHavingVariancePopulationInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type SponsoredPoolsHavingVarianceSampleInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  discount?: InputMaybe<HavingIntFilter>;
  totalUsers?: InputMaybe<HavingIntFilter>;
  txLimit?: InputMaybe<HavingIntFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `SponsoredPool`. */
export enum SponsoredPoolsOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DiscountAsc = 'DISCOUNT_ASC',
  DiscountDesc = 'DISCOUNT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PoolOwnerAsc = 'POOL_OWNER_ASC',
  PoolOwnerDesc = 'POOL_OWNER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TargetsAsc = 'TARGETS_ASC',
  TargetsDesc = 'TARGETS_DESC',
  TotalUsersAsc = 'TOTAL_USERS_ASC',
  TotalUsersDesc = 'TOTAL_USERS_DESC',
  TxLimitAsc = 'TX_LIMIT_ASC',
  TxLimitDesc = 'TX_LIMIT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdAverageAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdAverageAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdAverageCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdAverageCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdAverageIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_ID_ASC',
  UserJoinedPoolsByPoolIdAverageIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_ID_DESC',
  UserJoinedPoolsByPoolIdAveragePoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdAveragePoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdAverageUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdAverageUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_AVERAGE_UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdCountAsc = 'USER_JOINED_POOLS_BY_POOL_ID_COUNT_ASC',
  UserJoinedPoolsByPoolIdCountDesc = 'USER_JOINED_POOLS_BY_POOL_ID_COUNT_DESC',
  UserJoinedPoolsByPoolIdDistinctCountAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdDistinctCountAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdDistinctCountCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdDistinctCountCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdDistinctCountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_ID_ASC',
  UserJoinedPoolsByPoolIdDistinctCountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_ID_DESC',
  UserJoinedPoolsByPoolIdDistinctCountPoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdDistinctCountPoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdDistinctCountUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdDistinctCountUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdMaxAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdMaxAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdMaxCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdMaxCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdMaxIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_ID_ASC',
  UserJoinedPoolsByPoolIdMaxIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_ID_DESC',
  UserJoinedPoolsByPoolIdMaxPoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdMaxPoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdMaxUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdMaxUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MAX_UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdMinAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdMinAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdMinCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdMinCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdMinIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_ID_ASC',
  UserJoinedPoolsByPoolIdMinIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_ID_DESC',
  UserJoinedPoolsByPoolIdMinPoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdMinPoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdMinUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdMinUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_MIN_UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdStddevPopulationAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdStddevPopulationAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdStddevPopulationCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdStddevPopulationCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdStddevPopulationIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_ID_ASC',
  UserJoinedPoolsByPoolIdStddevPopulationIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_ID_DESC',
  UserJoinedPoolsByPoolIdStddevPopulationPoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdStddevPopulationPoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdStddevPopulationUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdStddevPopulationUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_POPULATION_UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdStddevSampleAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdStddevSampleAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdStddevSampleCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdStddevSampleCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdStddevSampleIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_ID_ASC',
  UserJoinedPoolsByPoolIdStddevSampleIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_ID_DESC',
  UserJoinedPoolsByPoolIdStddevSamplePoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdStddevSamplePoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdStddevSampleUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdStddevSampleUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_STDDEV_SAMPLE_UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdSumAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdSumAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdSumCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdSumCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdSumIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_ID_ASC',
  UserJoinedPoolsByPoolIdSumIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_ID_DESC',
  UserJoinedPoolsByPoolIdSumPoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdSumPoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdSumUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdSumUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_SUM_UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdVariancePopulationAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdVariancePopulationAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdVariancePopulationCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdVariancePopulationCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdVariancePopulationIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_ID_ASC',
  UserJoinedPoolsByPoolIdVariancePopulationIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_ID_DESC',
  UserJoinedPoolsByPoolIdVariancePopulationPoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdVariancePopulationPoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdVariancePopulationUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdVariancePopulationUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_POPULATION_UPDATED_AT_DESC',
  UserJoinedPoolsByPoolIdVarianceSampleAccountIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_ACCOUNT_ID_ASC',
  UserJoinedPoolsByPoolIdVarianceSampleAccountIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_ACCOUNT_ID_DESC',
  UserJoinedPoolsByPoolIdVarianceSampleCreatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_CREATED_AT_ASC',
  UserJoinedPoolsByPoolIdVarianceSampleCreatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_CREATED_AT_DESC',
  UserJoinedPoolsByPoolIdVarianceSampleIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_ID_ASC',
  UserJoinedPoolsByPoolIdVarianceSampleIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_ID_DESC',
  UserJoinedPoolsByPoolIdVarianceSamplePoolIdAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_POOL_ID_ASC',
  UserJoinedPoolsByPoolIdVarianceSamplePoolIdDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_POOL_ID_DESC',
  UserJoinedPoolsByPoolIdVarianceSampleUpdatedAtAsc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_UPDATED_AT_ASC',
  UserJoinedPoolsByPoolIdVarianceSampleUpdatedAtDesc = 'USER_JOINED_POOLS_BY_POOL_ID_VARIANCE_SAMPLE_UPDATED_AT_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']>;
};

export type TableEstimate = {
  __typename?: 'TableEstimate';
  estimate?: Maybe<Scalars['Int']>;
  table?: Maybe<Scalars['String']>;
};

export type Transfer = Node & {
  __typename?: 'Transfer';
  amount: Scalars['BigFloat'];
  blockNumber: Scalars['BigFloat'];
  from: Scalars['String'];
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  to: Scalars['String'];
};

export type TransferAggregates = {
  __typename?: 'TransferAggregates';
  /** Mean average aggregates across the matching connection (ignoring before/after/first/last/offset) */
  average?: Maybe<TransferAverageAggregates>;
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<TransferDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']>>;
  /** Maximum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  max?: Maybe<TransferMaxAggregates>;
  /** Minimum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  min?: Maybe<TransferMinAggregates>;
  /** Population standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevPopulation?: Maybe<TransferStddevPopulationAggregates>;
  /** Sample standard deviation aggregates across the matching connection (ignoring before/after/first/last/offset) */
  stddevSample?: Maybe<TransferStddevSampleAggregates>;
  /** Sum aggregates across the matching connection (ignoring before/after/first/last/offset) */
  sum?: Maybe<TransferSumAggregates>;
  /** Population variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  variancePopulation?: Maybe<TransferVariancePopulationAggregates>;
  /** Sample variance aggregates across the matching connection (ignoring before/after/first/last/offset) */
  varianceSample?: Maybe<TransferVarianceSampleAggregates>;
};

export type TransferAverageAggregates = {
  __typename?: 'TransferAverageAggregates';
  /** Mean average of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Mean average of blockNumber across the matching connection */
  blockNumber?: Maybe<Scalars['BigFloat']>;
};

export type TransferDistinctCountAggregates = {
  __typename?: 'TransferDistinctCountAggregates';
  /** Distinct count of amount across the matching connection */
  amount?: Maybe<Scalars['BigInt']>;
  /** Distinct count of blockNumber across the matching connection */
  blockNumber?: Maybe<Scalars['BigInt']>;
  /** Distinct count of from across the matching connection */
  from?: Maybe<Scalars['BigInt']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']>;
  /** Distinct count of to across the matching connection */
  to?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `Transfer` object types. All fields are combined with a logical ‘and.’ */
export type TransferFilter = {
  /** Filter by the object’s `amount` field. */
  amount?: InputMaybe<BigFloatFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TransferFilter>>;
  /** Filter by the object’s `blockNumber` field. */
  blockNumber?: InputMaybe<BigFloatFilter>;
  /** Filter by the object’s `from` field. */
  from?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TransferFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TransferFilter>>;
  /** Filter by the object’s `to` field. */
  to?: InputMaybe<StringFilter>;
};

export type TransferMaxAggregates = {
  __typename?: 'TransferMaxAggregates';
  /** Maximum of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Maximum of blockNumber across the matching connection */
  blockNumber?: Maybe<Scalars['BigFloat']>;
};

export type TransferMinAggregates = {
  __typename?: 'TransferMinAggregates';
  /** Minimum of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Minimum of blockNumber across the matching connection */
  blockNumber?: Maybe<Scalars['BigFloat']>;
};

export type TransferStddevPopulationAggregates = {
  __typename?: 'TransferStddevPopulationAggregates';
  /** Population standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Population standard deviation of blockNumber across the matching connection */
  blockNumber?: Maybe<Scalars['BigFloat']>;
};

export type TransferStddevSampleAggregates = {
  __typename?: 'TransferStddevSampleAggregates';
  /** Sample standard deviation of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Sample standard deviation of blockNumber across the matching connection */
  blockNumber?: Maybe<Scalars['BigFloat']>;
};

export type TransferSumAggregates = {
  __typename?: 'TransferSumAggregates';
  /** Sum of amount across the matching connection */
  amount: Scalars['BigFloat'];
  /** Sum of blockNumber across the matching connection */
  blockNumber: Scalars['BigFloat'];
};

export type TransferVariancePopulationAggregates = {
  __typename?: 'TransferVariancePopulationAggregates';
  /** Population variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Population variance of blockNumber across the matching connection */
  blockNumber?: Maybe<Scalars['BigFloat']>;
};

export type TransferVarianceSampleAggregates = {
  __typename?: 'TransferVarianceSampleAggregates';
  /** Sample variance of amount across the matching connection */
  amount?: Maybe<Scalars['BigFloat']>;
  /** Sample variance of blockNumber across the matching connection */
  blockNumber?: Maybe<Scalars['BigFloat']>;
};

/** A connection to a list of `Transfer` values. */
export type TransfersConnection = {
  __typename?: 'TransfersConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<TransferAggregates>;
  /** A list of edges which contains the `Transfer` and cursor to aid in pagination. */
  edges: Array<TransfersEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<TransferAggregates>>;
  /** A list of `Transfer` objects. */
  nodes: Array<Maybe<Transfer>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Transfer` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `Transfer` values. */
export type TransfersConnectionGroupedAggregatesArgs = {
  groupBy: Array<TransfersGroupBy>;
  having?: InputMaybe<TransfersHavingInput>;
};

/** A `Transfer` edge in the connection. */
export type TransfersEdge = {
  __typename?: 'TransfersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Transfer` at the end of the edge. */
  node?: Maybe<Transfer>;
};

/** Grouping methods for `Transfer` for usage during aggregation. */
export enum TransfersGroupBy {
  Amount = 'AMOUNT',
  BlockNumber = 'BLOCK_NUMBER',
  From = 'FROM',
  To = 'TO'
}

export type TransfersHavingAverageInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

export type TransfersHavingDistinctCountInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

/** Conditions for `Transfer` aggregates. */
export type TransfersHavingInput = {
  AND?: InputMaybe<Array<TransfersHavingInput>>;
  OR?: InputMaybe<Array<TransfersHavingInput>>;
  average?: InputMaybe<TransfersHavingAverageInput>;
  distinctCount?: InputMaybe<TransfersHavingDistinctCountInput>;
  max?: InputMaybe<TransfersHavingMaxInput>;
  min?: InputMaybe<TransfersHavingMinInput>;
  stddevPopulation?: InputMaybe<TransfersHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<TransfersHavingStddevSampleInput>;
  sum?: InputMaybe<TransfersHavingSumInput>;
  variancePopulation?: InputMaybe<TransfersHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<TransfersHavingVarianceSampleInput>;
};

export type TransfersHavingMaxInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

export type TransfersHavingMinInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

export type TransfersHavingStddevPopulationInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

export type TransfersHavingStddevSampleInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

export type TransfersHavingSumInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

export type TransfersHavingVariancePopulationInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

export type TransfersHavingVarianceSampleInput = {
  amount?: InputMaybe<HavingBigfloatFilter>;
  blockNumber?: InputMaybe<HavingBigfloatFilter>;
};

/** Methods to use when ordering `Transfer`. */
export enum TransfersOrderBy {
  AmountAsc = 'AMOUNT_ASC',
  AmountDesc = 'AMOUNT_DESC',
  BlockNumberAsc = 'BLOCK_NUMBER_ASC',
  BlockNumberDesc = 'BLOCK_NUMBER_DESC',
  FromAsc = 'FROM_ASC',
  FromDesc = 'FROM_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ToAsc = 'TO_ASC',
  ToDesc = 'TO_DESC'
}

export type User = Node & {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `ClaimedContract`. */
  claimedContractsByAccountId: ClaimedContractsConnection;
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Reads and enables pagination through a set of `CreatedContract`. */
  createdContractsByAccountId: CreatedContractsConnection;
  h160Address?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `SponsoredPool`. */
  sponsoredPoolsByUserJoinedPoolAccountIdAndPoolId: UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdManyToManyConnection;
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads and enables pagination through a set of `UserJoinedPool`. */
  userJoinedPoolsByAccountId: UserJoinedPoolsConnection;
};


export type UserClaimedContractsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<ClaimedContractFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ClaimedContractsOrderBy>>;
};


export type UserCreatedContractsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<CreatedContractFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CreatedContractsOrderBy>>;
};


export type UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SponsoredPoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SponsoredPoolsOrderBy>>;
};


export type UserUserJoinedPoolsByAccountIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserJoinedPoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserJoinedPoolsOrderBy>>;
};

export type UserAggregates = {
  __typename?: 'UserAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<UserDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']>>;
};

export type UserDistinctCountAggregates = {
  __typename?: 'UserDistinctCountAggregates';
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']>;
  /** Distinct count of h160Address across the matching connection */
  h160Address?: Maybe<Scalars['BigInt']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `h160Address` field. */
  h160Address?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type UserJoinedPool = Node & {
  __typename?: 'UserJoinedPool';
  /** Reads a single `User` that is related to this `UserJoinedPool`. */
  account?: Maybe<User>;
  accountId: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `SponsoredPool` that is related to this `UserJoinedPool`. */
  pool?: Maybe<SponsoredPool>;
  poolId: Scalars['String'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export type UserJoinedPoolAggregates = {
  __typename?: 'UserJoinedPoolAggregates';
  /** Distinct count aggregates across the matching connection (ignoring before/after/first/last/offset) */
  distinctCount?: Maybe<UserJoinedPoolDistinctCountAggregates>;
  keys?: Maybe<Array<Scalars['String']>>;
};

export type UserJoinedPoolDistinctCountAggregates = {
  __typename?: 'UserJoinedPoolDistinctCountAggregates';
  /** Distinct count of accountId across the matching connection */
  accountId?: Maybe<Scalars['BigInt']>;
  /** Distinct count of createdAt across the matching connection */
  createdAt?: Maybe<Scalars['BigInt']>;
  /** Distinct count of id across the matching connection */
  id?: Maybe<Scalars['BigInt']>;
  /** Distinct count of poolId across the matching connection */
  poolId?: Maybe<Scalars['BigInt']>;
  /** Distinct count of updatedAt across the matching connection */
  updatedAt?: Maybe<Scalars['BigInt']>;
};

/** A filter to be used against `UserJoinedPool` object types. All fields are combined with a logical ‘and.’ */
export type UserJoinedPoolFilter = {
  /** Filter by the object’s `accountId` field. */
  accountId?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserJoinedPoolFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserJoinedPoolFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserJoinedPoolFilter>>;
  /** Filter by the object’s `poolId` field. */
  poolId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** A connection to a list of `UserJoinedPool` values. */
export type UserJoinedPoolsConnection = {
  __typename?: 'UserJoinedPoolsConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UserJoinedPoolAggregates>;
  /** A list of edges which contains the `UserJoinedPool` and cursor to aid in pagination. */
  edges: Array<UserJoinedPoolsEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UserJoinedPoolAggregates>>;
  /** A list of `UserJoinedPool` objects. */
  nodes: Array<Maybe<UserJoinedPool>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserJoinedPool` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `UserJoinedPool` values. */
export type UserJoinedPoolsConnectionGroupedAggregatesArgs = {
  groupBy: Array<UserJoinedPoolsGroupBy>;
  having?: InputMaybe<UserJoinedPoolsHavingInput>;
};

/** A `UserJoinedPool` edge in the connection. */
export type UserJoinedPoolsEdge = {
  __typename?: 'UserJoinedPoolsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserJoinedPool` at the end of the edge. */
  node?: Maybe<UserJoinedPool>;
};

/** Grouping methods for `UserJoinedPool` for usage during aggregation. */
export enum UserJoinedPoolsGroupBy {
  AccountId = 'ACCOUNT_ID',
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  PoolId = 'POOL_ID',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type UserJoinedPoolsHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserJoinedPoolsHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `UserJoinedPool` aggregates. */
export type UserJoinedPoolsHavingInput = {
  AND?: InputMaybe<Array<UserJoinedPoolsHavingInput>>;
  OR?: InputMaybe<Array<UserJoinedPoolsHavingInput>>;
  average?: InputMaybe<UserJoinedPoolsHavingAverageInput>;
  distinctCount?: InputMaybe<UserJoinedPoolsHavingDistinctCountInput>;
  max?: InputMaybe<UserJoinedPoolsHavingMaxInput>;
  min?: InputMaybe<UserJoinedPoolsHavingMinInput>;
  stddevPopulation?: InputMaybe<UserJoinedPoolsHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<UserJoinedPoolsHavingStddevSampleInput>;
  sum?: InputMaybe<UserJoinedPoolsHavingSumInput>;
  variancePopulation?: InputMaybe<UserJoinedPoolsHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<UserJoinedPoolsHavingVarianceSampleInput>;
};

export type UserJoinedPoolsHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserJoinedPoolsHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserJoinedPoolsHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserJoinedPoolsHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserJoinedPoolsHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserJoinedPoolsHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UserJoinedPoolsHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `UserJoinedPool`. */
export enum UserJoinedPoolsOrderBy {
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PoolIdAsc = 'POOL_ID_ASC',
  PoolIdDesc = 'POOL_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A connection to a list of `SponsoredPool` values, with data from `UserJoinedPool`. */
export type UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdManyToManyConnection = {
  __typename?: 'UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdManyToManyConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<SponsoredPoolAggregates>;
  /** A list of edges which contains the `SponsoredPool`, info from the `UserJoinedPool`, and the cursor to aid in pagination. */
  edges: Array<UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdManyToManyEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<SponsoredPoolAggregates>>;
  /** A list of `SponsoredPool` objects. */
  nodes: Array<Maybe<SponsoredPool>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SponsoredPool` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `SponsoredPool` values, with data from `UserJoinedPool`. */
export type UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdManyToManyConnectionGroupedAggregatesArgs = {
  groupBy: Array<SponsoredPoolsGroupBy>;
  having?: InputMaybe<SponsoredPoolsHavingInput>;
};

/** A `SponsoredPool` edge in the connection, with data from `UserJoinedPool`. */
export type UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdManyToManyEdge = {
  __typename?: 'UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SponsoredPool` at the end of the edge. */
  node?: Maybe<SponsoredPool>;
  /** Reads and enables pagination through a set of `UserJoinedPool`. */
  userJoinedPoolsByPoolId: UserJoinedPoolsConnection;
};


/** A `SponsoredPool` edge in the connection, with data from `UserJoinedPool`. */
export type UserSponsoredPoolsByUserJoinedPoolAccountIdAndPoolIdManyToManyEdgeUserJoinedPoolsByPoolIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<UserJoinedPoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserJoinedPoolsOrderBy>>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** Aggregates across the matching connection (ignoring before/after/first/last/offset) */
  aggregates?: Maybe<UserAggregates>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** Grouped aggregates across the matching connection (ignoring before/after/first/last/offset) */
  groupedAggregates?: Maybe<Array<UserAggregates>>;
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};


/** A connection to a list of `User` values. */
export type UsersConnectionGroupedAggregatesArgs = {
  groupBy: Array<UsersGroupBy>;
  having?: InputMaybe<UsersHavingInput>;
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Grouping methods for `User` for usage during aggregation. */
export enum UsersGroupBy {
  CreatedAt = 'CREATED_AT',
  CreatedAtTruncatedToDay = 'CREATED_AT_TRUNCATED_TO_DAY',
  CreatedAtTruncatedToHour = 'CREATED_AT_TRUNCATED_TO_HOUR',
  H160Address = 'H160_ADDRESS',
  UpdatedAt = 'UPDATED_AT',
  UpdatedAtTruncatedToDay = 'UPDATED_AT_TRUNCATED_TO_DAY',
  UpdatedAtTruncatedToHour = 'UPDATED_AT_TRUNCATED_TO_HOUR'
}

export type UsersHavingAverageInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UsersHavingDistinctCountInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Conditions for `User` aggregates. */
export type UsersHavingInput = {
  AND?: InputMaybe<Array<UsersHavingInput>>;
  OR?: InputMaybe<Array<UsersHavingInput>>;
  average?: InputMaybe<UsersHavingAverageInput>;
  distinctCount?: InputMaybe<UsersHavingDistinctCountInput>;
  max?: InputMaybe<UsersHavingMaxInput>;
  min?: InputMaybe<UsersHavingMinInput>;
  stddevPopulation?: InputMaybe<UsersHavingStddevPopulationInput>;
  stddevSample?: InputMaybe<UsersHavingStddevSampleInput>;
  sum?: InputMaybe<UsersHavingSumInput>;
  variancePopulation?: InputMaybe<UsersHavingVariancePopulationInput>;
  varianceSample?: InputMaybe<UsersHavingVarianceSampleInput>;
};

export type UsersHavingMaxInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UsersHavingMinInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UsersHavingStddevPopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UsersHavingStddevSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UsersHavingSumInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UsersHavingVariancePopulationInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

export type UsersHavingVarianceSampleInput = {
  createdAt?: InputMaybe<HavingDatetimeFilter>;
  updatedAt?: InputMaybe<HavingDatetimeFilter>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  ClaimedContractsByAccountIdAverageAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdAverageAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdAverageContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdAverageContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdAverageCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_CREATED_AT_ASC',
  ClaimedContractsByAccountIdAverageCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_CREATED_AT_DESC',
  ClaimedContractsByAccountIdAverageIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_ID_ASC',
  ClaimedContractsByAccountIdAverageIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_ID_DESC',
  ClaimedContractsByAccountIdAverageUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdAverageUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_UPDATED_AT_DESC',
  ClaimedContractsByAccountIdCountAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_COUNT_ASC',
  ClaimedContractsByAccountIdCountDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_COUNT_DESC',
  ClaimedContractsByAccountIdDistinctCountAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdDistinctCountAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdDistinctCountContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdDistinctCountContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdDistinctCountCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  ClaimedContractsByAccountIdDistinctCountCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  ClaimedContractsByAccountIdDistinctCountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_ID_ASC',
  ClaimedContractsByAccountIdDistinctCountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_ID_DESC',
  ClaimedContractsByAccountIdDistinctCountUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdDistinctCountUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  ClaimedContractsByAccountIdMaxAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdMaxAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdMaxContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdMaxContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdMaxCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_CREATED_AT_ASC',
  ClaimedContractsByAccountIdMaxCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_CREATED_AT_DESC',
  ClaimedContractsByAccountIdMaxIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_ID_ASC',
  ClaimedContractsByAccountIdMaxIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_ID_DESC',
  ClaimedContractsByAccountIdMaxUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdMaxUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MAX_UPDATED_AT_DESC',
  ClaimedContractsByAccountIdMinAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdMinAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdMinContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdMinContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdMinCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_CREATED_AT_ASC',
  ClaimedContractsByAccountIdMinCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_CREATED_AT_DESC',
  ClaimedContractsByAccountIdMinIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_ID_ASC',
  ClaimedContractsByAccountIdMinIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_ID_DESC',
  ClaimedContractsByAccountIdMinUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdMinUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_MIN_UPDATED_AT_DESC',
  ClaimedContractsByAccountIdStddevPopulationAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdStddevPopulationAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdStddevPopulationContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdStddevPopulationContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdStddevPopulationCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_CREATED_AT_ASC',
  ClaimedContractsByAccountIdStddevPopulationCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_CREATED_AT_DESC',
  ClaimedContractsByAccountIdStddevPopulationIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_ID_ASC',
  ClaimedContractsByAccountIdStddevPopulationIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_ID_DESC',
  ClaimedContractsByAccountIdStddevPopulationUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdStddevPopulationUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_UPDATED_AT_DESC',
  ClaimedContractsByAccountIdStddevSampleAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdStddevSampleAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdStddevSampleContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdStddevSampleContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdStddevSampleCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CREATED_AT_ASC',
  ClaimedContractsByAccountIdStddevSampleCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CREATED_AT_DESC',
  ClaimedContractsByAccountIdStddevSampleIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ID_ASC',
  ClaimedContractsByAccountIdStddevSampleIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ID_DESC',
  ClaimedContractsByAccountIdStddevSampleUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdStddevSampleUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_UPDATED_AT_DESC',
  ClaimedContractsByAccountIdSumAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdSumAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdSumContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdSumContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdSumCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_CREATED_AT_ASC',
  ClaimedContractsByAccountIdSumCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_CREATED_AT_DESC',
  ClaimedContractsByAccountIdSumIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_ID_ASC',
  ClaimedContractsByAccountIdSumIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_ID_DESC',
  ClaimedContractsByAccountIdSumUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdSumUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_SUM_UPDATED_AT_DESC',
  ClaimedContractsByAccountIdVariancePopulationAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdVariancePopulationAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdVariancePopulationContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdVariancePopulationContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdVariancePopulationCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CREATED_AT_ASC',
  ClaimedContractsByAccountIdVariancePopulationCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CREATED_AT_DESC',
  ClaimedContractsByAccountIdVariancePopulationIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ID_ASC',
  ClaimedContractsByAccountIdVariancePopulationIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ID_DESC',
  ClaimedContractsByAccountIdVariancePopulationUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdVariancePopulationUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_UPDATED_AT_DESC',
  ClaimedContractsByAccountIdVarianceSampleAccountIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ACCOUNT_ID_ASC',
  ClaimedContractsByAccountIdVarianceSampleAccountIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ACCOUNT_ID_DESC',
  ClaimedContractsByAccountIdVarianceSampleContractAddressAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CONTRACT_ADDRESS_ASC',
  ClaimedContractsByAccountIdVarianceSampleContractAddressDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CONTRACT_ADDRESS_DESC',
  ClaimedContractsByAccountIdVarianceSampleCreatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CREATED_AT_ASC',
  ClaimedContractsByAccountIdVarianceSampleCreatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CREATED_AT_DESC',
  ClaimedContractsByAccountIdVarianceSampleIdAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ID_ASC',
  ClaimedContractsByAccountIdVarianceSampleIdDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ID_DESC',
  ClaimedContractsByAccountIdVarianceSampleUpdatedAtAsc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_UPDATED_AT_ASC',
  ClaimedContractsByAccountIdVarianceSampleUpdatedAtDesc = 'CLAIMED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_UPDATED_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  CreatedContractsByAccountIdAverageAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdAverageAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdAverageContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdAverageContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdAverageCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_CREATED_AT_ASC',
  CreatedContractsByAccountIdAverageCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_CREATED_AT_DESC',
  CreatedContractsByAccountIdAverageIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_ID_ASC',
  CreatedContractsByAccountIdAverageIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_ID_DESC',
  CreatedContractsByAccountIdAverageUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_UPDATED_AT_ASC',
  CreatedContractsByAccountIdAverageUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_AVERAGE_UPDATED_AT_DESC',
  CreatedContractsByAccountIdCountAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_COUNT_ASC',
  CreatedContractsByAccountIdCountDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_COUNT_DESC',
  CreatedContractsByAccountIdDistinctCountAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdDistinctCountAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdDistinctCountContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdDistinctCountContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdDistinctCountCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  CreatedContractsByAccountIdDistinctCountCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  CreatedContractsByAccountIdDistinctCountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_ID_ASC',
  CreatedContractsByAccountIdDistinctCountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_ID_DESC',
  CreatedContractsByAccountIdDistinctCountUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  CreatedContractsByAccountIdDistinctCountUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  CreatedContractsByAccountIdMaxAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdMaxAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdMaxContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdMaxContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdMaxCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_CREATED_AT_ASC',
  CreatedContractsByAccountIdMaxCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_CREATED_AT_DESC',
  CreatedContractsByAccountIdMaxIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_ID_ASC',
  CreatedContractsByAccountIdMaxIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_ID_DESC',
  CreatedContractsByAccountIdMaxUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_UPDATED_AT_ASC',
  CreatedContractsByAccountIdMaxUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MAX_UPDATED_AT_DESC',
  CreatedContractsByAccountIdMinAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdMinAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdMinContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdMinContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdMinCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_CREATED_AT_ASC',
  CreatedContractsByAccountIdMinCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_CREATED_AT_DESC',
  CreatedContractsByAccountIdMinIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_ID_ASC',
  CreatedContractsByAccountIdMinIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_ID_DESC',
  CreatedContractsByAccountIdMinUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_UPDATED_AT_ASC',
  CreatedContractsByAccountIdMinUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_MIN_UPDATED_AT_DESC',
  CreatedContractsByAccountIdStddevPopulationAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdStddevPopulationAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdStddevPopulationContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdStddevPopulationContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdStddevPopulationCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_CREATED_AT_ASC',
  CreatedContractsByAccountIdStddevPopulationCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_CREATED_AT_DESC',
  CreatedContractsByAccountIdStddevPopulationIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_ID_ASC',
  CreatedContractsByAccountIdStddevPopulationIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_ID_DESC',
  CreatedContractsByAccountIdStddevPopulationUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_UPDATED_AT_ASC',
  CreatedContractsByAccountIdStddevPopulationUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_POPULATION_UPDATED_AT_DESC',
  CreatedContractsByAccountIdStddevSampleAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdStddevSampleAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdStddevSampleContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdStddevSampleContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdStddevSampleCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CREATED_AT_ASC',
  CreatedContractsByAccountIdStddevSampleCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CREATED_AT_DESC',
  CreatedContractsByAccountIdStddevSampleIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ID_ASC',
  CreatedContractsByAccountIdStddevSampleIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ID_DESC',
  CreatedContractsByAccountIdStddevSampleUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_UPDATED_AT_ASC',
  CreatedContractsByAccountIdStddevSampleUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_STDDEV_SAMPLE_UPDATED_AT_DESC',
  CreatedContractsByAccountIdSumAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdSumAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdSumContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdSumContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdSumCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_CREATED_AT_ASC',
  CreatedContractsByAccountIdSumCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_CREATED_AT_DESC',
  CreatedContractsByAccountIdSumIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_ID_ASC',
  CreatedContractsByAccountIdSumIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_ID_DESC',
  CreatedContractsByAccountIdSumUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_UPDATED_AT_ASC',
  CreatedContractsByAccountIdSumUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_SUM_UPDATED_AT_DESC',
  CreatedContractsByAccountIdVariancePopulationAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdVariancePopulationAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdVariancePopulationContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdVariancePopulationContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdVariancePopulationCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CREATED_AT_ASC',
  CreatedContractsByAccountIdVariancePopulationCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CREATED_AT_DESC',
  CreatedContractsByAccountIdVariancePopulationIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ID_ASC',
  CreatedContractsByAccountIdVariancePopulationIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ID_DESC',
  CreatedContractsByAccountIdVariancePopulationUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_UPDATED_AT_ASC',
  CreatedContractsByAccountIdVariancePopulationUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_POPULATION_UPDATED_AT_DESC',
  CreatedContractsByAccountIdVarianceSampleAccountIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ACCOUNT_ID_ASC',
  CreatedContractsByAccountIdVarianceSampleAccountIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ACCOUNT_ID_DESC',
  CreatedContractsByAccountIdVarianceSampleContractAddressAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CONTRACT_ADDRESS_ASC',
  CreatedContractsByAccountIdVarianceSampleContractAddressDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CONTRACT_ADDRESS_DESC',
  CreatedContractsByAccountIdVarianceSampleCreatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CREATED_AT_ASC',
  CreatedContractsByAccountIdVarianceSampleCreatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CREATED_AT_DESC',
  CreatedContractsByAccountIdVarianceSampleIdAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ID_ASC',
  CreatedContractsByAccountIdVarianceSampleIdDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ID_DESC',
  CreatedContractsByAccountIdVarianceSampleUpdatedAtAsc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_UPDATED_AT_ASC',
  CreatedContractsByAccountIdVarianceSampleUpdatedAtDesc = 'CREATED_CONTRACTS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_UPDATED_AT_DESC',
  H160AddressAsc = 'H160_ADDRESS_ASC',
  H160AddressDesc = 'H160_ADDRESS_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdAverageAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdAverageAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdAverageCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdAverageCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdAverageIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_ID_ASC',
  UserJoinedPoolsByAccountIdAverageIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_ID_DESC',
  UserJoinedPoolsByAccountIdAveragePoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdAveragePoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdAverageUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdAverageUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_AVERAGE_UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdCountAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_COUNT_ASC',
  UserJoinedPoolsByAccountIdCountDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_COUNT_DESC',
  UserJoinedPoolsByAccountIdDistinctCountAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdDistinctCountAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdDistinctCountCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdDistinctCountCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdDistinctCountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_ID_ASC',
  UserJoinedPoolsByAccountIdDistinctCountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_ID_DESC',
  UserJoinedPoolsByAccountIdDistinctCountPoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdDistinctCountPoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdDistinctCountUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdDistinctCountUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_DISTINCT_COUNT_UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdMaxAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdMaxAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdMaxCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdMaxCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdMaxIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_ID_ASC',
  UserJoinedPoolsByAccountIdMaxIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_ID_DESC',
  UserJoinedPoolsByAccountIdMaxPoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdMaxPoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdMaxUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdMaxUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MAX_UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdMinAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdMinAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdMinCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdMinCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdMinIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_ID_ASC',
  UserJoinedPoolsByAccountIdMinIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_ID_DESC',
  UserJoinedPoolsByAccountIdMinPoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdMinPoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdMinUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdMinUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_MIN_UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdStddevPopulationAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdStddevPopulationAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdStddevPopulationCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdStddevPopulationCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdStddevPopulationIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_ID_ASC',
  UserJoinedPoolsByAccountIdStddevPopulationIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_ID_DESC',
  UserJoinedPoolsByAccountIdStddevPopulationPoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdStddevPopulationPoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdStddevPopulationUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdStddevPopulationUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_POPULATION_UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdStddevSampleAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdStddevSampleAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdStddevSampleCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdStddevSampleCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdStddevSampleIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ID_ASC',
  UserJoinedPoolsByAccountIdStddevSampleIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_ID_DESC',
  UserJoinedPoolsByAccountIdStddevSamplePoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdStddevSamplePoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdStddevSampleUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdStddevSampleUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_STDDEV_SAMPLE_UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdSumAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdSumAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdSumCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdSumCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdSumIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_ID_ASC',
  UserJoinedPoolsByAccountIdSumIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_ID_DESC',
  UserJoinedPoolsByAccountIdSumPoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdSumPoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdSumUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdSumUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_SUM_UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdVariancePopulationAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdVariancePopulationAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdVariancePopulationCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdVariancePopulationCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdVariancePopulationIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ID_ASC',
  UserJoinedPoolsByAccountIdVariancePopulationIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_ID_DESC',
  UserJoinedPoolsByAccountIdVariancePopulationPoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdVariancePopulationPoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdVariancePopulationUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdVariancePopulationUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_POPULATION_UPDATED_AT_DESC',
  UserJoinedPoolsByAccountIdVarianceSampleAccountIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ACCOUNT_ID_ASC',
  UserJoinedPoolsByAccountIdVarianceSampleAccountIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ACCOUNT_ID_DESC',
  UserJoinedPoolsByAccountIdVarianceSampleCreatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CREATED_AT_ASC',
  UserJoinedPoolsByAccountIdVarianceSampleCreatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_CREATED_AT_DESC',
  UserJoinedPoolsByAccountIdVarianceSampleIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ID_ASC',
  UserJoinedPoolsByAccountIdVarianceSampleIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_ID_DESC',
  UserJoinedPoolsByAccountIdVarianceSamplePoolIdAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_POOL_ID_ASC',
  UserJoinedPoolsByAccountIdVarianceSamplePoolIdDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_POOL_ID_DESC',
  UserJoinedPoolsByAccountIdVarianceSampleUpdatedAtAsc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_UPDATED_AT_ASC',
  UserJoinedPoolsByAccountIdVarianceSampleUpdatedAtDesc = 'USER_JOINED_POOLS_BY_ACCOUNT_ID_VARIANCE_SAMPLE_UPDATED_AT_DESC'
}

export type _Metadata = {
  __typename?: '_Metadata';
  chain?: Maybe<Scalars['String']>;
  dynamicDatasources?: Maybe<Scalars['String']>;
  genesisHash?: Maybe<Scalars['String']>;
  indexerHealthy?: Maybe<Scalars['Boolean']>;
  indexerNodeVersion?: Maybe<Scalars['String']>;
  lastProcessedHeight?: Maybe<Scalars['Int']>;
  lastProcessedTimestamp?: Maybe<Scalars['Date']>;
  queryNodeVersion?: Maybe<Scalars['String']>;
  rowCountEstimate?: Maybe<Array<Maybe<TableEstimate>>>;
  specName?: Maybe<Scalars['String']>;
  targetHeight?: Maybe<Scalars['Int']>;
};

export type SponsoredPoolsQueryVariables = Exact<{
  first: Scalars['Int'];
  offset: Scalars['Int'];
  filter?: InputMaybe<SponsoredPoolFilter>;
}>;


export type SponsoredPoolsQuery = { __typename?: 'Query', sponsoredPools?: { __typename?: 'SponsoredPoolsConnection', totalCount: number, nodes: Array<{ __typename?: 'SponsoredPool', id: string, amount: any, poolOwner: string, targets: any, discount: number, txLimit: number, createdAt?: any | null } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };

export type TransfersQueryVariables = Exact<{ [key: string]: never; }>;


export type TransfersQuery = { __typename?: 'Query', transfers?: { __typename?: 'TransfersConnection', totalCount: number, nodes: Array<{ __typename?: 'Transfer', id: string, amount: any, from: string } | null> } | null };

export type ClaimedContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClaimedContractsQuery = { __typename?: 'Query', claimedContracts?: { __typename?: 'ClaimedContractsConnection', totalCount: number, nodes: Array<{ __typename?: 'ClaimedContract', id: string, contractAddress: string, accountId: string } | null>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } | null };


export const SponsoredPoolsDocument = `
    query SponsoredPools($first: Int!, $offset: Int!, $filter: SponsoredPoolFilter) {
  sponsoredPools(first: $first, offset: $offset, filter: $filter) {
    nodes {
      id
      amount
      poolOwner
      targets
      discount
      txLimit
      createdAt
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;
export const useSponsoredPoolsQuery = <
      TData = SponsoredPoolsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SponsoredPoolsQueryVariables,
      options?: UseQueryOptions<SponsoredPoolsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SponsoredPoolsQuery, TError, TData>(
      ['SponsoredPools', variables],
      fetcher<SponsoredPoolsQuery, SponsoredPoolsQueryVariables>(client, SponsoredPoolsDocument, variables, headers),
      options
    );
export const TransfersDocument = `
    query Transfers {
  transfers(first: 5) {
    nodes {
      id
      amount
      from
    }
    totalCount
  }
}
    `;
export const useTransfersQuery = <
      TData = TransfersQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: TransfersQueryVariables,
      options?: UseQueryOptions<TransfersQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<TransfersQuery, TError, TData>(
      variables === undefined ? ['Transfers'] : ['Transfers', variables],
      fetcher<TransfersQuery, TransfersQueryVariables>(client, TransfersDocument, variables, headers),
      options
    );
export const ClaimedContractsDocument = `
    query ClaimedContracts {
  claimedContracts {
    nodes {
      id
      contractAddress
      accountId
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
    `;
export const useClaimedContractsQuery = <
      TData = ClaimedContractsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ClaimedContractsQueryVariables,
      options?: UseQueryOptions<ClaimedContractsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ClaimedContractsQuery, TError, TData>(
      variables === undefined ? ['ClaimedContracts'] : ['ClaimedContracts', variables],
      fetcher<ClaimedContractsQuery, ClaimedContractsQueryVariables>(client, ClaimedContractsDocument, variables, headers),
      options
    );