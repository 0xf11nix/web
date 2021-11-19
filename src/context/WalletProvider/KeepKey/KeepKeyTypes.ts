import { Listener } from 'eventemitter2'

/**
 * Override the type definitions of EventEmitter2
 *
 * `off` takes a string array in the same way that `on` does for namespaced events
 * The type definition in `eventemitter2` v5.0.1 only allows for `string`
 * We should be able to remove this if we upgrade to the latest version (6.x)
 *
 * @see https://github.com/EventEmitter2/EventEmitter2/blob/b3b3e012821b9d640b3dd99ab1c7082667ded557/lib/eventemitter2.js#L600
 */
declare module 'eventemitter2' {
  interface EventEmitter2 {
    off(event: string | string[], listener: Listener): this
  }
}

export enum FailureType {
  UNEXPECTEDMESSAGE = 1,
  BUTTONEXPECTED = 2,
  SYNTAXERROR = 3,
  ACTIONCANCELLED = 4,
  PINEXPECTED = 5,
  PINCANCELLED = 6,
  PININVALID = 7,
  INVALIDSIGNATURE = 8,
  OTHER = 9,
  NOTENOUGHFUNDS = 10,
  NOTINITIALIZED = 11,
  PINMISMATCH = 12,
  FIRMWAREERROR = 99
}

export enum ButtonRequestType {
  OTHER = 1,
  FEEOVERTHRESHOLD = 2,
  CONFIRMOUTPUT = 3,
  RESETDEVICE = 4,
  CONFIRMWORD = 5,
  WIPEDEVICE = 6,
  PROTECTCALL = 7,
  SIGNTX = 8,
  FIRMWARECHECK = 9,
  ADDRESS = 10,
  FIRMWAREERASE = 11,
  CONFIRMTRANSFERTOACCOUNT = 12,
  CONFIRMTRANSFERTONODEPATH = 13,
  CHANGELABEL = 14,
  CHANGELANGUAGE = 15,
  ENABLEPASSPHRASE = 16,
  DISABLEPASSPHRASE = 17,
  ENCRYPTANDSIGNMESSAGE = 18,
  ENCRYPTMESSAGE = 19,
  IMPORTPRIVATEKEY = 20,
  IMPORTRECOVERYSENTENCE = 21,
  SIGNIDENTITY = 22,
  PING = 23,
  REMOVEPIN = 24,
  CHANGEPIN = 25,
  CREATEPIN = 26,
  GETENTROPY = 27,
  SIGNMESSAGE = 28,
  APPLYPOLICIES = 29,
  SIGNEXCHANGE = 30,
  AUTOLOCKDELAYMS = 31,
  U2FCOUNTER = 32,
  CONFIRMEOSACTION = 33,
  CONFIRMEOSBUDGET = 34,
  CONFIRMMEMO = 35,
  REMOVEWIPECODE = 36,
  CHANGEWIPECODE = 37,
  CREATEWIPECODE = 38
}

export enum PinMatrixRequestType {
  CURRENT = 1,
  NEWFIRST = 2,
  NEWSECOND = 3
}

export enum MessageType {
  INITIALIZE = 0,
  PING = 1,
  SUCCESS = 2,
  FAILURE = 3,
  CHANGEPIN = 4,
  WIPEDEVICE = 5,
  FIRMWAREERASE = 6,
  FIRMWAREUPLOAD = 7,
  GETENTROPY = 9,
  ENTROPY = 10,
  GETPUBLICKEY = 11,
  PUBLICKEY = 12,
  LOADDEVICE = 13,
  RESETDEVICE = 14,
  SIGNTX = 15,
  FEATURES = 17,
  PINMATRIXREQUEST = 18,
  PINMATRIXACK = 19,
  CANCEL = 20,
  TXREQUEST = 21,
  TXACK = 22,
  CIPHERKEYVALUE = 23,
  CLEARSESSION = 24,
  APPLYSETTINGS = 25,
  BUTTONREQUEST = 26,
  BUTTONACK = 27,
  GETADDRESS = 29,
  ADDRESS = 30,
  ENTROPYREQUEST = 35,
  ENTROPYACK = 36,
  SIGNMESSAGE = 38,
  VERIFYMESSAGE = 39,
  MESSAGESIGNATURE = 40,
  PASSPHRASEREQUEST = 41,
  PASSPHRASEACK = 42,
  RECOVERYDEVICE = 45,
  WORDREQUEST = 46,
  WORDACK = 47,
  CIPHEREDKEYVALUE = 48,
  ENCRYPTMESSAGE = 49,
  ENCRYPTEDMESSAGE = 50,
  DECRYPTMESSAGE = 51,
  DECRYPTEDMESSAGE = 52,
  SIGNIDENTITY = 53,
  SIGNEDIDENTITY = 54,
  GETFEATURES = 55,
  ETHEREUMGETADDRESS = 56,
  ETHEREUMADDRESS = 57,
  ETHEREUMSIGNTX = 58,
  ETHEREUMTXREQUEST = 59,
  ETHEREUMTXACK = 60,
  CHARACTERREQUEST = 80,
  CHARACTERACK = 81,
  RAWTXACK = 82,
  APPLYPOLICIES = 83,
  FLASHHASH = 84,
  FLASHWRITE = 85,
  FLASHHASHRESPONSE = 86,
  DEBUGLINKFLASHDUMP = 87,
  DEBUGLINKFLASHDUMPRESPONSE = 88,
  SOFTRESET = 89,
  DEBUGLINKDECISION = 100,
  DEBUGLINKGETSTATE = 101,
  DEBUGLINKSTATE = 102,
  DEBUGLINKSTOP = 103,
  DEBUGLINKLOG = 104,
  DEBUGLINKFILLCONFIG = 105,
  GETCOINTABLE = 106,
  COINTABLE = 107,
  ETHEREUMSIGNMESSAGE = 108,
  ETHEREUMVERIFYMESSAGE = 109,
  ETHEREUMMESSAGESIGNATURE = 110,
  CHANGEWIPECODE = 111,
  RIPPLEGETADDRESS = 400,
  RIPPLEADDRESS = 401,
  RIPPLESIGNTX = 402,
  RIPPLESIGNEDTX = 403,
  THORCHAINGETADDRESS = 500,
  THORCHAINADDRESS = 501,
  THORCHAINSIGNTX = 502,
  THORCHAINMSGREQUEST = 503,
  THORCHAINMSGACK = 504,
  THORCHAINSIGNEDTX = 505,
  EOSGETPUBLICKEY = 600,
  EOSPUBLICKEY = 601,
  EOSSIGNTX = 602,
  EOSTXACTIONREQUEST = 603,
  EOSTXACTIONACK = 604,
  EOSSIGNEDTX = 605,
  NANOGETADDRESS = 700,
  NANOADDRESS = 701,
  NANOSIGNTX = 702,
  NANOSIGNEDTX = 703,
  BINANCEGETADDRESS = 800,
  BINANCEADDRESS = 801,
  BINANCEGETPUBLICKEY = 802,
  BINANCEPUBLICKEY = 803,
  BINANCESIGNTX = 804,
  BINANCETXREQUEST = 805,
  BINANCETRANSFERMSG = 806,
  BINANCEORDERMSG = 807,
  BINANCECANCELMSG = 808,
  BINANCESIGNEDTX = 809,
  COSMOSGETADDRESS = 900,
  COSMOSADDRESS = 901,
  COSMOSSIGNTX = 902,
  COSMOSMSGREQUEST = 903,
  COSMOSMSGACK = 904,
  COSMOSSIGNEDTX = 905,
  TENDERMINTGETADDRESS = 1000,
  TENDERMINTADDRESS = 1001,
  TENDERMINTSIGNTX = 1002,
  TENDERMINTMSGREQUEST = 1003,
  TENDERMINTMSGACK = 1004,
  TENDERMINTMSGSEND = 1005,
  TENDERMINTSIGNEDTX = 1006
}
