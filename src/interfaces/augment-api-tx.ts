// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type {
  ApiTypes,
  AugmentedSubmittable,
  SubmittableExtrinsic,
  SubmittableExtrinsicFunction,
} from '@polkadot/api-base/types';
import type {
  Bytes,
  Compact,
  Option,
  Vec,
  bool,
  u128,
  u32,
  u64,
} from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type {
  AccountId32,
  Call,
  MultiAddress,
} from '@polkadot/types/interfaces/runtime';
import type {
  GafiSupportGameTypesLoot,
  GafiSupportGameTypesMintSettings,
  GafiSupportGameTypesPackage,
  GafiSupportGameTypesTradeType,
  PalletNftsAttributeNamespace,
  PalletNftsItemConfig,
  SpConsensusGrandpaEquivocationProof,
  SpCoreVoid,
  SpWeightsWeightV2Weight,
} from '@polkadot/types/lookup';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> =
  SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> =
  SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * See [`Pallet::force_set_balance`].
       **/
      forceSetBalance: AugmentedSubmittable<
        (
          who:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          newFree: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u128>]
      >;
      /**
       * See [`Pallet::force_transfer`].
       **/
      forceTransfer: AugmentedSubmittable<
        (
          source:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, MultiAddress, Compact<u128>]
      >;
      /**
       * See [`Pallet::force_unreserve`].
       **/
      forceUnreserve: AugmentedSubmittable<
        (
          who:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          amount: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, u128]
      >;
      /**
       * See [`Pallet::set_balance_deprecated`].
       **/
      setBalanceDeprecated: AugmentedSubmittable<
        (
          who:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          newFree: Compact<u128> | AnyNumber | Uint8Array,
          oldReserved: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u128>, Compact<u128>]
      >;
      /**
       * See [`Pallet::transfer`].
       **/
      transfer: AugmentedSubmittable<
        (
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u128>]
      >;
      /**
       * See [`Pallet::transfer_all`].
       **/
      transferAll: AugmentedSubmittable<
        (
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          keepAlive: bool | boolean | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, bool]
      >;
      /**
       * See [`Pallet::transfer_allow_death`].
       **/
      transferAllowDeath: AugmentedSubmittable<
        (
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u128>]
      >;
      /**
       * See [`Pallet::transfer_keep_alive`].
       **/
      transferKeepAlive: AugmentedSubmittable<
        (
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          value: Compact<u128> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Compact<u128>]
      >;
      /**
       * See [`Pallet::upgrade_accounts`].
       **/
      upgradeAccounts: AugmentedSubmittable<
        (
          who: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<AccountId32>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    faucet: {
      /**
       * See [`Pallet::donate`].
       **/
      donate: AugmentedSubmittable<
        (
          amount: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u128]
      >;
      /**
       * See [`Pallet::faucet`].
       **/
      faucet: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * See [`Pallet::new_funding_accounts`].
       **/
      newFundingAccounts: AugmentedSubmittable<
        (
          accounts: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<AccountId32>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    game: {
      /**
       * See [`Pallet::add_game_collection`].
       **/
      addGameCollection: AugmentedSubmittable<
        (
          game: u32 | AnyNumber | Uint8Array,
          collection: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * See [`Pallet::add_set_price`].
       **/
      addSetPrice: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          supply:
            | GafiSupportGameTypesPackage
            | { collection?: any; item?: any; amount?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, GafiSupportGameTypesPackage]
      >;
      /**
       * See [`Pallet::add_supply`].
       **/
      addSupply: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u32]
      >;
      /**
       * See [`Pallet::bid_auction`].
       **/
      bidAuction: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          bid: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u128]
      >;
      /**
       * See [`Pallet::burn`].
       **/
      burn: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u32]
      >;
      /**
       * See [`Pallet::buy_bundle`].
       **/
      buyBundle: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          bidPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u128]
      >;
      /**
       * See [`Pallet::buy_item`].
       **/
      buyItem: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array,
          bidPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u128]
      >;
      /**
       * See [`Pallet::cancel_trade`].
       **/
      cancelTrade: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          tradeType:
            | GafiSupportGameTypesTradeType
            | 'SetPrice'
            | 'SetBuy'
            | 'Bundle'
            | 'Wishlist'
            | 'Auction'
            | 'Swap'
            | number
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, GafiSupportGameTypesTradeType]
      >;
      /**
       * See [`Pallet::clear_attribute`].
       **/
      clearAttribute: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          namespace:
            | PalletNftsAttributeNamespace
            | { Pallet: any }
            | { CollectionOwner: any }
            | { ItemOwner: any }
            | { Account: any }
            | string
            | Uint8Array,
          key: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Option<u32>, PalletNftsAttributeNamespace, Bytes]
      >;
      /**
       * See [`Pallet::clear_collection_metadata`].
       **/
      clearCollectionMetadata: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      /**
       * See [`Pallet::clear_game_metadata`].
       **/
      clearGameMetadata: AugmentedSubmittable<
        (game: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      /**
       * See [`Pallet::clear_metadata`].
       **/
      clearMetadata: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * See [`Pallet::clear_pool_metadata`].
       **/
      clearPoolMetadata: AugmentedSubmittable<
        (pool: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      /**
       * See [`Pallet::close_auction`].
       **/
      closeAuction: AugmentedSubmittable<
        (trade: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      /**
       * See [`Pallet::create_collection`].
       **/
      createCollection: AugmentedSubmittable<
        (
          admin:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress]
      >;
      /**
       * See [`Pallet::create_collection_with_data`].
       **/
      createCollectionWithData: AugmentedSubmittable<
        (
          data: Bytes | string | Uint8Array,
          admin:
            | Option<MultiAddress>
            | null
            | Uint8Array
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string,
          issuer:
            | Option<MultiAddress>
            | null
            | Uint8Array
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string,
          freezer:
            | Option<MultiAddress>
            | null
            | Uint8Array
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string,
          game: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [
          Bytes,
          Option<MultiAddress>,
          Option<MultiAddress>,
          Option<MultiAddress>,
          Option<u32>
        ]
      >;
      /**
       * See [`Pallet::create_dynamic_pool`].
       **/
      createDynamicPool: AugmentedSubmittable<
        (
          lootTable:
            | Vec<GafiSupportGameTypesLoot>
            | (
                | GafiSupportGameTypesLoot
                | { maybeNft?: any; weight?: any }
                | string
                | Uint8Array
              )[],
          admin:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          mintSettings:
            | GafiSupportGameTypesMintSettings
            | { mintType?: any; price?: any; startBlock?: any; endBlock?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [
          Vec<GafiSupportGameTypesLoot>,
          MultiAddress,
          GafiSupportGameTypesMintSettings
        ]
      >;
      /**
       * See [`Pallet::create_dynamic_pool_with_data`].
       **/
      createDynamicPoolWithData: AugmentedSubmittable<
        (
          lootTable:
            | Vec<GafiSupportGameTypesLoot>
            | (
                | GafiSupportGameTypesLoot
                | { maybeNft?: any; weight?: any }
                | string
                | Uint8Array
              )[],
          admin:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          mintSettings:
            | GafiSupportGameTypesMintSettings
            | { mintType?: any; price?: any; startBlock?: any; endBlock?: any }
            | string
            | Uint8Array,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [
          Vec<GafiSupportGameTypesLoot>,
          MultiAddress,
          GafiSupportGameTypesMintSettings,
          Bytes
        ]
      >;
      /**
       * See [`Pallet::create_game`].
       **/
      createGame: AugmentedSubmittable<
        (
          admin:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress]
      >;
      /**
       * See [`Pallet::create_game_collection`].
       **/
      createGameCollection: AugmentedSubmittable<
        (game: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      /**
       * See [`Pallet::create_game_with_data`].
       **/
      createGameWithData: AugmentedSubmittable<
        (
          admin:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Bytes]
      >;
      /**
       * See [`Pallet::create_item`].
       **/
      createItem: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          maybeSupply: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, Option<u32>]
      >;
      /**
       * See [`Pallet::create_item_with_data`].
       **/
      createItemWithData: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          maybeSupply: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, Option<u32>, Bytes]
      >;
      /**
       * See [`Pallet::create_stable_pool`].
       **/
      createStablePool: AugmentedSubmittable<
        (
          lootTable:
            | Vec<GafiSupportGameTypesLoot>
            | (
                | GafiSupportGameTypesLoot
                | { maybeNft?: any; weight?: any }
                | string
                | Uint8Array
              )[],
          admin:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          mintSettings:
            | GafiSupportGameTypesMintSettings
            | { mintType?: any; price?: any; startBlock?: any; endBlock?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [
          Vec<GafiSupportGameTypesLoot>,
          MultiAddress,
          GafiSupportGameTypesMintSettings
        ]
      >;
      /**
       * See [`Pallet::create_stable_pool_with_data`].
       **/
      createStablePoolWithData: AugmentedSubmittable<
        (
          lootTable:
            | Vec<GafiSupportGameTypesLoot>
            | (
                | GafiSupportGameTypesLoot
                | { maybeNft?: any; weight?: any }
                | string
                | Uint8Array
              )[],
          admin:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          mintSettings:
            | GafiSupportGameTypesMintSettings
            | { mintType?: any; price?: any; startBlock?: any; endBlock?: any }
            | string
            | Uint8Array,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [
          Vec<GafiSupportGameTypesLoot>,
          MultiAddress,
          GafiSupportGameTypesMintSettings,
          Bytes
        ]
      >;
      /**
       * See [`Pallet::create_swap`].
       **/
      createSwap: AugmentedSubmittable<
        (
          source:
            | Vec<GafiSupportGameTypesPackage>
            | (
                | GafiSupportGameTypesPackage
                | { collection?: any; item?: any; amount?: any }
                | string
                | Uint8Array
              )[],
          required:
            | Vec<GafiSupportGameTypesPackage>
            | (
                | GafiSupportGameTypesPackage
                | { collection?: any; item?: any; amount?: any }
                | string
                | Uint8Array
              )[],
          maybePrice: Option<u128> | null | Uint8Array | u128 | AnyNumber,
          startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [
          Vec<GafiSupportGameTypesPackage>,
          Vec<GafiSupportGameTypesPackage>,
          Option<u128>,
          Option<u32>,
          Option<u32>
        ]
      >;
      /**
       * See [`Pallet::lock_item_transfer`].
       **/
      lockItemTransfer: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * See [`Pallet::make_swap`].
       **/
      makeSwap: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          maybeBidPrice: Option<u128> | null | Uint8Array | u128 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Option<u128>]
      >;
      /**
       * See [`Pallet::order_bundle`].
       **/
      orderBundle: AugmentedSubmittable<
        (
          bundle:
            | Vec<GafiSupportGameTypesPackage>
            | (
                | GafiSupportGameTypesPackage
                | { collection?: any; item?: any; amount?: any }
                | string
                | Uint8Array
              )[],
          price: u128 | AnyNumber | Uint8Array,
          startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<GafiSupportGameTypesPackage>, u128, Option<u32>, Option<u32>]
      >;
      /**
       * See [`Pallet::remove_collection`].
       **/
      removeCollection: AugmentedSubmittable<
        (
          game: u32 | AnyNumber | Uint8Array,
          collection: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * See [`Pallet::request_mint`].
       **/
      requestMint: AugmentedSubmittable<
        (
          pool: u32 | AnyNumber | Uint8Array,
          mintTo:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, MultiAddress, u32]
      >;
      /**
       * See [`Pallet::sell_bundle`].
       **/
      sellBundle: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          askPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u128]
      >;
      /**
       * See [`Pallet::sell_item`].
       **/
      sellItem: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array,
          askPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u128]
      >;
      /**
       * See [`Pallet::set_accept_adding`].
       **/
      setAcceptAdding: AugmentedSubmittable<
        (
          game: u32 | AnyNumber | Uint8Array,
          collection: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * See [`Pallet::set_attribute`].
       **/
      setAttribute: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          namespace:
            | PalletNftsAttributeNamespace
            | { Pallet: any }
            | { CollectionOwner: any }
            | { ItemOwner: any }
            | { Account: any }
            | string
            | Uint8Array,
          key: Bytes | string | Uint8Array,
          value: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Option<u32>, PalletNftsAttributeNamespace, Bytes, Bytes]
      >;
      /**
       * See [`Pallet::set_auction`].
       **/
      setAuction: AugmentedSubmittable<
        (
          source:
            | Vec<GafiSupportGameTypesPackage>
            | (
                | GafiSupportGameTypesPackage
                | { collection?: any; item?: any; amount?: any }
                | string
                | Uint8Array
              )[],
          maybePrice: Option<u128> | null | Uint8Array | u128 | AnyNumber,
          startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          duration: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<GafiSupportGameTypesPackage>, Option<u128>, Option<u32>, u32]
      >;
      /**
       * See [`Pallet::set_bundle`].
       **/
      setBundle: AugmentedSubmittable<
        (
          bundle:
            | Vec<GafiSupportGameTypesPackage>
            | (
                | GafiSupportGameTypesPackage
                | { collection?: any; item?: any; amount?: any }
                | string
                | Uint8Array
              )[],
          price: u128 | AnyNumber | Uint8Array,
          startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<GafiSupportGameTypesPackage>, u128, Option<u32>, Option<u32>]
      >;
      /**
       * See [`Pallet::set_collection_metadata`].
       **/
      setCollectionMetadata: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Bytes]
      >;
      /**
       * See [`Pallet::set_game_metadata`].
       **/
      setGameMetadata: AugmentedSubmittable<
        (
          data: Bytes | string | Uint8Array,
          game: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Bytes, u32]
      >;
      /**
       * See [`Pallet::set_metadata`].
       **/
      setMetadata: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, Bytes]
      >;
      /**
       * See [`Pallet::set_order`].
       **/
      setOrder: AugmentedSubmittable<
        (
          package:
            | GafiSupportGameTypesPackage
            | { collection?: any; item?: any; amount?: any }
            | string
            | Uint8Array,
          unitPrice: u128 | AnyNumber | Uint8Array,
          startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [GafiSupportGameTypesPackage, u128, Option<u32>, Option<u32>]
      >;
      /**
       * See [`Pallet::set_pool_metadata`].
       **/
      setPoolMetadata: AugmentedSubmittable<
        (
          pool: u32 | AnyNumber | Uint8Array,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Bytes]
      >;
      /**
       * See [`Pallet::set_price`].
       **/
      setPrice: AugmentedSubmittable<
        (
          package:
            | GafiSupportGameTypesPackage
            | { collection?: any; item?: any; amount?: any }
            | string
            | Uint8Array,
          unitPrice: u128 | AnyNumber | Uint8Array,
          startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber,
          endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [GafiSupportGameTypesPackage, u128, Option<u32>, Option<u32>]
      >;
      /**
       * See [`Pallet::set_team`].
       **/
      setTeam: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          issuer:
            | Option<MultiAddress>
            | null
            | Uint8Array
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string,
          admin:
            | Option<MultiAddress>
            | null
            | Uint8Array
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string,
          freezer:
            | Option<MultiAddress>
            | null
            | Uint8Array
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Option<MultiAddress>, Option<MultiAddress>, Option<MultiAddress>]
      >;
      /**
       * See [`Pallet::set_upgrade_item`].
       **/
      setUpgradeItem: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          newItem: u32 | AnyNumber | Uint8Array,
          config:
            | PalletNftsItemConfig
            | { settings?: any }
            | string
            | Uint8Array,
          data: Bytes | string | Uint8Array,
          level: u32 | AnyNumber | Uint8Array,
          fee: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u32, PalletNftsItemConfig, Bytes, u32, u128]
      >;
      /**
       * See [`Pallet::transfer`].
       **/
      transfer: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          dest:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, MultiAddress, u32]
      >;
      /**
       * See [`Pallet::unlock_item_transfer`].
       **/
      unlockItemTransfer: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * See [`Pallet::upgrade_item`].
       **/
      upgradeItem: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u32]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * See [`Pallet::note_stalled`].
       **/
      noteStalled: AugmentedSubmittable<
        (
          delay: u32 | AnyNumber | Uint8Array,
          bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * See [`Pallet::report_equivocation`].
       **/
      reportEquivocation: AugmentedSubmittable<
        (
          equivocationProof:
            | SpConsensusGrandpaEquivocationProof
            | { setId?: any; equivocation?: any }
            | string
            | Uint8Array,
          keyOwnerProof: SpCoreVoid | null
        ) => SubmittableExtrinsic<ApiType>,
        [SpConsensusGrandpaEquivocationProof, SpCoreVoid]
      >;
      /**
       * See [`Pallet::report_equivocation_unsigned`].
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<
        (
          equivocationProof:
            | SpConsensusGrandpaEquivocationProof
            | { setId?: any; equivocation?: any }
            | string
            | Uint8Array,
          keyOwnerProof: SpCoreVoid | null
        ) => SubmittableExtrinsic<ApiType>,
        [SpConsensusGrandpaEquivocationProof, SpCoreVoid]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    oracleRandomness: {
      /**
       * See [`Pallet::set_new_random_urls`].
       **/
      setNewRandomUrls: AugmentedSubmittable<
        (
          urls: Vec<Bytes> | (Bytes | string | Uint8Array)[]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<Bytes>]
      >;
      /**
       * See [`Pallet::submit_random_seed_unsigned`].
       **/
      submitRandomSeedUnsigned: AugmentedSubmittable<
        (
          blockNumber: u32 | AnyNumber | Uint8Array,
          seed: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Bytes]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    palletCache: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * See [`Pallet::set_key`].
       **/
      setKey: AugmentedSubmittable<
        (
          updated:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress]
      >;
      /**
       * See [`Pallet::sudo`].
       **/
      sudo: AugmentedSubmittable<
        (
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Call]
      >;
      /**
       * See [`Pallet::sudo_as`].
       **/
      sudoAs: AugmentedSubmittable<
        (
          who:
            | MultiAddress
            | { Id: any }
            | { Index: any }
            | { Raw: any }
            | { Address32: any }
            | { Address20: any }
            | string
            | Uint8Array,
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [MultiAddress, Call]
      >;
      /**
       * See [`Pallet::sudo_unchecked_weight`].
       **/
      sudoUncheckedWeight: AugmentedSubmittable<
        (
          call: Call | IMethod | string | Uint8Array,
          weight:
            | SpWeightsWeightV2Weight
            | { refTime?: any; proofSize?: any }
            | string
            | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Call, SpWeightsWeightV2Weight]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * See [`Pallet::kill_prefix`].
       **/
      killPrefix: AugmentedSubmittable<
        (
          prefix: Bytes | string | Uint8Array,
          subkeys: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Bytes, u32]
      >;
      /**
       * See [`Pallet::kill_storage`].
       **/
      killStorage: AugmentedSubmittable<
        (
          keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<Bytes>]
      >;
      /**
       * See [`Pallet::remark`].
       **/
      remark: AugmentedSubmittable<
        (remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * See [`Pallet::remark_with_event`].
       **/
      remarkWithEvent: AugmentedSubmittable<
        (remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * See [`Pallet::set_code`].
       **/
      setCode: AugmentedSubmittable<
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * See [`Pallet::set_code_without_checks`].
       **/
      setCodeWithoutChecks: AugmentedSubmittable<
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * See [`Pallet::set_heap_pages`].
       **/
      setHeapPages: AugmentedSubmittable<
        (pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u64]
      >;
      /**
       * See [`Pallet::set_storage`].
       **/
      setStorage: AugmentedSubmittable<
        (
          items:
            | Vec<ITuple<[Bytes, Bytes]>>
            | [Bytes | string | Uint8Array, Bytes | string | Uint8Array][]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<ITuple<[Bytes, Bytes]>>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    templateModule: {
      /**
       * See [`Pallet::cause_error`].
       **/
      causeError: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * See [`Pallet::do_something`].
       **/
      doSomething: AugmentedSubmittable<
        (
          something: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * See [`Pallet::set`].
       **/
      set: AugmentedSubmittable<
        (
          now: Compact<u64> | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Compact<u64>]
      >;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
