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
  U8aFixed,
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
       * Set the regular balance of a given account.
       *
       * The dispatch origin for this call is `root`.
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
       * Exactly as `transfer_allow_death`, except the origin must be root and the source account
       * may be specified.
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
       * Unreserve some balance from a user by force.
       *
       * Can only be called by ROOT.
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
       * Set the regular balance of a given account; it also takes a reserved balance but this
       * must be the same as the account's current reserved balance.
       *
       * The dispatch origin for this call is `root`.
       *
       * WARNING: This call is DEPRECATED! Use `force_set_balance` instead.
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
       * Alias for `transfer_allow_death`, provided only for name-wise compatibility.
       *
       * WARNING: DEPRECATED! Will be released in approximately 3 months.
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
       * Transfer the entire transferable balance from the caller account.
       *
       * NOTE: This function only attempts to transfer _transferable_ balances. This means that
       * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
       * transferred by this function. To ensure that this function results in a killed account,
       * you might need to prepare the account by removing any reference counters, storage
       * deposits, etc...
       *
       * The dispatch origin of this call must be Signed.
       *
       * - `dest`: The recipient of the transfer.
       * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
       * of the funds the account has, causing the sender account to be killed (false), or
       * transfer everything except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true).
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
       * Transfer some liquid free balance to another account.
       *
       * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       *
       * The dispatch origin for this call must be `Signed` by the transactor.
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
       * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
       * kill the origin account.
       *
       * 99% of the time you want [`transfer_allow_death`] instead.
       *
       * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
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
       * Upgrade a specified account.
       *
       * - `origin`: Must be `Signed`.
       * - `who`: The account to be upgraded.
       *
       * This will waive the transaction fee if at least all but 10% of the accounts needed to
       * be upgraded. (We let some not have to be upgraded just in order to allow for the
       * possibililty of churn).
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
       * donate
       *
       * The origin must be Signed
       *
       * Parameters:
       * - `amount`: donation amount
       *
       * Weight: `O(1)`
       **/
      donate: AugmentedSubmittable<
        (
          amount: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u128]
      >;
      /**
       * faucet
       *
       * The origin must be Signed
       *
       * Weight: `O(1)`
       **/
      faucet: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    game: {
      addGameCollection: AugmentedSubmittable<
        (
          game: u32 | AnyNumber | Uint8Array,
          collection: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      addRetailSupply: AugmentedSubmittable<
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
      addSupply: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u32]
      >;
      bidAuction: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          bid: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u128]
      >;
      burn: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u32]
      >;
      buyBundle: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          bidPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u128]
      >;
      buyItem: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array,
          bidPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u128]
      >;
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
      claimAuction: AugmentedSubmittable<
        (trade: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      claimSetBuy: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          amount: u32 | AnyNumber | Uint8Array,
          askPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, u128]
      >;
      claimSwap: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          maybeBidPrice: Option<u128> | null | Uint8Array | u128 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Option<u128>]
      >;
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
      clearCollectionMetadata: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      clearMetadata: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
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
          fee: u128 | AnyNumber | Uint8Array,
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
        [Vec<GafiSupportGameTypesLoot>, u128, MultiAddress]
      >;
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
      createGameCollection: AugmentedSubmittable<
        (game: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u32]
      >;
      createItem: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          config:
            | PalletNftsItemConfig
            | { settings?: any }
            | string
            | Uint8Array,
          maybeSupply: Option<u32> | null | Uint8Array | u32 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, PalletNftsItemConfig, Option<u32>]
      >;
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
          fee: u128 | AnyNumber | Uint8Array,
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
        [Vec<GafiSupportGameTypesLoot>, u128, MultiAddress]
      >;
      fillWishlist: AugmentedSubmittable<
        (
          trade: u32 | AnyNumber | Uint8Array,
          askPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u128]
      >;
      lockItemTransfer: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      mint: AugmentedSubmittable<
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
      removeCollection: AugmentedSubmittable<
        (
          game: u32 | AnyNumber | Uint8Array,
          collection: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      setAcceptAdding: AugmentedSubmittable<
        (
          game: u32 | AnyNumber | Uint8Array,
          collection: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
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
          startBlock: u32 | AnyNumber | Uint8Array,
          duration: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<GafiSupportGameTypesPackage>, Option<u128>, u32, u32]
      >;
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
          price: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<GafiSupportGameTypesPackage>, u128]
      >;
      setBuy: AugmentedSubmittable<
        (
          package:
            | GafiSupportGameTypesPackage
            | { collection?: any; item?: any; amount?: any }
            | string
            | Uint8Array,
          unitPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [GafiSupportGameTypesPackage, u128]
      >;
      setCollectionMetadata: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, Bytes]
      >;
      setMetadata: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array,
          data: Bytes | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32, Bytes]
      >;
      setPrice: AugmentedSubmittable<
        (
          package:
            | GafiSupportGameTypesPackage
            | { collection?: any; item?: any; amount?: any }
            | string
            | Uint8Array,
          unitPrice: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [GafiSupportGameTypesPackage, u128]
      >;
      setSwap: AugmentedSubmittable<
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
          maybePrice: Option<u128> | null | Uint8Array | u128 | AnyNumber
        ) => SubmittableExtrinsic<ApiType>,
        [
          Vec<GafiSupportGameTypesPackage>,
          Vec<GafiSupportGameTypesPackage>,
          Option<u128>
        ]
      >;
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
      setWishlist: AugmentedSubmittable<
        (
          bundle:
            | Vec<GafiSupportGameTypesPackage>
            | (
                | GafiSupportGameTypesPackage
                | { collection?: any; item?: any; amount?: any }
                | string
                | Uint8Array
              )[],
          price: u128 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<GafiSupportGameTypesPackage>, u128]
      >;
      submitRandomSeedUnsigned: AugmentedSubmittable<
        (seed: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [U8aFixed]
      >;
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
      unlockItemTransfer: AugmentedSubmittable<
        (
          collection: u32 | AnyNumber | Uint8Array,
          item: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
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
       * Note that the current authority set of the GRANDPA finality gadget has stalled.
       *
       * This will trigger a forced authority set change at the beginning of the next session, to
       * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
       * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
       * The block production rate (which may be slowed down because of finality lagging) should
       * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
       * authority will start voting on top of `best_finalized_block_number` for new finalized
       * blocks. `best_finalized_block_number` should be the highest of the latest finalized
       * block of all validators of the new authority set.
       *
       * Only callable by root.
       **/
      noteStalled: AugmentedSubmittable<
        (
          delay: u32 | AnyNumber | Uint8Array,
          bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [u32, u32]
      >;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
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
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       *
       * This extrinsic must be called unsigned and it is expected that only
       * block authors will call it (validated in `ValidateUnsigned`), as such
       * if the block author is defined it will be defined as the equivocation
       * reporter.
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
    sudo: {
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * ## Complexity
       * - O(1).
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
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * ## Complexity
       * - O(1).
       **/
      sudo: AugmentedSubmittable<
        (
          call: Call | IMethod | string | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Call]
      >;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * ## Complexity
       * - O(1).
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
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       *
       * The dispatch origin for this call must be _Signed_.
       *
       * ## Complexity
       * - O(1).
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
       * Kill all storage items with a key that starts with the given prefix.
       *
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       **/
      killPrefix: AugmentedSubmittable<
        (
          prefix: Bytes | string | Uint8Array,
          subkeys: u32 | AnyNumber | Uint8Array
        ) => SubmittableExtrinsic<ApiType>,
        [Bytes, u32]
      >;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<
        (
          keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]
        ) => SubmittableExtrinsic<ApiType>,
        [Vec<Bytes>]
      >;
      /**
       * Make some on-chain remark.
       *
       * ## Complexity
       * - `O(1)`
       **/
      remark: AugmentedSubmittable<
        (remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<
        (remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Set the new runtime code.
       *
       * ## Complexity
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       **/
      setCode: AugmentedSubmittable<
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       *
       * ## Complexity
       * - `O(C)` where `C` length of `code`
       **/
      setCodeWithoutChecks: AugmentedSubmittable<
        (code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [Bytes]
      >;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<
        (pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>,
        [u64]
      >;
      /**
       * Set some items of storage.
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
    timestamp: {
      /**
       * Set the current time.
       *
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       *
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       *
       * The dispatch origin for this call must be `Inherent`.
       *
       * ## Complexity
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
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
