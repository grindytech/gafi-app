// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::types::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::types::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    frozen: 'u128',
    flags: 'u128'
  },
  /**
   * Lookup8: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: 'SpWeightsWeightV2Weight',
    operational: 'SpWeightsWeightV2Weight',
    mandatory: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup9: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: 'Compact<u64>',
    proofSize: 'Compact<u64>'
  },
  /**
   * Lookup14: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup16: sp_runtime::generic::digest::DigestItem
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
   * Lookup19: frame_system::EventRecord<game3_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup21: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
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
   * Lookup22: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: 'SpWeightsWeightV2Weight',
    class: 'FrameSupportDispatchDispatchClass',
    paysFee: 'FrameSupportDispatchPays'
  },
  /**
   * Lookup23: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup24: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup25: sp_runtime::DispatchError
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
      Arithmetic: 'SpArithmeticArithmeticError',
      Transactional: 'SpRuntimeTransactionalError',
      Exhausted: 'Null',
      Corruption: 'Null',
      Unavailable: 'Null'
    }
  },
  /**
   * Lookup26: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup27: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['FundsUnavailable', 'OnlyProvider', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported', 'CannotCreateHold', 'NotExpendable']
  },
  /**
   * Lookup28: sp_arithmetic::ArithmeticError
   **/
  SpArithmeticArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup29: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup30: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpConsensusGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup33: sp_consensus_grandpa::app::Public
   **/
  SpConsensusGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup34: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup35: pallet_balances::pallet::Event<T, I>
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
        amount: 'u128',
      },
      Minted: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Burned: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Suspended: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Restored: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Upgraded: {
        who: 'AccountId32',
      },
      Issued: {
        amount: 'u128',
      },
      Rescinded: {
        amount: 'u128',
      },
      Locked: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unlocked: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Frozen: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Thawed: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup36: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup37: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u128',
        tip: 'u128'
      }
    }
  },
  /**
   * Lookup38: pallet_sudo::pallet::Event<T>
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
   * Lookup42: pallet_nfts::pallet::Event<T, I>
   **/
  PalletNftsEvent: {
    _enum: {
      Created: {
        collection: 'u32',
        creator: 'AccountId32',
        owner: 'AccountId32',
      },
      ForceCreated: {
        collection: 'u32',
        owner: 'AccountId32',
      },
      Destroyed: {
        collection: 'u32',
      },
      Issued: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
      },
      Transferred: {
        collection: 'u32',
        item: 'u32',
        from: 'AccountId32',
        to: 'AccountId32',
      },
      Burned: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
      },
      ItemTransferLocked: {
        collection: 'u32',
        item: 'u32',
      },
      ItemTransferUnlocked: {
        collection: 'u32',
        item: 'u32',
      },
      ItemPropertiesLocked: {
        collection: 'u32',
        item: 'u32',
        lockMetadata: 'bool',
        lockAttributes: 'bool',
      },
      CollectionLocked: {
        collection: 'u32',
      },
      OwnerChanged: {
        collection: 'u32',
        newOwner: 'AccountId32',
      },
      TeamChanged: {
        collection: 'u32',
        issuer: 'Option<AccountId32>',
        admin: 'Option<AccountId32>',
        freezer: 'Option<AccountId32>',
      },
      TransferApproved: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
        delegate: 'AccountId32',
        deadline: 'Option<u32>',
      },
      ApprovalCancelled: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
        delegate: 'AccountId32',
      },
      AllApprovalsCancelled: {
        collection: 'u32',
        item: 'u32',
        owner: 'AccountId32',
      },
      CollectionConfigChanged: {
        collection: 'u32',
      },
      CollectionMetadataSet: {
        collection: 'u32',
        data: 'Bytes',
      },
      CollectionMetadataCleared: {
        collection: 'u32',
      },
      ItemMetadataSet: {
        collection: 'u32',
        item: 'u32',
        data: 'Bytes',
      },
      ItemMetadataCleared: {
        collection: 'u32',
        item: 'u32',
      },
      Redeposited: {
        collection: 'u32',
        successfulItems: 'Vec<u32>',
      },
      AttributeSet: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes',
        value: 'Bytes',
        namespace: 'PalletNftsAttributeNamespace',
      },
      AttributeCleared: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        key: 'Bytes',
        namespace: 'PalletNftsAttributeNamespace',
      },
      ItemAttributesApprovalAdded: {
        collection: 'u32',
        item: 'u32',
        delegate: 'AccountId32',
      },
      ItemAttributesApprovalRemoved: {
        collection: 'u32',
        item: 'u32',
        delegate: 'AccountId32',
      },
      OwnershipAcceptanceChanged: {
        who: 'AccountId32',
        maybeCollection: 'Option<u32>',
      },
      CollectionMaxSupplySet: {
        collection: 'u32',
        maxSupply: 'u32',
      },
      CollectionMintSettingsUpdated: {
        collection: 'u32',
      },
      NextCollectionIdIncremented: {
        nextId: 'u32',
      },
      ItemPriceSet: {
        collection: 'u32',
        item: 'u32',
        price: 'u128',
        whitelistedBuyer: 'Option<AccountId32>',
      },
      ItemPriceRemoved: {
        collection: 'u32',
        item: 'u32',
      },
      ItemBought: {
        collection: 'u32',
        item: 'u32',
        price: 'u128',
        seller: 'AccountId32',
        buyer: 'AccountId32',
      },
      TipSent: {
        collection: 'u32',
        item: 'u32',
        sender: 'AccountId32',
        receiver: 'AccountId32',
        amount: 'u128',
      },
      SwapCreated: {
        offeredCollection: 'u32',
        offeredItem: 'u32',
        desiredCollection: 'u32',
        desiredItem: 'Option<u32>',
        price: 'Option<PalletNftsPriceWithDirection>',
        deadline: 'u32',
      },
      SwapCancelled: {
        offeredCollection: 'u32',
        offeredItem: 'u32',
        desiredCollection: 'u32',
        desiredItem: 'Option<u32>',
        price: 'Option<PalletNftsPriceWithDirection>',
        deadline: 'u32',
      },
      SwapClaimed: {
        sentCollection: 'u32',
        sentItem: 'u32',
        sentItemOwner: 'AccountId32',
        receivedCollection: 'u32',
        receivedItem: 'u32',
        receivedItemOwner: 'AccountId32',
        price: 'Option<PalletNftsPriceWithDirection>',
        deadline: 'u32',
      },
      PreSignedAttributesSet: {
        collection: 'u32',
        item: 'u32',
        namespace: 'PalletNftsAttributeNamespace',
      },
      PalletAttributeSet: {
        collection: 'u32',
        item: 'Option<u32>',
        attribute: 'PalletNftsPalletAttributes',
        value: 'Bytes'
      }
    }
  },
  /**
   * Lookup47: pallet_nfts::types::AttributeNamespace<sp_core::crypto::AccountId32>
   **/
  PalletNftsAttributeNamespace: {
    _enum: {
      Pallet: 'Null',
      CollectionOwner: 'Null',
      ItemOwner: 'Null',
      Account: 'AccountId32'
    }
  },
  /**
   * Lookup49: pallet_nfts::types::PriceWithDirection<Amount>
   **/
  PalletNftsPriceWithDirection: {
    amount: 'u128',
    direction: 'PalletNftsPriceDirection'
  },
  /**
   * Lookup50: pallet_nfts::types::PriceDirection
   **/
  PalletNftsPriceDirection: {
    _enum: ['Send', 'Receive']
  },
  /**
   * Lookup51: pallet_nfts::types::PalletAttributes<CollectionId>
   **/
  PalletNftsPalletAttributes: {
    _enum: {
      UsedToClaim: 'u32'
    }
  },
  /**
   * Lookup52: pallet_game::pallet::Event<T, I>
   **/
  PalletGameEvent: {
    _enum: {
      GameCreated: {
        who: 'AccountId32',
        game: 'u32',
      },
      CollectionCreated: {
        who: 'AccountId32',
        collection: 'u32',
      },
      AddingAcceptanceSet: {
        who: 'AccountId32',
        game: 'u32',
        collection: 'u32',
      },
      CollectionAdded: {
        who: 'AccountId32',
        game: 'u32',
        collection: 'u32',
      },
      ItemCreated: {
        who: 'AccountId32',
        collection: 'u32',
        item: 'u32',
        maybeSupply: 'Option<u32>',
      },
      ItemAdded: {
        who: 'AccountId32',
        collection: 'u32',
        item: 'u32',
        amount: 'u32',
      },
      Minted: {
        pool: 'u32',
        who: 'AccountId32',
        target: 'AccountId32',
        nfts: 'Vec<GafiSupportGameTypesNft>',
      },
      Burned: {
        who: 'AccountId32',
        collection: 'u32',
        item: 'u32',
        amount: 'u32',
      },
      Transferred: {
        from: 'AccountId32',
        collection: 'u32',
        item: 'u32',
        dest: 'AccountId32',
        amount: 'u32',
      },
      UpgradeSet: {
        who: 'AccountId32',
        collection: 'u32',
        item: 'u32',
        newItem: 'u32',
        level: 'u32',
      },
      Upgraded: {
        who: 'AccountId32',
        collection: 'u32',
        item: 'u32',
        newItem: 'u32',
        amount: 'u32',
      },
      PriceSet: {
        trade: 'u32',
        who: 'AccountId32',
        collection: 'u32',
        item: 'u32',
        amount: 'u32',
        unitPrice: 'u128',
      },
      ItemBought: {
        trade: 'u32',
        who: 'AccountId32',
        amount: 'u32',
        bidUnitPrice: 'u128',
      },
      BundleSet: {
        trade: 'u32',
        who: 'AccountId32',
        bundle: 'Vec<GafiSupportGameTypesPackage>',
        price: 'u128',
      },
      BundleBought: {
        trade: 'u32',
        who: 'AccountId32',
        bidPrice: 'u128',
      },
      TradeCanceled: {
        trade: 'u32',
        who: 'AccountId32',
      },
      WishlistSet: {
        trade: 'u32',
        who: 'AccountId32',
        wishlist: 'Vec<GafiSupportGameTypesPackage>',
        price: 'u128',
      },
      WishlistFilled: {
        trade: 'u32',
        who: 'AccountId32',
        askPrice: 'u128',
      },
      CollectionRemoved: {
        who: 'AccountId32',
        game: 'u32',
        collection: 'u32',
      },
      SwapSet: {
        trade: 'u32',
        who: 'AccountId32',
        source: 'Vec<GafiSupportGameTypesPackage>',
        required: 'Vec<GafiSupportGameTypesPackage>',
        maybePrice: 'Option<u128>',
      },
      SwapClaimed: {
        trade: 'u32',
        who: 'AccountId32',
        maybeBidPrice: 'Option<u128>',
      },
      AuctionSet: {
        trade: 'u32',
        who: 'AccountId32',
        source: 'Vec<GafiSupportGameTypesPackage>',
        maybePrice: 'Option<u128>',
        startBlock: 'u32',
        duration: 'u32',
      },
      Bid: {
        trade: 'u32',
        who: 'AccountId32',
        bid: 'u128',
      },
      AuctionClaimed: {
        trade: 'u32',
        maybeBid: 'Option<(AccountId32,u128)>',
      },
      BuySet: {
        trade: 'u32',
        who: 'AccountId32',
        collection: 'u32',
        item: 'u32',
        amount: 'u32',
        unitPrice: 'u128',
      },
      SetBuyClaimed: {
        trade: 'u32',
        who: 'AccountId32',
        amount: 'u32',
        askUnitPrice: 'u128',
      },
      MiningPoolCreated: {
        pool: 'u32',
        who: 'AccountId32',
        poolType: 'PalletGamePoolType',
        table: 'Vec<GafiSupportGameTypesLoot>'
      }
    }
  },
  /**
   * Lookup54: gafi_support::game::types::NFT<CollectionId, ItemId>
   **/
  GafiSupportGameTypesNft: {
    collection: 'u32',
    item: 'u32'
  },
  /**
   * Lookup56: gafi_support::game::types::Package<CollectionId, ItemId>
   **/
  GafiSupportGameTypesPackage: {
    collection: 'u32',
    item: 'u32',
    amount: 'u32'
  },
  /**
   * Lookup60: pallet_game::types::PoolType
   **/
  PalletGamePoolType: {
    _enum: ['Dynamic', 'Stable']
  },
  /**
   * Lookup62: gafi_support::game::types::Loot<CollectionId, ItemId>
   **/
  GafiSupportGameTypesLoot: {
    maybeNft: 'Option<GafiSupportGameTypesNft>',
    weight: 'u32'
  },
  /**
   * Lookup64: pallet_faucet::pallet::Event<T>
   **/
  PalletFaucetEvent: {
    _enum: {
      Transferred: '(AccountId32,AccountId32,u128)'
    }
  },
  /**
   * Lookup65: pallet_cache::pallet::Event<T, I>
   **/
  PalletCacheEvent: 'Null',
  /**
   * Lookup66: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup70: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup73: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
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
   * Lookup77: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup78: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup79: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>'
  },
  /**
   * Lookup81: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup82: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup83: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup84: sp_version::RuntimeVersion
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
   * Lookup90: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup92: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup93: pallet_grandpa::StoredState<N>
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
   * Lookup94: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpConsensusGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup96: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpConsensusGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpConsensusGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup97: sp_consensus_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpConsensusGrandpaEquivocation'
  },
  /**
   * Lookup98: sp_consensus_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup99: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpConsensusGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)'
  },
  /**
   * Lookup100: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup101: sp_consensus_grandpa::app::Signature
   **/
  SpConsensusGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup102: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup105: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpConsensusGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)'
  },
  /**
   * Lookup106: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup108: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup109: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup111: pallet_balances::types::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup112: pallet_balances::types::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup115: pallet_balances::types::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup118: pallet_balances::types::IdAmount<Id, Balance>
   **/
  PalletBalancesIdAmount: {
    id: 'Null',
    amount: 'u128'
  },
  /**
   * Lookup120: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer_allow_death: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      set_balance_deprecated: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>',
        oldReserved: 'Compact<u128>',
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
        amount: 'u128',
      },
      upgrade_accounts: {
        who: 'Vec<AccountId32>',
      },
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      force_set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>'
      }
    }
  },
  /**
   * Lookup126: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'Expendability', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves', 'TooManyHolds', 'TooManyFreezes']
  },
  /**
   * Lookup128: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup129: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight',
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
   * Lookup131: pallet_game::pallet::Call<T, I>
   **/
  PalletGameCall: {
    _enum: {
      create_game: {
        admin: 'MultiAddress',
      },
      create_game_collection: {
        game: 'u32',
      },
      create_collection: {
        admin: 'MultiAddress',
      },
      set_accept_adding: {
        game: 'u32',
        collection: 'u32',
      },
      add_game_collection: {
        game: 'u32',
        collection: 'u32',
      },
      create_item: {
        collection: 'u32',
        item: 'u32',
        config: 'PalletNftsItemConfig',
        maybeSupply: 'Option<u32>',
      },
      add_supply: {
        collection: 'u32',
        item: 'u32',
        amount: 'u32',
      },
      mint: {
        pool: 'u32',
        mintTo: 'MultiAddress',
        amount: 'u32',
      },
      burn: {
        collection: 'u32',
        item: 'u32',
        amount: 'u32',
      },
      transfer: {
        collection: 'u32',
        item: 'u32',
        dest: 'MultiAddress',
        amount: 'u32',
      },
      set_upgrade_item: {
        collection: 'u32',
        item: 'u32',
        newItem: 'u32',
        config: 'PalletNftsItemConfig',
        data: 'Bytes',
        level: 'u32',
        fee: 'u128',
      },
      upgrade_item: {
        collection: 'u32',
        item: 'u32',
        amount: 'u32',
      },
      submit_random_seed_unsigned: {
        seed: '[u8;32]',
      },
      set_price: {
        package: 'GafiSupportGameTypesPackage',
        unitPrice: 'u128',
        startBlock: 'Option<u32>',
        endBlock: 'Option<u32>',
      },
      buy_item: {
        trade: 'u32',
        amount: 'u32',
        bidPrice: 'u128',
      },
      add_retail_supply: {
        trade: 'u32',
        supply: 'GafiSupportGameTypesPackage',
      },
      set_bundle: {
        bundle: 'Vec<GafiSupportGameTypesPackage>',
        price: 'u128',
        startBlock: 'Option<u32>',
        endBlock: 'Option<u32>',
      },
      buy_bundle: {
        trade: 'u32',
        bidPrice: 'u128',
      },
      cancel_trade: {
        trade: 'u32',
        tradeType: 'GafiSupportGameTypesTradeType',
      },
      set_wishlist: {
        bundle: 'Vec<GafiSupportGameTypesPackage>',
        price: 'u128',
        startBlock: 'Option<u32>',
        endBlock: 'Option<u32>',
      },
      claim_wishlist: {
        trade: 'u32',
        askPrice: 'u128',
      },
      remove_collection: {
        game: 'u32',
        collection: 'u32',
      },
      lock_item_transfer: {
        collection: 'u32',
        item: 'u32',
      },
      unlock_item_transfer: {
        collection: 'u32',
        item: 'u32',
      },
      set_swap: {
        source: 'Vec<GafiSupportGameTypesPackage>',
        required: 'Vec<GafiSupportGameTypesPackage>',
        maybePrice: 'Option<u128>',
        startBlock: 'Option<u32>',
        endBlock: 'Option<u32>',
      },
      claim_swap: {
        trade: 'u32',
        maybeBidPrice: 'Option<u128>',
      },
      set_auction: {
        source: 'Vec<GafiSupportGameTypesPackage>',
        maybePrice: 'Option<u128>',
        startBlock: 'u32',
        duration: 'u32',
      },
      bid_auction: {
        trade: 'u32',
        bid: 'u128',
      },
      claim_auction: {
        trade: 'u32',
      },
      set_buy: {
        package: 'GafiSupportGameTypesPackage',
        unitPrice: 'u128',
        startBlock: 'Option<u32>',
        endBlock: 'Option<u32>',
      },
      claim_set_buy: {
        trade: 'u32',
        amount: 'u32',
        askPrice: 'u128',
      },
      set_attribute: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        namespace: 'PalletNftsAttributeNamespace',
        key: 'Bytes',
        value: 'Bytes',
      },
      clear_attribute: {
        collection: 'u32',
        maybeItem: 'Option<u32>',
        namespace: 'PalletNftsAttributeNamespace',
        key: 'Bytes',
      },
      set_metadata: {
        collection: 'u32',
        item: 'u32',
        data: 'Bytes',
      },
      clear_metadata: {
        collection: 'u32',
        item: 'u32',
      },
      set_collection_metadata: {
        collection: 'u32',
        data: 'Bytes',
      },
      clear_collection_metadata: {
        collection: 'u32',
      },
      set_team: {
        collection: 'u32',
        issuer: 'Option<MultiAddress>',
        admin: 'Option<MultiAddress>',
        freezer: 'Option<MultiAddress>',
      },
      create_dynamic_pool: {
        lootTable: 'Vec<GafiSupportGameTypesLoot>',
        admin: 'MultiAddress',
        mintSettings: 'GafiSupportGameTypesMintSettings',
      },
      create_stable_pool: {
        lootTable: 'Vec<GafiSupportGameTypesLoot>',
        admin: 'MultiAddress',
        mintSettings: 'GafiSupportGameTypesMintSettings'
      }
    }
  },
  /**
   * Lookup132: pallet_nfts::types::ItemConfig
   **/
  PalletNftsItemConfig: {
    settings: 'u64'
  },
  /**
   * Lookup134: pallet_nfts::types::ItemSetting
   **/
  PalletNftsItemSetting: {
    _enum: ['__Unused0', 'Transferable', 'UnlockedMetadata', '__Unused3', 'UnlockedAttributes']
  },
  /**
   * Lookup135: gafi_support::game::types::TradeType
   **/
  GafiSupportGameTypesTradeType: {
    _enum: ['SetPrice', 'SetBuy', 'Bundle', 'Wishlist', 'Auction', 'Swap']
  },
  /**
   * Lookup137: gafi_support::game::types::MintSettings<Price, BlockNumber, CollectionId>
   **/
  GafiSupportGameTypesMintSettings: {
    mintType: 'GafiSupportGameTypesMintType',
    price: 'u128',
    startBlock: 'Option<u32>',
    endBlock: 'Option<u32>'
  },
  /**
   * Lookup138: gafi_support::game::types::MintType<CollectionId>
   **/
  GafiSupportGameTypesMintType: {
    _enum: {
      Public: 'Null',
      HolderOf: 'u32'
    }
  },
  /**
   * Lookup139: pallet_faucet::pallet::Call<T>
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
   * Lookup140: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup141: pallet_nfts::types::CollectionDetails<sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletNftsCollectionDetails: {
    owner: 'AccountId32',
    ownerDeposit: 'u128',
    items: 'u32',
    itemMetadatas: 'u32',
    itemConfigs: 'u32',
    attributes: 'u32'
  },
  /**
   * Lookup146: pallet_nfts::types::CollectionRole
   **/
  PalletNftsCollectionRole: {
    _enum: ['__Unused0', 'Issuer', 'Freezer', '__Unused3', 'Admin']
  },
  /**
   * Lookup147: pallet_nfts::types::ItemDetails<sp_core::crypto::AccountId32, pallet_nfts::types::ItemDeposit<DepositBalance, sp_core::crypto::AccountId32>, bounded_collections::bounded_btree_map::BoundedBTreeMap<sp_core::crypto::AccountId32, Option<T>, S>>
   **/
  PalletNftsItemDetails: {
    owner: 'AccountId32',
    approvals: 'BTreeMap<AccountId32, Option<u32>>',
    deposit: 'PalletNftsItemDeposit'
  },
  /**
   * Lookup148: pallet_nfts::types::ItemDeposit<DepositBalance, sp_core::crypto::AccountId32>
   **/
  PalletNftsItemDeposit: {
    account: 'AccountId32',
    amount: 'u128'
  },
  /**
   * Lookup153: pallet_nfts::types::CollectionMetadata<Deposit, StringLimit>
   **/
  PalletNftsCollectionMetadata: {
    deposit: 'u128',
    data: 'Bytes'
  },
  /**
   * Lookup154: pallet_nfts::types::ItemMetadata<pallet_nfts::types::ItemMetadataDeposit<DepositBalance, sp_core::crypto::AccountId32>, StringLimit>
   **/
  PalletNftsItemMetadata: {
    deposit: 'PalletNftsItemMetadataDeposit',
    data: 'Bytes'
  },
  /**
   * Lookup155: pallet_nfts::types::ItemMetadataDeposit<DepositBalance, sp_core::crypto::AccountId32>
   **/
  PalletNftsItemMetadataDeposit: {
    account: 'Option<AccountId32>',
    amount: 'u128'
  },
  /**
   * Lookup158: pallet_nfts::types::AttributeDeposit<DepositBalance, sp_core::crypto::AccountId32>
   **/
  PalletNftsAttributeDeposit: {
    account: 'Option<AccountId32>',
    amount: 'u128'
  },
  /**
   * Lookup162: pallet_nfts::types::PendingSwap<CollectionId, ItemId, pallet_nfts::types::PriceWithDirection<Amount>, Deadline>
   **/
  PalletNftsPendingSwap: {
    desiredCollection: 'u32',
    desiredItem: 'Option<u32>',
    price: 'Option<PalletNftsPriceWithDirection>',
    deadline: 'u32'
  },
  /**
   * Lookup163: pallet_nfts::types::CollectionConfig<Price, BlockNumber, CollectionId>
   **/
  PalletNftsCollectionConfig: {
    settings: 'u64',
    maxSupply: 'Option<u32>',
    mintSettings: 'PalletNftsMintSettings'
  },
  /**
   * Lookup165: pallet_nfts::types::CollectionSetting
   **/
  PalletNftsCollectionSetting: {
    _enum: ['__Unused0', 'TransferableItems', 'UnlockedMetadata', '__Unused3', 'UnlockedAttributes', '__Unused5', '__Unused6', '__Unused7', 'UnlockedMaxSupply', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', 'DepositRequired']
  },
  /**
   * Lookup166: pallet_nfts::types::MintSettings<Price, BlockNumber, CollectionId>
   **/
  PalletNftsMintSettings: {
    mintType: 'PalletNftsMintType',
    price: 'Option<u128>',
    startBlock: 'Option<u32>',
    endBlock: 'Option<u32>',
    defaultItemSettings: 'u64'
  },
  /**
   * Lookup167: pallet_nfts::types::MintType<CollectionId>
   **/
  PalletNftsMintType: {
    _enum: {
      Issuer: 'Null',
      Public: 'Null',
      HolderOf: 'u32'
    }
  },
  /**
   * Lookup169: pallet_nfts::types::PalletFeature
   **/
  PalletNftsPalletFeature: {
    _enum: ['__Unused0', 'Trading', 'Attributes', '__Unused3', 'Approvals', '__Unused5', '__Unused6', '__Unused7', 'Swaps']
  },
  /**
   * Lookup170: pallet_nfts::pallet::Error<T, I>
   **/
  PalletNftsError: {
    _enum: ['NoPermission', 'UnknownCollection', 'AlreadyExists', 'ApprovalExpired', 'WrongOwner', 'BadWitness', 'CollectionIdInUse', 'ItemsNonTransferable', 'NotDelegate', 'WrongDelegate', 'Unapproved', 'Unaccepted', 'ItemLocked', 'LockedItemAttributes', 'LockedCollectionAttributes', 'LockedItemMetadata', 'LockedCollectionMetadata', 'MaxSupplyReached', 'MaxSupplyLocked', 'MaxSupplyTooSmall', 'UnknownItem', 'UnknownSwap', 'MetadataNotFound', 'AttributeNotFound', 'NotForSale', 'BidTooLow', 'ReachedApprovalLimit', 'DeadlineExpired', 'WrongDuration', 'MethodDisabled', 'WrongSetting', 'InconsistentItemConfig', 'NoConfig', 'RolesNotCleared', 'MintNotStarted', 'MintEnded', 'AlreadyClaimed', 'IncorrectData', 'WrongOrigin', 'WrongSignature', 'IncorrectMetadata', 'MaxAttributesLimitReached', 'WrongNamespace', 'CollectionNotEmpty']
  },
  /**
   * Lookup171: pallet_game::types::GameDetails<sp_core::crypto::AccountId32, DepositBalance>
   **/
  PalletGameGameDetails: {
    owner: 'AccountId32',
    ownerDeposit: 'u128',
    collections: 'u32',
    admin: 'AccountId32'
  },
  /**
   * Lookup175: pallet_game::types::PoolDetails<sp_core::crypto::AccountId32, Balance, BlockNumber, CollectionId>
   **/
  PalletGamePoolDetails: {
    poolType: 'PalletGamePoolType',
    owner: 'AccountId32',
    ownerDeposit: 'u128',
    admin: 'AccountId32',
    mintSettings: 'GafiSupportGameTypesMintSettings'
  },
  /**
   * Lookup177: pallet_game::types::UpgradeItemConfig<ItemId, Price>
   **/
  PalletGameUpgradeItemConfig: {
    item: 'u32',
    fee: 'u128'
  },
  /**
   * Lookup179: pallet_game::types::TradeConfig<sp_core::crypto::AccountId32, Price, bounded_collections::bounded_vec::BoundedVec<gafi_support::game::types::Package<CollectionId, ItemId>, S>, BlockNumber>
   **/
  PalletGameTradeConfig: {
    trade: 'GafiSupportGameTypesTradeType',
    owner: 'AccountId32',
    maybePrice: 'Option<u128>',
    maybeRequired: 'Option<Vec<GafiSupportGameTypesPackage>>',
    startBlock: 'Option<u32>',
    endBlock: 'Option<u32>'
  },
  /**
   * Lookup181: pallet_game::types::AuctionConfig<sp_core::crypto::AccountId32, Price, BlockNumber>
   **/
  PalletGameAuctionConfig: {
    owner: 'AccountId32',
    maybePrice: 'Option<u128>',
    startBlock: 'u32',
    duration: 'u32'
  },
  /**
   * Lookup182: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup183: pallet_game::pallet::Error<T, I>
   **/
  PalletGameError: {
    _enum: ['NoPermission', 'UnknownGame', 'UnknownCollection', 'UnknownItem', 'UnknownTrade', 'UnknownUpgrade', 'UnknownAuction', 'UnknownBid', 'UnknownAcceptance', 'UnknownMiningPool', 'ExceedMaxItem', 'ExceedTotalAmount', 'ExceedAllowedAmount', 'ExceedMaxCollection', 'ExceedMaxGameShare', 'ExceedMaxBundle', 'ExceedMaxLoot', 'SoldOut', 'WithdrawReserveFailed', 'UpgradeExists', 'CollectionExists', 'InsufficientItemBalance', 'InsufficientReservedBalance', 'InvalidAmount', 'ItemLocked', 'BidTooLow', 'AskTooHigh', 'GameIdInUse', 'TradeIdInUse', 'PoolIdInUse', 'TradeNotStarted', 'TradeEnded', 'IncorrectCollection', 'IncorrectItem', 'AuctionInProgress', 'AuctionNotStarted', 'AuctionEnded', 'NotSetPrice', 'NotBundle', 'NotWishlist', 'NotSwap', 'NotAuction', 'NotSetBuy', 'InfiniteSupply', 'NotInfiniteSupply', 'MintFailed', 'MintNotStarted', 'MintEnded', 'NotWhitelisted']
  },
  /**
   * Lookup185: pallet_faucet::pallet::Error<T>
   **/
  PalletFaucetError: {
    _enum: ['SelfTransfer', 'NotEnoughBalance', 'DontBeGreedy', 'PleaseWait', 'OutOfFaucet']
  },
  /**
   * Lookup186: pallet_cache::pallet::Flag
   **/
  PalletCacheFlag: {
    _enum: ['Left', 'Right']
  },
  /**
   * Lookup188: pallet_cache::pallet::WrapData<Data>
   **/
  PalletCacheWrapData: {
    data: 'u128',
    timestamp: 'u128'
  },
  /**
   * Lookup189: pallet_cache::pallet::Error<T, I>
   **/
  PalletCacheError: 'Null',
  /**
   * Lookup191: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup192: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup193: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup196: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup197: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup198: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup199: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup202: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup203: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup204: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup205: game3_runtime::Runtime
   **/
  Game3RuntimeRuntime: 'Null'
};
