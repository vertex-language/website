# package dtls

```vertex
import "crypto/dtls"
```

## Index

- [Constants](#constants)
- [`func BuildDtlsClientHello(random: [uint8], sessionId: [uint8], cookie: [uint8], publicKey: [uint8], srtpProfiles: [uint16] = [0x0001, 0x0007]) -> [uint8]`](#func-BuildDtlsClientHello)
- [`func BuildDtlsServerHello(random: [uint8], sessionId: [uint8], cipherSuite: uint16, publicKey: [uint8], srtpProfile: uint16 = 0x0001) -> [uint8]`](#func-BuildDtlsServerHello)
- [`func CalculateFingerprint(_ der: [uint8]) -> string`](#func-CalculateFingerprint)
- [`func DeriveSrtpKeys(exporterSecret: [uint8], keyLength: int = 16, saltLength: int = 14) -> SrtpKeys`](#func-DeriveSrtpKeys)
- [`func ParseDtlsClientHello(body: [uint8]) -> DtlsHelloInfo`](#func-ParseDtlsClientHello)
- [`func ParseDtlsHandshake(data: [uint8], offset: int = 0) -> DtlsHandshakeResult`](#func-ParseDtlsHandshake)
- [`func ParseDtlsServerHello(body: [uint8]) -> DtlsHelloInfo`](#func-ParseDtlsServerHello)
- [`func VerifyFingerprint(_ der: [uint8], expectedFingerprint: string) -> bool`](#func-VerifyFingerprint)
- [`func WrapDtlsHandshake(type: uint8, body: [uint8], messageSeq: uint16 = 0) -> [uint8]`](#func-WrapDtlsHandshake)
- [`struct AntiReplayWindow`](#struct-AntiReplayWindow)
  - [`init()`](#AntiReplayWindow.init)
  - [`var MaxSeq: uint64 = 0`](#AntiReplayWindow.MaxSeq)
  - [`var Bitmap: uint64 = 0`](#AntiReplayWindow.Bitmap)
  - [`var HasReceived: bool = false`](#AntiReplayWindow.HasReceived)
  - [`func Check(_ seq: uint64) -> bool`](#AntiReplayWindow.Check)
  - [`mutating func Update(_ seq: uint64) -> bool`](#AntiReplayWindow.Update)
  - [`mutating func Reset()`](#AntiReplayWindow.Reset)
- [`struct ContentType`](#struct-ContentType)
  - [`static let ChangeCipherSpec: uint8 = 20`](#ContentType.ChangeCipherSpec)
  - [`static let Alert: uint8 = 21`](#ContentType.Alert)
  - [`static let Handshake: uint8 = 22`](#ContentType.Handshake)
  - [`static let ApplicationData: uint8 = 23`](#ContentType.ApplicationData)
  - [`static let Ack: uint8 = 26`](#ContentType.Ack)
- [`struct DecryptedRecord`](#struct-DecryptedRecord)
  - [`var ContentType: uint8`](#DecryptedRecord.ContentType)
  - [`var Epoch: uint16`](#DecryptedRecord.Epoch)
  - [`var SequenceNumber: uint64`](#DecryptedRecord.SequenceNumber)
  - [`var Data: [uint8]`](#DecryptedRecord.Data)
- [`enum DtlsError: Error`](#enum-DtlsError)
  - [`var Message: string { get }`](#DtlsError.Message)
- [`struct DtlsHandshakeMessage`](#struct-DtlsHandshakeMessage)
  - [`init(type: uint8, length: int, messageSeq: uint16, fragmentOffset: int, fragmentLength: int, body: [uint8])`](#DtlsHandshakeMessage.init)
  - [`var Type: uint8`](#DtlsHandshakeMessage.Type)
  - [`var Length: int`](#DtlsHandshakeMessage.Length)
  - [`var MessageSeq: uint16`](#DtlsHandshakeMessage.MessageSeq)
  - [`var FragmentOffset: int`](#DtlsHandshakeMessage.FragmentOffset)
  - [`var FragmentLength: int`](#DtlsHandshakeMessage.FragmentLength)
  - [`var Body: [uint8]`](#DtlsHandshakeMessage.Body)
- [`struct DtlsHandshakeResult`](#struct-DtlsHandshakeResult)
  - [`init(ok: bool, message: DtlsHandshakeMessage, bytesConsumed: int)`](#DtlsHandshakeResult.init)
  - [`var Ok: bool`](#DtlsHandshakeResult.Ok)
  - [`var Message: DtlsHandshakeMessage`](#DtlsHandshakeResult.Message)
  - [`var BytesConsumed: int`](#DtlsHandshakeResult.BytesConsumed)
- [`struct DtlsHelloInfo`](#struct-DtlsHelloInfo)
  - [`init(random: [uint8], publicKey: [uint8], cipherSuite: uint16, srtpProfile: uint16)`](#DtlsHelloInfo.init)
  - [`var Random: [uint8]`](#DtlsHelloInfo.Random)
  - [`var PublicKey: [uint8]`](#DtlsHelloInfo.PublicKey)
  - [`var CipherSuite: uint16`](#DtlsHelloInfo.CipherSuite)
  - [`var SrtpProfile: uint16`](#DtlsHelloInfo.SrtpProfile)
- [`struct HandshakeType`](#struct-HandshakeType)
  - [`static let HelloRequest: uint8 = 0`](#HandshakeType.HelloRequest)
  - [`static let ClientHello: uint8 = 1`](#HandshakeType.ClientHello)
  - [`static let ServerHello: uint8 = 2`](#HandshakeType.ServerHello)
  - [`static let HelloVerifyRequest: uint8 = 3`](#HandshakeType.HelloVerifyRequest)
  - [`static let Certificate: uint8 = 11`](#HandshakeType.Certificate)
  - [`static let ServerKeyExchange: uint8 = 12`](#HandshakeType.ServerKeyExchange)
  - [`static let CertificateRequest: uint8 = 13`](#HandshakeType.CertificateRequest)
  - [`static let ServerHelloDone: uint8 = 14`](#HandshakeType.ServerHelloDone)
  - [`static let CertificateVerify: uint8 = 15`](#HandshakeType.CertificateVerify)
  - [`static let ClientKeyExchange: uint8 = 16`](#HandshakeType.ClientKeyExchange)
  - [`static let Finished: uint8 = 20`](#HandshakeType.Finished)
- [`struct ProtocolVersion`](#struct-ProtocolVersion)
  - [`static let DTLS12: uint16 = 0xFEFD`](#ProtocolVersion.DTLS12)
  - [`static let DTLS13: uint16 = 0xFEFC`](#ProtocolVersion.DTLS13)
- [`struct RecordCipher`](#struct-RecordCipher)
  - [`init(key: [uint8], iv: [uint8], epoch: uint16 = 0)`](#RecordCipher.init)
  - [`var Key: [uint8]`](#RecordCipher.Key)
  - [`var IV: [uint8]`](#RecordCipher.IV)
  - [`var Epoch: uint16`](#RecordCipher.Epoch)
  - [`var SequenceNumber: uint64`](#RecordCipher.SequenceNumber)
  - [`var Window: AntiReplayWindow`](#RecordCipher.Window)
  - [`func ComputeNonce(epoch: uint16, seq: uint64) -> [uint8]`](#RecordCipher.ComputeNonce)
  - [`mutating func Encrypt(contentType: uint8, plaintext: [uint8]) throws -> [uint8]`](#RecordCipher.Encrypt)
  - [`mutating func Decrypt(record: [uint8]) throws -> DecryptedRecord`](#RecordCipher.Decrypt)
- [`struct SrtpKeys`](#struct-SrtpKeys)
  - [`var ClientWriteKey: [uint8]`](#SrtpKeys.ClientWriteKey)
  - [`var ServerWriteKey: [uint8]`](#SrtpKeys.ServerWriteKey)
  - [`var ClientWriteSalt: [uint8]`](#SrtpKeys.ClientWriteSalt)
  - [`var ServerWriteSalt: [uint8]`](#SrtpKeys.ServerWriteSalt)
- [`struct SrtpProfile`](#struct-SrtpProfile)
  - [`static let SRTP_AES128_CM_HMAC_SHA1_80: uint16 = 0x0001`](#SrtpProfile.SRTP_AES128_CM_HMAC_SHA1_80)
  - [`static let SRTP_AES128_CM_HMAC_SHA1_32: uint16 = 0x0002`](#SrtpProfile.SRTP_AES128_CM_HMAC_SHA1_32)
  - [`static let SRTP_AEAD_AES_128_GCM: uint16 = 0x0007`](#SrtpProfile.SRTP_AEAD_AES_128_GCM)
  - [`static let SRTP_AEAD_AES_256_GCM: uint16 = 0x0008`](#SrtpProfile.SRTP_AEAD_AES_256_GCM)

## Constants

<a id="let-HandshakeCertificate"></a>

```vertex
public let HandshakeCertificate: uint8 = 11
```

<a id="let-HandshakeCertificateVerify"></a>

```vertex
public let HandshakeCertificateVerify: uint8 = 15
```

<a id="let-HandshakeClientHello"></a>

```vertex
public let HandshakeClientHello: uint8 = 1
```

<a id="let-HandshakeFinished"></a>

```vertex
public let HandshakeFinished: uint8 = 20
```

<a id="let-HandshakeHelloVerifyRequest"></a>

```vertex
public let HandshakeHelloVerifyRequest: uint8 = 3
```

<a id="let-HandshakeServerHello"></a>

```vertex
public let HandshakeServerHello: uint8 = 2
```

<a id="let-RecordAck"></a>

```vertex
public let RecordAck: uint8 = 26
```

<a id="let-RecordAlert"></a>

```vertex
public let RecordAlert: uint8 = 21
```

<a id="let-RecordApplicationData"></a>

```vertex
public let RecordApplicationData: uint8 = 23
```

<a id="let-RecordChangeCipherSpec"></a>

```vertex
public let RecordChangeCipherSpec: uint8 = 20
```

<a id="let-RecordHandshake"></a>

```vertex
public let RecordHandshake: uint8 = 22
```

<a id="let-VersionDTLS12"></a>

```vertex
public let VersionDTLS12: uint16 = 0xFEFD
```

<a id="let-VersionDTLS13"></a>

```vertex
public let VersionDTLS13: uint16 = 0xFEFC
```

## Functions

### func BuildDtlsClientHello <a id="func-BuildDtlsClientHello"></a>

```vertex
public func BuildDtlsClientHello(random: [uint8],
                                 sessionId: [uint8],
                                 cookie: [uint8],
                                 publicKey: [uint8],
                                 srtpProfiles: [uint16] = [0x0001, 0x0007]) -> [uint8]
```

BuildDtlsClientHello constructs a DTLS 1.3 / DTLS 1.2 ClientHello handshake body.

### func BuildDtlsServerHello <a id="func-BuildDtlsServerHello"></a>

```vertex
public func BuildDtlsServerHello(random: [uint8],
                                 sessionId: [uint8],
                                 cipherSuite: uint16,
                                 publicKey: [uint8],
                                 srtpProfile: uint16 = 0x0001) -> [uint8]
```

BuildDtlsServerHello constructs a DTLS ServerHello handshake body.

### func CalculateFingerprint <a id="func-CalculateFingerprint"></a>

```vertex
public func CalculateFingerprint(_ der: [uint8]) -> string
```

Computes the uppercase colon-delimited SHA-256 fingerprint of a DER certificate (RFC 8122).
E.g. "2B:04:D9:6A:..."

### func DeriveSrtpKeys <a id="func-DeriveSrtpKeys"></a>

```vertex
public func DeriveSrtpKeys(exporterSecret: [uint8],
                           keyLength: int = 16,
                           saltLength: int = 14) -> SrtpKeys
```

Derives SRTP encryption keys and salts from DTLS keying material according to RFC 5764 Section 4.2.
E.g. for SRTP_AES128_CM_HMAC_SHA1_80: keyLength = 16, saltLength = 14 (total 60 bytes).

### func ParseDtlsClientHello <a id="func-ParseDtlsClientHello"></a>

```vertex
public func ParseDtlsClientHello(body: [uint8]) -> DtlsHelloInfo
```

ParseDtlsClientHello extracts random, publicKey, and srtpProfile from a ClientHello body.

### func ParseDtlsHandshake <a id="func-ParseDtlsHandshake"></a>

```vertex
public func ParseDtlsHandshake(data: [uint8], offset: int = 0) -> DtlsHandshakeResult
```

ParseDtlsHandshake parses a DTLS handshake message from buffer starting at offset.

### func ParseDtlsServerHello <a id="func-ParseDtlsServerHello"></a>

```vertex
public func ParseDtlsServerHello(body: [uint8]) -> DtlsHelloInfo
```

ParseDtlsServerHello extracts random, publicKey, cipherSuite, and srtpProfile from a ServerHello body.

### func VerifyFingerprint <a id="func-VerifyFingerprint"></a>

```vertex
public func VerifyFingerprint(_ der: [uint8], expectedFingerprint: string) -> bool
```

Verifies whether a certificate's SHA-256 fingerprint matches an SDP fingerprint attribute value.

### func WrapDtlsHandshake <a id="func-WrapDtlsHandshake"></a>

```vertex
public func WrapDtlsHandshake(type: uint8, body: [uint8], messageSeq: uint16 = 0) -> [uint8]
```

WrapDtlsHandshake serializes a handshake message with the 12-byte DTLS handshake header.

## Types

### struct AntiReplayWindow <a id="struct-AntiReplayWindow"></a>

```vertex
public struct AntiReplayWindow
```

AntiReplayWindow implements the 64-packet sliding window anti-replay protection
specified in RFC 6347 Section 4.1.2.6 and RFC 9147 Section 4.1.

#### Initializers

<a id="AntiReplayWindow.init"></a>

```vertex
public init()
```

#### Properties

<a id="AntiReplayWindow.MaxSeq"></a>

```vertex
public var MaxSeq: uint64 = 0
```

<a id="AntiReplayWindow.Bitmap"></a>

```vertex
public var Bitmap: uint64 = 0
```

<a id="AntiReplayWindow.HasReceived"></a>

```vertex
public var HasReceived: bool = false
```

#### Methods

<a id="AntiReplayWindow.Check"></a>

```vertex
public func Check(_ seq: uint64) -> bool
```

Checks if a sequence number is a duplicate or too old, without updating window state.

<a id="AntiReplayWindow.Update"></a>

```vertex
public mutating func Update(_ seq: uint64) -> bool
```

Records the reception of a sequence number and advances the sliding window.
Returns true if accepted, false if rejected as duplicate/replayed.

<a id="AntiReplayWindow.Reset"></a>

```vertex
public mutating func Reset()
```

Resets the sliding window for a new epoch.

### struct ContentType <a id="struct-ContentType"></a>

```vertex
public struct ContentType
```

DTLS Content Types (RFC 9147 Section 4)

#### Properties

<a id="ContentType.ChangeCipherSpec"></a>

```vertex
public static let ChangeCipherSpec: uint8 = 20
```

<a id="ContentType.Alert"></a>

```vertex
public static let Alert: uint8 = 21
```

<a id="ContentType.Handshake"></a>

```vertex
public static let Handshake: uint8 = 22
```

<a id="ContentType.ApplicationData"></a>

```vertex
public static let ApplicationData: uint8 = 23
```

<a id="ContentType.Ack"></a>

```vertex
public static let Ack: uint8 = 26
```

### struct DecryptedRecord <a id="struct-DecryptedRecord"></a>

```vertex
public struct DecryptedRecord
```

DecryptedRecord represents a verified and opened DTLS record.

#### Properties

<a id="DecryptedRecord.ContentType"></a>

```vertex
public var ContentType: uint8
```

<a id="DecryptedRecord.Epoch"></a>

```vertex
public var Epoch: uint16
```

<a id="DecryptedRecord.SequenceNumber"></a>

```vertex
public var SequenceNumber: uint64
```

<a id="DecryptedRecord.Data"></a>

```vertex
public var Data: [uint8]
```

### enum DtlsError <a id="enum-DtlsError"></a>

```vertex
public enum DtlsError: Error
```

#### Cases

<a id="DtlsError.recordOverflow"></a>

```vertex
case recordOverflow(string)
```

<a id="DtlsError.recordTooSmall"></a>

```vertex
case recordTooSmall
```

<a id="DtlsError.replayDetected"></a>

```vertex
case replayDetected(uint64)
```

<a id="DtlsError.invalidMac"></a>

```vertex
case invalidMac
```

<a id="DtlsError.badHandshake"></a>

```vertex
case badHandshake(string)
```

<a id="DtlsError.timedOut"></a>

```vertex
case timedOut(string)
```

<a id="DtlsError.unexpectedMessage"></a>

```vertex
case unexpectedMessage(string)
```

<a id="DtlsError.closed"></a>

```vertex
case closed
```

#### Properties

<a id="DtlsError.Message"></a>

```vertex
public var Message: string { get }
```

### struct DtlsHandshakeMessage <a id="struct-DtlsHandshakeMessage"></a>

```vertex
public struct DtlsHandshakeMessage
```

DtlsHandshakeMessage represents a parsed DTLS handshake message.

#### Initializers

<a id="DtlsHandshakeMessage.init"></a>

```vertex
public init(type: uint8,
            length: int,
            messageSeq: uint16,
            fragmentOffset: int,
            fragmentLength: int,
            body: [uint8])
```

#### Properties

<a id="DtlsHandshakeMessage.Type"></a>

```vertex
public var Type: uint8
```

<a id="DtlsHandshakeMessage.Length"></a>

```vertex
public var Length: int
```

<a id="DtlsHandshakeMessage.MessageSeq"></a>

```vertex
public var MessageSeq: uint16
```

<a id="DtlsHandshakeMessage.FragmentOffset"></a>

```vertex
public var FragmentOffset: int
```

<a id="DtlsHandshakeMessage.FragmentLength"></a>

```vertex
public var FragmentLength: int
```

<a id="DtlsHandshakeMessage.Body"></a>

```vertex
public var Body: [uint8]
```

### struct DtlsHandshakeResult <a id="struct-DtlsHandshakeResult"></a>

```vertex
public struct DtlsHandshakeResult
```

DtlsHandshakeResult holds the result of parsing a handshake message.

#### Initializers

<a id="DtlsHandshakeResult.init"></a>

```vertex
public init(ok: bool, message: DtlsHandshakeMessage, bytesConsumed: int)
```

#### Properties

<a id="DtlsHandshakeResult.Ok"></a>

```vertex
public var Ok: bool
```

<a id="DtlsHandshakeResult.Message"></a>

```vertex
public var Message: DtlsHandshakeMessage
```

<a id="DtlsHandshakeResult.BytesConsumed"></a>

```vertex
public var BytesConsumed: int
```

### struct DtlsHelloInfo <a id="struct-DtlsHelloInfo"></a>

```vertex
public struct DtlsHelloInfo
```

DtlsHelloInfo represents extracted key parameters from a ClientHello or ServerHello.

#### Initializers

<a id="DtlsHelloInfo.init"></a>

```vertex
public init(random: [uint8], publicKey: [uint8], cipherSuite: uint16, srtpProfile: uint16)
```

#### Properties

<a id="DtlsHelloInfo.Random"></a>

```vertex
public var Random: [uint8]
```

<a id="DtlsHelloInfo.PublicKey"></a>

```vertex
public var PublicKey: [uint8]
```

<a id="DtlsHelloInfo.CipherSuite"></a>

```vertex
public var CipherSuite: uint16
```

<a id="DtlsHelloInfo.SrtpProfile"></a>

```vertex
public var SrtpProfile: uint16
```

### struct HandshakeType <a id="struct-HandshakeType"></a>

```vertex
public struct HandshakeType
```

DTLS Handshake Types (RFC 9147 Section 5)

#### Properties

<a id="HandshakeType.HelloRequest"></a>

```vertex
public static let HelloRequest: uint8 = 0
```

<a id="HandshakeType.ClientHello"></a>

```vertex
public static let ClientHello: uint8 = 1
```

<a id="HandshakeType.ServerHello"></a>

```vertex
public static let ServerHello: uint8 = 2
```

<a id="HandshakeType.HelloVerifyRequest"></a>

```vertex
public static let HelloVerifyRequest: uint8 = 3
```

<a id="HandshakeType.Certificate"></a>

```vertex
public static let Certificate: uint8 = 11
```

<a id="HandshakeType.ServerKeyExchange"></a>

```vertex
public static let ServerKeyExchange: uint8 = 12
```

<a id="HandshakeType.CertificateRequest"></a>

```vertex
public static let CertificateRequest: uint8 = 13
```

<a id="HandshakeType.ServerHelloDone"></a>

```vertex
public static let ServerHelloDone: uint8 = 14
```

<a id="HandshakeType.CertificateVerify"></a>

```vertex
public static let CertificateVerify: uint8 = 15
```

<a id="HandshakeType.ClientKeyExchange"></a>

```vertex
public static let ClientKeyExchange: uint8 = 16
```

<a id="HandshakeType.Finished"></a>

```vertex
public static let Finished: uint8 = 20
```

### struct ProtocolVersion <a id="struct-ProtocolVersion"></a>

```vertex
public struct ProtocolVersion
```

DTLS Protocol Versions (RFC 6347 / RFC 9147)

#### Properties

<a id="ProtocolVersion.DTLS12"></a>

```vertex
public static let DTLS12: uint16 = 0xFEFD
```

<a id="ProtocolVersion.DTLS13"></a>

```vertex
public static let DTLS13: uint16 = 0xFEFC
```

1's complement of 1.2

### struct RecordCipher <a id="struct-RecordCipher"></a>

```vertex
public struct RecordCipher
```

RecordCipher manages datagram encryption, decryption, and replay protection (RFC 9147 Section 4).

#### Initializers

<a id="RecordCipher.init"></a>

```vertex
public init(key: [uint8], iv: [uint8], epoch: uint16 = 0)
```

#### Properties

<a id="RecordCipher.Key"></a>

```vertex
public var Key: [uint8]
```

<a id="RecordCipher.IV"></a>

```vertex
public var IV: [uint8]
```

<a id="RecordCipher.Epoch"></a>

```vertex
public var Epoch: uint16
```

<a id="RecordCipher.SequenceNumber"></a>

```vertex
public var SequenceNumber: uint64
```

<a id="RecordCipher.Window"></a>

```vertex
public var Window: AntiReplayWindow
```

#### Methods

<a id="RecordCipher.ComputeNonce"></a>

```vertex
public func ComputeNonce(epoch: uint16, seq: uint64) -> [uint8]
```

Calculates the 12-byte AEAD nonce by XORing the IV with the (Epoch || SequenceNumber)
as specified in RFC 9147 Section 4.2.

<a id="RecordCipher.Encrypt"></a>

```vertex
public mutating func Encrypt(contentType: uint8, plaintext: [uint8]) throws -> [uint8]
```

Encrypts plaintext into an authenticated DTLS protected datagram record.

<a id="RecordCipher.Decrypt"></a>

```vertex
public mutating func Decrypt(record: [uint8]) throws -> DecryptedRecord
```

Decrypts and verifies an incoming DTLS datagram record, enforcing anti-replay.

### struct SrtpKeys <a id="struct-SrtpKeys"></a>

```vertex
public struct SrtpKeys
```

SrtpKeys holds the derived SRTP master keys and salts for both peers (RFC 5764 Section 4.2).

#### Properties

<a id="SrtpKeys.ClientWriteKey"></a>

```vertex
public var ClientWriteKey: [uint8]
```

<a id="SrtpKeys.ServerWriteKey"></a>

```vertex
public var ServerWriteKey: [uint8]
```

<a id="SrtpKeys.ClientWriteSalt"></a>

```vertex
public var ClientWriteSalt: [uint8]
```

<a id="SrtpKeys.ServerWriteSalt"></a>

```vertex
public var ServerWriteSalt: [uint8]
```

### struct SrtpProfile <a id="struct-SrtpProfile"></a>

```vertex
public struct SrtpProfile
```

RFC 5764 DTLS-SRTP Protection Profiles

#### Properties

<a id="SrtpProfile.SRTP_AES128_CM_HMAC_SHA1_80"></a>

```vertex
public static let SRTP_AES128_CM_HMAC_SHA1_80: uint16 = 0x0001
```

<a id="SrtpProfile.SRTP_AES128_CM_HMAC_SHA1_32"></a>

```vertex
public static let SRTP_AES128_CM_HMAC_SHA1_32: uint16 = 0x0002
```

<a id="SrtpProfile.SRTP_AEAD_AES_128_GCM"></a>

```vertex
public static let SRTP_AEAD_AES_128_GCM: uint16 = 0x0007
```

<a id="SrtpProfile.SRTP_AEAD_AES_256_GCM"></a>

```vertex
public static let SRTP_AEAD_AES_256_GCM: uint16 = 0x0008
```

## Files

- fingerprint.vs
- handshake.vs
- record.vs
- replay.vs
- srtp.vs
- types.vs
