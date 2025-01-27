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
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
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
        },
        {
          "name": "clock",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
    },
    {
      "name": "liquidateAmm",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "liquidateFloor",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createLendingPool",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
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
          "name": "params",
          "type": {
            "defined": "CreateLendingPoolParams"
          }
        }
      ]
    },
    {
      "name": "createLendingAccount",
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
          "name": "lendingPool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingAccount",
          "isMut": true,
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
      "name": "depositLiquidity",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingAccount",
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
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "depositLiquidity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawLiquidity",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingAccount",
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
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawLiquidity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "borrowQuoteG",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteDepositVault",
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
      "name": "repayQuoteG",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteDepositVault",
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
    },
    {
      "name": "liquidateAmmG",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
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
          "name": "quoteDepositVault",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "liquidateFloorG",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
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
          "name": "quoteDepositVault",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buyPresale",
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
          "name": "presaleCoupon",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
            "defined": "BuyParams"
          }
        }
      ]
    },
    {
      "name": "claimPresale",
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
          "name": "presaleCoupon",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimCreatorFees",
      "accounts": [
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
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimPlatformFees",
      "accounts": [
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
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
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
          },
          {
            "name": "totalBorrowQuoteG",
            "type": "u64"
          },
          {
            "name": "startInterestRate",
            "type": "u32"
          },
          {
            "name": "startInterestRateG",
            "type": "u32"
          },
          {
            "name": "startInterestDate",
            "type": "i64"
          },
          {
            "name": "startInterestDateG",
            "type": "i64"
          },
          {
            "name": "cumInterestOwed",
            "type": "u64"
          },
          {
            "name": "cumInterestOwedG",
            "type": "u64"
          },
          {
            "name": "totalInterestPaid",
            "type": "u64"
          },
          {
            "name": "totalInterestPaidG",
            "type": "u64"
          },
          {
            "name": "marketStateAddress",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "lendingAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "lendingAccountBump",
            "type": "u8"
          },
          {
            "name": "totalDeposited",
            "type": "u64"
          },
          {
            "name": "lpShares",
            "type": "u64"
          },
          {
            "name": "lendingPoolAddress",
            "type": "publicKey"
          },
          {
            "name": "interestAccrued",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "lendingPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quoteMintAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteTokenVault",
            "type": "publicKey"
          },
          {
            "name": "quoteDecimals",
            "type": "u8"
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
            "name": "lpIssued",
            "type": "u64"
          },
          {
            "name": "maxInterest",
            "type": "u32"
          },
          {
            "name": "minInterest",
            "type": "u32"
          },
          {
            "name": "curveMod",
            "type": "u8"
          },
          {
            "name": "interestAccrued",
            "type": "u64"
          },
          {
            "name": "lendingPoolBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenVaultBump",
            "type": "u8"
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
            "name": "quotePoolDeficit",
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
            "name": "totalBorrowGlobal",
            "type": "u64"
          },
          {
            "name": "interestRate",
            "type": "u32"
          },
          {
            "name": "interestAccrued",
            "type": "u64"
          },
          {
            "name": "interestAccruedGlobal",
            "type": "u64"
          },
          {
            "name": "maxInterest",
            "type": "u32"
          },
          {
            "name": "minInterest",
            "type": "u32"
          },
          {
            "name": "curveMod",
            "type": "u8"
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
            "name": "presaleBaseClaimed",
            "type": "u64"
          },
          {
            "name": "presaleQuote",
            "type": "u64"
          },
          {
            "name": "presaleSplit",
            "type": "u32"
          },
          {
            "name": "presaleFee",
            "type": "u32"
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
            "name": "platformFees",
            "type": "u64"
          },
          {
            "name": "platformFeesClaimed",
            "type": "u64"
          },
          {
            "name": "creatorFees",
            "type": "u64"
          },
          {
            "name": "creatorFeesClaimed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "presaleCoupon",
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
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "marketAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteDeposited",
            "type": "u64"
          },
          {
            "name": "couponBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateLendingPoolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxInterest",
            "type": "u32"
          },
          {
            "name": "minInterest",
            "type": "u32"
          },
          {
            "name": "curveMod",
            "type": "u8"
          }
        ]
      }
    },
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
            "name": "presaleSplit",
            "type": "u32"
          },
          {
            "name": "presaleFee",
            "type": "u32"
          },
          {
            "name": "scalerDecimals",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "maxInterest",
            "type": "u32"
          },
          {
            "name": "minInterest",
            "type": "u32"
          },
          {
            "name": "curveMod",
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
  "events": [
    {
      "name": "BoostFloorEvent",
      "fields": [
        {
          "name": "quoteMoved",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalMoved",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "floorPool",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "BorrowEvent",
      "fields": [
        {
          "name": "totalDepositedGlobal",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBorrowedGlobal",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalDeposited",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBorrowed",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "BorrowQuoteEvent",
      "fields": [
        {
          "name": "totalBorrowed",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "ClaimEvent",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "DepositBaseEvent",
      "fields": [
        {
          "name": "totalDeposited",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "LendingEvent",
      "fields": [
        {
          "name": "totalDepositedGlobal",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBorrowedGlobal",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalDeposited",
          "type": "u64",
          "index": false
        },
        {
          "name": "globalShares",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalShares",
          "type": "u64",
          "index": false
        },
        {
          "name": "shareDelta",
          "type": "u64",
          "index": false
        },
        {
          "name": "isWithdraw",
          "type": "bool",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "LiquidationEvent",
      "fields": [
        {
          "name": "cqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        },
        {
          "name": "target",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "LiquidationEventFloor",
      "fields": [
        {
          "name": "floorPool",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBurned",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBurnCost",
          "type": "u64",
          "index": false
        },
        {
          "name": "cqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        },
        {
          "name": "target",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "RepayQuoteEvent",
      "fields": [
        {
          "name": "totalBorrowed",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "SellFloorEvent",
      "fields": [
        {
          "name": "floorPool",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBurned",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBurnCost",
          "type": "u64",
          "index": false
        },
        {
          "name": "cqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "TradeEvent",
      "fields": [
        {
          "name": "cqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateFloorEvent",
      "fields": [
        {
          "name": "newFloorCqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "WithdrawBaseEvent",
      "fields": [
        {
          "name": "totalDeposited",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
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
      "name": "BorrowTooLargeError",
      "msg": "Borrow too large!"
    },
    {
      "code": 6032,
      "name": "MarketNotLaunchedError",
      "msg": "Market not launched!"
    },
    {
      "code": 6033,
      "name": "PresaleNotStartedError",
      "msg": "Presale not started!"
    },
    {
      "code": 6034,
      "name": "PresaleEndedError",
      "msg": "Presale ended!"
    },
    {
      "code": 6035,
      "name": "HealthyLTVError",
      "msg": "LTV is healthy!"
    },
    {
      "code": 6036,
      "name": "NoLoanError",
      "msg": "No loan error!"
    },
    {
      "code": 6037,
      "name": "AmmPriceDeltaError",
      "msg": "Amm price delta delta too low!"
    },
    {
      "code": 6038,
      "name": "MinInterestHigherThanMaxError",
      "msg": "Min interest higher than max"
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
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
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
        },
        {
          "name": "clock",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
    },
    {
      "name": "liquidateAmm",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "liquidateFloor",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createLendingPool",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
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
          "name": "params",
          "type": {
            "defined": "CreateLendingPoolParams"
          }
        }
      ]
    },
    {
      "name": "createLendingAccount",
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
          "name": "lendingPool",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "lendingAccount",
          "isMut": true,
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
      "name": "depositLiquidity",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingAccount",
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
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "depositLiquidity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawLiquidity",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteDepositVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lendingAccount",
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
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "withdrawLiquidity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "borrowQuoteG",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteDepositVault",
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
      "name": "repayQuoteG",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteDepositVault",
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
          "name": "clock",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
    },
    {
      "name": "liquidateAmmG",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
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
          "name": "quoteDepositVault",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "liquidateFloorG",
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
          "name": "lendingPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
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
          "name": "quoteDepositVault",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buyPresale",
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
          "name": "presaleCoupon",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
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
            "defined": "BuyParams"
          }
        }
      ]
    },
    {
      "name": "claimPresale",
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
          "name": "presaleCoupon",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
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
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimCreatorFees",
      "accounts": [
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
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creatorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimPlatformFees",
      "accounts": [
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
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
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
          },
          {
            "name": "totalBorrowQuoteG",
            "type": "u64"
          },
          {
            "name": "startInterestRate",
            "type": "u32"
          },
          {
            "name": "startInterestRateG",
            "type": "u32"
          },
          {
            "name": "startInterestDate",
            "type": "i64"
          },
          {
            "name": "startInterestDateG",
            "type": "i64"
          },
          {
            "name": "cumInterestOwed",
            "type": "u64"
          },
          {
            "name": "cumInterestOwedG",
            "type": "u64"
          },
          {
            "name": "totalInterestPaid",
            "type": "u64"
          },
          {
            "name": "totalInterestPaidG",
            "type": "u64"
          },
          {
            "name": "marketStateAddress",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "lendingAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "lendingAccountBump",
            "type": "u8"
          },
          {
            "name": "totalDeposited",
            "type": "u64"
          },
          {
            "name": "lpShares",
            "type": "u64"
          },
          {
            "name": "lendingPoolAddress",
            "type": "publicKey"
          },
          {
            "name": "interestAccrued",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "lendingPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quoteMintAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteTokenVault",
            "type": "publicKey"
          },
          {
            "name": "quoteDecimals",
            "type": "u8"
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
            "name": "lpIssued",
            "type": "u64"
          },
          {
            "name": "maxInterest",
            "type": "u32"
          },
          {
            "name": "minInterest",
            "type": "u32"
          },
          {
            "name": "curveMod",
            "type": "u8"
          },
          {
            "name": "interestAccrued",
            "type": "u64"
          },
          {
            "name": "lendingPoolBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenVaultBump",
            "type": "u8"
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
            "name": "quotePoolDeficit",
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
            "name": "totalBorrowGlobal",
            "type": "u64"
          },
          {
            "name": "interestRate",
            "type": "u32"
          },
          {
            "name": "interestAccrued",
            "type": "u64"
          },
          {
            "name": "interestAccruedGlobal",
            "type": "u64"
          },
          {
            "name": "maxInterest",
            "type": "u32"
          },
          {
            "name": "minInterest",
            "type": "u32"
          },
          {
            "name": "curveMod",
            "type": "u8"
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
            "name": "presaleBaseClaimed",
            "type": "u64"
          },
          {
            "name": "presaleQuote",
            "type": "u64"
          },
          {
            "name": "presaleSplit",
            "type": "u32"
          },
          {
            "name": "presaleFee",
            "type": "u32"
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
            "name": "platformFees",
            "type": "u64"
          },
          {
            "name": "platformFeesClaimed",
            "type": "u64"
          },
          {
            "name": "creatorFees",
            "type": "u64"
          },
          {
            "name": "creatorFeesClaimed",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "presaleCoupon",
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
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "marketAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteDeposited",
            "type": "u64"
          },
          {
            "name": "couponBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateLendingPoolParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxInterest",
            "type": "u32"
          },
          {
            "name": "minInterest",
            "type": "u32"
          },
          {
            "name": "curveMod",
            "type": "u8"
          }
        ]
      }
    },
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
            "name": "presaleSplit",
            "type": "u32"
          },
          {
            "name": "presaleFee",
            "type": "u32"
          },
          {
            "name": "scalerDecimals",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "maxInterest",
            "type": "u32"
          },
          {
            "name": "minInterest",
            "type": "u32"
          },
          {
            "name": "curveMod",
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
  "events": [
    {
      "name": "BoostFloorEvent",
      "fields": [
        {
          "name": "quoteMoved",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalMoved",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "floorPool",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "BorrowEvent",
      "fields": [
        {
          "name": "totalDepositedGlobal",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBorrowedGlobal",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalDeposited",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBorrowed",
          "type": "u64",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "BorrowQuoteEvent",
      "fields": [
        {
          "name": "totalBorrowed",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "ClaimEvent",
      "fields": [
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "DepositBaseEvent",
      "fields": [
        {
          "name": "totalDeposited",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "LendingEvent",
      "fields": [
        {
          "name": "totalDepositedGlobal",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBorrowedGlobal",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalDeposited",
          "type": "u64",
          "index": false
        },
        {
          "name": "globalShares",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalShares",
          "type": "u64",
          "index": false
        },
        {
          "name": "shareDelta",
          "type": "u64",
          "index": false
        },
        {
          "name": "isWithdraw",
          "type": "bool",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "LiquidationEvent",
      "fields": [
        {
          "name": "cqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        },
        {
          "name": "target",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "LiquidationEventFloor",
      "fields": [
        {
          "name": "floorPool",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBurned",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBurnCost",
          "type": "u64",
          "index": false
        },
        {
          "name": "cqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        },
        {
          "name": "target",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "RepayQuoteEvent",
      "fields": [
        {
          "name": "totalBorrowed",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "SellFloorEvent",
      "fields": [
        {
          "name": "floorPool",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBurned",
          "type": "u64",
          "index": false
        },
        {
          "name": "totalBurnCost",
          "type": "u64",
          "index": false
        },
        {
          "name": "cqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "TradeEvent",
      "fields": [
        {
          "name": "cqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "quotePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "basePool",
          "type": "u64",
          "index": false
        },
        {
          "name": "isBuy",
          "type": "bool",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "UpdateFloorEvent",
      "fields": [
        {
          "name": "newFloorCqd",
          "type": "u64",
          "index": false
        },
        {
          "name": "divisorPow",
          "type": "u8",
          "index": false
        },
        {
          "name": "gradient",
          "type": "u32",
          "index": false
        },
        {
          "name": "offset",
          "type": "u32",
          "index": false
        },
        {
          "name": "scaler",
          "type": "u8",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "WithdrawBaseEvent",
      "fields": [
        {
          "name": "totalDeposited",
          "type": "u64",
          "index": false
        },
        {
          "name": "decimals",
          "type": "u8",
          "index": false
        }
      ]
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
      "name": "BorrowTooLargeError",
      "msg": "Borrow too large!"
    },
    {
      "code": 6032,
      "name": "MarketNotLaunchedError",
      "msg": "Market not launched!"
    },
    {
      "code": 6033,
      "name": "PresaleNotStartedError",
      "msg": "Presale not started!"
    },
    {
      "code": 6034,
      "name": "PresaleEndedError",
      "msg": "Presale ended!"
    },
    {
      "code": 6035,
      "name": "HealthyLTVError",
      "msg": "LTV is healthy!"
    },
    {
      "code": 6036,
      "name": "NoLoanError",
      "msg": "No loan error!"
    },
    {
      "code": 6037,
      "name": "AmmPriceDeltaError",
      "msg": "Amm price delta delta too low!"
    },
    {
      "code": 6038,
      "name": "MinInterestHigherThanMaxError",
      "msg": "Min interest higher than max"
    }
  ]
};
