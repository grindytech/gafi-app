// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U8aFixed, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type { FrameSupportDispatchDispatchInfo, FrameSupportTokensMiscAttributeNamespace, FrameSupportTokensMiscBalanceStatus, GafiSupportGameTypesPackage, PalletNftsPriceWithDirection, SpFinalityGrandpaAppPublic, SpRuntimeDispatchError } from '@polkadot/types/lookup';

export type __AugmentedEvent<ApiType extends ApiTypes> = AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [who: AccountId32, free: u128, reserved: u128], { who: AccountId32, free: u128, reserved: u128 }>;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [account: AccountId32, amount: u128], { account: AccountId32, amount: u128 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [account: AccountId32, freeBalance: u128], { account: AccountId32, freeBalance: u128 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus], { from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus }>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128], { from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    faucet: {
      Transferred: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    game: {
      AuctionClaimed: AugmentedEvent<ApiType, [trade: u32, maybeBid: Option<ITuple<[AccountId32, u128]>>], { trade: u32, maybeBid: Option<ITuple<[AccountId32, u128]>> }>;
      AuctionSet: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, source: Vec<GafiSupportGameTypesPackage>, maybePrice: Option<u128>, startBlock: u32, duration: u32], { trade: u32, who: AccountId32, source: Vec<GafiSupportGameTypesPackage>, maybePrice: Option<u128>, startBlock: u32, duration: u32 }>;
      Bid: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, bid: u128], { trade: u32, who: AccountId32, bid: u128 }>;
      BundleBought: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, bidPrice: u128], { trade: u32, who: AccountId32, bidPrice: u128 }>;
      BundleSet: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, bundle: Vec<GafiSupportGameTypesPackage>, price: u128], { trade: u32, who: AccountId32, bundle: Vec<GafiSupportGameTypesPackage>, price: u128 }>;
      Burned: AugmentedEvent<ApiType, [who: AccountId32, collection: u32, item: u32, amount: u32], { who: AccountId32, collection: u32, item: u32, amount: u32 }>;
      BuySet: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, collection: u32, item: u32, amount: u32, unitPrice: u128], { trade: u32, who: AccountId32, collection: u32, item: u32, amount: u32, unitPrice: u128 }>;
      CollectionCreated: AugmentedEvent<ApiType, [who: AccountId32, collection: u32], { who: AccountId32, collection: u32 }>;
      CollectionRemoved: AugmentedEvent<ApiType, [who: AccountId32, game: u32, collection: u32], { who: AccountId32, game: u32, collection: u32 }>;
      GameCreated: AugmentedEvent<ApiType, [who: AccountId32, game: u32], { who: AccountId32, game: u32 }>;
      ItemAdded: AugmentedEvent<ApiType, [who: AccountId32, collection: u32, item: u32, amount: u32], { who: AccountId32, collection: u32, item: u32, amount: u32 }>;
      ItemBought: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, amount: u32, bidUnitPrice: u128], { trade: u32, who: AccountId32, amount: u32, bidUnitPrice: u128 }>;
      ItemCreated: AugmentedEvent<ApiType, [who: AccountId32, collection: u32, item: u32, amount: u32], { who: AccountId32, collection: u32, item: u32, amount: u32 }>;
      Minted: AugmentedEvent<ApiType, [who: AccountId32, target: AccountId32, collection: u32, items: Vec<u32>], { who: AccountId32, target: AccountId32, collection: u32, items: Vec<u32> }>;
      PriceSet: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, collection: u32, item: u32, amount: u32, unitPrice: u128], { trade: u32, who: AccountId32, collection: u32, item: u32, amount: u32, unitPrice: u128 }>;
      SetBuyClaimed: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, amount: u32, askUnitPrice: u128], { trade: u32, who: AccountId32, amount: u32, askUnitPrice: u128 }>;
      SwapClaimed: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, maybeBidPrice: Option<u128>], { trade: u32, who: AccountId32, maybeBidPrice: Option<u128> }>;
      SwapSet: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, source: Vec<GafiSupportGameTypesPackage>, required: Vec<GafiSupportGameTypesPackage>, maybePrice: Option<u128>], { trade: u32, who: AccountId32, source: Vec<GafiSupportGameTypesPackage>, required: Vec<GafiSupportGameTypesPackage>, maybePrice: Option<u128> }>;
      TradeCanceled: AugmentedEvent<ApiType, [trade: u32, who: AccountId32], { trade: u32, who: AccountId32 }>;
      Transferred: AugmentedEvent<ApiType, [from: AccountId32, collection: u32, item: u32, dest: AccountId32, amount: u32], { from: AccountId32, collection: u32, item: u32, dest: AccountId32, amount: u32 }>;
      Upgraded: AugmentedEvent<ApiType, [who: AccountId32, collection: u32, item: u32, newItem: u32, amount: u32], { who: AccountId32, collection: u32, item: u32, newItem: u32, amount: u32 }>;
      UpgradeSet: AugmentedEvent<ApiType, [who: AccountId32, collection: u32, item: u32, newItem: u32, level: u32], { who: AccountId32, collection: u32, item: u32, newItem: u32, level: u32 }>;
      WishlistFilled: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, askPrice: u128], { trade: u32, who: AccountId32, askPrice: u128 }>;
      WishlistSet: AugmentedEvent<ApiType, [trade: u32, who: AccountId32, wishlist: Vec<GafiSupportGameTypesPackage>, price: u128], { trade: u32, who: AccountId32, wishlist: Vec<GafiSupportGameTypesPackage>, price: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    grandpa: {
      /**
       * New authority set has been applied.
       **/
      NewAuthorities: AugmentedEvent<ApiType, [authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>], { authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>> }>;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    nfts: {
      /**
       * All approvals of an item got cancelled.
       **/
      AllApprovalsCancelled: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32], { collection: u32, item: u32, owner: AccountId32 }>;
      /**
       * An approval for a `delegate` account to transfer the `item` of an item
       * `collection` was cancelled by its `owner`.
       **/
      ApprovalCancelled: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32, delegate: AccountId32], { collection: u32, item: u32, owner: AccountId32, delegate: AccountId32 }>;
      /**
       * Attribute metadata has been cleared for a `collection` or `item`.
       **/
      AttributeCleared: AugmentedEvent<ApiType, [collection: u32, maybeItem: Option<u32>, key: Bytes, namespace: FrameSupportTokensMiscAttributeNamespace], { collection: u32, maybeItem: Option<u32>, key: Bytes, namespace: FrameSupportTokensMiscAttributeNamespace }>;
      /**
       * New attribute metadata has been set for a `collection` or `item`.
       **/
      AttributeSet: AugmentedEvent<ApiType, [collection: u32, maybeItem: Option<u32>, key: Bytes, value: Bytes, namespace: FrameSupportTokensMiscAttributeNamespace], { collection: u32, maybeItem: Option<u32>, key: Bytes, value: Bytes, namespace: FrameSupportTokensMiscAttributeNamespace }>;
      /**
       * An `item` was destroyed.
       **/
      Burned: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32], { collection: u32, item: u32, owner: AccountId32 }>;
      /**
       * A `collection` has had its config changed by the `Force` origin.
       **/
      CollectionConfigChanged: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * Some `collection` was locked.
       **/
      CollectionLocked: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * Max supply has been set for a collection.
       **/
      CollectionMaxSupplySet: AugmentedEvent<ApiType, [collection: u32, maxSupply: u32], { collection: u32, maxSupply: u32 }>;
      /**
       * Metadata has been cleared for a `collection`.
       **/
      CollectionMetadataCleared: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * New metadata has been set for a `collection`.
       **/
      CollectionMetadataSet: AugmentedEvent<ApiType, [collection: u32, data: Bytes], { collection: u32, data: Bytes }>;
      /**
       * Mint settings for a collection had changed.
       **/
      CollectionMintSettingsUpdated: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * A `collection` was created.
       **/
      Created: AugmentedEvent<ApiType, [collection: u32, creator: AccountId32, owner: AccountId32], { collection: u32, creator: AccountId32, owner: AccountId32 }>;
      /**
       * A `collection` was destroyed.
       **/
      Destroyed: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * A `collection` was force-created.
       **/
      ForceCreated: AugmentedEvent<ApiType, [collection: u32, owner: AccountId32], { collection: u32, owner: AccountId32 }>;
      /**
       * An `item` was issued.
       **/
      Issued: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32], { collection: u32, item: u32, owner: AccountId32 }>;
      /**
       * A new approval to modify item attributes was added.
       **/
      ItemAttributesApprovalAdded: AugmentedEvent<ApiType, [collection: u32, item: u32, delegate: AccountId32], { collection: u32, item: u32, delegate: AccountId32 }>;
      /**
       * A new approval to modify item attributes was removed.
       **/
      ItemAttributesApprovalRemoved: AugmentedEvent<ApiType, [collection: u32, item: u32, delegate: AccountId32], { collection: u32, item: u32, delegate: AccountId32 }>;
      /**
       * An item was bought.
       **/
      ItemBought: AugmentedEvent<ApiType, [collection: u32, item: u32, price: u128, seller: AccountId32, buyer: AccountId32], { collection: u32, item: u32, price: u128, seller: AccountId32, buyer: AccountId32 }>;
      /**
       * Metadata has been cleared for an item.
       **/
      ItemMetadataCleared: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * New metadata has been set for an item.
       **/
      ItemMetadataSet: AugmentedEvent<ApiType, [collection: u32, item: u32, data: Bytes], { collection: u32, item: u32, data: Bytes }>;
      /**
       * The price for the item was removed.
       **/
      ItemPriceRemoved: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * The price was set for the item.
       **/
      ItemPriceSet: AugmentedEvent<ApiType, [collection: u32, item: u32, price: u128, whitelistedBuyer: Option<AccountId32>], { collection: u32, item: u32, price: u128, whitelistedBuyer: Option<AccountId32> }>;
      /**
       * `item` metadata or attributes were locked.
       **/
      ItemPropertiesLocked: AugmentedEvent<ApiType, [collection: u32, item: u32, lockMetadata: bool, lockAttributes: bool], { collection: u32, item: u32, lockMetadata: bool, lockAttributes: bool }>;
      /**
       * An `item` became non-transferable.
       **/
      ItemTransferLocked: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * An `item` became transferable.
       **/
      ItemTransferUnlocked: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * Event gets emitted when the `NextCollectionId` gets incremented.
       **/
      NextCollectionIdIncremented: AugmentedEvent<ApiType, [nextId: u32], { nextId: u32 }>;
      /**
       * The owner changed.
       **/
      OwnerChanged: AugmentedEvent<ApiType, [collection: u32, newOwner: AccountId32], { collection: u32, newOwner: AccountId32 }>;
      /**
       * Ownership acceptance has changed for an account.
       **/
      OwnershipAcceptanceChanged: AugmentedEvent<ApiType, [who: AccountId32, maybeCollection: Option<u32>], { who: AccountId32, maybeCollection: Option<u32> }>;
      /**
       * The deposit for a set of `item`s within a `collection` has been updated.
       **/
      Redeposited: AugmentedEvent<ApiType, [collection: u32, successfulItems: Vec<u32>], { collection: u32, successfulItems: Vec<u32> }>;
      /**
       * The swap was cancelled.
       **/
      SwapCancelled: AugmentedEvent<ApiType, [offeredCollection: u32, offeredItem: u32, desiredCollection: u32, desiredItem: Option<u32>, price: Option<PalletNftsPriceWithDirection>, deadline: u32], { offeredCollection: u32, offeredItem: u32, desiredCollection: u32, desiredItem: Option<u32>, price: Option<PalletNftsPriceWithDirection>, deadline: u32 }>;
      /**
       * The swap has been claimed.
       **/
      SwapClaimed: AugmentedEvent<ApiType, [sentCollection: u32, sentItem: u32, sentItemOwner: AccountId32, receivedCollection: u32, receivedItem: u32, receivedItemOwner: AccountId32, price: Option<PalletNftsPriceWithDirection>, deadline: u32], { sentCollection: u32, sentItem: u32, sentItemOwner: AccountId32, receivedCollection: u32, receivedItem: u32, receivedItemOwner: AccountId32, price: Option<PalletNftsPriceWithDirection>, deadline: u32 }>;
      /**
       * An `item` swap intent was created.
       **/
      SwapCreated: AugmentedEvent<ApiType, [offeredCollection: u32, offeredItem: u32, desiredCollection: u32, desiredItem: Option<u32>, price: Option<PalletNftsPriceWithDirection>, deadline: u32], { offeredCollection: u32, offeredItem: u32, desiredCollection: u32, desiredItem: Option<u32>, price: Option<PalletNftsPriceWithDirection>, deadline: u32 }>;
      /**
       * The management team changed.
       **/
      TeamChanged: AugmentedEvent<ApiType, [collection: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32], { collection: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32 }>;
      /**
       * A tip was sent.
       **/
      TipSent: AugmentedEvent<ApiType, [collection: u32, item: u32, sender: AccountId32, receiver: AccountId32, amount: u128], { collection: u32, item: u32, sender: AccountId32, receiver: AccountId32, amount: u128 }>;
      /**
       * An `item` of a `collection` has been approved by the `owner` for transfer by
       * a `delegate`.
       **/
      TransferApproved: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32, delegate: AccountId32, deadline: Option<u32>], { collection: u32, item: u32, owner: AccountId32, delegate: AccountId32, deadline: Option<u32> }>;
      /**
       * An `item` was transferred.
       **/
      Transferred: AugmentedEvent<ApiType, [collection: u32, item: u32, from: AccountId32, to: AccountId32], { collection: u32, item: u32, from: AccountId32, to: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    palletCache: {
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    preimage: {
      /**
       * A preimage has ben cleared.
       **/
      Cleared: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been noted.
       **/
      Noted: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been requested.
       **/
      Requested: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      /**
       * The call for the provided hash was not found so the task has been aborted.
       **/
      CallUnavailable: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * The given task was unable to be renewed since the agenda is full at that block.
       **/
      PeriodicFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * The given task can never be executed since it is overweight.
       **/
      PermanentlyOverweight: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied if one existed.
       **/
      KeyChanged: AugmentedEvent<ApiType, [oldSudoer: Option<AccountId32>], { oldSudoer: Option<AccountId32> }>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo }>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchInfo: FrameSupportDispatchDispatchInfo }>;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<ApiType, [sender: AccountId32, hash_: H256], { sender: AccountId32, hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      /**
       * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
       * has been paid by `who`.
       **/
      TransactionFeePaid: AugmentedEvent<ApiType, [who: AccountId32, actualFee: u128, tip: u128], { who: AccountId32, actualFee: u128, tip: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
