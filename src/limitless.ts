export type Limitless = {
  "version": "0.1.0",
  "name": "limitless",
  "instructions": [
    {
      "name": "createBase",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "fee",
          "type": "u32"
        }
      ]
    },
    {
      "name": "createMarket",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "params",
          "type": {
            "defined": "CreateMarketParams"
          }
        }
      ]
    },
    {
      "name": "createMarketVaults",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "BuyParams"
          }
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SellParams"
          }
        }
      ]
    },
    {
      "name": "updateFloor",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "xGuess",
          "type": "u64"
        }
      ]
    },
    {
      "name": "boostFloor",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "sellFloor",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SellParams"
          }
        }
      ]
    },
    {
      "name": "createDepositAccount",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositBase",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "depositAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "borrowQuote",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "borrowAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawBase",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "repayQuote",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "repayAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "depositAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "depositAccountBump",
            "type": "u8"
          },
          {
            "name": "totalDepositBase",
            "type": "u64"
          },
          {
            "name": "totalBorrowQuote",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "marketBaseBump",
            "type": "u8"
          },
          {
            "name": "authWallet",
            "type": "publicKey"
          },
          {
            "name": "platformFee",
            "type": "u32"
          },
          {
            "name": "feeAddress",
            "type": "publicKey"
          },
          {
            "name": "feeBps",
            "type": "u32"
          },
          {
            "name": "isPaused",
            "type": "bool"
          },
          {
            "name": "season",
            "type": "u32"
          },
          {
            "name": "seasonEnabled",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "marketState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultsCreated",
            "type": "bool"
          },
          {
            "name": "baseMintAddress",
            "type": "publicKey"
          },
          {
            "name": "baseMintTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintFloorTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "platformFeeVaultAddress",
            "type": "publicKey"
          },
          {
            "name": "maxCqd",
            "type": "u64"
          },
          {
            "name": "cqd",
            "type": "u64"
          },
          {
            "name": "offset",
            "type": "u64"
          },
          {
            "name": "minSize",
            "type": "u64"
          },
          {
            "name": "gradient",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "baseDecimals",
            "type": "u8"
          },
          {
            "name": "quoteDecimals",
            "type": "u8"
          },
          {
            "name": "floorPrice",
            "type": "u64"
          },
          {
            "name": "highestFloorQuantity",
            "type": "u64"
          },
          {
            "name": "totalMoved",
            "type": "u64"
          },
          {
            "name": "floorPoolSize",
            "type": "u64"
          },
          {
            "name": "basePoolSize",
            "type": "u64"
          },
          {
            "name": "quotePoolSize",
            "type": "u64"
          },
          {
            "name": "startQ",
            "type": "u64"
          },
          {
            "name": "totalSoldBase",
            "type": "u128"
          },
          {
            "name": "totalSoldQuote",
            "type": "u128"
          },
          {
            "name": "totalBoughtBase",
            "type": "u128"
          },
          {
            "name": "totalBoughtQuote",
            "type": "u128"
          },
          {
            "name": "totalSells",
            "type": "u128"
          },
          {
            "name": "totalBuys",
            "type": "u128"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "totalBurned",
            "type": "u64"
          },
          {
            "name": "totalBurnCost",
            "type": "u64"
          },
          {
            "name": "marketStateBump",
            "type": "u8"
          },
          {
            "name": "baseMintBump",
            "type": "u8"
          },
          {
            "name": "baseTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenFloorVaultBump",
            "type": "u8"
          },
          {
            "name": "platformFeeVaultBump",
            "type": "u8"
          },
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "launchDate",
            "type": "i64"
          },
          {
            "name": "preMint",
            "type": "u64"
          },
          {
            "name": "preMintClaimed",
            "type": "bool"
          },
          {
            "name": "continuousMint",
            "type": "bool"
          },
          {
            "name": "creatorMinted",
            "type": "u64"
          },
          {
            "name": "buyFee",
            "type": "u32"
          },
          {
            "name": "sellFee",
            "type": "u32"
          },
          {
            "name": "receiveAddress",
            "type": "publicKey"
          },
          {
            "name": "creatorSplit",
            "type": "u32"
          },
          {
            "name": "backupSet",
            "type": "bool"
          },
          {
            "name": "backupWallet",
            "type": "publicKey"
          },
          {
            "name": "newCreator",
            "type": "publicKey"
          },
          {
            "name": "proposalActive",
            "type": "bool"
          },
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "scalerDecimals",
            "type": "u8"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "priceExpo",
            "type": "u64"
          },
          {
            "name": "totalDeposit",
            "type": "u64"
          },
          {
            "name": "totalBorrow",
            "type": "u64"
          },
          {
            "name": "baseDepositAddress",
            "type": "publicKey"
          },
          {
            "name": "baseDepositAddressBump",
            "type": "u8"
          },
          {
            "name": "presaleDateOffset",
            "type": "i64"
          },
          {
            "name": "presaleBase",
            "type": "u64"
          },
          {
            "name": "presaleQuote",
            "type": "u64"
          },
          {
            "name": "pow1",
            "type": "u8"
          },
          {
            "name": "pow2",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateMarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startQuantity",
            "type": "u64"
          },
          {
            "name": "offset",
            "type": "u64"
          },
          {
            "name": "minTradeSize",
            "type": "u64"
          },
          {
            "name": "gradient",
            "type": "u64"
          },
          {
            "name": "preMint",
            "type": "u64"
          },
          {
            "name": "continuousMint",
            "type": "bool"
          },
          {
            "name": "buyFee",
            "type": "u32"
          },
          {
            "name": "sellFee",
            "type": "u32"
          },
          {
            "name": "launchDate",
            "type": "i64"
          },
          {
            "name": "creatorSplit",
            "type": "u32"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "pow1",
            "type": "u8"
          },
          {
            "name": "pow2",
            "type": "u8"
          },
          {
            "name": "presaleOffset",
            "type": "i64"
          },
          {
            "name": "scalerDecimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "BuyParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "maxCost",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "minProceeds",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MetadataMismatch",
      "msg": "Metadata type error!"
    },
    {
      "code": 6001,
      "name": "MintMismatch",
      "msg": "Mint mismatch!"
    },
    {
      "code": 6002,
      "name": "NewCreatorMismatch",
      "msg": "New creator mismatch!"
    },
    {
      "code": 6003,
      "name": "NoProposal",
      "msg": "No proposal!"
    },
    {
      "code": 6004,
      "name": "BackupWalletIsNotSet",
      "msg": "Backup wallet is not set!"
    },
    {
      "code": 6005,
      "name": "BackupWalletIsSet",
      "msg": "Backup wallet already set!"
    },
    {
      "code": 6006,
      "name": "MarketAlreadyLaunched",
      "msg": "Market already launched!"
    },
    {
      "code": 6007,
      "name": "InvalidIdLength",
      "msg": "Invalid id length!"
    },
    {
      "code": 6008,
      "name": "InsufficientFloorLiquidity",
      "msg": "Insufficient floor liquidity!"
    },
    {
      "code": 6009,
      "name": "InvalidCreator",
      "msg": "Invalid creator!"
    },
    {
      "code": 6010,
      "name": "InvalidAmount",
      "msg": "Invalid amount!"
    },
    {
      "code": 6011,
      "name": "NotAvailable",
      "msg": "Not available!"
    },
    {
      "code": 6012,
      "name": "InvalidQuoteMint",
      "msg": "Invalid quote mint!"
    },
    {
      "code": 6013,
      "name": "AlreadyClaimed",
      "msg": "Premint already claimed!"
    },
    {
      "code": 6014,
      "name": "InvalidFee",
      "msg": "Invalid fee!"
    },
    {
      "code": 6015,
      "name": "InsuficcientBase",
      "msg": "Insufficient base liquidity!"
    },
    {
      "code": 6016,
      "name": "BaseAndQuoteMatch",
      "msg": "Base and quote address match!"
    },
    {
      "code": 6017,
      "name": "TickAndSizeCombo",
      "msg": "Tick and size error!"
    },
    {
      "code": 6018,
      "name": "SlippageLimitHit",
      "msg": "Slippage Limit Hit!"
    },
    {
      "code": 6019,
      "name": "InvalidQuantity",
      "msg": "Invalid quantity!"
    },
    {
      "code": 6020,
      "name": "ZeroTotal",
      "msg": "Total is zero!"
    },
    {
      "code": 6021,
      "name": "InvalidMaxCost",
      "msg": "Invalid max cost!"
    },
    {
      "code": 6022,
      "name": "InvalidStartPrice",
      "msg": "Invalid start price!"
    },
    {
      "code": 6023,
      "name": "InvalidPriceTick",
      "msg": "Invalid price tick!"
    },
    {
      "code": 6024,
      "name": "InvalidMinimumTradeSize",
      "msg": "Invalid minimum trade size!"
    },
    {
      "code": 6025,
      "name": "InvalidOrderSize",
      "msg": "Invalid order size!"
    },
    {
      "code": 6026,
      "name": "ArithmeticError",
      "msg": "Arithmetic Error"
    },
    {
      "code": 6027,
      "name": "OverflowError",
      "msg": "Overflow"
    },
    {
      "code": 6028,
      "name": "UnderflowError",
      "msg": "Underflow"
    },
    {
      "code": 6029,
      "name": "InvalidRootError",
      "msg": "Root not found"
    },
    {
      "code": 6030,
      "name": "WithdrawLargeError",
      "msg": "Withdraw too large!"
    },
    {
      "code": 6031,
      "name": "MarketNotLaunchedError",
      "msg": "Market not launched!"
    },
    {
      "code": 6032,
      "name": "PresaleNotStartedError",
      "msg": "Presale not started!"
    },
    {
      "code": 6033,
      "name": "PresaleEndedError",
      "msg": "Presale ended!"
    }
  ]
};

export const IDL: Limitless = {
  "version": "0.1.0",
  "name": "limitless",
  "instructions": [
    {
      "name": "createBase",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "fee",
          "type": "u32"
        }
      ]
    },
    {
      "name": "createMarket",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "params",
          "type": {
            "defined": "CreateMarketParams"
          }
        }
      ]
    },
    {
      "name": "createMarketVaults",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "BuyParams"
          }
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SellParams"
          }
        }
      ]
    },
    {
      "name": "updateFloor",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "xGuess",
          "type": "u64"
        }
      ]
    },
    {
      "name": "boostFloor",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "sellFloor",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SellParams"
          }
        }
      ]
    },
    {
      "name": "createDepositAccount",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositBase",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "depositAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "borrowQuote",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "borrowAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawBase",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "repayQuote",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "repayAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "depositAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "depositAccountBump",
            "type": "u8"
          },
          {
            "name": "totalDepositBase",
            "type": "u64"
          },
          {
            "name": "totalBorrowQuote",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "marketBaseBump",
            "type": "u8"
          },
          {
            "name": "authWallet",
            "type": "publicKey"
          },
          {
            "name": "platformFee",
            "type": "u32"
          },
          {
            "name": "feeAddress",
            "type": "publicKey"
          },
          {
            "name": "feeBps",
            "type": "u32"
          },
          {
            "name": "isPaused",
            "type": "bool"
          },
          {
            "name": "season",
            "type": "u32"
          },
          {
            "name": "seasonEnabled",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "marketState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "vaultsCreated",
            "type": "bool"
          },
          {
            "name": "baseMintAddress",
            "type": "publicKey"
          },
          {
            "name": "baseMintTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintFloorTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "platformFeeVaultAddress",
            "type": "publicKey"
          },
          {
            "name": "maxCqd",
            "type": "u64"
          },
          {
            "name": "cqd",
            "type": "u64"
          },
          {
            "name": "offset",
            "type": "u64"
          },
          {
            "name": "minSize",
            "type": "u64"
          },
          {
            "name": "gradient",
            "type": "u64"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "baseDecimals",
            "type": "u8"
          },
          {
            "name": "quoteDecimals",
            "type": "u8"
          },
          {
            "name": "floorPrice",
            "type": "u64"
          },
          {
            "name": "highestFloorQuantity",
            "type": "u64"
          },
          {
            "name": "totalMoved",
            "type": "u64"
          },
          {
            "name": "floorPoolSize",
            "type": "u64"
          },
          {
            "name": "basePoolSize",
            "type": "u64"
          },
          {
            "name": "quotePoolSize",
            "type": "u64"
          },
          {
            "name": "startQ",
            "type": "u64"
          },
          {
            "name": "totalSoldBase",
            "type": "u128"
          },
          {
            "name": "totalSoldQuote",
            "type": "u128"
          },
          {
            "name": "totalBoughtBase",
            "type": "u128"
          },
          {
            "name": "totalBoughtQuote",
            "type": "u128"
          },
          {
            "name": "totalSells",
            "type": "u128"
          },
          {
            "name": "totalBuys",
            "type": "u128"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "totalBurned",
            "type": "u64"
          },
          {
            "name": "totalBurnCost",
            "type": "u64"
          },
          {
            "name": "marketStateBump",
            "type": "u8"
          },
          {
            "name": "baseMintBump",
            "type": "u8"
          },
          {
            "name": "baseTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenFloorVaultBump",
            "type": "u8"
          },
          {
            "name": "platformFeeVaultBump",
            "type": "u8"
          },
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "launchDate",
            "type": "i64"
          },
          {
            "name": "preMint",
            "type": "u64"
          },
          {
            "name": "preMintClaimed",
            "type": "bool"
          },
          {
            "name": "continuousMint",
            "type": "bool"
          },
          {
            "name": "creatorMinted",
            "type": "u64"
          },
          {
            "name": "buyFee",
            "type": "u32"
          },
          {
            "name": "sellFee",
            "type": "u32"
          },
          {
            "name": "receiveAddress",
            "type": "publicKey"
          },
          {
            "name": "creatorSplit",
            "type": "u32"
          },
          {
            "name": "backupSet",
            "type": "bool"
          },
          {
            "name": "backupWallet",
            "type": "publicKey"
          },
          {
            "name": "newCreator",
            "type": "publicKey"
          },
          {
            "name": "proposalActive",
            "type": "bool"
          },
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "scalerDecimals",
            "type": "u8"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "priceExpo",
            "type": "u64"
          },
          {
            "name": "totalDeposit",
            "type": "u64"
          },
          {
            "name": "totalBorrow",
            "type": "u64"
          },
          {
            "name": "baseDepositAddress",
            "type": "publicKey"
          },
          {
            "name": "baseDepositAddressBump",
            "type": "u8"
          },
          {
            "name": "presaleDateOffset",
            "type": "i64"
          },
          {
            "name": "presaleBase",
            "type": "u64"
          },
          {
            "name": "presaleQuote",
            "type": "u64"
          },
          {
            "name": "pow1",
            "type": "u8"
          },
          {
            "name": "pow2",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateMarketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startQuantity",
            "type": "u64"
          },
          {
            "name": "offset",
            "type": "u64"
          },
          {
            "name": "minTradeSize",
            "type": "u64"
          },
          {
            "name": "gradient",
            "type": "u64"
          },
          {
            "name": "preMint",
            "type": "u64"
          },
          {
            "name": "continuousMint",
            "type": "bool"
          },
          {
            "name": "buyFee",
            "type": "u32"
          },
          {
            "name": "sellFee",
            "type": "u32"
          },
          {
            "name": "launchDate",
            "type": "i64"
          },
          {
            "name": "creatorSplit",
            "type": "u32"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "pow1",
            "type": "u8"
          },
          {
            "name": "pow2",
            "type": "u8"
          },
          {
            "name": "presaleOffset",
            "type": "i64"
          },
          {
            "name": "scalerDecimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "BuyParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "maxCost",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "minProceeds",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MetadataMismatch",
      "msg": "Metadata type error!"
    },
    {
      "code": 6001,
      "name": "MintMismatch",
      "msg": "Mint mismatch!"
    },
    {
      "code": 6002,
      "name": "NewCreatorMismatch",
      "msg": "New creator mismatch!"
    },
    {
      "code": 6003,
      "name": "NoProposal",
      "msg": "No proposal!"
    },
    {
      "code": 6004,
      "name": "BackupWalletIsNotSet",
      "msg": "Backup wallet is not set!"
    },
    {
      "code": 6005,
      "name": "BackupWalletIsSet",
      "msg": "Backup wallet already set!"
    },
    {
      "code": 6006,
      "name": "MarketAlreadyLaunched",
      "msg": "Market already launched!"
    },
    {
      "code": 6007,
      "name": "InvalidIdLength",
      "msg": "Invalid id length!"
    },
    {
      "code": 6008,
      "name": "InsufficientFloorLiquidity",
      "msg": "Insufficient floor liquidity!"
    },
    {
      "code": 6009,
      "name": "InvalidCreator",
      "msg": "Invalid creator!"
    },
    {
      "code": 6010,
      "name": "InvalidAmount",
      "msg": "Invalid amount!"
    },
    {
      "code": 6011,
      "name": "NotAvailable",
      "msg": "Not available!"
    },
    {
      "code": 6012,
      "name": "InvalidQuoteMint",
      "msg": "Invalid quote mint!"
    },
    {
      "code": 6013,
      "name": "AlreadyClaimed",
      "msg": "Premint already claimed!"
    },
    {
      "code": 6014,
      "name": "InvalidFee",
      "msg": "Invalid fee!"
    },
    {
      "code": 6015,
      "name": "InsuficcientBase",
      "msg": "Insufficient base liquidity!"
    },
    {
      "code": 6016,
      "name": "BaseAndQuoteMatch",
      "msg": "Base and quote address match!"
    },
    {
      "code": 6017,
      "name": "TickAndSizeCombo",
      "msg": "Tick and size error!"
    },
    {
      "code": 6018,
      "name": "SlippageLimitHit",
      "msg": "Slippage Limit Hit!"
    },
    {
      "code": 6019,
      "name": "InvalidQuantity",
      "msg": "Invalid quantity!"
    },
    {
      "code": 6020,
      "name": "ZeroTotal",
      "msg": "Total is zero!"
    },
    {
      "code": 6021,
      "name": "InvalidMaxCost",
      "msg": "Invalid max cost!"
    },
    {
      "code": 6022,
      "name": "InvalidStartPrice",
      "msg": "Invalid start price!"
    },
    {
      "code": 6023,
      "name": "InvalidPriceTick",
      "msg": "Invalid price tick!"
    },
    {
      "code": 6024,
      "name": "InvalidMinimumTradeSize",
      "msg": "Invalid minimum trade size!"
    },
    {
      "code": 6025,
      "name": "InvalidOrderSize",
      "msg": "Invalid order size!"
    },
    {
      "code": 6026,
      "name": "ArithmeticError",
      "msg": "Arithmetic Error"
    },
    {
      "code": 6027,
      "name": "OverflowError",
      "msg": "Overflow"
    },
    {
      "code": 6028,
      "name": "UnderflowError",
      "msg": "Underflow"
    },
    {
      "code": 6029,
      "name": "InvalidRootError",
      "msg": "Root not found"
    },
    {
      "code": 6030,
      "name": "WithdrawLargeError",
      "msg": "Withdraw too large!"
    },
    {
      "code": 6031,
      "name": "MarketNotLaunchedError",
      "msg": "Market not launched!"
    },
    {
      "code": 6032,
      "name": "PresaleNotStartedError",
      "msg": "Presale not started!"
    },
    {
      "code": 6033,
      "name": "PresaleEndedError",
      "msg": "Presale ended!"
    }
  ]
};
