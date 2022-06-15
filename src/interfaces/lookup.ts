// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    miscFrozen: 'u128',
    feeFrozen: 'u128'
  },
  /**
   * Lookup7: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU64: {
    normal: 'u64',
    operational: 'u64',
    mandatory: 'u64'
  },
  /**
   * Lookup11: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup16: frame_system::EventRecord<devnet::Event, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup18: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup19: frame_support::weights::DispatchInfo
   **/
  FrameSupportWeightsDispatchInfo: {
    weight: 'u64',
    class: 'FrameSupportWeightsDispatchClass',
    paysFee: 'FrameSupportWeightsPays'
  },
  /**
   * Lookup20: frame_support::weights::DispatchClass
   **/
  FrameSupportWeightsDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup21: frame_support::weights::Pays
   **/
  FrameSupportWeightsPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup22: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: 'SpRuntimeModuleError',
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpRuntimeArithmeticError',
      Transactional: 'SpRuntimeTransactionalError'
    }
  },
  /**
   * Lookup23: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup24: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup25: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup26: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup27: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup30: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup31: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup32: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: 'AccountId32',
        freeBalance: 'u128',
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u128',
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u128',
        reserved: 'u128',
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup33: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup34: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        oldSudoer: 'Option<AccountId32>',
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup38: pallet_ethereum::pallet::Event
   **/
  PalletEthereumEvent: {
    _enum: {
      Executed: '(H160,H160,H256,EvmCoreErrorExitReason)'
    }
  },
  /**
   * Lookup41: evm_core::error::ExitReason
   **/
  EvmCoreErrorExitReason: {
    _enum: {
      Succeed: 'EvmCoreErrorExitSucceed',
      Error: 'EvmCoreErrorExitError',
      Revert: 'EvmCoreErrorExitRevert',
      Fatal: 'EvmCoreErrorExitFatal'
    }
  },
  /**
   * Lookup42: evm_core::error::ExitSucceed
   **/
  EvmCoreErrorExitSucceed: {
    _enum: ['Stopped', 'Returned', 'Suicided']
  },
  /**
   * Lookup43: evm_core::error::ExitError
   **/
  EvmCoreErrorExitError: {
    _enum: {
      StackUnderflow: 'Null',
      StackOverflow: 'Null',
      InvalidJump: 'Null',
      InvalidRange: 'Null',
      DesignatedInvalid: 'Null',
      CallTooDeep: 'Null',
      CreateCollision: 'Null',
      CreateContractLimit: 'Null',
      OutOfOffset: 'Null',
      OutOfGas: 'Null',
      OutOfFund: 'Null',
      PCUnderflow: 'Null',
      CreateEmpty: 'Null',
      Other: 'Text',
      InvalidCode: 'Null'
    }
  },
  /**
   * Lookup46: evm_core::error::ExitRevert
   **/
  EvmCoreErrorExitRevert: {
    _enum: ['Reverted']
  },
  /**
   * Lookup47: evm_core::error::ExitFatal
   **/
  EvmCoreErrorExitFatal: {
    _enum: {
      NotSupported: 'Null',
      UnhandledInterrupt: 'Null',
      CallErrorAsFatal: 'EvmCoreErrorExitError',
      Other: 'Text'
    }
  },
  /**
   * Lookup48: pallet_evm::pallet::Event<T>
   **/
  PalletEvmEvent: {
    _enum: {
      Log: 'EthereumLog',
      Created: 'H160',
      CreatedFailed: 'H160',
      Executed: 'H160',
      ExecutedFailed: 'H160',
      BalanceDeposit: '(AccountId32,H160,U256)',
      BalanceWithdraw: '(AccountId32,H160,U256)'
    }
  },
  /**
   * Lookup49: ethereum::log::Log
   **/
  EthereumLog: {
    address: 'H160',
    topics: 'Vec<H256>',
    data: 'Bytes'
  },
  /**
   * Lookup53: pallet_base_fee::pallet::Event
   **/
  PalletBaseFeeEvent: {
    _enum: {
      NewBaseFeePerGas: 'U256',
      BaseFeeOverflow: 'Null',
      IsActive: 'bool',
      NewElasticity: 'Permill'
    }
  },
  /**
   * Lookup56: pallet_player::pallet::Event<T>
   **/
  PalletPlayerEvent: {
    _enum: {
      NewPlayerCreated: '(AccountId32,[u8;32])'
    }
  },
  /**
   * Lookup57: pallet_pool::pallet::Event<T>
   **/
  PalletPoolEvent: {
    _enum: {
      Joined: {
        sender: 'AccountId32',
        ticket: 'GafiPrimitivesTicketTicketType',
      },
      Leaved: {
        sender: 'AccountId32',
        ticket: 'GafiPrimitivesTicketTicketType'
      }
    }
  },
  /**
   * Lookup58: gafi_primitives::ticket::TicketType
   **/
  GafiPrimitivesTicketTicketType: {
    _enum: {
      System: 'GafiPrimitivesTicketSystemTicket',
      Custom: 'GafiPrimitivesTicketCustomTicket'
    }
  },
  /**
   * Lookup59: gafi_primitives::ticket::SystemTicket
   **/
  GafiPrimitivesTicketSystemTicket: {
    _enum: {
      Upfront: 'GafiPrimitivesTicketTicketLevel',
      Staking: 'GafiPrimitivesTicketTicketLevel'
    }
  },
  /**
   * Lookup60: gafi_primitives::ticket::TicketLevel
   **/
  GafiPrimitivesTicketTicketLevel: {
    _enum: ['Basic', 'Medium', 'Advance']
  },
  /**
   * Lookup61: gafi_primitives::ticket::CustomTicket
   **/
  GafiPrimitivesTicketCustomTicket: {
    _enum: {
      Sponsored: '[u8;32]'
    }
  },
  /**
   * Lookup62: upfront_pool::pallet::Event<T>
   **/
  UpfrontPoolEvent: {
    _enum: {
      ChargePoolService: 'Null',
      UpfrontSetMaxPlayer: {
        newMaxPlayer: 'u32'
      }
    }
  },
  /**
   * Lookup63: staking_pool::pallet::Event<T>
   **/
  StakingPoolEvent: {
    _enum: {
      StakingNewMaxPlayer: {
        newMaxPlayer: 'u32'
      }
    }
  },
  /**
   * Lookup64: sponsored_pool::pallet::Event<T>
   **/
  SponsoredPoolEvent: {
    _enum: {
      CreatedPool: {
        id: '[u8;32]',
      },
      Withdrew: {
        id: '[u8;32]'
      }
    }
  },
  /**
   * Lookup65: gafi_tx::pallet::Event<T>
   **/
  GafiTxEvent: {
    _enum: {
      SetGasPrice: {
        value: 'U256'
      }
    }
  },
  /**
   * Lookup66: proof_address_mapping::pallet::Event<T>
   **/
  ProofAddressMappingEvent: {
    _enum: {
      Bonded: {
        sender: 'AccountId32',
        address: 'H160',
      },
      Unbonded: {
        sender: 'AccountId32',
        address: 'H160'
      }
    }
  },
  /**
   * Lookup67: pallet_cache::pallet::Event<T, I>
   **/
  PalletCacheEvent: 'Null',
  /**
   * Lookup69: pallet_faucet::pallet::Event<T>
   **/
  PalletFaucetEvent: {
    _enum: {
      Transferred: '(AccountId32,AccountId32,u128)'
    }
  },
  /**
   * Lookup70: game_creator::pallet::Event<T>
   **/
  GameCreatorEvent: {
    _enum: {
      Claimed: {
        contract: 'H160',
        owner: 'AccountId32',
      },
      Changed: {
        contract: 'H160',
        newOwner: 'AccountId32',
      },
      Withdrew: {
        contract: 'H160',
        owner: 'AccountId32'
      }
    }
  },
  /**
   * Lookup71: pallet_pool_names::pallet::Event<T>
   **/
  PalletPoolNamesEvent: {
    _enum: {
      NameSet: {
        pool: '[u8;32]',
      },
      NameForced: {
        target: '[u8;32]',
      },
      NameChanged: {
        pool: '[u8;32]',
      },
      NameCleared: {
        pool: '[u8;32]',
        deposit: 'u128',
      },
      NameKilled: {
        target: '[u8;32]',
        deposit: 'u128'
      }
    }
  },
  /**
   * Lookup72: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup75: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup77: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup82: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup83: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup84: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>'
  },
  /**
   * Lookup86: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32'
  },
  /**
   * Lookup87: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup88: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup89: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8'
  },
  /**
   * Lookup95: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup97: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup99: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup100: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup103: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup104: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup105: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup106: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup107: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup108: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup109: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup112: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup113: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup115: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup116: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup118: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup119: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup122: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup124: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup125: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>',
        newReserved: 'Compact<u128>',
      },
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup129: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup131: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup133: frame_support::weights::WeightToFeeCoefficient<Balance>
   **/
  FrameSupportWeightsWeightToFeeCoefficient: {
    coeffInteger: 'u128',
    coeffFrac: 'Perbill',
    negative: 'bool',
    degree: 'u8'
  },
  /**
   * Lookup134: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'u64',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup136: pallet_ethereum::pallet::Call<T>
   **/
  PalletEthereumCall: {
    _enum: {
      transact: {
        transaction: 'EthereumTransactionTransactionV2'
      }
    }
  },
  /**
   * Lookup137: ethereum::transaction::TransactionV2
   **/
  EthereumTransactionTransactionV2: {
    _enum: {
      Legacy: 'EthereumTransactionLegacyTransaction',
      EIP2930: 'EthereumTransactionEip2930Transaction',
      EIP1559: 'EthereumTransactionEip1559Transaction'
    }
  },
  /**
   * Lookup138: ethereum::transaction::LegacyTransaction
   **/
  EthereumTransactionLegacyTransaction: {
    nonce: 'U256',
    gasPrice: 'U256',
    gasLimit: 'U256',
    action: 'EthereumTransactionTransactionAction',
    value: 'U256',
    input: 'Bytes',
    signature: 'EthereumTransactionTransactionSignature'
  },
  /**
   * Lookup139: ethereum::transaction::TransactionAction
   **/
  EthereumTransactionTransactionAction: {
    _enum: {
      Call: 'H160',
      Create: 'Null'
    }
  },
  /**
   * Lookup140: ethereum::transaction::TransactionSignature
   **/
  EthereumTransactionTransactionSignature: {
    v: 'u64',
    r: 'H256',
    s: 'H256'
  },
  /**
   * Lookup142: ethereum::transaction::EIP2930Transaction
   **/
  EthereumTransactionEip2930Transaction: {
    chainId: 'u64',
    nonce: 'U256',
    gasPrice: 'U256',
    gasLimit: 'U256',
    action: 'EthereumTransactionTransactionAction',
    value: 'U256',
    input: 'Bytes',
    accessList: 'Vec<EthereumTransactionAccessListItem>',
    oddYParity: 'bool',
    r: 'H256',
    s: 'H256'
  },
  /**
   * Lookup144: ethereum::transaction::AccessListItem
   **/
  EthereumTransactionAccessListItem: {
    address: 'H160',
    storageKeys: 'Vec<H256>'
  },
  /**
   * Lookup145: ethereum::transaction::EIP1559Transaction
   **/
  EthereumTransactionEip1559Transaction: {
    chainId: 'u64',
    nonce: 'U256',
    maxPriorityFeePerGas: 'U256',
    maxFeePerGas: 'U256',
    gasLimit: 'U256',
    action: 'EthereumTransactionTransactionAction',
    value: 'U256',
    input: 'Bytes',
    accessList: 'Vec<EthereumTransactionAccessListItem>',
    oddYParity: 'bool',
    r: 'H256',
    s: 'H256'
  },
  /**
   * Lookup146: pallet_evm::pallet::Call<T>
   **/
  PalletEvmCall: {
    _enum: {
      withdraw: {
        address: 'H160',
        value: 'u128',
      },
      call: {
        source: 'H160',
        target: 'H160',
        input: 'Bytes',
        value: 'U256',
        gasLimit: 'u64',
        maxFeePerGas: 'U256',
        maxPriorityFeePerGas: 'Option<U256>',
        nonce: 'Option<U256>',
        accessList: 'Vec<(H160,Vec<H256>)>',
      },
      create: {
        source: 'H160',
        init: 'Bytes',
        value: 'U256',
        gasLimit: 'u64',
        maxFeePerGas: 'U256',
        maxPriorityFeePerGas: 'Option<U256>',
        nonce: 'Option<U256>',
        accessList: 'Vec<(H160,Vec<H256>)>',
      },
      create2: {
        source: 'H160',
        init: 'Bytes',
        salt: 'H256',
        value: 'U256',
        gasLimit: 'u64',
        maxFeePerGas: 'U256',
        maxPriorityFeePerGas: 'Option<U256>',
        nonce: 'Option<U256>',
        accessList: 'Vec<(H160,Vec<H256>)>'
      }
    }
  },
  /**
   * Lookup150: pallet_dynamic_fee::pallet::Call<T>
   **/
  PalletDynamicFeeCall: {
    _enum: {
      note_min_gas_price_target: {
        target: 'U256'
      }
    }
  },
  /**
   * Lookup151: pallet_base_fee::pallet::Call<T>
   **/
  PalletBaseFeeCall: {
    _enum: {
      set_base_fee_per_gas: {
        fee: 'U256',
      },
      set_is_active: {
        isActive: 'bool',
      },
      set_elasticity: {
        elasticity: 'Permill'
      }
    }
  },
  /**
   * Lookup152: pallet_player::pallet::Call<T>
   **/
  PalletPlayerCall: {
    _enum: {
      create_player: {
        name: '[u8;16]'
      }
    }
  },
  /**
   * Lookup154: pallet_pool::pallet::Call<T>
   **/
  PalletPoolCall: {
    _enum: {
      join: {
        ticket: 'GafiPrimitivesTicketTicketType',
      },
      leave: 'Null'
    }
  },
  /**
   * Lookup155: upfront_pool::pallet::Call<T>
   **/
  UpfrontPoolCall: {
    _enum: {
      set_max_player: {
        maxPlayer: 'u32'
      }
    }
  },
  /**
   * Lookup156: staking_pool::pallet::Call<T>
   **/
  StakingPoolCall: {
    _enum: {
      set_max_player: {
        newMaxPlayer: 'u32'
      }
    }
  },
  /**
   * Lookup157: sponsored_pool::pallet::Call<T>
   **/
  SponsoredPoolCall: {
    _enum: {
      create_pool: {
        targets: 'Vec<H160>',
        value: 'u128',
        discount: 'Permill',
        txLimit: 'u32',
      },
      withdraw_pool: {
        poolId: '[u8;32]',
      },
      new_targets: {
        poolId: '[u8;32]',
        targets: 'Vec<H160>',
      },
      set_pool_name: {
        poolId: '[u8;32]',
        name: 'Bytes',
      },
      clear_pool_name: {
        poolId: '[u8;32]',
      },
      kill_pool_name: {
        poolId: '[u8;32]'
      }
    }
  },
  /**
   * Lookup159: gafi_tx::pallet::Call<T>
   **/
  GafiTxCall: {
    _enum: {
      set_gas_price: {
        newGasPrice: 'U256'
      }
    }
  },
  /**
   * Lookup160: proof_address_mapping::pallet::Call<T>
   **/
  ProofAddressMappingCall: {
    _enum: {
      bond: {
        signature: '[u8;65]',
        address: 'H160',
        withdraw: 'bool',
      },
      unbond: 'Null'
    }
  },
  /**
   * Lookup162: pallet_cache::pallet::Call<T, I>
   **/
  PalletCacheCall: 'Null',
  /**
   * Lookup164: pallet_faucet::pallet::Call<T>
   **/
  PalletFaucetCall: {
    _enum: {
      faucet: 'Null',
      donate: {
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup165: game_creator::pallet::Call<T>
   **/
  GameCreatorCall: {
    _enum: {
      claim_contract: {
        contract: 'H160',
      },
      change_ownership: {
        contract: 'H160',
        newOwner: 'AccountId32',
      },
      withdraw_contract: {
        contract: 'H160'
      }
    }
  },
  /**
   * Lookup166: pallet_pool_names::pallet::Call<T>
   **/
  PalletPoolNamesCall: 'Null',
  /**
   * Lookup167: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup170: fp_rpc::TransactionStatus
   **/
  FpRpcTransactionStatus: {
    transactionHash: 'H256',
    transactionIndex: 'u32',
    from: 'H160',
    to: 'Option<H160>',
    contractAddress: 'Option<H160>',
    logs: 'Vec<EthereumLog>',
    logsBloom: 'EthbloomBloom'
  },
  /**
   * Lookup173: ethbloom::Bloom
   **/
  EthbloomBloom: '[u8;256]',
  /**
   * Lookup175: ethereum::receipt::ReceiptV3
   **/
  EthereumReceiptReceiptV3: {
    _enum: {
      Legacy: 'EthereumReceiptEip658ReceiptData',
      EIP2930: 'EthereumReceiptEip658ReceiptData',
      EIP1559: 'EthereumReceiptEip658ReceiptData'
    }
  },
  /**
   * Lookup176: ethereum::receipt::EIP658ReceiptData
   **/
  EthereumReceiptEip658ReceiptData: {
    statusCode: 'u8',
    usedGas: 'U256',
    logsBloom: 'EthbloomBloom',
    logs: 'Vec<EthereumLog>'
  },
  /**
   * Lookup177: ethereum::block::Block<ethereum::transaction::TransactionV2>
   **/
  EthereumBlock: {
    header: 'EthereumHeader',
    transactions: 'Vec<EthereumTransactionTransactionV2>',
    ommers: 'Vec<EthereumHeader>'
  },
  /**
   * Lookup178: ethereum::header::Header
   **/
  EthereumHeader: {
    parentHash: 'H256',
    ommersHash: 'H256',
    beneficiary: 'H160',
    stateRoot: 'H256',
    transactionsRoot: 'H256',
    receiptsRoot: 'H256',
    logsBloom: 'EthbloomBloom',
    difficulty: 'U256',
    number: 'U256',
    gasLimit: 'U256',
    gasUsed: 'U256',
    timestamp: 'u64',
    extraData: 'Bytes',
    mixHash: 'H256',
    nonce: 'EthereumTypesHashH64'
  },
  /**
   * Lookup179: ethereum_types::hash::H64
   **/
  EthereumTypesHashH64: '[u8;8]',
  /**
   * Lookup184: pallet_ethereum::pallet::Error<T>
   **/
  PalletEthereumError: {
    _enum: ['InvalidSignature', 'PreLogExists']
  },
  /**
   * Lookup186: pallet_evm::pallet::Error<T>
   **/
  PalletEvmError: {
    _enum: ['BalanceLow', 'FeeOverflow', 'PaymentOverflow', 'WithdrawFailed', 'GasPriceTooLow', 'InvalidNonce']
  },
  /**
   * Lookup187: pallet_player::player::Player<sp_core::crypto::AccountId32>
   **/
  PalletPlayerPlayer: {
    id: '[u8;32]',
    owner: 'AccountId32',
    name: '[u8;16]'
  },
  /**
   * Lookup188: pallet_player::pallet::Error<T>
   **/
  PalletPlayerError: {
    _enum: ['PlayerIdUsed', 'PlayerExisted']
  },
  /**
   * Lookup189: gafi_primitives::ticket::TicketInfo
   **/
  GafiPrimitivesTicketTicketInfo: {
    ticketType: 'GafiPrimitivesTicketTicketType',
    tickets: 'u32'
  },
  /**
   * Lookup190: pallet_pool::pallet::Error<T>
   **/
  PalletPoolError: {
    _enum: ['AlreadyJoined', 'NotFoundInPool', 'TicketNotFound', 'ComingSoon']
  },
  /**
   * Lookup191: gafi_primitives::ticket::Ticket<sp_core::crypto::AccountId32>
   **/
  GafiPrimitivesTicket: {
    address: 'AccountId32',
    joinTime: 'u128',
    ticketType: 'GafiPrimitivesTicketTicketType'
  },
  /**
   * Lookup192: gafi_primitives::system_services::SystemService
   **/
  GafiPrimitivesSystemServicesSystemService: {
    service: 'GafiPrimitivesPoolService',
    value: 'u128'
  },
  /**
   * Lookup193: gafi_primitives::pool::Service
   **/
  GafiPrimitivesPoolService: {
    txLimit: 'u32',
    discount: 'Permill'
  },
  /**
   * Lookup196: upfront_pool::pallet::Error<T>
   **/
  UpfrontPoolError: {
    _enum: ['PlayerNotFound', 'PlayerCountOverflow', 'ExceedMaxPlayer', 'CanNotClearNewPlayers', 'IntoBalanceFail', 'LevelNotFound']
  },
  /**
   * Lookup197: staking_pool::pallet::Error<T>
   **/
  StakingPoolError: {
    _enum: ['PlayerNotStake', 'StakeCountOverflow', 'IntoBalanceFail', 'LevelNotFound']
  },
  /**
   * Lookup198: sponsored_pool::SponsoredPool<sp_core::crypto::AccountId32>
   **/
  SponsoredPool: {
    id: '[u8;32]',
    owner: 'AccountId32',
    value: 'u128',
    discount: 'Permill',
    txLimit: 'u32'
  },
  /**
   * Lookup202: sponsored_pool::pallet::Error<T>
   **/
  SponsoredPoolError: {
    _enum: ['PoolIdExisted', 'IntoAccountFail', 'IntoU32Fail', 'NotTheOwner', 'PoolNotExist', 'ExceedMaxPoolOwned', 'ExceedPoolTarget', 'NotReachMinPoolBalance', 'LessThanMinTxLimit', 'GreaterThanMaxTxLimit', 'LessThanMinDiscountPercent', 'GreaterThanMinDiscountPercent']
  },
  /**
   * Lookup203: gafi_tx::pallet::Error<T>
   **/
  GafiTxError: {
    _enum: ['IntoBalanceFail', 'IntoAccountFail']
  },
  /**
   * Lookup204: proof_address_mapping::pallet::Error<T>
   **/
  ProofAddressMappingError: {
    _enum: ['SignatureOrAddressNotCorrect', 'AlreadyBond', 'NonbondAccount']
  },
  /**
   * Lookup205: pallet_cache::pallet::Flag
   **/
  PalletCacheFlag: {
    _enum: ['Left', 'Right']
  },
  /**
   * Lookup207: pallet_cache::pallet::WrapData<gafi_primitives::ticket::TicketInfo>
   **/
  PalletCacheWrapDataTicketInfo: {
    data: 'GafiPrimitivesTicketTicketInfo',
    timestamp: 'u128'
  },
  /**
   * Lookup208: pallet_cache::pallet::Error<T, I>
   **/
  PalletCacheError: 'Null',
  /**
   * Lookup210: pallet_cache::pallet::WrapData<Data>
   **/
  PalletCacheWrapDataU128: {
    data: 'u128',
    timestamp: 'u128'
  },
  /**
   * Lookup213: pallet_faucet::pallet::Error<T>
   **/
  PalletFaucetError: {
    _enum: ['TransferToSelf', 'NotEnoughBalance', 'DontBeGreedy', 'PleaseWait']
  },
  /**
   * Lookup214: game_creator::pallet::Error<T>
   **/
  GameCreatorError: {
    _enum: ['NotContractOwner', 'ContractNotFound', 'ContractClaimed']
  },
  /**
   * Lookup217: pallet_pool_names::pallet::Error<T>
   **/
  PalletPoolNamesError: {
    _enum: ['TooShort', 'TooLong', 'Unnamed']
  },
  /**
   * Lookup219: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup220: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup221: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup223: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup224: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup225: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup226: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup229: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup230: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup231: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup233: devnet::Runtime
   **/
  DevnetRuntime: 'Null'
};
