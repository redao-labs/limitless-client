/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/limitless.json`.
 */
export type Limitless = {
  "address": "2VPmfzaJhVR9DpJJJwfW4sXGbAPRdcQjRhswjmS5Fx8D",
  "metadata": {
    "name": "limitless",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "boostFloor",
      "discriminator": [
        253,
        54,
        202,
        253,
        238,
        126,
        108,
        202
      ],
      "accounts": [
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "quoteTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "borrowQuote",
      "discriminator": [
        8,
        219,
        224,
        235,
        13,
        147,
        230,
        28
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "userQuoteToken",
          "writable": true
        },
        {
          "name": "quoteTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "depositAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
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
      "name": "buy",
      "discriminator": [
        102,
        6,
        61,
        18,
        1,
        218,
        235,
        234
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "userBaseToken",
          "writable": true
        },
        {
          "name": "baseTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "userQuoteToken",
          "writable": true
        },
        {
          "name": "quoteTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "platformFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  97,
                  116,
                  102,
                  111,
                  114,
                  109,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "buyParams"
            }
          }
        }
      ]
    },
    {
      "name": "buyPresale",
      "discriminator": [
        113,
        18,
        193,
        68,
        35,
        36,
        215,
        8
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "presaleCoupon",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "baseTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "userQuoteToken",
          "writable": true
        },
        {
          "name": "quoteTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "platformFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  97,
                  116,
                  102,
                  111,
                  114,
                  109,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
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
            "defined": {
              "name": "buyParams"
            }
          }
        }
      ]
    },
    {
      "name": "claimCreatorAllocation",
      "discriminator": [
        61,
        26,
        23,
        14,
        181,
        200,
        238,
        245
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "baseTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "userBaseToken",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "claimCreatorFees",
      "discriminator": [
        0,
        23,
        125,
        234,
        156,
        118,
        134,
        89
      ],
      "accounts": [
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "platformFeeVault",
          "writable": true
        },
        {
          "name": "creatorTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "claimPlatformFees",
      "discriminator": [
        159,
        129,
        37,
        35,
        170,
        99,
        163,
        16
      ],
      "accounts": [
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "platformFeeVault",
          "writable": true
        },
        {
          "name": "platformTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    },
    {
      "name": "claimPresale",
      "discriminator": [
        82,
        240,
        122,
        5,
        109,
        66,
        86,
        190
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "presaleCoupon",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "account",
                "path": "user"
              },
              {
                "kind": "account",
                "path": "presale_coupon.id",
                "account": "presaleCoupon"
              }
            ]
          }
        },
        {
          "name": "baseTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "userBaseToken",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": []
    },
    {
      "name": "closeDepositAccount",
      "discriminator": [
        152,
        6,
        13,
        164,
        50,
        219,
        225,
        43
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "depositAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createBase",
      "discriminator": [
        105,
        21,
        119,
        65,
        98,
        88,
        63,
        127
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true,
          "address": "devsTs7NXqWFWjVJtWQbhbvfqEEXCJ9H1yXZYB7Fszd"
        },
        {
          "name": "marketBase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "feeAddress"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
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
      "name": "createDepositAccount",
      "discriminator": [
        25,
        217,
        82,
        207,
        22,
        150,
        122,
        181
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "depositAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createMarket",
      "discriminator": [
        103,
        226,
        97,
        235,
        200,
        188,
        251,
        254
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "quoteMint"
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
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
            "defined": {
              "name": "createMarketParams"
            }
          }
        }
      ]
    },
    {
      "name": "createMarketVaults",
      "discriminator": [
        73,
        63,
        123,
        113,
        190,
        157,
        213,
        103
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "baseTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createMarketVaults1",
      "discriminator": [
        74,
        109,
        52,
        234,
        172,
        11,
        105,
        218
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "quoteMint"
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createMarketVaults2",
      "discriminator": [
        172,
        11,
        31,
        102,
        174,
        26,
        97,
        255
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "quoteMint"
        },
        {
          "name": "platformFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  97,
                  116,
                  102,
                  111,
                  114,
                  109,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createMarketVaults3",
      "discriminator": [
        236,
        116,
        78,
        169,
        138,
        249,
        246,
        15
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "quoteMint"
        },
        {
          "name": "quoteTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createMarketVaults4",
      "discriminator": [
        16,
        248,
        102,
        214,
        158,
        242,
        86,
        225
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "quoteMint"
        },
        {
          "name": "baseDepositVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "creatorBuy",
      "discriminator": [
        73,
        28,
        100,
        36,
        99,
        99,
        116,
        197
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "baseTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "userQuoteToken",
          "writable": true
        },
        {
          "name": "quoteTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "platformFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  97,
                  116,
                  102,
                  111,
                  114,
                  109,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "buyParams"
            }
          }
        }
      ]
    },
    {
      "name": "depositBase",
      "discriminator": [
        213,
        125,
        25,
        122,
        8,
        72,
        100,
        237
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "userBaseToken",
          "writable": true
        },
        {
          "name": "baseDepositVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "depositAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
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
      "name": "repayQuote",
      "discriminator": [
        159,
        144,
        85,
        64,
        48,
        2,
        74,
        44
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "userQuoteToken",
          "writable": true
        },
        {
          "name": "quoteTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "depositAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
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
      "name": "sell",
      "discriminator": [
        51,
        230,
        133,
        164,
        1,
        127,
        131,
        173
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "userBaseToken",
          "writable": true
        },
        {
          "name": "baseTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "userQuoteToken",
          "writable": true
        },
        {
          "name": "quoteTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "platformFeeVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  97,
                  116,
                  102,
                  111,
                  114,
                  109,
                  95,
                  102,
                  101,
                  101,
                  95,
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "sellParams"
            }
          }
        }
      ]
    },
    {
      "name": "sellFloor",
      "discriminator": [
        218,
        174,
        236,
        16,
        91,
        33,
        167,
        232
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "userBaseToken",
          "writable": true
        },
        {
          "name": "baseTokenVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "userQuoteToken",
          "writable": true
        },
        {
          "name": "quoteTokenFloorVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  113,
                  117,
                  111,
                  116,
                  101,
                  95,
                  102,
                  108,
                  111,
                  111,
                  114,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "sellParams"
            }
          }
        }
      ]
    },
    {
      "name": "updateFloor",
      "discriminator": [
        38,
        80,
        204,
        37,
        6,
        62,
        192,
        200
      ],
      "accounts": [
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
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
      "name": "withdrawBase",
      "discriminator": [
        161,
        122,
        255,
        170,
        42,
        39,
        23,
        120
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "marketBase",
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "market_base.id",
                "account": "marketBase"
              }
            ]
          }
        },
        {
          "name": "marketState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketBase"
              },
              {
                "kind": "account",
                "path": "market_state.id",
                "account": "marketState"
              }
            ]
          }
        },
        {
          "name": "baseMint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "userBaseToken",
          "writable": true
        },
        {
          "name": "baseDepositVault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "const",
                "value": [
                  98,
                  97,
                  115,
                  101,
                  95,
                  100,
                  101,
                  112,
                  111,
                  115,
                  105,
                  116,
                  95,
                  116,
                  111,
                  107,
                  101,
                  110
                ]
              }
            ]
          }
        },
        {
          "name": "depositAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "marketState"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "withdrawAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "depositAccount",
      "discriminator": [
        148,
        37,
        207,
        116,
        61,
        33,
        53,
        179
      ]
    },
    {
      "name": "marketBase",
      "discriminator": [
        141,
        102,
        4,
        225,
        48,
        201,
        87,
        123
      ]
    },
    {
      "name": "marketState",
      "discriminator": [
        0,
        125,
        123,
        215,
        95,
        96,
        164,
        194
      ]
    },
    {
      "name": "presaleCoupon",
      "discriminator": [
        180,
        121,
        202,
        121,
        249,
        243,
        225,
        159
      ]
    }
  ],
  "events": [
    {
      "name": "boostFloorEvent",
      "discriminator": [
        168,
        210,
        220,
        252,
        94,
        106,
        159,
        173
      ]
    },
    {
      "name": "borrowEvent",
      "discriminator": [
        86,
        8,
        140,
        206,
        215,
        179,
        118,
        201
      ]
    },
    {
      "name": "claimEvent",
      "discriminator": [
        93,
        15,
        70,
        170,
        48,
        140,
        212,
        219
      ]
    },
    {
      "name": "liquidationEvent",
      "discriminator": [
        3,
        13,
        21,
        93,
        173,
        136,
        72,
        144
      ]
    },
    {
      "name": "liquidationEventFloor",
      "discriminator": [
        20,
        161,
        116,
        121,
        129,
        118,
        249,
        138
      ]
    },
    {
      "name": "sellFloorEvent",
      "discriminator": [
        216,
        212,
        0,
        61,
        113,
        122,
        205,
        80
      ]
    },
    {
      "name": "tradeEvent",
      "discriminator": [
        189,
        219,
        127,
        211,
        78,
        230,
        97,
        238
      ]
    },
    {
      "name": "updateFloorEvent",
      "discriminator": [
        147,
        134,
        85,
        45,
        45,
        81,
        66,
        93
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "metadataMismatch",
      "msg": "Metadata type error!"
    },
    {
      "code": 6001,
      "name": "mintMismatch",
      "msg": "Mint mismatch!"
    },
    {
      "code": 6002,
      "name": "newCreatorMismatch",
      "msg": "New creator mismatch!"
    },
    {
      "code": 6003,
      "name": "noProposal",
      "msg": "No proposal!"
    },
    {
      "code": 6004,
      "name": "backupWalletIsNotSet",
      "msg": "Backup wallet is not set!"
    },
    {
      "code": 6005,
      "name": "backupWalletIsSet",
      "msg": "Backup wallet already set!"
    },
    {
      "code": 6006,
      "name": "marketAlreadyLaunched",
      "msg": "Market already launched!"
    },
    {
      "code": 6007,
      "name": "invalidIdLength",
      "msg": "Invalid id length!"
    },
    {
      "code": 6008,
      "name": "insufficientFloorLiquidity",
      "msg": "Insufficient floor liquidity!"
    },
    {
      "code": 6009,
      "name": "invalidCreator",
      "msg": "Invalid creator!"
    },
    {
      "code": 6010,
      "name": "invalidAmount",
      "msg": "Invalid amount!"
    },
    {
      "code": 6011,
      "name": "notAvailable",
      "msg": "Not available!"
    },
    {
      "code": 6012,
      "name": "invalidQuoteMint",
      "msg": "Invalid quote mint!"
    },
    {
      "code": 6013,
      "name": "alreadyClaimed",
      "msg": "Premint already claimed!"
    },
    {
      "code": 6014,
      "name": "invalidFee",
      "msg": "Invalid fee!"
    },
    {
      "code": 6015,
      "name": "insuficcientBase",
      "msg": "Insufficient base liquidity!"
    },
    {
      "code": 6016,
      "name": "baseAndQuoteMatch",
      "msg": "Base and quote address match!"
    },
    {
      "code": 6017,
      "name": "tickAndSizeCombo",
      "msg": "Tick and size error!"
    },
    {
      "code": 6018,
      "name": "slippageLimitHit",
      "msg": "Slippage Limit Hit!"
    },
    {
      "code": 6019,
      "name": "invalidQuantity",
      "msg": "Invalid quantity!"
    },
    {
      "code": 6020,
      "name": "zeroTotal",
      "msg": "Total is zero!"
    },
    {
      "code": 6021,
      "name": "invalidMaxCost",
      "msg": "Invalid max cost!"
    },
    {
      "code": 6022,
      "name": "invalidStartPrice",
      "msg": "Invalid start price!"
    },
    {
      "code": 6023,
      "name": "invalidPriceTick",
      "msg": "Invalid price tick!"
    },
    {
      "code": 6024,
      "name": "invalidMinimumTradeSize",
      "msg": "Invalid minimum trade size!"
    },
    {
      "code": 6025,
      "name": "invalidOrderSize",
      "msg": "Invalid order size!"
    },
    {
      "code": 6026,
      "name": "arithmeticError",
      "msg": "Arithmetic Error"
    },
    {
      "code": 6027,
      "name": "overflowError",
      "msg": "overflow"
    },
    {
      "code": 6028,
      "name": "underflowError",
      "msg": "underflow"
    },
    {
      "code": 6029,
      "name": "invalidRootError",
      "msg": "Root not found"
    },
    {
      "code": 6030,
      "name": "withdrawLargeError",
      "msg": "Withdraw too large!"
    },
    {
      "code": 6031,
      "name": "borrowTooLargeError",
      "msg": "Borrow too large!"
    },
    {
      "code": 6032,
      "name": "marketNotLaunchedError",
      "msg": "Market not launched!"
    },
    {
      "code": 6033,
      "name": "presaleNotStartedError",
      "msg": "Presale not started!"
    },
    {
      "code": 6034,
      "name": "presaleStartedError",
      "msg": "Presale has begun!"
    },
    {
      "code": 6035,
      "name": "presaleEndedError",
      "msg": "Presale ended!"
    },
    {
      "code": 6036,
      "name": "healthyLtvError",
      "msg": "LTV is healthy!"
    },
    {
      "code": 6037,
      "name": "noLoanError",
      "msg": "No loan error!"
    },
    {
      "code": 6038,
      "name": "ammPriceDeltaError",
      "msg": "Amm price delta delta too low!"
    },
    {
      "code": 6039,
      "name": "minInterestHigherThanMaxError",
      "msg": "Min interest higher than max"
    },
    {
      "code": 6040,
      "name": "creatorAlreadyBoughtError",
      "msg": "Creator already bought!"
    },
    {
      "code": 6041,
      "name": "creatorAlreadyClaimedError",
      "msg": "Creator already claimed!"
    },
    {
      "code": 6042,
      "name": "claimIsZeroError",
      "msg": "Claim is zero error!"
    },
    {
      "code": 6043,
      "name": "nonZeroAccountError",
      "msg": "Unable to close non zero account!"
    }
  ],
  "types": [
    {
      "name": "boostFloorEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quoteMoved",
            "type": "u64"
          },
          {
            "name": "totalMoved",
            "type": "u64"
          },
          {
            "name": "quotePool",
            "type": "u64"
          },
          {
            "name": "floorPool",
            "type": "u64"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "borrowEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalDepositedGlobal",
            "type": "u64"
          },
          {
            "name": "totalBorrowedGlobal",
            "type": "u64"
          },
          {
            "name": "totalDeposited",
            "type": "u64"
          },
          {
            "name": "totalBorrowed",
            "type": "u64"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "buyParams",
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
      "name": "claimEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "basePool",
            "type": "u64"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "gradient",
            "type": "u32"
          },
          {
            "name": "offset",
            "type": "u32"
          },
          {
            "name": "scaler",
            "type": "u8"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "createMarketParams",
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
          },
          {
            "name": "presaleBaseSplit",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "depositAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
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
            "name": "marketStateAddress",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "liquidationEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cqd",
            "type": "u64"
          },
          {
            "name": "quotePool",
            "type": "u64"
          },
          {
            "name": "basePool",
            "type": "u64"
          },
          {
            "name": "isBuy",
            "type": "bool"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "gradient",
            "type": "u32"
          },
          {
            "name": "offset",
            "type": "u32"
          },
          {
            "name": "scaler",
            "type": "u8"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "target",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "liquidationEventFloor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "floorPool",
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
            "name": "cqd",
            "type": "u64"
          },
          {
            "name": "quotePool",
            "type": "u64"
          },
          {
            "name": "basePool",
            "type": "u64"
          },
          {
            "name": "isBuy",
            "type": "bool"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "gradient",
            "type": "u32"
          },
          {
            "name": "offset",
            "type": "u32"
          },
          {
            "name": "scaler",
            "type": "u8"
          },
          {
            "name": "decimals",
            "type": "u8"
          },
          {
            "name": "target",
            "type": "pubkey"
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
            "type": "pubkey"
          },
          {
            "name": "platformFee",
            "type": "u32"
          },
          {
            "name": "feeAddress",
            "type": "pubkey"
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
            "type": "pubkey"
          },
          {
            "name": "baseMintTokenAddress",
            "type": "pubkey"
          },
          {
            "name": "quoteMintAddress",
            "type": "pubkey"
          },
          {
            "name": "quoteMintTokenAddress",
            "type": "pubkey"
          },
          {
            "name": "quoteMintFloorTokenAddress",
            "type": "pubkey"
          },
          {
            "name": "platformFeeVaultAddress",
            "type": "pubkey"
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
            "type": "pubkey"
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
            "type": "pubkey"
          },
          {
            "name": "creatorSplit",
            "type": "u32"
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
            "name": "baseDepositAddress",
            "type": "pubkey"
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
          },
          {
            "name": "vaultsCreated1",
            "type": "bool"
          },
          {
            "name": "vaultsCreated2",
            "type": "bool"
          },
          {
            "name": "vaultsCreated3",
            "type": "bool"
          },
          {
            "name": "vaultsCreated4",
            "type": "bool"
          },
          {
            "name": "vaultsCreated5",
            "type": "bool"
          },
          {
            "name": "presaleBaseSplit",
            "type": "bool"
          },
          {
            "name": "creatorBaseShare",
            "type": "u64"
          },
          {
            "name": "creatorBuy",
            "type": "u64"
          },
          {
            "name": "creatorClaimed",
            "type": "bool"
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
            "type": "pubkey"
          },
          {
            "name": "marketAddress",
            "type": "pubkey"
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
    },
    {
      "name": "sellFloorEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "floorPool",
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
            "name": "cqd",
            "type": "u64"
          },
          {
            "name": "quotePool",
            "type": "u64"
          },
          {
            "name": "basePool",
            "type": "u64"
          },
          {
            "name": "isBuy",
            "type": "bool"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "gradient",
            "type": "u32"
          },
          {
            "name": "offset",
            "type": "u32"
          },
          {
            "name": "scaler",
            "type": "u8"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "sellParams",
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
    },
    {
      "name": "tradeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cqd",
            "type": "u64"
          },
          {
            "name": "quotePool",
            "type": "u64"
          },
          {
            "name": "basePool",
            "type": "u64"
          },
          {
            "name": "isBuy",
            "type": "bool"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "gradient",
            "type": "u32"
          },
          {
            "name": "offset",
            "type": "u32"
          },
          {
            "name": "scaler",
            "type": "u8"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "updateFloorEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newFloorCqd",
            "type": "u64"
          },
          {
            "name": "divisorPow",
            "type": "u8"
          },
          {
            "name": "gradient",
            "type": "u32"
          },
          {
            "name": "offset",
            "type": "u32"
          },
          {
            "name": "scaler",
            "type": "u8"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
