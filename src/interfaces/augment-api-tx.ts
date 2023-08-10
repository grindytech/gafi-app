// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type { ApiTypes, AugmentedSubmittable, SubmittableExtrinsic, SubmittableExtrinsicFunction } from '@polkadot/api-base/types';
import type { Bytes, Compact, Option, U8aFixed, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, MultiAddress } from '@polkadot/types/interfaces/runtime';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> = SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> = SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * Set the regular balance of a given account.
       * 
       * The dispatch origin for this call is `root`.
       **/
      forceSetBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Exactly as `transfer_allow_death`, except the origin must be root and the source account
       * may be specified.
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * Unreserve some balance from a user by force.
       * 
       * Can only be called by ROOT.
       **/
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u128]>;
      /**
       * Set the regular balance of a given account; it also takes a reserved balance but this
       * must be the same as the account's current reserved balance.
       * 
       * The dispatch origin for this call is `root`.
       * 
       * WARNING: This call is DEPRECATED! Use `force_set_balance` instead.
       **/
      setBalanceDeprecated: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array, oldReserved: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>, Compact<u128>]>;
      /**
       * Alias for `transfer_allow_death`, provided only for name-wise compatibility.
       * 
       * WARNING: DEPRECATED! Will be released in approximately 3 months.
       **/
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
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
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       **/
      transferAllowDeath: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
       * kill the origin account.
       * 
       * 99% of the time you want [`transfer_allow_death`] instead.
       * 
       * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
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
      upgradeAccounts: AugmentedSubmittable<(who: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
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
      donate: AugmentedSubmittable<(amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u128]>;
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
      /**
       * Add a collection to the game.
       * 
       * The origin must be Signed and the sender should be the Admin of the `game`.
       * 
       * Parameters:
       * - `game`: Game ID.
       * - `collection`: Collection ID.
       * 
       * Emits `CollectionAdded`.
       * 
       * Weight: `O(1)`
       **/
      addGameCollection: AugmentedSubmittable<(game: u32 | AnyNumber | Uint8Array, collection: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Add more items to set the price in `set_price`.
       * 
       * Origin must be Signed and must be the owner of the `trade`.
       * 
       * - `trade`: The set_price trade id.
       * - `supply`: The number of items to be added.
       * 
       * Weight: `O(1)`
       **/
      addRetailSupply: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array, supply: GafiSupportGameTypesPackage | { collection?: any; item?: any; amount?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, GafiSupportGameTypesPackage]>;
      /**
       * Add supplies for the item.
       * 
       * The origin must be Signed and the sender should be the Admin of `collection`.
       * 
       * - `collection`: The collection of the item to be minted.
       * - `item`: An identifier of the new item.
       * - `amount`: Supply amount.
       * 
       * Emits `ItemAdded` event when successful.
       * 
       * Weight: `O(1)`
       **/
      addSupply: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, amount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u32]>;
      /**
       * Make a bid for the auction.
       * 
       * Origin must be Signed.
       * 
       * - `trade`: The auction id.
       * - `bid`: The bid, `bid` must be higher than the minimum bid and higher than the previous
       * bid.
       * 
       * Emits `Bid`.
       * 
       * Weight: `O(1)`
       **/
      bidAuction: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array, bid: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u128]>;
      /**
       * Burn amount of item.
       * 
       * The origin must conform to `ForceOrigin` or must be Signed and the signing account must
       * be the owner of the `item` and has sufficient item balance.
       * 
       * - `collection`: The collection of the item to be burned.
       * - `item`: The item to be burned.
       * - `amount`: The amount of item to be burned.
       * 
       * Emits `Burned`.
       * 
       * Weight: `O(1)`
       **/
      burn: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, amount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u32]>;
      /**
       * Buy a bundle from `set_bundle`.
       * 
       * Origin must be Signed.
       * 
       * - `trade`: set_bundle trade id.
       * - `bid_price`: The price the sender is willing to pay.
       * 
       * Emits `BundleSet`.
       * 
       * Weight: `O(1)`
       **/
      buyBundle: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array, bidPrice: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u128]>;
      /**
       * Buy certain number of items from `set_price`.
       * 
       * Origin must be Signed.
       * 
       * - `trade`: The set_price trade id.
       * - `amount`: Number of items to buy.
       * - `bid_price`: Bid for each item, `bid_price` must be equal to or higher than
       * `price_unit`.
       * 
       * Emits `ItemBought`.
       * 
       * Weight: `O(1)`
       **/
      buyItem: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array, amount: u32 | AnyNumber | Uint8Array, bidPrice: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u128]>;
      /**
       * Cancel a trade in `trade_type` by id `trade`.
       * 
       * Origin must be Signed and signer must be the trade owner.
       * 
       * - `trade`: Trade id.
       * - `trade_type`: Trade type.
       * 
       * Emits `TradeCanceled`.
       * 
       * Weight: `O(1)`
       **/
      cancelTrade: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array, tradeType: GafiSupportGameTypesTradeType | 'SetPrice' | 'SetBuy' | 'Bundle' | 'Wishlist' | 'Auction' | 'Swap' | number | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, GafiSupportGameTypesTradeType]>;
      /**
       * Handling an auction after it's over.
       * 
       * The last bidder will win the auction.
       * If there is no bid, the NFT in the auction will be refunded.
       * 
       * Origin must be Signed.
       * 
       * - `trade`: The auction id.
       * 
       * Emits `AuctionClaimed`.
       * 
       * Weight: `O(1)`
       **/
      claimAuction: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Sell ​​`amount` of the item for `set_buy`.
       * 
       * Origin must be Signed.
       * 
       * - `trade`: The set_buy trade id.
       * - `amount`: The amount of items to sell.
       * - `ask_price`: The price that the sender willing to accept.
       * 
       * Emits `BuySet`.
       * 
       * Weight: `O(1)`
       **/
      claimSetBuy: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array, amount: u32 | AnyNumber | Uint8Array, askPrice: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u128]>;
      /**
       * Make an exchange for `set_swap`.
       * 
       * Origin must be Signed.
       * 
       * - `trade`: The set_swap trade id.
       * - `maybe_bid_price`: Maybe a price sender willing to pay.
       * 
       * Emits `SwapClaimed`.
       * 
       * Weight: `O(1)`
       **/
      claimSwap: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array, maybeBidPrice: Option<u128> | null | Uint8Array | u128 | AnyNumber) => SubmittableExtrinsic<ApiType>, [u32, Option<u128>]>;
      /**
       * Sell the bundle for `set_wishlist`.
       * 
       * Origin must be Signed.
       * 
       * - `trade`:  The set_wishlist trade id.
       * - `ask_price`: The price the sender is willing to accept.
       * 
       * Emits `WishlistFilled`.
       * 
       * Weight: `O(1)`
       **/
      claimWishlist: AugmentedSubmittable<(trade: u32 | AnyNumber | Uint8Array, askPrice: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u128]>;
      /**
       * Clear an attribute for a collection or item.
       * 
       * Simply re-call `clear_attribute` of `pallet-nfts`.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
       * attribute.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to clear.
       * - `maybe_item`: The identifier of the item whose metadata to clear.
       * - `namespace`: Attribute's namespace.
       * - `key`: The key of the attribute.
       * 
       * Emits `AttributeCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearAttribute: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, namespace: PalletNftsAttributeNamespace | { Pallet: any } | { CollectionOwner: any } | { ItemOwner: any } | { Account: any } | string | Uint8Array, key: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<u32>, PalletNftsAttributeNamespace, Bytes]>;
      /**
       * Clear the metadata for a collection.
       * 
       * Simply re-call `clear_collection_metadata` of `pallet-nfts`.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
       * the `collection`.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose metadata to clear.
       * 
       * Emits `CollectionMetadataCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearCollectionMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Clear the metadata for an item.
       * 
       * Simply re-call `clear_metadata` of `pallet-nfts`.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
       * `collection`.
       * 
       * Any deposit is freed for the collection's owner.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to clear.
       * - `item`: The identifier of the item whose metadata to clear.
       * 
       * Emits `ItemMetadataCleared`.
       * 
       * Weight: `O(1)`
       **/
      clearMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Create a new collection.
       * 
       * This new collection has no items initially and its owner is the origin.
       * 
       * The origin must be Signed and the sender must have sufficient funds free.
       * 
       * `CollectionDeposit` funds of sender are reserved.
       * 
       * Parameters:
       * - `admin`: The admin of this collection. The admin is the initial address of each
       * member of the collection's admin team.
       * 
       * Emits `CollectionCreated`.
       * 
       * Weight: `O(1)`
       **/
      createCollection: AugmentedSubmittable<(admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * Create a dynamic mining pool.
       * 
       * Origin must be Signed and the sender should have sufficient items in the `loot_table`.
       * 
       * Note: The mining chance will be changed after each NFT is minted.
       * 
       * - `loot_table`: A bundle of NFTs for mining.
       * - `admin`: The Admin of this mining pool.
       * - `mint_settings`: The mining pool settings.
       * 
       * Emits `MiningPoolCreated`.
       * 
       * Weight: `O(1)`
       **/
      createDynamicPool: AugmentedSubmittable<(lootTable: Vec<GafiSupportGameTypesLoot> | (GafiSupportGameTypesLoot | { maybeNft?: any; weight?: any } | string | Uint8Array)[], admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, mintSettings: GafiSupportGameTypesMintSettings | { mintType?: any; price?: any; startBlock?: any; endBlock?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<GafiSupportGameTypesLoot>, MultiAddress, GafiSupportGameTypesMintSettings]>;
      /**
       * Create a new game.
       * 
       * Origin must be Signed.
       * 
       * If the origin is Signed, then funds of signer are reserved: `GameDeposit`.
       * 
       * - `admin`: the admin of the game.
       * 
       * Emits `GameCreated`.
       * 
       * Weight: `O(1)`
       **/
      createGame: AugmentedSubmittable<(admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * Create a collection in the game.
       * 
       * Origin must be Signed and the sender should be the Admin the the `game`.
       * 
       * If the origin is Signed, then funds of signer are reserved: `CollectionDeposit`.
       * 
       * - `game`: the game id.
       * 
       * Emits `CollectionCreated`.
       * 
       * Weight: `O(1)`
       **/
      createGameCollection: AugmentedSubmittable<(game: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Create an certain amount of item for a particular collection.
       * 
       * The origin must be Signed and the sender should be the Admin of `collection`.
       * 
       * - `collection`: The collection of the item to be minted.
       * - `item`: An identifier of the new item.
       * - `config`: Item Config.
       * - `maybe_supply`: Item supply, None indicates the infinite supply.
       * 
       * Emits `ItemCreated` event when successful.
       * 
       * Weight: `O(1)`
       **/
      createItem: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, config: PalletNftsItemConfig | { settings?: any } | string | Uint8Array, maybeSupply: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [u32, u32, PalletNftsItemConfig, Option<u32>]>;
      /**
       * Create a stable mining pool.
       * 
       * Origin must be Signed and the sender should be the owner of all collections in the
       * `loot_table`. Collection in `loot_table` must be infinite supply.
       * 
       * Note: The mining chance will not be changed after each NFT is minted.
       * 
       * - `loot_table`: A bundle of NFTs for mining.
       * - `admin`: The Admin of this mining pool.
       * - `mint_settings`: The mining pool settings.
       * 
       * Emits `MiningPoolCreated`.
       * 
       * Weight: `O(1)`
       **/
      createStablePool: AugmentedSubmittable<(lootTable: Vec<GafiSupportGameTypesLoot> | (GafiSupportGameTypesLoot | { maybeNft?: any; weight?: any } | string | Uint8Array)[], admin: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, mintSettings: GafiSupportGameTypesMintSettings | { mintType?: any; price?: any; startBlock?: any; endBlock?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<GafiSupportGameTypesLoot>, MultiAddress, GafiSupportGameTypesMintSettings]>;
      /**
       * Disallow further unprivileged transfer or trade of an item.
       * Simply re-call `lock_item_transfer` of `pallet-nfts`.
       * 
       * Origin must be Signed and the sender should be the Freezer of the `collection`.
       * 
       * - `collection`: The collection of the item to be changed.
       * - `item`: The item to become non-transferable.
       * 
       * Emits `ItemTransferLocked`.
       * 
       * Weight: `O(1)`
       **/
      lockItemTransfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Mint an amount of item on a particular mining pool.
       * 
       * The origin must be Signed and the sender must comply with the `mint_settings` rules.
       * 
       * - `pool`: The pool to be minted.
       * - `mint_to`: Account into which the item will be minted.
       * - `amount`: The amount may be minted.
       * 
       * Emits `Minted` event when successful.
       * 
       * Weight: `O(1)`
       **/
      mint: AugmentedSubmittable<(pool: u32 | AnyNumber | Uint8Array, mintTo: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, MultiAddress, u32]>;
      /**
       * Remove a collection in the game.
       * 
       * Origin must be Signed and signer should be the Admin of the game or collection.
       * 
       * - `game`:  The game id.
       * - `ask_price`: The collection id.
       * 
       * Emits `CollectionRemoved`.
       * 
       * Weight: `O(1)`
       **/
      removeCollection: AugmentedSubmittable<(game: u32 | AnyNumber | Uint8Array, collection: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Set acceptance of ownership for a particular account.
       * 
       * Origin must be `Signed` and the sender should be the Admin of `collection`.
       * 
       * - `game`: Game ID.
       * - `collection`: Collection ID.
       * 
       * Emits `AddingAcceptanceSet`.
       **/
      setAcceptAdding: AugmentedSubmittable<(game: u32 | AnyNumber | Uint8Array, collection: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Set an attribute for a collection or item.
       * 
       * Simply re-call `set_attribute` of `pallet-nfts`.
       * 
       * Origin must be Signed and must conform to the namespace ruleset:
       * - `CollectionOwner` namespace could be modified by the `collection` Admin only;
       * - `ItemOwner` namespace could be modified by the `maybe_item` owner only. `maybe_item`
       * should be set in that case;
       * - `Account(AccountId)` namespace could be modified only when the `origin` was given a
       * permission to do so;
       * 
       * The funds of `origin` are reserved according to the formula:
       * `AttributeDepositBase + DepositPerByte * (key.len + value.len)` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to set.
       * - `maybe_item`: The identifier of the item whose metadata to set.
       * - `namespace`: Attribute's namespace.
       * - `key`: The key of the attribute.
       * - `value`: The value to which to set the attribute.
       * 
       * Emits `AttributeSet`.
       * 
       * Weight: `O(1)`
       **/
      setAttribute: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, maybeItem: Option<u32> | null | Uint8Array | u32 | AnyNumber, namespace: PalletNftsAttributeNamespace | { Pallet: any } | { CollectionOwner: any } | { ItemOwner: any } | { Account: any } | string | Uint8Array, key: Bytes | string | Uint8Array, value: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Option<u32>, PalletNftsAttributeNamespace, Bytes, Bytes]>;
      /**
       * Create a auction for `source`.
       * 
       * Origin must be Signed and signer must be the owner of the `source`.
       * The last bidder will win the auction.
       * 
       * - `source`: The bundle for auction.
       * - `maybe_price`: Maybe a minimum bid.
       * - `start_block`: The block to start the auction, `None` indicates the current block.
       * - `duration`: The duration of the auction measured by the number of blocks.
       * 
       * Emits `AuctionSet`.
       * 
       * Weight: `O(1)`
       **/
      setAuction: AugmentedSubmittable<(source: Vec<GafiSupportGameTypesPackage> | (GafiSupportGameTypesPackage | { collection?: any; item?: any; amount?: any } | string | Uint8Array)[], maybePrice: Option<u128> | null | Uint8Array | u128 | AnyNumber, startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber, duration: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<GafiSupportGameTypesPackage>, Option<u128>, Option<u32>, u32]>;
      /**
       * Set the price for the `bundle`.
       * 
       * Origin must be Signed and must be the owner of the `bundle`.
       * 
       * - `bundle`: A group of items may be from different collections to set price for.
       * - `price`: The price the `bundle`.
       * - `start_block`: The block to start setting the price, `None` indicates the current
       * block.
       * - `end_block`: The block to end setting the price, `None` indicates no end.
       * 
       * Emits `BundleSet`.
       * 
       * Weight: `O(1)`
       **/
      setBundle: AugmentedSubmittable<(bundle: Vec<GafiSupportGameTypesPackage> | (GafiSupportGameTypesPackage | { collection?: any; item?: any; amount?: any } | string | Uint8Array)[], price: u128 | AnyNumber | Uint8Array, startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber, endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Vec<GafiSupportGameTypesPackage>, u128, Option<u32>, Option<u32>]>;
      /**
       * Set up a purchase for `package`.
       * 
       * It is possible to trade for a small part of the `package`.
       * 
       * Origin must be Signed.
       * 
       * - `package`: A number of an item in a collection want to buy.
       * - `unit_price`: The price of each item the sender is willing to pay.
       * - `start_block`: The block to start set buy.
       * - `end_block`: The block to end set buy.
       * 
       * Emits `BuySet`.
       * 
       * Weight: `O(1)`
       **/
      setBuy: AugmentedSubmittable<(package: GafiSupportGameTypesPackage | { collection?: any; item?: any; amount?: any } | string | Uint8Array, unitPrice: u128 | AnyNumber | Uint8Array, startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber, endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [GafiSupportGameTypesPackage, u128, Option<u32>, Option<u32>]>;
      /**
       * Set the metadata for a collection.
       * 
       * Simply re-call `set_collection_metadata` of `pallet-nfts`.
       * 
       * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
       * the `collection`.
       * 
       * If the origin is `Signed`, then funds of signer are reserved according to the formula:
       * `MetadataDepositBase + DepositPerByte * data.len` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the item whose metadata to update.
       * - `data`: The general information of this item. Limited in length by `StringLimit`.
       * 
       * Emits `CollectionMetadataSet`.
       * 
       * Weight: `O(1)`
       **/
      setCollectionMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, Bytes]>;
      /**
       * Set the metadata for an item.
       * 
       * Simply re-call `set_metadata` of `pallet-nfts`.
       * 
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
       * `collection`.
       * 
       * If the origin is Signed, then funds of signer are reserved according to the formula:
       * `MetadataDepositBase + DepositPerByte * data.len` taking into
       * account any already reserved funds.
       * 
       * - `collection`: The identifier of the collection whose item's metadata to set.
       * - `item`: The identifier of the item whose metadata to set.
       * - `data`: The general information of this item. Limited in length by `StringLimit`.
       * 
       * Emits `ItemMetadataSet`.
       * 
       * Weight: `O(1)`
       **/
      setMetadata: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, Bytes]>;
      /**
       * Set the price for a package.
       * 
       * Origin must be Signed and must be the owner of the `item`.
       * 
       * - `package`: a number of an item in a collection to set the price for.
       * - `unit_price`: The price for each item.
       * - `start_block`: The block to start setting the price, `None` indicates the current
       * block.
       * - `end_block`: The block to end setting the price, `None` indicates no end.
       * 
       * Emits `PriceSet`.
       * 
       * Weight: `O(1)`
       **/
      setPrice: AugmentedSubmittable<(package: GafiSupportGameTypesPackage | { collection?: any; item?: any; amount?: any } | string | Uint8Array, unitPrice: u128 | AnyNumber | Uint8Array, startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber, endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [GafiSupportGameTypesPackage, u128, Option<u32>, Option<u32>]>;
      /**
       * Set a swap to exchange `source` to `required`.
       * 
       * Origin must be Signed and the sender must be the owner of `source`.
       * 
       * - `source`: Bundle in.
       * - `required`: Bundle out.
       * - `maybe_price`: Maybe the price that sender willing to accept.
       * - `start_block`: The block to start set swap, `None` indicates the current block.
       * - `end_block`: The block to end set swap, `None` indicates no end.
       * 
       * Emits `SwapSet`.
       * 
       * Weight: `O(1)`
       **/
      setSwap: AugmentedSubmittable<(source: Vec<GafiSupportGameTypesPackage> | (GafiSupportGameTypesPackage | { collection?: any; item?: any; amount?: any } | string | Uint8Array)[], required: Vec<GafiSupportGameTypesPackage> | (GafiSupportGameTypesPackage | { collection?: any; item?: any; amount?: any } | string | Uint8Array)[], maybePrice: Option<u128> | null | Uint8Array | u128 | AnyNumber, startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber, endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Vec<GafiSupportGameTypesPackage>, Vec<GafiSupportGameTypesPackage>, Option<u128>, Option<u32>, Option<u32>]>;
      /**
       * Change the Issuer, Admin and Freezer of a collection.
       * 
       * Simply re-call `set_team` of `pallet-nfts`.
       * 
       * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
       * `collection`.
       * 
       * Note: by setting the role to `None` only the `ForceOrigin` will be able to change it
       * after to `Some(account)`.
       * 
       * - `collection`: The collection whose team should be changed.
       * - `issuer`: The new Issuer of this collection.
       * - `admin`: The new Admin of this collection.
       * - `freezer`: The new Freezer of this collection.
       * 
       * Emits `TeamChanged`.
       * 
       * Weight: `O(1)`
       **/
      setTeam: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, issuer: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, admin: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, freezer: Option<MultiAddress> | null | Uint8Array | MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string) => SubmittableExtrinsic<ApiType>, [u32, Option<MultiAddress>, Option<MultiAddress>, Option<MultiAddress>]>;
      /**
       * Set upgrade rule for item.
       * 
       * Origin must be Signed and signer should be the Admin of `collection`.
       * 
       * Arguments:
       * - `collection`: The collection of the item to be upgrade-rule set.
       * - `item`: The item to be upgrade-rule set.
       * - `new_item`: An identifier of the new item.
       * - `config`: Item config of `new_item`.
       * - `data`: `new_item` metadata.
       * - `level`: Upgrade level.
       * - `fee`: Upgrade fee.
       * 
       * Emits `UpgradeSet`.
       * 
       * Weight: `O(1)`
       **/
      setUpgradeItem: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, newItem: u32 | AnyNumber | Uint8Array, config: PalletNftsItemConfig | { settings?: any } | string | Uint8Array, data: Bytes | string | Uint8Array, level: u32 | AnyNumber | Uint8Array, fee: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u32, PalletNftsItemConfig, Bytes, u32, u128]>;
      /**
       * Set up a purchase for `bundle`.
       * 
       * Origin must be Signed.
       * 
       * - `bundle`:  A group of items may be from different collections want to buy.
       * - `price`: The price the sender is willing to pay.
       * - `start_block`: The block to start set wishlist, `None` indicates the current block.
       * - `end_block`: The block to end set wishlist, `None` indicates no end.
       * 
       * Emits `WishlistSet`.
       * 
       * Weight: `O(1)`
       **/
      setWishlist: AugmentedSubmittable<(bundle: Vec<GafiSupportGameTypesPackage> | (GafiSupportGameTypesPackage | { collection?: any; item?: any; amount?: any } | string | Uint8Array)[], price: u128 | AnyNumber | Uint8Array, startBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber, endBlock: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Vec<GafiSupportGameTypesPackage>, u128, Option<u32>, Option<u32>]>;
      /**
       * Move an item from the sender account to another.
       * 
       * Origin must be Signed and the signing account must be the owner of the `item`.
       * 
       * Arguments:
       * - `collection`: The collection of the item to be transferred.
       * - `item`: The item to be transferred.
       * - `dest`: The account to receive ownership of the item.
       * - `amount`: The amount of item to be transferred.
       * 
       * Emits `Transferred`.
       * 
       * Weight: `O(1)`
       **/
      transfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, MultiAddress, u32]>;
      /**
       * Re-allow unprivileged transfer of an item.
       * Simply re-call `unlock_item_transfer` of `pallet-nfts`.
       * 
       * Origin must be Signed and the sender should be the Freezer of the `collection`.
       * 
       * - `collection`: The collection of the item to be changed.
       * - `item`: The item to become transferable.
       * 
       * Emits `ItemTransferUnlocked`.
       * 
       * Weight: `O(1)`
       **/
      unlockItemTransfer: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Upgrade certain number of items.
       * 
       * The origin must be signed and the signer must have a sufficient `amount` of `items`.
       * 
       * Signer must pay `fee` * `amount` to upgrade the item.
       * 
       * Arguments:
       * - `collection`: The collection of the item to be upgraded.
       * - `item`: The item to be upgraded.
       * - `amount`: The amount of `item` to be upgraded.
       * 
       * Emits `Upgraded`.
       * 
       * Weight: `O(1)`
       **/
      upgradeItem: AugmentedSubmittable<(collection: u32 | AnyNumber | Uint8Array, item: u32 | AnyNumber | Uint8Array, amount: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32, u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    gameRandomness: {
      /**
       * Submit a new random seed.
       * 
       * This function sets a new `seed` for randomness in every `T::UnsignedInterval` blocks.
       * 
       * # Parameters
       * 
       * - `origin`: Accepted only by the off-chain worker.
       * - `block_number`: Current block number.
       * - `seed`: New random seed.
       **/
      submitRandomSeedUnsigned: AugmentedSubmittable<(blockNumber: u32 | AnyNumber | Uint8Array, seed: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, U8aFixed]>;
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
      noteStalled: AugmentedSubmittable<(delay: u32 | AnyNumber | Uint8Array, bestFinalizedBlockNumber: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32, u32]>;
      /**
       * Report voter equivocation/misbehavior. This method will verify the
       * equivocation proof and validate the given key ownership proof
       * against the extracted offender. If both are valid, the offence
       * will be reported.
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: SpConsensusGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpConsensusGrandpaEquivocationProof, SpCoreVoid]>;
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
      reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: SpConsensusGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpConsensusGrandpaEquivocationProof, SpCoreVoid]>;
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
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * ## Complexity
       * - O(1).
       **/
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * ## Complexity
       * - O(1).
       **/
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
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
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
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
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * Make some on-chain remark.
       * 
       * ## Complexity
       * - `O(1)`
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code.
       * 
       * ## Complexity
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       * 
       * ## Complexity
       * - `O(C)` where `C` length of `code`
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
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
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
