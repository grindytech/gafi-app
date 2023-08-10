// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type { BTreeMap, Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U8aFixed, Vec, bool, u128, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H256, MultiAddress } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {
  /** @name FrameSystemAccountInfo (3) */
  interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly frozen: u128;
    readonly flags: u128;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeight (8) */
  interface FrameSupportDispatchPerDispatchClassWeight extends Struct {
    readonly normal: SpWeightsWeightV2Weight;
    readonly operational: SpWeightsWeightV2Weight;
    readonly mandatory: SpWeightsWeightV2Weight;
  }

  /** @name SpWeightsWeightV2Weight (9) */
  interface SpWeightsWeightV2Weight extends Struct {
    readonly refTime: Compact<u64>;
    readonly proofSize: Compact<u64>;
  }

  /** @name SpRuntimeDigest (14) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (16) */
  interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (19) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (21) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportDispatchDispatchInfo (22) */
  interface FrameSupportDispatchDispatchInfo extends Struct {
    readonly weight: SpWeightsWeightV2Weight;
    readonly class: FrameSupportDispatchDispatchClass;
    readonly paysFee: FrameSupportDispatchPays;
  }

  /** @name FrameSupportDispatchDispatchClass (23) */
  interface FrameSupportDispatchDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportDispatchPays (24) */
  interface FrameSupportDispatchPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (25) */
  interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpArithmeticArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly isExhausted: boolean;
    readonly isCorruption: boolean;
    readonly isUnavailable: boolean;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional' | 'Exhausted' | 'Corruption' | 'Unavailable';
  }

  /** @name SpRuntimeModuleError (26) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (27) */
  interface SpRuntimeTokenError extends Enum {
    readonly isFundsUnavailable: boolean;
    readonly isOnlyProvider: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly isCannotCreateHold: boolean;
    readonly isNotExpendable: boolean;
    readonly type: 'FundsUnavailable' | 'OnlyProvider' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported' | 'CannotCreateHold' | 'NotExpendable';
  }

  /** @name SpArithmeticArithmeticError (28) */
  interface SpArithmeticArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (29) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletGrandpaEvent (30) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpConsensusGrandpaAppPublic (33) */
  interface SpConsensusGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (34) */
  interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletBalancesEvent (35) */
  interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isMinted: boolean;
    readonly asMinted: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSuspended: boolean;
    readonly asSuspended: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isRestored: boolean;
    readonly asRestored: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUpgraded: boolean;
    readonly asUpgraded: {
      readonly who: AccountId32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly amount: u128;
    } & Struct;
    readonly isRescinded: boolean;
    readonly asRescinded: {
      readonly amount: u128;
    } & Struct;
    readonly isLocked: boolean;
    readonly asLocked: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnlocked: boolean;
    readonly asUnlocked: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isFrozen: boolean;
    readonly asFrozen: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isThawed: boolean;
    readonly asThawed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed' | 'Minted' | 'Burned' | 'Suspended' | 'Restored' | 'Upgraded' | 'Issued' | 'Rescinded' | 'Locked' | 'Unlocked' | 'Frozen' | 'Thawed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (36) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletTransactionPaymentEvent (37) */
  interface PalletTransactionPaymentEvent extends Enum {
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly tip: u128;
    } & Struct;
    readonly type: 'TransactionFeePaid';
  }

  /** @name PalletSudoEvent (38) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletNftsEvent (42) */
  interface PalletNftsEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: {
      readonly collection: u32;
      readonly creator: AccountId32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isForceCreated: boolean;
    readonly asForceCreated: {
      readonly collection: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isDestroyed: boolean;
    readonly asDestroyed: {
      readonly collection: u32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isTransferred: boolean;
    readonly asTransferred: {
      readonly collection: u32;
      readonly item: u32;
      readonly from: AccountId32;
      readonly to: AccountId32;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isItemTransferLocked: boolean;
    readonly asItemTransferLocked: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isItemTransferUnlocked: boolean;
    readonly asItemTransferUnlocked: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isItemPropertiesLocked: boolean;
    readonly asItemPropertiesLocked: {
      readonly collection: u32;
      readonly item: u32;
      readonly lockMetadata: bool;
      readonly lockAttributes: bool;
    } & Struct;
    readonly isCollectionLocked: boolean;
    readonly asCollectionLocked: {
      readonly collection: u32;
    } & Struct;
    readonly isOwnerChanged: boolean;
    readonly asOwnerChanged: {
      readonly collection: u32;
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isTeamChanged: boolean;
    readonly asTeamChanged: {
      readonly collection: u32;
      readonly issuer: Option<AccountId32>;
      readonly admin: Option<AccountId32>;
      readonly freezer: Option<AccountId32>;
    } & Struct;
    readonly isTransferApproved: boolean;
    readonly asTransferApproved: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
      readonly deadline: Option<u32>;
    } & Struct;
    readonly isApprovalCancelled: boolean;
    readonly asApprovalCancelled: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isAllApprovalsCancelled: boolean;
    readonly asAllApprovalsCancelled: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isCollectionConfigChanged: boolean;
    readonly asCollectionConfigChanged: {
      readonly collection: u32;
    } & Struct;
    readonly isCollectionMetadataSet: boolean;
    readonly asCollectionMetadataSet: {
      readonly collection: u32;
      readonly data: Bytes;
    } & Struct;
    readonly isCollectionMetadataCleared: boolean;
    readonly asCollectionMetadataCleared: {
      readonly collection: u32;
    } & Struct;
    readonly isItemMetadataSet: boolean;
    readonly asItemMetadataSet: {
      readonly collection: u32;
      readonly item: u32;
      readonly data: Bytes;
    } & Struct;
    readonly isItemMetadataCleared: boolean;
    readonly asItemMetadataCleared: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isRedeposited: boolean;
    readonly asRedeposited: {
      readonly collection: u32;
      readonly successfulItems: Vec<u32>;
    } & Struct;
    readonly isAttributeSet: boolean;
    readonly asAttributeSet: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly key: Bytes;
      readonly value: Bytes;
      readonly namespace: PalletNftsAttributeNamespace;
    } & Struct;
    readonly isAttributeCleared: boolean;
    readonly asAttributeCleared: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly key: Bytes;
      readonly namespace: PalletNftsAttributeNamespace;
    } & Struct;
    readonly isItemAttributesApprovalAdded: boolean;
    readonly asItemAttributesApprovalAdded: {
      readonly collection: u32;
      readonly item: u32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isItemAttributesApprovalRemoved: boolean;
    readonly asItemAttributesApprovalRemoved: {
      readonly collection: u32;
      readonly item: u32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isOwnershipAcceptanceChanged: boolean;
    readonly asOwnershipAcceptanceChanged: {
      readonly who: AccountId32;
      readonly maybeCollection: Option<u32>;
    } & Struct;
    readonly isCollectionMaxSupplySet: boolean;
    readonly asCollectionMaxSupplySet: {
      readonly collection: u32;
      readonly maxSupply: u32;
    } & Struct;
    readonly isCollectionMintSettingsUpdated: boolean;
    readonly asCollectionMintSettingsUpdated: {
      readonly collection: u32;
    } & Struct;
    readonly isNextCollectionIdIncremented: boolean;
    readonly asNextCollectionIdIncremented: {
      readonly nextId: u32;
    } & Struct;
    readonly isItemPriceSet: boolean;
    readonly asItemPriceSet: {
      readonly collection: u32;
      readonly item: u32;
      readonly price: u128;
      readonly whitelistedBuyer: Option<AccountId32>;
    } & Struct;
    readonly isItemPriceRemoved: boolean;
    readonly asItemPriceRemoved: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isItemBought: boolean;
    readonly asItemBought: {
      readonly collection: u32;
      readonly item: u32;
      readonly price: u128;
      readonly seller: AccountId32;
      readonly buyer: AccountId32;
    } & Struct;
    readonly isTipSent: boolean;
    readonly asTipSent: {
      readonly collection: u32;
      readonly item: u32;
      readonly sender: AccountId32;
      readonly receiver: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSwapCreated: boolean;
    readonly asSwapCreated: {
      readonly offeredCollection: u32;
      readonly offeredItem: u32;
      readonly desiredCollection: u32;
      readonly desiredItem: Option<u32>;
      readonly price: Option<PalletNftsPriceWithDirection>;
      readonly deadline: u32;
    } & Struct;
    readonly isSwapCancelled: boolean;
    readonly asSwapCancelled: {
      readonly offeredCollection: u32;
      readonly offeredItem: u32;
      readonly desiredCollection: u32;
      readonly desiredItem: Option<u32>;
      readonly price: Option<PalletNftsPriceWithDirection>;
      readonly deadline: u32;
    } & Struct;
    readonly isSwapClaimed: boolean;
    readonly asSwapClaimed: {
      readonly sentCollection: u32;
      readonly sentItem: u32;
      readonly sentItemOwner: AccountId32;
      readonly receivedCollection: u32;
      readonly receivedItem: u32;
      readonly receivedItemOwner: AccountId32;
      readonly price: Option<PalletNftsPriceWithDirection>;
      readonly deadline: u32;
    } & Struct;
    readonly isPreSignedAttributesSet: boolean;
    readonly asPreSignedAttributesSet: {
      readonly collection: u32;
      readonly item: u32;
      readonly namespace: PalletNftsAttributeNamespace;
    } & Struct;
    readonly isPalletAttributeSet: boolean;
    readonly asPalletAttributeSet: {
      readonly collection: u32;
      readonly item: Option<u32>;
      readonly attribute: PalletNftsPalletAttributes;
      readonly value: Bytes;
    } & Struct;
    readonly type: 'Created' | 'ForceCreated' | 'Destroyed' | 'Issued' | 'Transferred' | 'Burned' | 'ItemTransferLocked' | 'ItemTransferUnlocked' | 'ItemPropertiesLocked' | 'CollectionLocked' | 'OwnerChanged' | 'TeamChanged' | 'TransferApproved' | 'ApprovalCancelled' | 'AllApprovalsCancelled' | 'CollectionConfigChanged' | 'CollectionMetadataSet' | 'CollectionMetadataCleared' | 'ItemMetadataSet' | 'ItemMetadataCleared' | 'Redeposited' | 'AttributeSet' | 'AttributeCleared' | 'ItemAttributesApprovalAdded' | 'ItemAttributesApprovalRemoved' | 'OwnershipAcceptanceChanged' | 'CollectionMaxSupplySet' | 'CollectionMintSettingsUpdated' | 'NextCollectionIdIncremented' | 'ItemPriceSet' | 'ItemPriceRemoved' | 'ItemBought' | 'TipSent' | 'SwapCreated' | 'SwapCancelled' | 'SwapClaimed' | 'PreSignedAttributesSet' | 'PalletAttributeSet';
  }

  /** @name PalletNftsAttributeNamespace (47) */
  interface PalletNftsAttributeNamespace extends Enum {
    readonly isPallet: boolean;
    readonly isCollectionOwner: boolean;
    readonly isItemOwner: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly type: 'Pallet' | 'CollectionOwner' | 'ItemOwner' | 'Account';
  }

  /** @name PalletNftsPriceWithDirection (49) */
  interface PalletNftsPriceWithDirection extends Struct {
    readonly amount: u128;
    readonly direction: PalletNftsPriceDirection;
  }

  /** @name PalletNftsPriceDirection (50) */
  interface PalletNftsPriceDirection extends Enum {
    readonly isSend: boolean;
    readonly isReceive: boolean;
    readonly type: 'Send' | 'Receive';
  }

  /** @name PalletNftsPalletAttributes (51) */
  interface PalletNftsPalletAttributes extends Enum {
    readonly isUsedToClaim: boolean;
    readonly asUsedToClaim: u32;
    readonly type: 'UsedToClaim';
  }

  /** @name PalletGameEvent (52) */
  interface PalletGameEvent extends Enum {
    readonly isGameCreated: boolean;
    readonly asGameCreated: {
      readonly who: AccountId32;
      readonly game: u32;
    } & Struct;
    readonly isCollectionCreated: boolean;
    readonly asCollectionCreated: {
      readonly who: AccountId32;
      readonly collection: u32;
    } & Struct;
    readonly isAddingAcceptanceSet: boolean;
    readonly asAddingAcceptanceSet: {
      readonly who: AccountId32;
      readonly game: u32;
      readonly collection: u32;
    } & Struct;
    readonly isCollectionAdded: boolean;
    readonly asCollectionAdded: {
      readonly who: AccountId32;
      readonly game: u32;
      readonly collection: u32;
    } & Struct;
    readonly isItemCreated: boolean;
    readonly asItemCreated: {
      readonly who: AccountId32;
      readonly collection: u32;
      readonly item: u32;
      readonly maybeSupply: Option<u32>;
    } & Struct;
    readonly isItemAdded: boolean;
    readonly asItemAdded: {
      readonly who: AccountId32;
      readonly collection: u32;
      readonly item: u32;
      readonly amount: u32;
    } & Struct;
    readonly isMinted: boolean;
    readonly asMinted: {
      readonly pool: u32;
      readonly who: AccountId32;
      readonly target: AccountId32;
      readonly nfts: Vec<GafiSupportGameTypesNft>;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly who: AccountId32;
      readonly collection: u32;
      readonly item: u32;
      readonly amount: u32;
    } & Struct;
    readonly isTransferred: boolean;
    readonly asTransferred: {
      readonly from: AccountId32;
      readonly collection: u32;
      readonly item: u32;
      readonly dest: AccountId32;
      readonly amount: u32;
    } & Struct;
    readonly isUpgradeSet: boolean;
    readonly asUpgradeSet: {
      readonly who: AccountId32;
      readonly collection: u32;
      readonly item: u32;
      readonly newItem: u32;
      readonly level: u32;
    } & Struct;
    readonly isUpgraded: boolean;
    readonly asUpgraded: {
      readonly who: AccountId32;
      readonly collection: u32;
      readonly item: u32;
      readonly newItem: u32;
      readonly amount: u32;
    } & Struct;
    readonly isPriceSet: boolean;
    readonly asPriceSet: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly collection: u32;
      readonly item: u32;
      readonly amount: u32;
      readonly unitPrice: u128;
    } & Struct;
    readonly isItemBought: boolean;
    readonly asItemBought: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly amount: u32;
      readonly bidUnitPrice: u128;
    } & Struct;
    readonly isBundleSet: boolean;
    readonly asBundleSet: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly bundle: Vec<GafiSupportGameTypesPackage>;
      readonly price: u128;
    } & Struct;
    readonly isBundleBought: boolean;
    readonly asBundleBought: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly bidPrice: u128;
    } & Struct;
    readonly isTradeCanceled: boolean;
    readonly asTradeCanceled: {
      readonly trade: u32;
      readonly who: AccountId32;
    } & Struct;
    readonly isWishlistSet: boolean;
    readonly asWishlistSet: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly wishlist: Vec<GafiSupportGameTypesPackage>;
      readonly price: u128;
    } & Struct;
    readonly isWishlistFilled: boolean;
    readonly asWishlistFilled: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly askPrice: u128;
    } & Struct;
    readonly isCollectionRemoved: boolean;
    readonly asCollectionRemoved: {
      readonly who: AccountId32;
      readonly game: u32;
      readonly collection: u32;
    } & Struct;
    readonly isSwapSet: boolean;
    readonly asSwapSet: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly source: Vec<GafiSupportGameTypesPackage>;
      readonly required: Vec<GafiSupportGameTypesPackage>;
      readonly maybePrice: Option<u128>;
    } & Struct;
    readonly isSwapClaimed: boolean;
    readonly asSwapClaimed: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly maybeBidPrice: Option<u128>;
    } & Struct;
    readonly isAuctionSet: boolean;
    readonly asAuctionSet: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly source: Vec<GafiSupportGameTypesPackage>;
      readonly maybePrice: Option<u128>;
      readonly startBlock: Option<u32>;
      readonly duration: u32;
    } & Struct;
    readonly isBid: boolean;
    readonly asBid: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly bid: u128;
    } & Struct;
    readonly isAuctionClaimed: boolean;
    readonly asAuctionClaimed: {
      readonly trade: u32;
      readonly maybeBid: Option<ITuple<[AccountId32, u128]>>;
    } & Struct;
    readonly isBuySet: boolean;
    readonly asBuySet: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly collection: u32;
      readonly item: u32;
      readonly amount: u32;
      readonly unitPrice: u128;
    } & Struct;
    readonly isSetBuyClaimed: boolean;
    readonly asSetBuyClaimed: {
      readonly trade: u32;
      readonly who: AccountId32;
      readonly amount: u32;
      readonly askUnitPrice: u128;
    } & Struct;
    readonly isMiningPoolCreated: boolean;
    readonly asMiningPoolCreated: {
      readonly pool: u32;
      readonly who: AccountId32;
      readonly poolType: GafiSupportGameTypesPoolType;
      readonly table: Vec<GafiSupportGameTypesLoot>;
    } & Struct;
    readonly type: 'GameCreated' | 'CollectionCreated' | 'AddingAcceptanceSet' | 'CollectionAdded' | 'ItemCreated' | 'ItemAdded' | 'Minted' | 'Burned' | 'Transferred' | 'UpgradeSet' | 'Upgraded' | 'PriceSet' | 'ItemBought' | 'BundleSet' | 'BundleBought' | 'TradeCanceled' | 'WishlistSet' | 'WishlistFilled' | 'CollectionRemoved' | 'SwapSet' | 'SwapClaimed' | 'AuctionSet' | 'Bid' | 'AuctionClaimed' | 'BuySet' | 'SetBuyClaimed' | 'MiningPoolCreated';
  }

  /** @name GafiSupportGameTypesNft (54) */
  interface GafiSupportGameTypesNft extends Struct {
    readonly collection: u32;
    readonly item: u32;
  }

  /** @name GafiSupportGameTypesPackage (56) */
  interface GafiSupportGameTypesPackage extends Struct {
    readonly collection: u32;
    readonly item: u32;
    readonly amount: u32;
  }

  /** @name GafiSupportGameTypesPoolType (60) */
  interface GafiSupportGameTypesPoolType extends Enum {
    readonly isDynamic: boolean;
    readonly isStable: boolean;
    readonly type: 'Dynamic' | 'Stable';
  }

  /** @name GafiSupportGameTypesLoot (62) */
  interface GafiSupportGameTypesLoot extends Struct {
    readonly maybeNft: Option<GafiSupportGameTypesNft>;
    readonly weight: u32;
  }

  /** @name GameRandomnessEvent (64) */
  interface GameRandomnessEvent extends Enum {
    readonly isNewSeed: boolean;
    readonly asNewSeed: {
      readonly blockNumber: u32;
      readonly seed: U8aFixed;
    } & Struct;
    readonly type: 'NewSeed';
  }

  /** @name PalletFaucetEvent (65) */
  interface PalletFaucetEvent extends Enum {
    readonly isTransferred: boolean;
    readonly asTransferred: ITuple<[AccountId32, AccountId32, u128]>;
    readonly type: 'Transferred';
  }

  /** @name PalletCacheEvent (66) */
  type PalletCacheEvent = Null;

  /** @name FrameSystemPhase (67) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (71) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (74) */
  interface FrameSystemCall extends Enum {
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (78) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: SpWeightsWeightV2Weight;
    readonly maxBlock: SpWeightsWeightV2Weight;
    readonly perClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeightsPerClass (79) */
  interface FrameSupportDispatchPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (80) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: SpWeightsWeightV2Weight;
    readonly maxExtrinsic: Option<SpWeightsWeightV2Weight>;
    readonly maxTotal: Option<SpWeightsWeightV2Weight>;
    readonly reserved: Option<SpWeightsWeightV2Weight>;
  }

  /** @name FrameSystemLimitsBlockLength (82) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportDispatchPerDispatchClassU32;
  }

  /** @name FrameSupportDispatchPerDispatchClassU32 (83) */
  interface FrameSupportDispatchPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name SpWeightsRuntimeDbWeight (84) */
  interface SpWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (85) */
  interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (91) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name PalletTimestampCall (93) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletGrandpaStoredState (94) */
  interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (95) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (97) */
  interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpConsensusGrandpaEquivocationProof (98) */
  interface SpConsensusGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpConsensusGrandpaEquivocation;
  }

  /** @name SpConsensusGrandpaEquivocation (99) */
  interface SpConsensusGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (100) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpConsensusGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpConsensusGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpConsensusGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (101) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpConsensusGrandpaAppSignature (102) */
  interface SpConsensusGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (103) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (106) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpConsensusGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpConsensusGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpConsensusGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (107) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (109) */
  type SpCoreVoid = Null;

  /** @name PalletGrandpaError (110) */
  interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletBalancesBalanceLock (112) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (113) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (116) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesIdAmount (119) */
  interface PalletBalancesIdAmount extends Struct {
    readonly id: Null;
    readonly amount: u128;
  }

  /** @name PalletBalancesCall (121) */
  interface PalletBalancesCall extends Enum {
    readonly isTransferAllowDeath: boolean;
    readonly asTransferAllowDeath: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalanceDeprecated: boolean;
    readonly asSetBalanceDeprecated: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly oldReserved: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly isUpgradeAccounts: boolean;
    readonly asUpgradeAccounts: {
      readonly who: Vec<AccountId32>;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isForceSetBalance: boolean;
    readonly asForceSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
    } & Struct;
    readonly type: 'TransferAllowDeath' | 'SetBalanceDeprecated' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve' | 'UpgradeAccounts' | 'Transfer' | 'ForceSetBalance';
  }

  /** @name PalletBalancesError (127) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isExpendability: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly isTooManyHolds: boolean;
    readonly isTooManyFreezes: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'Expendability' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves' | 'TooManyHolds' | 'TooManyFreezes';
  }

  /** @name PalletTransactionPaymentReleases (129) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PalletSudoCall (130) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletGameCall (132) */
  interface PalletGameCall extends Enum {
    readonly isCreateGame: boolean;
    readonly asCreateGame: {
      readonly admin: MultiAddress;
    } & Struct;
    readonly isCreateGameCollection: boolean;
    readonly asCreateGameCollection: {
      readonly game: u32;
    } & Struct;
    readonly isCreateCollection: boolean;
    readonly asCreateCollection: {
      readonly admin: MultiAddress;
    } & Struct;
    readonly isSetAcceptAdding: boolean;
    readonly asSetAcceptAdding: {
      readonly game: u32;
      readonly collection: u32;
    } & Struct;
    readonly isAddGameCollection: boolean;
    readonly asAddGameCollection: {
      readonly game: u32;
      readonly collection: u32;
    } & Struct;
    readonly isCreateItem: boolean;
    readonly asCreateItem: {
      readonly collection: u32;
      readonly item: u32;
      readonly config: PalletNftsItemConfig;
      readonly maybeSupply: Option<u32>;
    } & Struct;
    readonly isAddSupply: boolean;
    readonly asAddSupply: {
      readonly collection: u32;
      readonly item: u32;
      readonly amount: u32;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly pool: u32;
      readonly mintTo: MultiAddress;
      readonly amount: u32;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly collection: u32;
      readonly item: u32;
      readonly amount: u32;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly collection: u32;
      readonly item: u32;
      readonly dest: MultiAddress;
      readonly amount: u32;
    } & Struct;
    readonly isSetUpgradeItem: boolean;
    readonly asSetUpgradeItem: {
      readonly collection: u32;
      readonly item: u32;
      readonly newItem: u32;
      readonly config: PalletNftsItemConfig;
      readonly data: Bytes;
      readonly level: u32;
      readonly fee: u128;
    } & Struct;
    readonly isUpgradeItem: boolean;
    readonly asUpgradeItem: {
      readonly collection: u32;
      readonly item: u32;
      readonly amount: u32;
    } & Struct;
    readonly isSetPrice: boolean;
    readonly asSetPrice: {
      readonly package: GafiSupportGameTypesPackage;
      readonly unitPrice: u128;
      readonly startBlock: Option<u32>;
      readonly endBlock: Option<u32>;
    } & Struct;
    readonly isBuyItem: boolean;
    readonly asBuyItem: {
      readonly trade: u32;
      readonly amount: u32;
      readonly bidPrice: u128;
    } & Struct;
    readonly isAddRetailSupply: boolean;
    readonly asAddRetailSupply: {
      readonly trade: u32;
      readonly supply: GafiSupportGameTypesPackage;
    } & Struct;
    readonly isSetBundle: boolean;
    readonly asSetBundle: {
      readonly bundle: Vec<GafiSupportGameTypesPackage>;
      readonly price: u128;
      readonly startBlock: Option<u32>;
      readonly endBlock: Option<u32>;
    } & Struct;
    readonly isBuyBundle: boolean;
    readonly asBuyBundle: {
      readonly trade: u32;
      readonly bidPrice: u128;
    } & Struct;
    readonly isCancelTrade: boolean;
    readonly asCancelTrade: {
      readonly trade: u32;
      readonly tradeType: GafiSupportGameTypesTradeType;
    } & Struct;
    readonly isSetWishlist: boolean;
    readonly asSetWishlist: {
      readonly bundle: Vec<GafiSupportGameTypesPackage>;
      readonly price: u128;
      readonly startBlock: Option<u32>;
      readonly endBlock: Option<u32>;
    } & Struct;
    readonly isClaimWishlist: boolean;
    readonly asClaimWishlist: {
      readonly trade: u32;
      readonly askPrice: u128;
    } & Struct;
    readonly isRemoveCollection: boolean;
    readonly asRemoveCollection: {
      readonly game: u32;
      readonly collection: u32;
    } & Struct;
    readonly isLockItemTransfer: boolean;
    readonly asLockItemTransfer: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isUnlockItemTransfer: boolean;
    readonly asUnlockItemTransfer: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isSetSwap: boolean;
    readonly asSetSwap: {
      readonly source: Vec<GafiSupportGameTypesPackage>;
      readonly required: Vec<GafiSupportGameTypesPackage>;
      readonly maybePrice: Option<u128>;
      readonly startBlock: Option<u32>;
      readonly endBlock: Option<u32>;
    } & Struct;
    readonly isClaimSwap: boolean;
    readonly asClaimSwap: {
      readonly trade: u32;
      readonly maybeBidPrice: Option<u128>;
    } & Struct;
    readonly isSetAuction: boolean;
    readonly asSetAuction: {
      readonly source: Vec<GafiSupportGameTypesPackage>;
      readonly maybePrice: Option<u128>;
      readonly startBlock: Option<u32>;
      readonly duration: u32;
    } & Struct;
    readonly isBidAuction: boolean;
    readonly asBidAuction: {
      readonly trade: u32;
      readonly bid: u128;
    } & Struct;
    readonly isClaimAuction: boolean;
    readonly asClaimAuction: {
      readonly trade: u32;
    } & Struct;
    readonly isSetBuy: boolean;
    readonly asSetBuy: {
      readonly package: GafiSupportGameTypesPackage;
      readonly unitPrice: u128;
      readonly startBlock: Option<u32>;
      readonly endBlock: Option<u32>;
    } & Struct;
    readonly isClaimSetBuy: boolean;
    readonly asClaimSetBuy: {
      readonly trade: u32;
      readonly amount: u32;
      readonly askPrice: u128;
    } & Struct;
    readonly isSetAttribute: boolean;
    readonly asSetAttribute: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly namespace: PalletNftsAttributeNamespace;
      readonly key: Bytes;
      readonly value: Bytes;
    } & Struct;
    readonly isClearAttribute: boolean;
    readonly asClearAttribute: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly namespace: PalletNftsAttributeNamespace;
      readonly key: Bytes;
    } & Struct;
    readonly isSetMetadata: boolean;
    readonly asSetMetadata: {
      readonly collection: u32;
      readonly item: u32;
      readonly data: Bytes;
    } & Struct;
    readonly isClearMetadata: boolean;
    readonly asClearMetadata: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isSetCollectionMetadata: boolean;
    readonly asSetCollectionMetadata: {
      readonly collection: u32;
      readonly data: Bytes;
    } & Struct;
    readonly isClearCollectionMetadata: boolean;
    readonly asClearCollectionMetadata: {
      readonly collection: u32;
    } & Struct;
    readonly isSetTeam: boolean;
    readonly asSetTeam: {
      readonly collection: u32;
      readonly issuer: Option<MultiAddress>;
      readonly admin: Option<MultiAddress>;
      readonly freezer: Option<MultiAddress>;
    } & Struct;
    readonly isCreateDynamicPool: boolean;
    readonly asCreateDynamicPool: {
      readonly lootTable: Vec<GafiSupportGameTypesLoot>;
      readonly admin: MultiAddress;
      readonly mintSettings: GafiSupportGameTypesMintSettings;
    } & Struct;
    readonly isCreateStablePool: boolean;
    readonly asCreateStablePool: {
      readonly lootTable: Vec<GafiSupportGameTypesLoot>;
      readonly admin: MultiAddress;
      readonly mintSettings: GafiSupportGameTypesMintSettings;
    } & Struct;
    readonly type: 'CreateGame' | 'CreateGameCollection' | 'CreateCollection' | 'SetAcceptAdding' | 'AddGameCollection' | 'CreateItem' | 'AddSupply' | 'Mint' | 'Burn' | 'Transfer' | 'SetUpgradeItem' | 'UpgradeItem' | 'SetPrice' | 'BuyItem' | 'AddRetailSupply' | 'SetBundle' | 'BuyBundle' | 'CancelTrade' | 'SetWishlist' | 'ClaimWishlist' | 'RemoveCollection' | 'LockItemTransfer' | 'UnlockItemTransfer' | 'SetSwap' | 'ClaimSwap' | 'SetAuction' | 'BidAuction' | 'ClaimAuction' | 'SetBuy' | 'ClaimSetBuy' | 'SetAttribute' | 'ClearAttribute' | 'SetMetadata' | 'ClearMetadata' | 'SetCollectionMetadata' | 'ClearCollectionMetadata' | 'SetTeam' | 'CreateDynamicPool' | 'CreateStablePool';
  }

  /** @name PalletNftsItemConfig (133) */
  interface PalletNftsItemConfig extends Struct {
    readonly settings: u64;
  }

  /** @name PalletNftsItemSetting (135) */
  interface PalletNftsItemSetting extends Enum {
    readonly isTransferable: boolean;
    readonly isUnlockedMetadata: boolean;
    readonly isUnlockedAttributes: boolean;
    readonly type: 'Transferable' | 'UnlockedMetadata' | 'UnlockedAttributes';
  }

  /** @name GafiSupportGameTypesTradeType (136) */
  interface GafiSupportGameTypesTradeType extends Enum {
    readonly isSetPrice: boolean;
    readonly isSetBuy: boolean;
    readonly isBundle: boolean;
    readonly isWishlist: boolean;
    readonly isAuction: boolean;
    readonly isSwap: boolean;
    readonly type: 'SetPrice' | 'SetBuy' | 'Bundle' | 'Wishlist' | 'Auction' | 'Swap';
  }

  /** @name GafiSupportGameTypesMintSettings (138) */
  interface GafiSupportGameTypesMintSettings extends Struct {
    readonly mintType: GafiSupportGameTypesMintType;
    readonly price: u128;
    readonly startBlock: Option<u32>;
    readonly endBlock: Option<u32>;
  }

  /** @name GafiSupportGameTypesMintType (139) */
  interface GafiSupportGameTypesMintType extends Enum {
    readonly isPublic: boolean;
    readonly isHolderOf: boolean;
    readonly asHolderOf: u32;
    readonly type: 'Public' | 'HolderOf';
  }

  /** @name GameRandomnessCall (140) */
  interface GameRandomnessCall extends Enum {
    readonly isSubmitRandomSeedUnsigned: boolean;
    readonly asSubmitRandomSeedUnsigned: {
      readonly blockNumber: u32;
      readonly seed: U8aFixed;
    } & Struct;
    readonly type: 'SubmitRandomSeedUnsigned';
  }

  /** @name PalletFaucetCall (141) */
  interface PalletFaucetCall extends Enum {
    readonly isFaucet: boolean;
    readonly isDonate: boolean;
    readonly asDonate: {
      readonly amount: u128;
    } & Struct;
    readonly type: 'Faucet' | 'Donate';
  }

  /** @name PalletSudoError (142) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletNftsCollectionDetails (143) */
  interface PalletNftsCollectionDetails extends Struct {
    readonly owner: AccountId32;
    readonly ownerDeposit: u128;
    readonly items: u32;
    readonly itemMetadatas: u32;
    readonly itemConfigs: u32;
    readonly attributes: u32;
  }

  /** @name PalletNftsCollectionRole (148) */
  interface PalletNftsCollectionRole extends Enum {
    readonly isIssuer: boolean;
    readonly isFreezer: boolean;
    readonly isAdmin: boolean;
    readonly type: 'Issuer' | 'Freezer' | 'Admin';
  }

  /** @name PalletNftsItemDetails (149) */
  interface PalletNftsItemDetails extends Struct {
    readonly owner: AccountId32;
    readonly approvals: BTreeMap<AccountId32, Option<u32>>;
    readonly deposit: PalletNftsItemDeposit;
  }

  /** @name PalletNftsItemDeposit (150) */
  interface PalletNftsItemDeposit extends Struct {
    readonly account: AccountId32;
    readonly amount: u128;
  }

  /** @name PalletNftsCollectionMetadata (155) */
  interface PalletNftsCollectionMetadata extends Struct {
    readonly deposit: u128;
    readonly data: Bytes;
  }

  /** @name PalletNftsItemMetadata (156) */
  interface PalletNftsItemMetadata extends Struct {
    readonly deposit: PalletNftsItemMetadataDeposit;
    readonly data: Bytes;
  }

  /** @name PalletNftsItemMetadataDeposit (157) */
  interface PalletNftsItemMetadataDeposit extends Struct {
    readonly account: Option<AccountId32>;
    readonly amount: u128;
  }

  /** @name PalletNftsAttributeDeposit (160) */
  interface PalletNftsAttributeDeposit extends Struct {
    readonly account: Option<AccountId32>;
    readonly amount: u128;
  }

  /** @name PalletNftsPendingSwap (164) */
  interface PalletNftsPendingSwap extends Struct {
    readonly desiredCollection: u32;
    readonly desiredItem: Option<u32>;
    readonly price: Option<PalletNftsPriceWithDirection>;
    readonly deadline: u32;
  }

  /** @name PalletNftsCollectionConfig (165) */
  interface PalletNftsCollectionConfig extends Struct {
    readonly settings: u64;
    readonly maxSupply: Option<u32>;
    readonly mintSettings: PalletNftsMintSettings;
  }

  /** @name PalletNftsCollectionSetting (167) */
  interface PalletNftsCollectionSetting extends Enum {
    readonly isTransferableItems: boolean;
    readonly isUnlockedMetadata: boolean;
    readonly isUnlockedAttributes: boolean;
    readonly isUnlockedMaxSupply: boolean;
    readonly isDepositRequired: boolean;
    readonly type: 'TransferableItems' | 'UnlockedMetadata' | 'UnlockedAttributes' | 'UnlockedMaxSupply' | 'DepositRequired';
  }

  /** @name PalletNftsMintSettings (168) */
  interface PalletNftsMintSettings extends Struct {
    readonly mintType: PalletNftsMintType;
    readonly price: Option<u128>;
    readonly startBlock: Option<u32>;
    readonly endBlock: Option<u32>;
    readonly defaultItemSettings: u64;
  }

  /** @name PalletNftsMintType (169) */
  interface PalletNftsMintType extends Enum {
    readonly isIssuer: boolean;
    readonly isPublic: boolean;
    readonly isHolderOf: boolean;
    readonly asHolderOf: u32;
    readonly type: 'Issuer' | 'Public' | 'HolderOf';
  }

  /** @name PalletNftsPalletFeature (171) */
  interface PalletNftsPalletFeature extends Enum {
    readonly isTrading: boolean;
    readonly isAttributes: boolean;
    readonly isApprovals: boolean;
    readonly isSwaps: boolean;
    readonly type: 'Trading' | 'Attributes' | 'Approvals' | 'Swaps';
  }

  /** @name PalletNftsError (172) */
  interface PalletNftsError extends Enum {
    readonly isNoPermission: boolean;
    readonly isUnknownCollection: boolean;
    readonly isAlreadyExists: boolean;
    readonly isApprovalExpired: boolean;
    readonly isWrongOwner: boolean;
    readonly isBadWitness: boolean;
    readonly isCollectionIdInUse: boolean;
    readonly isItemsNonTransferable: boolean;
    readonly isNotDelegate: boolean;
    readonly isWrongDelegate: boolean;
    readonly isUnapproved: boolean;
    readonly isUnaccepted: boolean;
    readonly isItemLocked: boolean;
    readonly isLockedItemAttributes: boolean;
    readonly isLockedCollectionAttributes: boolean;
    readonly isLockedItemMetadata: boolean;
    readonly isLockedCollectionMetadata: boolean;
    readonly isMaxSupplyReached: boolean;
    readonly isMaxSupplyLocked: boolean;
    readonly isMaxSupplyTooSmall: boolean;
    readonly isUnknownItem: boolean;
    readonly isUnknownSwap: boolean;
    readonly isMetadataNotFound: boolean;
    readonly isAttributeNotFound: boolean;
    readonly isNotForSale: boolean;
    readonly isBidTooLow: boolean;
    readonly isReachedApprovalLimit: boolean;
    readonly isDeadlineExpired: boolean;
    readonly isWrongDuration: boolean;
    readonly isMethodDisabled: boolean;
    readonly isWrongSetting: boolean;
    readonly isInconsistentItemConfig: boolean;
    readonly isNoConfig: boolean;
    readonly isRolesNotCleared: boolean;
    readonly isMintNotStarted: boolean;
    readonly isMintEnded: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isIncorrectData: boolean;
    readonly isWrongOrigin: boolean;
    readonly isWrongSignature: boolean;
    readonly isIncorrectMetadata: boolean;
    readonly isMaxAttributesLimitReached: boolean;
    readonly isWrongNamespace: boolean;
    readonly isCollectionNotEmpty: boolean;
    readonly type: 'NoPermission' | 'UnknownCollection' | 'AlreadyExists' | 'ApprovalExpired' | 'WrongOwner' | 'BadWitness' | 'CollectionIdInUse' | 'ItemsNonTransferable' | 'NotDelegate' | 'WrongDelegate' | 'Unapproved' | 'Unaccepted' | 'ItemLocked' | 'LockedItemAttributes' | 'LockedCollectionAttributes' | 'LockedItemMetadata' | 'LockedCollectionMetadata' | 'MaxSupplyReached' | 'MaxSupplyLocked' | 'MaxSupplyTooSmall' | 'UnknownItem' | 'UnknownSwap' | 'MetadataNotFound' | 'AttributeNotFound' | 'NotForSale' | 'BidTooLow' | 'ReachedApprovalLimit' | 'DeadlineExpired' | 'WrongDuration' | 'MethodDisabled' | 'WrongSetting' | 'InconsistentItemConfig' | 'NoConfig' | 'RolesNotCleared' | 'MintNotStarted' | 'MintEnded' | 'AlreadyClaimed' | 'IncorrectData' | 'WrongOrigin' | 'WrongSignature' | 'IncorrectMetadata' | 'MaxAttributesLimitReached' | 'WrongNamespace' | 'CollectionNotEmpty';
  }

  /** @name PalletGameGameDetails (173) */
  interface PalletGameGameDetails extends Struct {
    readonly owner: AccountId32;
    readonly ownerDeposit: u128;
    readonly collections: u32;
    readonly admin: AccountId32;
  }

  /** @name PalletGamePoolDetails (177) */
  interface PalletGamePoolDetails extends Struct {
    readonly poolType: GafiSupportGameTypesPoolType;
    readonly owner: AccountId32;
    readonly ownerDeposit: u128;
    readonly admin: AccountId32;
    readonly mintSettings: GafiSupportGameTypesMintSettings;
  }

  /** @name PalletGameUpgradeItemConfig (179) */
  interface PalletGameUpgradeItemConfig extends Struct {
    readonly item: u32;
    readonly fee: u128;
  }

  /** @name PalletGameTradeConfig (181) */
  interface PalletGameTradeConfig extends Struct {
    readonly trade: GafiSupportGameTypesTradeType;
    readonly owner: AccountId32;
    readonly maybePrice: Option<u128>;
    readonly maybeRequired: Option<Vec<GafiSupportGameTypesPackage>>;
    readonly startBlock: Option<u32>;
    readonly endBlock: Option<u32>;
  }

  /** @name PalletGameAuctionConfig (183) */
  interface PalletGameAuctionConfig extends Struct {
    readonly owner: AccountId32;
    readonly maybePrice: Option<u128>;
    readonly startBlock: u32;
    readonly duration: u32;
  }

  /** @name PalletGameError (184) */
  interface PalletGameError extends Enum {
    readonly isNoPermission: boolean;
    readonly isUnknownGame: boolean;
    readonly isUnknownCollection: boolean;
    readonly isUnknownItem: boolean;
    readonly isUnknownTrade: boolean;
    readonly isUnknownUpgrade: boolean;
    readonly isUnknownAuction: boolean;
    readonly isUnknownBid: boolean;
    readonly isUnknownAcceptance: boolean;
    readonly isUnknownMiningPool: boolean;
    readonly isExceedMaxItem: boolean;
    readonly isExceedTotalAmount: boolean;
    readonly isExceedAllowedAmount: boolean;
    readonly isExceedMaxCollection: boolean;
    readonly isExceedMaxGameShare: boolean;
    readonly isExceedMaxBundle: boolean;
    readonly isExceedMaxLoot: boolean;
    readonly isSoldOut: boolean;
    readonly isWithdrawReserveFailed: boolean;
    readonly isUpgradeExists: boolean;
    readonly isCollectionExists: boolean;
    readonly isInsufficientItemBalance: boolean;
    readonly isInsufficientReservedBalance: boolean;
    readonly isInvalidAmount: boolean;
    readonly isItemLocked: boolean;
    readonly isBidTooLow: boolean;
    readonly isAskTooHigh: boolean;
    readonly isGameIdInUse: boolean;
    readonly isTradeIdInUse: boolean;
    readonly isPoolIdInUse: boolean;
    readonly isTradeNotStarted: boolean;
    readonly isTradeEnded: boolean;
    readonly isIncorrectCollection: boolean;
    readonly isIncorrectItem: boolean;
    readonly isAuctionInProgress: boolean;
    readonly isAuctionNotStarted: boolean;
    readonly isAuctionEnded: boolean;
    readonly isNotSetPrice: boolean;
    readonly isNotBundle: boolean;
    readonly isNotWishlist: boolean;
    readonly isNotSwap: boolean;
    readonly isNotAuction: boolean;
    readonly isNotSetBuy: boolean;
    readonly isInfiniteSupply: boolean;
    readonly isNotInfiniteSupply: boolean;
    readonly isMintFailed: boolean;
    readonly isMintNotStarted: boolean;
    readonly isMintEnded: boolean;
    readonly isNotWhitelisted: boolean;
    readonly type: 'NoPermission' | 'UnknownGame' | 'UnknownCollection' | 'UnknownItem' | 'UnknownTrade' | 'UnknownUpgrade' | 'UnknownAuction' | 'UnknownBid' | 'UnknownAcceptance' | 'UnknownMiningPool' | 'ExceedMaxItem' | 'ExceedTotalAmount' | 'ExceedAllowedAmount' | 'ExceedMaxCollection' | 'ExceedMaxGameShare' | 'ExceedMaxBundle' | 'ExceedMaxLoot' | 'SoldOut' | 'WithdrawReserveFailed' | 'UpgradeExists' | 'CollectionExists' | 'InsufficientItemBalance' | 'InsufficientReservedBalance' | 'InvalidAmount' | 'ItemLocked' | 'BidTooLow' | 'AskTooHigh' | 'GameIdInUse' | 'TradeIdInUse' | 'PoolIdInUse' | 'TradeNotStarted' | 'TradeEnded' | 'IncorrectCollection' | 'IncorrectItem' | 'AuctionInProgress' | 'AuctionNotStarted' | 'AuctionEnded' | 'NotSetPrice' | 'NotBundle' | 'NotWishlist' | 'NotSwap' | 'NotAuction' | 'NotSetBuy' | 'InfiniteSupply' | 'NotInfiniteSupply' | 'MintFailed' | 'MintNotStarted' | 'MintEnded' | 'NotWhitelisted';
  }

  /** @name GameRandomnessSeedPayload (185) */
  interface GameRandomnessSeedPayload extends Struct {
    readonly blockNumber: u32;
    readonly seed: U8aFixed;
  }

  /** @name FrameSupportPalletId (186) */
  interface FrameSupportPalletId extends U8aFixed {}

  /** @name GameRandomnessError (187) */
  interface GameRandomnessError extends Enum {
    readonly isInvalidSeed: boolean;
    readonly type: 'InvalidSeed';
  }

  /** @name PalletFaucetError (189) */
  interface PalletFaucetError extends Enum {
    readonly isSelfTransfer: boolean;
    readonly isNotEnoughBalance: boolean;
    readonly isDontBeGreedy: boolean;
    readonly isPleaseWait: boolean;
    readonly isOutOfFaucet: boolean;
    readonly type: 'SelfTransfer' | 'NotEnoughBalance' | 'DontBeGreedy' | 'PleaseWait' | 'OutOfFaucet';
  }

  /** @name PalletCacheFlag (190) */
  interface PalletCacheFlag extends Enum {
    readonly isLeft: boolean;
    readonly isRight: boolean;
    readonly type: 'Left' | 'Right';
  }

  /** @name PalletCacheWrapData (192) */
  interface PalletCacheWrapData extends Struct {
    readonly data: u128;
    readonly timestamp: u128;
  }

  /** @name PalletCacheError (193) */
  type PalletCacheError = Null;

  /** @name SpRuntimeMultiSignature (195) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (196) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (197) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckNonZeroSender (200) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (201) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (202) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (203) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (206) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (207) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (208) */
  interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name Game3RuntimeRuntime (209) */
  type Game3RuntimeRuntime = Null;

} // declare module
