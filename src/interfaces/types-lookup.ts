// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

declare module '@polkadot/types/lookup' {
  import type { Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U256, U8aFixed, Vec, bool, u128, u32, u64, u8 } from '@polkadot/types-codec';
  import type { ITuple } from '@polkadot/types-codec/types';
  import type { AccountId32, Call, H160, H256, MultiAddress, Perbill, Permill } from '@polkadot/types/interfaces/runtime';
  import type { Event } from '@polkadot/types/interfaces/system';

  /** @name FrameSystemAccountInfo (3) */
  export interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  export interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  export interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  export interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
  export interface SpRuntimeDigestDigestItem extends Enum {
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

  /** @name FrameSystemEventRecord (16) */
  export interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (18) */
  export interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
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

  /** @name FrameSupportWeightsDispatchInfo (19) */
  export interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (20) */
  export interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (21) */
  export interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (22) */
  export interface SpRuntimeDispatchError extends Enum {
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
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional';
  }

  /** @name SpRuntimeModuleError (23) */
  export interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (24) */
  export interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpRuntimeArithmeticError (25) */
  export interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (26) */
  export interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletGrandpaEvent (27) */
  export interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (30) */
  export interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (31) */
  export interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletBalancesEvent (32) */
  export interface PalletBalancesEvent extends Enum {
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
      readonly reserved: u128;
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
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (33) */
  export interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletSudoEvent (34) */
  export interface PalletSudoEvent extends Enum {
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

  /** @name PalletEthereumEvent (38) */
  export interface PalletEthereumEvent extends Enum {
    readonly isExecuted: boolean;
    readonly asExecuted: ITuple<[H160, H160, H256, EvmCoreErrorExitReason]>;
    readonly type: 'Executed';
  }

  /** @name EvmCoreErrorExitReason (41) */
  export interface EvmCoreErrorExitReason extends Enum {
    readonly isSucceed: boolean;
    readonly asSucceed: EvmCoreErrorExitSucceed;
    readonly isError: boolean;
    readonly asError: EvmCoreErrorExitError;
    readonly isRevert: boolean;
    readonly asRevert: EvmCoreErrorExitRevert;
    readonly isFatal: boolean;
    readonly asFatal: EvmCoreErrorExitFatal;
    readonly type: 'Succeed' | 'Error' | 'Revert' | 'Fatal';
  }

  /** @name EvmCoreErrorExitSucceed (42) */
  export interface EvmCoreErrorExitSucceed extends Enum {
    readonly isStopped: boolean;
    readonly isReturned: boolean;
    readonly isSuicided: boolean;
    readonly type: 'Stopped' | 'Returned' | 'Suicided';
  }

  /** @name EvmCoreErrorExitError (43) */
  export interface EvmCoreErrorExitError extends Enum {
    readonly isStackUnderflow: boolean;
    readonly isStackOverflow: boolean;
    readonly isInvalidJump: boolean;
    readonly isInvalidRange: boolean;
    readonly isDesignatedInvalid: boolean;
    readonly isCallTooDeep: boolean;
    readonly isCreateCollision: boolean;
    readonly isCreateContractLimit: boolean;
    readonly isOutOfOffset: boolean;
    readonly isOutOfGas: boolean;
    readonly isOutOfFund: boolean;
    readonly isPcUnderflow: boolean;
    readonly isCreateEmpty: boolean;
    readonly isOther: boolean;
    readonly asOther: Text;
    readonly isInvalidCode: boolean;
    readonly type: 'StackUnderflow' | 'StackOverflow' | 'InvalidJump' | 'InvalidRange' | 'DesignatedInvalid' | 'CallTooDeep' | 'CreateCollision' | 'CreateContractLimit' | 'OutOfOffset' | 'OutOfGas' | 'OutOfFund' | 'PcUnderflow' | 'CreateEmpty' | 'Other' | 'InvalidCode';
  }

  /** @name EvmCoreErrorExitRevert (46) */
  export interface EvmCoreErrorExitRevert extends Enum {
    readonly isReverted: boolean;
    readonly type: 'Reverted';
  }

  /** @name EvmCoreErrorExitFatal (47) */
  export interface EvmCoreErrorExitFatal extends Enum {
    readonly isNotSupported: boolean;
    readonly isUnhandledInterrupt: boolean;
    readonly isCallErrorAsFatal: boolean;
    readonly asCallErrorAsFatal: EvmCoreErrorExitError;
    readonly isOther: boolean;
    readonly asOther: Text;
    readonly type: 'NotSupported' | 'UnhandledInterrupt' | 'CallErrorAsFatal' | 'Other';
  }

  /** @name PalletEvmEvent (48) */
  export interface PalletEvmEvent extends Enum {
    readonly isLog: boolean;
    readonly asLog: EthereumLog;
    readonly isCreated: boolean;
    readonly asCreated: H160;
    readonly isCreatedFailed: boolean;
    readonly asCreatedFailed: H160;
    readonly isExecuted: boolean;
    readonly asExecuted: H160;
    readonly isExecutedFailed: boolean;
    readonly asExecutedFailed: H160;
    readonly isBalanceDeposit: boolean;
    readonly asBalanceDeposit: ITuple<[AccountId32, H160, U256]>;
    readonly isBalanceWithdraw: boolean;
    readonly asBalanceWithdraw: ITuple<[AccountId32, H160, U256]>;
    readonly type: 'Log' | 'Created' | 'CreatedFailed' | 'Executed' | 'ExecutedFailed' | 'BalanceDeposit' | 'BalanceWithdraw';
  }

  /** @name EthereumLog (49) */
  export interface EthereumLog extends Struct {
    readonly address: H160;
    readonly topics: Vec<H256>;
    readonly data: Bytes;
  }

  /** @name PalletBaseFeeEvent (53) */
  export interface PalletBaseFeeEvent extends Enum {
    readonly isNewBaseFeePerGas: boolean;
    readonly asNewBaseFeePerGas: U256;
    readonly isBaseFeeOverflow: boolean;
    readonly isIsActive: boolean;
    readonly asIsActive: bool;
    readonly isNewElasticity: boolean;
    readonly asNewElasticity: Permill;
    readonly type: 'NewBaseFeePerGas' | 'BaseFeeOverflow' | 'IsActive' | 'NewElasticity';
  }

  /** @name PalletPlayerEvent (56) */
  export interface PalletPlayerEvent extends Enum {
    readonly isNewPlayerCreated: boolean;
    readonly asNewPlayerCreated: ITuple<[AccountId32, U8aFixed]>;
    readonly type: 'NewPlayerCreated';
  }

  /** @name PalletPoolEvent (57) */
  export interface PalletPoolEvent extends Enum {
    readonly isJoined: boolean;
    readonly asJoined: {
      readonly sender: AccountId32;
      readonly ticket: GafiPrimitivesTicketTicketType;
    } & Struct;
    readonly isLeaved: boolean;
    readonly asLeaved: {
      readonly sender: AccountId32;
      readonly ticket: GafiPrimitivesTicketTicketType;
    } & Struct;
    readonly type: 'Joined' | 'Leaved';
  }

  /** @name GafiPrimitivesTicketTicketType (58) */
  export interface GafiPrimitivesTicketTicketType extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: GafiPrimitivesTicketSystemTicket;
    readonly isCustom: boolean;
    readonly asCustom: GafiPrimitivesTicketCustomTicket;
    readonly type: 'System' | 'Custom';
  }

  /** @name GafiPrimitivesTicketSystemTicket (59) */
  export interface GafiPrimitivesTicketSystemTicket extends Enum {
    readonly isUpfront: boolean;
    readonly asUpfront: GafiPrimitivesTicketTicketLevel;
    readonly isStaking: boolean;
    readonly asStaking: GafiPrimitivesTicketTicketLevel;
    readonly type: 'Upfront' | 'Staking';
  }

  /** @name GafiPrimitivesTicketTicketLevel (60) */
  export interface GafiPrimitivesTicketTicketLevel extends Enum {
    readonly isBasic: boolean;
    readonly isMedium: boolean;
    readonly isAdvance: boolean;
    readonly type: 'Basic' | 'Medium' | 'Advance';
  }

  /** @name GafiPrimitivesTicketCustomTicket (61) */
  export interface GafiPrimitivesTicketCustomTicket extends Enum {
    readonly isSponsored: boolean;
    readonly asSponsored: U8aFixed;
    readonly type: 'Sponsored';
  }

  /** @name UpfrontPoolEvent (62) */
  export interface UpfrontPoolEvent extends Enum {
    readonly isChargePoolService: boolean;
    readonly isUpfrontSetMaxPlayer: boolean;
    readonly asUpfrontSetMaxPlayer: {
      readonly newMaxPlayer: u32;
    } & Struct;
    readonly type: 'ChargePoolService' | 'UpfrontSetMaxPlayer';
  }

  /** @name StakingPoolEvent (63) */
  export interface StakingPoolEvent extends Enum {
    readonly isStakingNewMaxPlayer: boolean;
    readonly asStakingNewMaxPlayer: {
      readonly newMaxPlayer: u32;
    } & Struct;
    readonly type: 'StakingNewMaxPlayer';
  }

  /** @name SponsoredPoolEvent (64) */
  export interface SponsoredPoolEvent extends Enum {
    readonly isCreatedPool: boolean;
    readonly asCreatedPool: {
      readonly id: U8aFixed;
    } & Struct;
    readonly isWithdrew: boolean;
    readonly asWithdrew: {
      readonly id: U8aFixed;
    } & Struct;
    readonly type: 'CreatedPool' | 'Withdrew';
  }

  /** @name GafiTxEvent (65) */
  export interface GafiTxEvent extends Enum {
    readonly isSetGasPrice: boolean;
    readonly asSetGasPrice: {
      readonly value: U256;
    } & Struct;
    readonly type: 'SetGasPrice';
  }

  /** @name ProofAddressMappingEvent (66) */
  export interface ProofAddressMappingEvent extends Enum {
    readonly isBonded: boolean;
    readonly asBonded: {
      readonly sender: AccountId32;
      readonly address: H160;
    } & Struct;
    readonly isUnbonded: boolean;
    readonly asUnbonded: {
      readonly sender: AccountId32;
      readonly address: H160;
    } & Struct;
    readonly type: 'Bonded' | 'Unbonded';
  }

  /** @name PalletCacheEvent (67) */
  export type PalletCacheEvent = Null;

  /** @name PalletFaucetEvent (69) */
  export interface PalletFaucetEvent extends Enum {
    readonly isTransferred: boolean;
    readonly asTransferred: ITuple<[AccountId32, AccountId32, u128]>;
    readonly type: 'Transferred';
  }

  /** @name GameCreatorEvent (70) */
  export interface GameCreatorEvent extends Enum {
    readonly isClaimed: boolean;
    readonly asClaimed: {
      readonly contract: H160;
      readonly owner: AccountId32;
    } & Struct;
    readonly isChanged: boolean;
    readonly asChanged: {
      readonly contract: H160;
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isWithdrew: boolean;
    readonly asWithdrew: {
      readonly contract: H160;
      readonly owner: AccountId32;
    } & Struct;
    readonly type: 'Claimed' | 'Changed' | 'Withdrew';
  }

  /** @name PalletPoolNamesEvent (71) */
  export interface PalletPoolNamesEvent extends Enum {
    readonly isNameSet: boolean;
    readonly asNameSet: {
      readonly pool: U8aFixed;
    } & Struct;
    readonly isNameForced: boolean;
    readonly asNameForced: {
      readonly target: U8aFixed;
    } & Struct;
    readonly isNameChanged: boolean;
    readonly asNameChanged: {
      readonly pool: U8aFixed;
    } & Struct;
    readonly isNameCleared: boolean;
    readonly asNameCleared: {
      readonly pool: U8aFixed;
      readonly deposit: u128;
    } & Struct;
    readonly isNameKilled: boolean;
    readonly asNameKilled: {
      readonly target: U8aFixed;
      readonly deposit: u128;
    } & Struct;
    readonly type: 'NameSet' | 'NameForced' | 'NameChanged' | 'NameCleared' | 'NameKilled';
  }

  /** @name FrameSystemPhase (72) */
  export interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (75) */
  export interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (77) */
  export interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
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
    readonly type: 'FillBlock' | 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (82) */
  export interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (83) */
  export interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (84) */
  export interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (86) */
  export interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (87) */
  export interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (88) */
  export interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (89) */
  export interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (95) */
  export interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name PalletTimestampCall (97) */
  export interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletGrandpaStoredState (99) */
  export interface PalletGrandpaStoredState extends Enum {
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

  /** @name PalletGrandpaStoredPendingChange (100) */
  export interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaCall (103) */
  export interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpCoreVoid;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (104) */
  export interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (105) */
  export interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (106) */
  export interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (107) */
  export interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (108) */
  export interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (109) */
  export interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (112) */
  export interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (113) */
  export interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpCoreVoid (115) */
  export type SpCoreVoid = Null;

  /** @name PalletGrandpaError (116) */
  export interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletBalancesBalanceLock (118) */
  export interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (119) */
  export interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (122) */
  export interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PalletBalancesReleases (124) */
  export interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesCall (125) */
  export interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
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
    readonly type: 'Transfer' | 'SetBalance' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve';
  }

  /** @name PalletBalancesError (129) */
  export interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'KeepAlive' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name PalletTransactionPaymentReleases (131) */
  export interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name FrameSupportWeightsWeightToFeeCoefficient (133) */
  export interface FrameSupportWeightsWeightToFeeCoefficient extends Struct {
    readonly coeffInteger: u128;
    readonly coeffFrac: Perbill;
    readonly negative: bool;
    readonly degree: u8;
  }

  /** @name PalletSudoCall (134) */
  export interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
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

  /** @name PalletEthereumCall (136) */
  export interface PalletEthereumCall extends Enum {
    readonly isTransact: boolean;
    readonly asTransact: {
      readonly transaction: EthereumTransactionTransactionV2;
    } & Struct;
    readonly type: 'Transact';
  }

  /** @name EthereumTransactionTransactionV2 (137) */
  export interface EthereumTransactionTransactionV2 extends Enum {
    readonly isLegacy: boolean;
    readonly asLegacy: EthereumTransactionLegacyTransaction;
    readonly isEip2930: boolean;
    readonly asEip2930: EthereumTransactionEip2930Transaction;
    readonly isEip1559: boolean;
    readonly asEip1559: EthereumTransactionEip1559Transaction;
    readonly type: 'Legacy' | 'Eip2930' | 'Eip1559';
  }

  /** @name EthereumTransactionLegacyTransaction (138) */
  export interface EthereumTransactionLegacyTransaction extends Struct {
    readonly nonce: U256;
    readonly gasPrice: U256;
    readonly gasLimit: U256;
    readonly action: EthereumTransactionTransactionAction;
    readonly value: U256;
    readonly input: Bytes;
    readonly signature: EthereumTransactionTransactionSignature;
  }

  /** @name EthereumTransactionTransactionAction (139) */
  export interface EthereumTransactionTransactionAction extends Enum {
    readonly isCall: boolean;
    readonly asCall: H160;
    readonly isCreate: boolean;
    readonly type: 'Call' | 'Create';
  }

  /** @name EthereumTransactionTransactionSignature (140) */
  export interface EthereumTransactionTransactionSignature extends Struct {
    readonly v: u64;
    readonly r: H256;
    readonly s: H256;
  }

  /** @name EthereumTransactionEip2930Transaction (142) */
  export interface EthereumTransactionEip2930Transaction extends Struct {
    readonly chainId: u64;
    readonly nonce: U256;
    readonly gasPrice: U256;
    readonly gasLimit: U256;
    readonly action: EthereumTransactionTransactionAction;
    readonly value: U256;
    readonly input: Bytes;
    readonly accessList: Vec<EthereumTransactionAccessListItem>;
    readonly oddYParity: bool;
    readonly r: H256;
    readonly s: H256;
  }

  /** @name EthereumTransactionAccessListItem (144) */
  export interface EthereumTransactionAccessListItem extends Struct {
    readonly address: H160;
    readonly storageKeys: Vec<H256>;
  }

  /** @name EthereumTransactionEip1559Transaction (145) */
  export interface EthereumTransactionEip1559Transaction extends Struct {
    readonly chainId: u64;
    readonly nonce: U256;
    readonly maxPriorityFeePerGas: U256;
    readonly maxFeePerGas: U256;
    readonly gasLimit: U256;
    readonly action: EthereumTransactionTransactionAction;
    readonly value: U256;
    readonly input: Bytes;
    readonly accessList: Vec<EthereumTransactionAccessListItem>;
    readonly oddYParity: bool;
    readonly r: H256;
    readonly s: H256;
  }

  /** @name PalletEvmCall (146) */
  export interface PalletEvmCall extends Enum {
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly address: H160;
      readonly value: u128;
    } & Struct;
    readonly isCall: boolean;
    readonly asCall: {
      readonly source: H160;
      readonly target: H160;
      readonly input: Bytes;
      readonly value: U256;
      readonly gasLimit: u64;
      readonly maxFeePerGas: U256;
      readonly maxPriorityFeePerGas: Option<U256>;
      readonly nonce: Option<U256>;
      readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
    } & Struct;
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly source: H160;
      readonly init: Bytes;
      readonly value: U256;
      readonly gasLimit: u64;
      readonly maxFeePerGas: U256;
      readonly maxPriorityFeePerGas: Option<U256>;
      readonly nonce: Option<U256>;
      readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
    } & Struct;
    readonly isCreate2: boolean;
    readonly asCreate2: {
      readonly source: H160;
      readonly init: Bytes;
      readonly salt: H256;
      readonly value: U256;
      readonly gasLimit: u64;
      readonly maxFeePerGas: U256;
      readonly maxPriorityFeePerGas: Option<U256>;
      readonly nonce: Option<U256>;
      readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
    } & Struct;
    readonly type: 'Withdraw' | 'Call' | 'Create' | 'Create2';
  }

  /** @name PalletDynamicFeeCall (150) */
  export interface PalletDynamicFeeCall extends Enum {
    readonly isNoteMinGasPriceTarget: boolean;
    readonly asNoteMinGasPriceTarget: {
      readonly target: U256;
    } & Struct;
    readonly type: 'NoteMinGasPriceTarget';
  }

  /** @name PalletBaseFeeCall (151) */
  export interface PalletBaseFeeCall extends Enum {
    readonly isSetBaseFeePerGas: boolean;
    readonly asSetBaseFeePerGas: {
      readonly fee: U256;
    } & Struct;
    readonly isSetIsActive: boolean;
    readonly asSetIsActive: {
      readonly isActive: bool;
    } & Struct;
    readonly isSetElasticity: boolean;
    readonly asSetElasticity: {
      readonly elasticity: Permill;
    } & Struct;
    readonly type: 'SetBaseFeePerGas' | 'SetIsActive' | 'SetElasticity';
  }

  /** @name PalletPlayerCall (152) */
  export interface PalletPlayerCall extends Enum {
    readonly isCreatePlayer: boolean;
    readonly asCreatePlayer: {
      readonly name: U8aFixed;
    } & Struct;
    readonly type: 'CreatePlayer';
  }

  /** @name PalletPoolCall (154) */
  export interface PalletPoolCall extends Enum {
    readonly isJoin: boolean;
    readonly asJoin: {
      readonly ticket: GafiPrimitivesTicketTicketType;
    } & Struct;
    readonly isLeave: boolean;
    readonly type: 'Join' | 'Leave';
  }

  /** @name UpfrontPoolCall (155) */
  export interface UpfrontPoolCall extends Enum {
    readonly isSetMaxPlayer: boolean;
    readonly asSetMaxPlayer: {
      readonly maxPlayer: u32;
    } & Struct;
    readonly type: 'SetMaxPlayer';
  }

  /** @name StakingPoolCall (156) */
  export interface StakingPoolCall extends Enum {
    readonly isSetMaxPlayer: boolean;
    readonly asSetMaxPlayer: {
      readonly newMaxPlayer: u32;
    } & Struct;
    readonly type: 'SetMaxPlayer';
  }

  /** @name SponsoredPoolCall (157) */
  export interface SponsoredPoolCall extends Enum {
    readonly isCreatePool: boolean;
    readonly asCreatePool: {
      readonly targets: Vec<H160>;
      readonly value: u128;
      readonly discount: Permill;
      readonly txLimit: u32;
    } & Struct;
    readonly isWithdrawPool: boolean;
    readonly asWithdrawPool: {
      readonly poolId: U8aFixed;
    } & Struct;
    readonly isNewTargets: boolean;
    readonly asNewTargets: {
      readonly poolId: U8aFixed;
      readonly targets: Vec<H160>;
    } & Struct;
    readonly isSetPoolName: boolean;
    readonly asSetPoolName: {
      readonly poolId: U8aFixed;
      readonly name: Bytes;
    } & Struct;
    readonly isClearPoolName: boolean;
    readonly asClearPoolName: {
      readonly poolId: U8aFixed;
    } & Struct;
    readonly isKillPoolName: boolean;
    readonly asKillPoolName: {
      readonly poolId: U8aFixed;
    } & Struct;
    readonly type: 'CreatePool' | 'WithdrawPool' | 'NewTargets' | 'SetPoolName' | 'ClearPoolName' | 'KillPoolName';
  }

  /** @name GafiTxCall (159) */
  export interface GafiTxCall extends Enum {
    readonly isSetGasPrice: boolean;
    readonly asSetGasPrice: {
      readonly newGasPrice: U256;
    } & Struct;
    readonly type: 'SetGasPrice';
  }

  /** @name ProofAddressMappingCall (160) */
  export interface ProofAddressMappingCall extends Enum {
    readonly isBond: boolean;
    readonly asBond: {
      readonly signature: U8aFixed;
      readonly address: H160;
      readonly withdraw: bool;
    } & Struct;
    readonly isUnbond: boolean;
    readonly type: 'Bond' | 'Unbond';
  }

  /** @name PalletCacheCall (162) */
  export type PalletCacheCall = Null;

  /** @name PalletFaucetCall (164) */
  export interface PalletFaucetCall extends Enum {
    readonly isFaucet: boolean;
    readonly isDonate: boolean;
    readonly asDonate: {
      readonly amount: u128;
    } & Struct;
    readonly type: 'Faucet' | 'Donate';
  }

  /** @name GameCreatorCall (165) */
  export interface GameCreatorCall extends Enum {
    readonly isClaimContract: boolean;
    readonly asClaimContract: {
      readonly contract: H160;
    } & Struct;
    readonly isChangeOwnership: boolean;
    readonly asChangeOwnership: {
      readonly contract: H160;
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isWithdrawContract: boolean;
    readonly asWithdrawContract: {
      readonly contract: H160;
    } & Struct;
    readonly type: 'ClaimContract' | 'ChangeOwnership' | 'WithdrawContract';
  }

  /** @name PalletPoolNamesCall (166) */
  export type PalletPoolNamesCall = Null;

  /** @name PalletSudoError (167) */
  export interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name FpRpcTransactionStatus (170) */
  export interface FpRpcTransactionStatus extends Struct {
    readonly transactionHash: H256;
    readonly transactionIndex: u32;
    readonly from: H160;
    readonly to: Option<H160>;
    readonly contractAddress: Option<H160>;
    readonly logs: Vec<EthereumLog>;
    readonly logsBloom: EthbloomBloom;
  }

  /** @name EthbloomBloom (173) */
  export interface EthbloomBloom extends U8aFixed {}

  /** @name EthereumReceiptReceiptV3 (175) */
  export interface EthereumReceiptReceiptV3 extends Enum {
    readonly isLegacy: boolean;
    readonly asLegacy: EthereumReceiptEip658ReceiptData;
    readonly isEip2930: boolean;
    readonly asEip2930: EthereumReceiptEip658ReceiptData;
    readonly isEip1559: boolean;
    readonly asEip1559: EthereumReceiptEip658ReceiptData;
    readonly type: 'Legacy' | 'Eip2930' | 'Eip1559';
  }

  /** @name EthereumReceiptEip658ReceiptData (176) */
  export interface EthereumReceiptEip658ReceiptData extends Struct {
    readonly statusCode: u8;
    readonly usedGas: U256;
    readonly logsBloom: EthbloomBloom;
    readonly logs: Vec<EthereumLog>;
  }

  /** @name EthereumBlock (177) */
  export interface EthereumBlock extends Struct {
    readonly header: EthereumHeader;
    readonly transactions: Vec<EthereumTransactionTransactionV2>;
    readonly ommers: Vec<EthereumHeader>;
  }

  /** @name EthereumHeader (178) */
  export interface EthereumHeader extends Struct {
    readonly parentHash: H256;
    readonly ommersHash: H256;
    readonly beneficiary: H160;
    readonly stateRoot: H256;
    readonly transactionsRoot: H256;
    readonly receiptsRoot: H256;
    readonly logsBloom: EthbloomBloom;
    readonly difficulty: U256;
    readonly number: U256;
    readonly gasLimit: U256;
    readonly gasUsed: U256;
    readonly timestamp: u64;
    readonly extraData: Bytes;
    readonly mixHash: H256;
    readonly nonce: EthereumTypesHashH64;
  }

  /** @name EthereumTypesHashH64 (179) */
  export interface EthereumTypesHashH64 extends U8aFixed {}

  /** @name PalletEthereumError (184) */
  export interface PalletEthereumError extends Enum {
    readonly isInvalidSignature: boolean;
    readonly isPreLogExists: boolean;
    readonly type: 'InvalidSignature' | 'PreLogExists';
  }

  /** @name PalletEvmError (186) */
  export interface PalletEvmError extends Enum {
    readonly isBalanceLow: boolean;
    readonly isFeeOverflow: boolean;
    readonly isPaymentOverflow: boolean;
    readonly isWithdrawFailed: boolean;
    readonly isGasPriceTooLow: boolean;
    readonly isInvalidNonce: boolean;
    readonly type: 'BalanceLow' | 'FeeOverflow' | 'PaymentOverflow' | 'WithdrawFailed' | 'GasPriceTooLow' | 'InvalidNonce';
  }

  /** @name PalletPlayerPlayer (187) */
  export interface PalletPlayerPlayer extends Struct {
    readonly id: U8aFixed;
    readonly owner: AccountId32;
    readonly name: U8aFixed;
  }

  /** @name PalletPlayerError (188) */
  export interface PalletPlayerError extends Enum {
    readonly isPlayerIdUsed: boolean;
    readonly isPlayerExisted: boolean;
    readonly type: 'PlayerIdUsed' | 'PlayerExisted';
  }

  /** @name GafiPrimitivesTicketTicketInfo (189) */
  export interface GafiPrimitivesTicketTicketInfo extends Struct {
    readonly ticketType: GafiPrimitivesTicketTicketType;
    readonly tickets: u32;
  }

  /** @name PalletPoolError (190) */
  export interface PalletPoolError extends Enum {
    readonly isAlreadyJoined: boolean;
    readonly isNotFoundInPool: boolean;
    readonly isTicketNotFound: boolean;
    readonly isComingSoon: boolean;
    readonly type: 'AlreadyJoined' | 'NotFoundInPool' | 'TicketNotFound' | 'ComingSoon';
  }

  /** @name GafiPrimitivesTicket (191) */
  export interface GafiPrimitivesTicket extends Struct {
    readonly address: AccountId32;
    readonly joinTime: u128;
    readonly ticketType: GafiPrimitivesTicketTicketType;
  }

  /** @name GafiPrimitivesSystemServicesSystemService (192) */
  export interface GafiPrimitivesSystemServicesSystemService extends Struct {
    readonly service: GafiPrimitivesPoolService;
    readonly value: u128;
  }

  /** @name GafiPrimitivesPoolService (193) */
  export interface GafiPrimitivesPoolService extends Struct {
    readonly txLimit: u32;
    readonly discount: Permill;
  }

  /** @name UpfrontPoolError (196) */
  export interface UpfrontPoolError extends Enum {
    readonly isPlayerNotFound: boolean;
    readonly isPlayerCountOverflow: boolean;
    readonly isExceedMaxPlayer: boolean;
    readonly isCanNotClearNewPlayers: boolean;
    readonly isIntoBalanceFail: boolean;
    readonly isLevelNotFound: boolean;
    readonly type: 'PlayerNotFound' | 'PlayerCountOverflow' | 'ExceedMaxPlayer' | 'CanNotClearNewPlayers' | 'IntoBalanceFail' | 'LevelNotFound';
  }

  /** @name StakingPoolError (197) */
  export interface StakingPoolError extends Enum {
    readonly isPlayerNotStake: boolean;
    readonly isStakeCountOverflow: boolean;
    readonly isIntoBalanceFail: boolean;
    readonly isLevelNotFound: boolean;
    readonly type: 'PlayerNotStake' | 'StakeCountOverflow' | 'IntoBalanceFail' | 'LevelNotFound';
  }

  /** @name SponsoredPool (198) */
  export interface SponsoredPool extends Struct {
    readonly id: U8aFixed;
    readonly owner: AccountId32;
    readonly value: u128;
    readonly discount: Permill;
    readonly txLimit: u32;
  }

  /** @name SponsoredPoolError (202) */
  export interface SponsoredPoolError extends Enum {
    readonly isPoolIdExisted: boolean;
    readonly isIntoAccountFail: boolean;
    readonly isIntoU32Fail: boolean;
    readonly isNotTheOwner: boolean;
    readonly isPoolNotExist: boolean;
    readonly isExceedMaxPoolOwned: boolean;
    readonly isExceedPoolTarget: boolean;
    readonly isNotReachMinPoolBalance: boolean;
    readonly isLessThanMinTxLimit: boolean;
    readonly isGreaterThanMaxTxLimit: boolean;
    readonly isLessThanMinDiscountPercent: boolean;
    readonly isGreaterThanMinDiscountPercent: boolean;
    readonly type: 'PoolIdExisted' | 'IntoAccountFail' | 'IntoU32Fail' | 'NotTheOwner' | 'PoolNotExist' | 'ExceedMaxPoolOwned' | 'ExceedPoolTarget' | 'NotReachMinPoolBalance' | 'LessThanMinTxLimit' | 'GreaterThanMaxTxLimit' | 'LessThanMinDiscountPercent' | 'GreaterThanMinDiscountPercent';
  }

  /** @name GafiTxError (203) */
  export interface GafiTxError extends Enum {
    readonly isIntoBalanceFail: boolean;
    readonly isIntoAccountFail: boolean;
    readonly type: 'IntoBalanceFail' | 'IntoAccountFail';
  }

  /** @name ProofAddressMappingError (204) */
  export interface ProofAddressMappingError extends Enum {
    readonly isSignatureOrAddressNotCorrect: boolean;
    readonly isAlreadyBond: boolean;
    readonly isNonbondAccount: boolean;
    readonly type: 'SignatureOrAddressNotCorrect' | 'AlreadyBond' | 'NonbondAccount';
  }

  /** @name PalletCacheFlag (205) */
  export interface PalletCacheFlag extends Enum {
    readonly isLeft: boolean;
    readonly isRight: boolean;
    readonly type: 'Left' | 'Right';
  }

  /** @name PalletCacheWrapDataTicketInfo (207) */
  export interface PalletCacheWrapDataTicketInfo extends Struct {
    readonly data: GafiPrimitivesTicketTicketInfo;
    readonly timestamp: u128;
  }

  /** @name PalletCacheError (208) */
  export type PalletCacheError = Null;

  /** @name PalletCacheWrapDataU128 (210) */
  export interface PalletCacheWrapDataU128 extends Struct {
    readonly data: u128;
    readonly timestamp: u128;
  }

  /** @name PalletFaucetError (213) */
  export interface PalletFaucetError extends Enum {
    readonly isTransferToSelf: boolean;
    readonly isNotEnoughBalance: boolean;
    readonly isDontBeGreedy: boolean;
    readonly isPleaseWait: boolean;
    readonly type: 'TransferToSelf' | 'NotEnoughBalance' | 'DontBeGreedy' | 'PleaseWait';
  }

  /** @name GameCreatorError (214) */
  export interface GameCreatorError extends Enum {
    readonly isNotContractOwner: boolean;
    readonly isContractNotFound: boolean;
    readonly isContractClaimed: boolean;
    readonly type: 'NotContractOwner' | 'ContractNotFound' | 'ContractClaimed';
  }

  /** @name PalletPoolNamesError (217) */
  export interface PalletPoolNamesError extends Enum {
    readonly isTooShort: boolean;
    readonly isTooLong: boolean;
    readonly isUnnamed: boolean;
    readonly type: 'TooShort' | 'TooLong' | 'Unnamed';
  }

  /** @name SpRuntimeMultiSignature (219) */
  export interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreSr25519Signature (220) */
  export interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (221) */
  export interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckNonZeroSender (223) */
  export type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (224) */
  export type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (225) */
  export type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (226) */
  export type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (229) */
  export interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (230) */
  export type FrameSystemExtensionsCheckWeight = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (231) */
  export interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name DevnetRuntime (233) */
  export type DevnetRuntime = Null;

} // declare module
