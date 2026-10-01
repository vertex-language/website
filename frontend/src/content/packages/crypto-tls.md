# package tls

```vertex
import "crypto/tls"
```

TLS 1.2 client (RFC 5246) with ECDHE key exchange, AES-GCM record
protection (RFC 5288) and RSA server authentication. This is the profile
Microsoft Windows negotiates for RDP: the built-in TLS 1.3 client here
cannot talk to a Windows RDP listener, which offers only up to TLS 1.2
(measured: ECDHE-RSA-AES256-GCM-SHA384 with a self-signed RSA-2048
certificate).

The whole handshake is driven by Conn12 over a tcp.TcpStream. The server
certificate is parsed and exposed so a CredSSP layer above can bind to
its public key, and the ServerKeyExchange signature is verified.

## Index

- [Constants](#constants)
- [`func BuildClientHello(serverName: string, clientRandom: [uint8], sessionId: [uint8], clientPublicKey: [uint8], alpnProtos: [string] = []) -> [uint8]`](#func-BuildClientHello)
- [`func Client(_ stream: tcp.TcpStream, config: Config = Config()) -> Conn`](#func-Client)
- [`func Connect(host: string, port: uint16, config: Config = Config()) async throws -> Conn`](#func-Connect)
- [`func DeriveSecret(secret: [uint8], label: string, transcriptHash: [uint8]) -> [uint8]`](#func-DeriveSecret)
- [`func Dial(host: string, port: uint16, config: Config = Config()) async throws -> Conn`](#func-Dial)
- [`func HkdfExpandLabel(secret: [uint8], label: string, context: [uint8], length: int) -> [uint8]`](#func-HkdfExpandLabel)
- [`func KeyLength(_ cipherSuite: uint16) -> int`](#func-KeyLength)
- [`func ParseEncryptedExtensions(_ msg: [uint8]) -> string`](#func-ParseEncryptedExtensions)
- [`func ParseServerHello(_ msg: [uint8]) throws -> ServerHelloInfo`](#func-ParseServerHello)
- [`func WrapInRecord(contentType: uint8, payload: [uint8], legacyVersion: uint16 = 0x0301) -> [uint8]`](#func-WrapInRecord)
- [`struct Alert`](#struct-Alert)
  - [`static let LevelWarning: uint8 = 1`](#Alert.LevelWarning)
  - [`static let LevelFatal: uint8 = 2`](#Alert.LevelFatal)
  - [`static let CloseNotify: uint8 = 0`](#Alert.CloseNotify)
  - [`static let UnexpectedMessage: uint8 = 10`](#Alert.UnexpectedMessage)
  - [`static let BadRecordMac: uint8 = 20`](#Alert.BadRecordMac)
  - [`static let HandshakeFailure: uint8 = 40`](#Alert.HandshakeFailure)
  - [`static let IllegalParameter: uint8 = 47`](#Alert.IllegalParameter)
  - [`static let InternalError: uint8 = 80`](#Alert.InternalError)
- [`struct CipherSuite`](#struct-CipherSuite)
  - [`static let TLS_AES_128_GCM_SHA256: uint16 = 0x1301`](#CipherSuite.TLS_AES_128_GCM_SHA256)
  - [`static let TLS_AES_256_GCM_SHA384: uint16 = 0x1302`](#CipherSuite.TLS_AES_256_GCM_SHA384)
  - [`static let TLS_CHACHA20_POLY1305_SHA256: uint16 = 0x1303`](#CipherSuite.TLS_CHACHA20_POLY1305_SHA256)
- [`struct Config`](#struct-Config)
  - [`init(serverName: string = "", insecureSkipVerify: bool = false, verifyChain: bool = true, nextProtos: [string] = [], minVersion: uint16 = 0x0304, maxVersion: uint16 = 0x0304)`](#Config.init)
  - [`var ServerName: string`](#Config.ServerName)
  - [`var InsecureSkipVerify: bool`](#Config.InsecureSkipVerify)
  - [`var VerifyChain: bool`](#Config.VerifyChain)
  - [`var NextProtos: [string]`](#Config.NextProtos)
  - [`var MinVersion: uint16`](#Config.MinVersion)
  - [`var MaxVersion: uint16`](#Config.MaxVersion)
- [`struct Conn`](#struct-Conn)
  - [`init(stream: tcp.TcpStream)`](#Conn.init)
  - [`init(stream: tcp.TcpStream, config: Config)`](#Conn.init-2)
  - [`var stream: tcp.TcpStream`](#Conn.stream)
  - [`var config: Config`](#Conn.config)
  - [`var state: ConnectionState = ConnectionState()`](#Conn.state)
  - [`mutating func Handshake() async throws`](#Conn.Handshake)
  - [`mutating func Read(into buffer: inout [uint8]) async throws -> int`](#Conn.Read)
  - [`mutating func ReadFull(into buffer: inout [uint8]) async throws`](#Conn.ReadFull)
  - [`mutating func ReadToEnd(limit: int = 8 * 1024 * 1024) async throws -> [uint8]`](#Conn.ReadToEnd)
  - [`mutating func Write(_ data: [uint8]) async throws`](#Conn.Write)
  - [`mutating func WriteText(_ text: string) async throws`](#Conn.WriteText)
  - [`mutating func Close()`](#Conn.Close)
  - [`func GetConnectionState() -> ConnectionState`](#Conn.GetConnectionState)
- [`struct Conn12`](#struct-Conn12)
  - [`init(stream: tcp.TcpStream, config: Config)`](#Conn12.init)
  - [`var stream: tcp.TcpStream`](#Conn12.stream)
  - [`var config: Config`](#Conn12.config)
  - [`var suite: uint16 = 0`](#Conn12.suite)
  - [`var PeerCertificate: x509.Certificate = x509.Certificate()`](#Conn12.PeerCertificate)
  - [`var PeerCertificateDER: [uint8] = []`](#Conn12.PeerCertificateDER)
  - [`var PeerCertificates: [[uint8]] = []`](#Conn12.PeerCertificates)
  - [`var Handshaked: bool = false`](#Conn12.Handshaked)
  - [`mutating func Handshake() async throws`](#Conn12.Handshake)
  - [`mutating func Write(_ data: [uint8]) async throws`](#Conn12.Write)
  - [`mutating func Read(into buffer: inout [uint8]) async throws -> int`](#Conn12.Read)
  - [`mutating func Close()`](#Conn12.Close)
- [`struct ConnectionState`](#struct-ConnectionState)
  - [`init()`](#ConnectionState.init)
  - [`var HandshakeComplete: bool = false`](#ConnectionState.HandshakeComplete)
  - [`var ServerName: string = ""`](#ConnectionState.ServerName)
  - [`var NegotiatedProtocol: string = ""`](#ConnectionState.NegotiatedProtocol)
  - [`var CipherSuite: uint16 = 0`](#ConnectionState.CipherSuite)
  - [`var Version: uint16 = 0`](#ConnectionState.Version)
  - [`var PeerCertificates: [[uint8]] = []`](#ConnectionState.PeerCertificates)
- [`struct DecryptedRecord`](#struct-DecryptedRecord)
  - [`init(contentType: uint8, data: [uint8])`](#DecryptedRecord.init)
  - [`var ContentType: uint8`](#DecryptedRecord.ContentType)
  - [`var Data: [uint8]`](#DecryptedRecord.Data)
- [`struct ExtensionType`](#struct-ExtensionType)
  - [`static let ServerName: uint16 = 0x0000`](#ExtensionType.ServerName)
  - [`static let SupportedGroups: uint16 = 0x000a`](#ExtensionType.SupportedGroups)
  - [`static let SignatureAlgorithms: uint16 = 0x000d`](#ExtensionType.SignatureAlgorithms)
  - [`static let ALPN: uint16 = 0x0010`](#ExtensionType.ALPN)
  - [`static let SupportedVersions: uint16 = 0x002b`](#ExtensionType.SupportedVersions)
  - [`static let KeyShare: uint16 = 0x0033`](#ExtensionType.KeyShare)
- [`struct HandshakeMessage`](#struct-HandshakeMessage)
  - [`init(type: uint8, body: [uint8], fullBytes: [uint8])`](#HandshakeMessage.init)
  - [`var Type: uint8`](#HandshakeMessage.Type)
  - [`var Body: [uint8]`](#HandshakeMessage.Body)
  - [`var FullBytes: [uint8]`](#HandshakeMessage.FullBytes)
- [`struct HandshakeType`](#struct-HandshakeType)
  - [`static let ClientHello: uint8 = 1`](#HandshakeType.ClientHello)
  - [`static let ServerHello: uint8 = 2`](#HandshakeType.ServerHello)
  - [`static let NewSessionTicket: uint8 = 4`](#HandshakeType.NewSessionTicket)
  - [`static let EncryptedExtensions: uint8 = 8`](#HandshakeType.EncryptedExtensions)
  - [`static let Certificate: uint8 = 11`](#HandshakeType.Certificate)
  - [`static let CertificateVerify: uint8 = 15`](#HandshakeType.CertificateVerify)
  - [`static let Finished: uint8 = 20`](#HandshakeType.Finished)
  - [`static let KeyUpdate: uint8 = 24`](#HandshakeType.KeyUpdate)
- [`struct KeySchedule`](#struct-KeySchedule)
  - [`init()`](#KeySchedule.init)
  - [`var EarlySecret: [uint8]`](#KeySchedule.EarlySecret)
  - [`var HandshakeSecret: [uint8]`](#KeySchedule.HandshakeSecret)
  - [`var MasterSecret: [uint8]`](#KeySchedule.MasterSecret)
  - [`mutating func DeriveHandshakeSecret(sharedSecret: [uint8])`](#KeySchedule.DeriveHandshakeSecret)
  - [`func DeriveHandshakeTrafficSecrets(transcriptHash: [uint8]) -> TrafficSecrets`](#KeySchedule.DeriveHandshakeTrafficSecrets)
  - [`func DeriveTrafficKeys(trafficSecret: [uint8], cipherSuite: uint16 = 0x1303) -> TrafficKeys`](#KeySchedule.DeriveTrafficKeys)
  - [`func DeriveFinishedKey(trafficSecret: [uint8]) -> [uint8]`](#KeySchedule.DeriveFinishedKey)
  - [`func ComputeFinished(finishedKey: [uint8], transcriptHash: [uint8]) -> [uint8]`](#KeySchedule.ComputeFinished)
  - [`mutating func DeriveMasterSecret()`](#KeySchedule.DeriveMasterSecret)
  - [`func DeriveApplicationTrafficSecrets(transcriptHash: [uint8]) -> TrafficSecrets`](#KeySchedule.DeriveApplicationTrafficSecrets)
- [`struct NamedGroup`](#struct-NamedGroup)
  - [`static let X25519: uint16 = 0x001d`](#NamedGroup.X25519)
- [`struct ProtocolVersion`](#struct-ProtocolVersion)
  - [`static let TLS13: uint16 = 0x0304`](#ProtocolVersion.TLS13)
  - [`static let TLS12: uint16 = 0x0303`](#ProtocolVersion.TLS12)
- [`struct RecordCipher`](#struct-RecordCipher)
  - [`init(key: [uint8], iv: [uint8], cipherSuite: uint16 = 0x1303)`](#RecordCipher.init)
  - [`var Key: [uint8]`](#RecordCipher.Key)
  - [`var IV: [uint8]`](#RecordCipher.IV)
  - [`var SequenceNumber: uint64 = 0`](#RecordCipher.SequenceNumber)
  - [`var CipherSuite: uint16 = 0x1303`](#RecordCipher.CipherSuite)
  - [`func ComputeNonce() -> [uint8]`](#RecordCipher.ComputeNonce)
  - [`mutating func Encrypt(contentType: uint8, plaintext: [uint8]) throws -> [uint8]`](#RecordCipher.Encrypt)
  - [`mutating func Decrypt(header: [uint8], payload: [uint8]) throws -> DecryptedRecord`](#RecordCipher.Decrypt)
- [`struct RecordType`](#struct-RecordType)
  - [`static let Invalid: uint8 = 0`](#RecordType.Invalid)
  - [`static let ChangeCipherSpec: uint8 = 20`](#RecordType.ChangeCipherSpec)
  - [`static let Alert: uint8 = 21`](#RecordType.Alert)
  - [`static let Handshake: uint8 = 22`](#RecordType.Handshake)
  - [`static let ApplicationData: uint8 = 23`](#RecordType.ApplicationData)
- [`struct ServerHelloInfo`](#struct-ServerHelloInfo)
  - [`init(serverRandom: [uint8], cipherSuite: uint16, serverPublicKey: [uint8])`](#ServerHelloInfo.init)
  - [`var ServerRandom: [uint8]`](#ServerHelloInfo.ServerRandom)
  - [`var CipherSuite: uint16`](#ServerHelloInfo.CipherSuite)
  - [`var ServerPublicKey: [uint8]`](#ServerHelloInfo.ServerPublicKey)
- [`struct SignatureScheme`](#struct-SignatureScheme)
  - [`static let Ed25519: uint16 = 0x0807`](#SignatureScheme.Ed25519)
  - [`static let EcdsaSecp256r1Sha256: uint16 = 0x0403`](#SignatureScheme.EcdsaSecp256r1Sha256)
  - [`static let RsaPssRsaeSha256: uint16 = 0x0804`](#SignatureScheme.RsaPssRsaeSha256)
  - [`static let RsaPkcs1Sha256: uint16 = 0x0401`](#SignatureScheme.RsaPkcs1Sha256)
- [`enum Tls12Error: Error`](#enum-Tls12Error)
  - [`var Message: string { get }`](#Tls12Error.Message)
- [`enum TlsError: Error`](#enum-TlsError)
  - [`var Message: string { get }`](#TlsError.Message)
- [`struct TrafficKeys`](#struct-TrafficKeys)
  - [`init(key: [uint8], iv: [uint8])`](#TrafficKeys.init)
  - [`var Key: [uint8]`](#TrafficKeys.Key)
  - [`var IV: [uint8]`](#TrafficKeys.IV)
- [`struct TrafficSecrets`](#struct-TrafficSecrets)
  - [`init(clientSecret: [uint8], serverSecret: [uint8])`](#TrafficSecrets.init)
  - [`var ClientSecret: [uint8]`](#TrafficSecrets.ClientSecret)
  - [`var ServerSecret: [uint8]`](#TrafficSecrets.ServerSecret)
- [`struct Transcript`](#struct-Transcript)
  - [`init()`](#Transcript.init)
  - [`mutating func Update(_ data: [uint8])`](#Transcript.Update)
  - [`func CurrentHash() -> [uint8]`](#Transcript.CurrentHash)

## Constants

<a id="let-AlertBadRecordMac"></a>

```vertex
public let AlertBadRecordMac: uint8 = 20
```

<a id="let-AlertCloseNotify"></a>

```vertex
public let AlertCloseNotify: uint8 = 0
```

<a id="let-AlertHandshakeFailure"></a>

```vertex
public let AlertHandshakeFailure: uint8 = 40
```

<a id="let-AlertIllegalParameter"></a>

```vertex
public let AlertIllegalParameter: uint8 = 47
```

<a id="let-AlertInternalError"></a>

```vertex
public let AlertInternalError: uint8 = 80
```

<a id="let-AlertLevelFatal"></a>

```vertex
public let AlertLevelFatal: uint8 = 2
```

<a id="let-AlertLevelWarning"></a>

```vertex
public let AlertLevelWarning: uint8 = 1
```

<a id="let-AlertUnexpectedMessage"></a>

```vertex
public let AlertUnexpectedMessage: uint8 = 10
```

<a id="let-ExtALPN"></a>

```vertex
public let ExtALPN: uint16 = 0x0010
```

<a id="let-ExtKeyShare"></a>

```vertex
public let ExtKeyShare: uint16 = 0x0033
```

<a id="let-ExtServerName"></a>

```vertex
public let ExtServerName: uint16 = 0x0000
```

<a id="let-ExtSignatureAlgorithms"></a>

```vertex
public let ExtSignatureAlgorithms: uint16 = 0x000d
```

<a id="let-ExtSupportedGroups"></a>

```vertex
public let ExtSupportedGroups: uint16 = 0x000a
```

<a id="let-ExtSupportedVersions"></a>

```vertex
public let ExtSupportedVersions: uint16 = 0x002b
```

<a id="let-GroupX25519"></a>

```vertex
public let GroupX25519: uint16 = 0x001d
```

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

<a id="let-HandshakeEncryptedExtensions"></a>

```vertex
public let HandshakeEncryptedExtensions: uint8 = 8
```

<a id="let-HandshakeFinished"></a>

```vertex
public let HandshakeFinished: uint8 = 20
```

<a id="let-HandshakeKeyUpdate"></a>

```vertex
public let HandshakeKeyUpdate: uint8 = 24
```

<a id="let-HandshakeNewSessionTicket"></a>

```vertex
public let HandshakeNewSessionTicket: uint8 = 4
```

<a id="let-HandshakeServerHello"></a>

```vertex
public let HandshakeServerHello: uint8 = 2
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

<a id="let-RecordInvalid"></a>

```vertex
public let RecordInvalid: uint8 = 0
```

<a id="let-SigEcdsaSecp256r1Sha256"></a>

```vertex
public let SigEcdsaSecp256r1Sha256: uint16 = 0x0403
```

<a id="let-SigEd25519"></a>

```vertex
public let SigEd25519: uint16 = 0x0807
```

<a id="let-SigRsaPkcs1Sha256"></a>

```vertex
public let SigRsaPkcs1Sha256: uint16 = 0x0401
```

<a id="let-SigRsaPssRsaeSha256"></a>

```vertex
public let SigRsaPssRsaeSha256: uint16 = 0x0804
```

<a id="let-TLS_AES_128_GCM_SHA256"></a>

```vertex
public let TLS_AES_128_GCM_SHA256: uint16 = 0x1301
```

<a id="let-TLS_AES_256_GCM_SHA384"></a>

```vertex
public let TLS_AES_256_GCM_SHA384: uint16 = 0x1302
```

<a id="let-TLS_CHACHA20_POLY1305_SHA256"></a>

```vertex
public let TLS_CHACHA20_POLY1305_SHA256: uint16 = 0x1303
```

<a id="let-VersionTLS12"></a>

```vertex
public let VersionTLS12: uint16 = 0x0303
```

<a id="let-VersionTLS13"></a>

```vertex
public let VersionTLS13: uint16 = 0x0304
```

## Functions

### func BuildClientHello <a id="func-BuildClientHello"></a>

```vertex
public func BuildClientHello(serverName: string,
                             clientRandom: [uint8],
                             sessionId: [uint8],
                             clientPublicKey: [uint8],
                             alpnProtos: [string] = []) -> [uint8]
```

BuildClientHello creates the RFC 8446 TLS 1.3 ClientHello message and wraps it in a TLS record.

### func Client <a id="func-Client"></a>

```vertex
public func Client(_ stream: tcp.TcpStream, config: Config = Config()) -> Conn
```

Client wraps a connected TCP stream into a TLS client.

### func Connect <a id="func-Connect"></a>

```vertex
public func Connect(host: string, port: uint16, config: Config = Config()) async throws -> Conn
```

Connect connects to host and port over TCP, then performs the TLS 1.3 handshake.

### func DeriveSecret <a id="func-DeriveSecret"></a>

```vertex
public func DeriveSecret(secret: [uint8], label: string, transcriptHash: [uint8]) -> [uint8]
```

DeriveSecret implements TLS 1.3 Derive-Secret(Secret, Label, Messages) (RFC 8446 Section 7.1).

### func Dial <a id="func-Dial"></a>

```vertex
public func Dial(host: string, port: uint16, config: Config = Config()) async throws -> Conn
```

Dial connects to host and port over TCP, then performs the TLS 1.3 handshake.

### func HkdfExpandLabel <a id="func-HkdfExpandLabel"></a>

```vertex
public func HkdfExpandLabel(secret: [uint8], label: string, context: [uint8], length: int) -> [uint8]
```

HkdfExpandLabel implements TLS 1.3 HKDF-Expand-Label (RFC 8446 Section 7.1).

### func KeyLength <a id="func-KeyLength"></a>

```vertex
public func KeyLength(_ cipherSuite: uint16) -> int
```

KeyLength is the AEAD key size of a TLS 1.3 cipher suite.

### func ParseEncryptedExtensions <a id="func-ParseEncryptedExtensions"></a>

```vertex
public func ParseEncryptedExtensions(_ msg: [uint8]) -> string
```

Parses the EncryptedExtensions handshake message and returns negotiated ALPN protocol if present.

### func ParseServerHello <a id="func-ParseServerHello"></a>

```vertex
public func ParseServerHello(_ msg: [uint8]) throws -> ServerHelloInfo
```

ParseServerHello parses the ServerHello handshake message.

### func WrapInRecord <a id="func-WrapInRecord"></a>

```vertex
public func WrapInRecord(contentType: uint8, payload: [uint8], legacyVersion: uint16 = 0x0301) -> [uint8]
```

WrapInRecord wraps a handshake message into a standard TLS record.

## Types

### struct Alert <a id="struct-Alert"></a>

```vertex
public struct Alert
```

Alert Levels & Descriptions

#### Properties

<a id="Alert.LevelWarning"></a>

```vertex
public static let LevelWarning: uint8 = 1
```

<a id="Alert.LevelFatal"></a>

```vertex
public static let LevelFatal: uint8 = 2
```

<a id="Alert.CloseNotify"></a>

```vertex
public static let CloseNotify: uint8 = 0
```

<a id="Alert.UnexpectedMessage"></a>

```vertex
public static let UnexpectedMessage: uint8 = 10
```

<a id="Alert.BadRecordMac"></a>

```vertex
public static let BadRecordMac: uint8 = 20
```

<a id="Alert.HandshakeFailure"></a>

```vertex
public static let HandshakeFailure: uint8 = 40
```

<a id="Alert.IllegalParameter"></a>

```vertex
public static let IllegalParameter: uint8 = 47
```

<a id="Alert.InternalError"></a>

```vertex
public static let InternalError: uint8 = 80
```

### struct CipherSuite <a id="struct-CipherSuite"></a>

```vertex
public struct CipherSuite
```

TLS 1.3 Cipher Suites (RFC 8446 Section B.4)

#### Properties

<a id="CipherSuite.TLS_AES_128_GCM_SHA256"></a>

```vertex
public static let TLS_AES_128_GCM_SHA256: uint16 = 0x1301
```

<a id="CipherSuite.TLS_AES_256_GCM_SHA384"></a>

```vertex
public static let TLS_AES_256_GCM_SHA384: uint16 = 0x1302
```

<a id="CipherSuite.TLS_CHACHA20_POLY1305_SHA256"></a>

```vertex
public static let TLS_CHACHA20_POLY1305_SHA256: uint16 = 0x1303
```

### struct Config <a id="struct-Config"></a>

```vertex
public struct Config
```

Config configures a TLS client connection.

#### Initializers

<a id="Config.init"></a>

```vertex
public init(serverName: string = "",
            insecureSkipVerify: bool = false,
            verifyChain: bool = true,
            nextProtos: [string] = [],
            minVersion: uint16 = 0x0304,
            maxVersion: uint16 = 0x0304)
```

#### Properties

<a id="Config.ServerName"></a>

```vertex
public var ServerName: string
```

<a id="Config.InsecureSkipVerify"></a>

```vertex
public var InsecureSkipVerify: bool
```

InsecureSkipVerify accepts any server: no certificate or handshake
signature is checked. Only for tests against a server you run.

<a id="Config.VerifyChain"></a>

```vertex
public var VerifyChain: bool
```

VerifyChain checks the server's certificate chain against the
system's trusted roots and ServerName (crypto/cert). Turned off, the
server still has to prove it holds its certificate's key; the caller
vets the certificate another way, as RDP does through CredSSP.

<a id="Config.NextProtos"></a>

```vertex
public var NextProtos: [string]
```

<a id="Config.MinVersion"></a>

```vertex
public var MinVersion: uint16
```

<a id="Config.MaxVersion"></a>

```vertex
public var MaxVersion: uint16
```

### struct Conn <a id="struct-Conn"></a>

```vertex
public struct Conn
```

Conn represents an established or in-progress TLS 1.3 encrypted connection over TCP.

#### Initializers

<a id="Conn.init"></a>

```vertex
public init(stream: tcp.TcpStream)
```

<a id="Conn.init-2"></a>

```vertex
public init(stream: tcp.TcpStream, config: Config)
```

#### Properties

<a id="Conn.stream"></a>

```vertex
public var stream: tcp.TcpStream
```

<a id="Conn.config"></a>

```vertex
public var config: Config
```

<a id="Conn.state"></a>

```vertex
public var state: ConnectionState = ConnectionState()
```

#### Methods

<a id="Conn.Handshake"></a>

```vertex
public mutating func Handshake() async throws
```

Handshake performs the full TLS 1.3 handshake with the remote peer.

<a id="Conn.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) async throws -> int
```

Read reads decrypted application data into buffer.

<a id="Conn.ReadFull"></a>

```vertex
public mutating func ReadFull(into buffer: inout [uint8]) async throws
```

ReadFull reads until buffer is filled.

<a id="Conn.ReadToEnd"></a>

```vertex
public mutating func ReadToEnd(limit: int = 8 * 1024 * 1024) async throws -> [uint8]
```

ReadToEnd reads until the remote peer closes the stream.

<a id="Conn.Write"></a>

```vertex
public mutating func Write(_ data: [uint8]) async throws
```

Write encrypts and writes application data to the server.

<a id="Conn.WriteText"></a>

```vertex
public mutating func WriteText(_ text: string) async throws
```

WriteText encrypts and writes a string to the server.

<a id="Conn.Close"></a>

```vertex
public mutating func Close()
```

Close closes the underlying TCP connection.

<a id="Conn.GetConnectionState"></a>

```vertex
public func GetConnectionState() -> ConnectionState
```

GetConnectionState returns the negotiated session state.

### struct Conn12 <a id="struct-Conn12"></a>

```vertex
public struct Conn12
```

Conn12 is a TLS 1.2 client connection over a TCP stream.

#### Initializers

<a id="Conn12.init"></a>

```vertex
public init(stream: tcp.TcpStream, config: Config)
```

#### Properties

<a id="Conn12.stream"></a>

```vertex
public var stream: tcp.TcpStream
```

<a id="Conn12.config"></a>

```vertex
public var config: Config
```

<a id="Conn12.suite"></a>

```vertex
public var suite: uint16 = 0
```

Negotiated parameters.

<a id="Conn12.PeerCertificate"></a>

```vertex
public var PeerCertificate: x509.Certificate = x509.Certificate()
```

The server's leaf certificate, parsed. The caller applies its own
trust policy (CredSSP also binds to its public key).

<a id="Conn12.PeerCertificateDER"></a>

```vertex
public var PeerCertificateDER: [uint8] = []
```

<a id="Conn12.PeerCertificates"></a>

```vertex
public var PeerCertificates: [[uint8]] = []
```

PeerCertificates is the server's chain, DER, its own certificate first.

<a id="Conn12.Handshaked"></a>

```vertex
public var Handshaked: bool = false
```

#### Methods

<a id="Conn12.Handshake"></a>

```vertex
public mutating func Handshake() async throws
```

Handshake runs the full TLS 1.2 client handshake.

<a id="Conn12.Write"></a>

```vertex
public mutating func Write(_ data: [uint8]) async throws
```

Write sends application data as one or more encrypted records.

<a id="Conn12.Read"></a>

```vertex
public mutating func Read(into buffer: inout [uint8]) async throws -> int
```

Read fills buffer with decrypted application data, returning the
count. Returns 0 on clean close.

<a id="Conn12.Close"></a>

```vertex
public mutating func Close()
```

### struct ConnectionState <a id="struct-ConnectionState"></a>

```vertex
public struct ConnectionState
```

ConnectionState records the negotiated parameters of an established TLS session.

#### Initializers

<a id="ConnectionState.init"></a>

```vertex
public init()
```

#### Properties

<a id="ConnectionState.HandshakeComplete"></a>

```vertex
public var HandshakeComplete: bool = false
```

<a id="ConnectionState.ServerName"></a>

```vertex
public var ServerName: string = ""
```

<a id="ConnectionState.NegotiatedProtocol"></a>

```vertex
public var NegotiatedProtocol: string = ""
```

<a id="ConnectionState.CipherSuite"></a>

```vertex
public var CipherSuite: uint16 = 0
```

<a id="ConnectionState.Version"></a>

```vertex
public var Version: uint16 = 0
```

<a id="ConnectionState.PeerCertificates"></a>

```vertex
public var PeerCertificates: [[uint8]] = []
```

PeerCertificates is the server's chain as it sent it, DER, its own
certificate first.

### struct DecryptedRecord <a id="struct-DecryptedRecord"></a>

```vertex
public struct DecryptedRecord
```

#### Initializers

<a id="DecryptedRecord.init"></a>

```vertex
public init(contentType: uint8, data: [uint8])
```

#### Properties

<a id="DecryptedRecord.ContentType"></a>

```vertex
public var ContentType: uint8
```

<a id="DecryptedRecord.Data"></a>

```vertex
public var Data: [uint8]
```

### struct ExtensionType <a id="struct-ExtensionType"></a>

```vertex
public struct ExtensionType
```

Extension Types (RFC 8446 Section 4.2)

#### Properties

<a id="ExtensionType.ServerName"></a>

```vertex
public static let ServerName: uint16 = 0x0000
```

<a id="ExtensionType.SupportedGroups"></a>

```vertex
public static let SupportedGroups: uint16 = 0x000a
```

<a id="ExtensionType.SignatureAlgorithms"></a>

```vertex
public static let SignatureAlgorithms: uint16 = 0x000d
```

<a id="ExtensionType.ALPN"></a>

```vertex
public static let ALPN: uint16 = 0x0010
```

<a id="ExtensionType.SupportedVersions"></a>

```vertex
public static let SupportedVersions: uint16 = 0x002b
```

<a id="ExtensionType.KeyShare"></a>

```vertex
public static let KeyShare: uint16 = 0x0033
```

### struct HandshakeMessage <a id="struct-HandshakeMessage"></a>

```vertex
public struct HandshakeMessage
```

#### Initializers

<a id="HandshakeMessage.init"></a>

```vertex
public init(type: uint8, body: [uint8], fullBytes: [uint8])
```

#### Properties

<a id="HandshakeMessage.Type"></a>

```vertex
public var Type: uint8
```

<a id="HandshakeMessage.Body"></a>

```vertex
public var Body: [uint8]
```

<a id="HandshakeMessage.FullBytes"></a>

```vertex
public var FullBytes: [uint8]
```

### struct HandshakeType <a id="struct-HandshakeType"></a>

```vertex
public struct HandshakeType
```

Handshake Types (RFC 8446 Section 4)

#### Properties

<a id="HandshakeType.ClientHello"></a>

```vertex
public static let ClientHello: uint8 = 1
```

<a id="HandshakeType.ServerHello"></a>

```vertex
public static let ServerHello: uint8 = 2
```

<a id="HandshakeType.NewSessionTicket"></a>

```vertex
public static let NewSessionTicket: uint8 = 4
```

<a id="HandshakeType.EncryptedExtensions"></a>

```vertex
public static let EncryptedExtensions: uint8 = 8
```

<a id="HandshakeType.Certificate"></a>

```vertex
public static let Certificate: uint8 = 11
```

<a id="HandshakeType.CertificateVerify"></a>

```vertex
public static let CertificateVerify: uint8 = 15
```

<a id="HandshakeType.Finished"></a>

```vertex
public static let Finished: uint8 = 20
```

<a id="HandshakeType.KeyUpdate"></a>

```vertex
public static let KeyUpdate: uint8 = 24
```

### struct KeySchedule <a id="struct-KeySchedule"></a>

```vertex
public struct KeySchedule
```

KeySchedule manages the derivation of TLS 1.3 secrets across handshake phases.

#### Initializers

<a id="KeySchedule.init"></a>

```vertex
public init()
```

#### Properties

<a id="KeySchedule.EarlySecret"></a>

```vertex
public var EarlySecret: [uint8]
```

<a id="KeySchedule.HandshakeSecret"></a>

```vertex
public var HandshakeSecret: [uint8]
```

<a id="KeySchedule.MasterSecret"></a>

```vertex
public var MasterSecret: [uint8]
```

#### Methods

<a id="KeySchedule.DeriveHandshakeSecret"></a>

```vertex
public mutating func DeriveHandshakeSecret(sharedSecret: [uint8])
```

DeriveHandshakeSecret combines early secret and the shared X25519 secret.

<a id="KeySchedule.DeriveHandshakeTrafficSecrets"></a>

```vertex
public func DeriveHandshakeTrafficSecrets(transcriptHash: [uint8]) -> TrafficSecrets
```

DeriveHandshakeTrafficSecrets calculates client and server handshake traffic secrets.

<a id="KeySchedule.DeriveTrafficKeys"></a>

```vertex
public func DeriveTrafficKeys(trafficSecret: [uint8], cipherSuite: uint16 = 0x1303) -> TrafficKeys
```

DeriveTrafficKeys derives the key and 12-byte IV from a traffic
secret: a 32-byte key for ChaCha20-Poly1305, 16 for AES-128-GCM.

<a id="KeySchedule.DeriveFinishedKey"></a>

```vertex
public func DeriveFinishedKey(trafficSecret: [uint8]) -> [uint8]
```

DeriveFinishedKey derives the 32-byte HMAC key for Finished verify_data.

<a id="KeySchedule.ComputeFinished"></a>

```vertex
public func ComputeFinished(finishedKey: [uint8], transcriptHash: [uint8]) -> [uint8]
```

ComputeFinished calculates HMAC-SHA256(finishedKey, transcriptHash).

<a id="KeySchedule.DeriveMasterSecret"></a>

```vertex
public mutating func DeriveMasterSecret()
```

DeriveMasterSecret moves from handshake secret to master secret.

<a id="KeySchedule.DeriveApplicationTrafficSecrets"></a>

```vertex
public func DeriveApplicationTrafficSecrets(transcriptHash: [uint8]) -> TrafficSecrets
```

DeriveApplicationTrafficSecrets derives client and server application traffic secrets.

### struct NamedGroup <a id="struct-NamedGroup"></a>

```vertex
public struct NamedGroup
```

Supported Groups / Curves (RFC 8446 Section 4.2.7)

#### Properties

<a id="NamedGroup.X25519"></a>

```vertex
public static let X25519: uint16 = 0x001d
```

### struct ProtocolVersion <a id="struct-ProtocolVersion"></a>

```vertex
public struct ProtocolVersion
```

TLS Protocol Versions

#### Properties

<a id="ProtocolVersion.TLS13"></a>

```vertex
public static let TLS13: uint16 = 0x0304
```

<a id="ProtocolVersion.TLS12"></a>

```vertex
public static let TLS12: uint16 = 0x0303
```

### struct RecordCipher <a id="struct-RecordCipher"></a>

```vertex
public struct RecordCipher
```

RecordCipher manages encryption and decryption of TLS 1.3 records for one direction.

#### Initializers

<a id="RecordCipher.init"></a>

```vertex
public init(key: [uint8], iv: [uint8], cipherSuite: uint16 = 0x1303)
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

<a id="RecordCipher.SequenceNumber"></a>

```vertex
public var SequenceNumber: uint64 = 0
```

<a id="RecordCipher.CipherSuite"></a>

```vertex
public var CipherSuite: uint16 = 0x1303
```

#### Methods

<a id="RecordCipher.ComputeNonce"></a>

```vertex
public func ComputeNonce() -> [uint8]
```

ComputeNonce calculates the per-record nonce: IV XOR SequenceNumber (RFC 8446 Section 5.3).

<a id="RecordCipher.Encrypt"></a>

```vertex
public mutating func Encrypt(contentType: uint8, plaintext: [uint8]) throws -> [uint8]
```

Encrypt wraps plaintext into a TLS 1.3 protected record.

<a id="RecordCipher.Decrypt"></a>

```vertex
public mutating func Decrypt(header: [uint8], payload: [uint8]) throws -> DecryptedRecord
```

Decrypt verifies and opens a TLS 1.3 protected record.

### struct RecordType <a id="struct-RecordType"></a>

```vertex
public struct RecordType
```

Record Content Types (RFC 8446 Section 5.1)

#### Properties

<a id="RecordType.Invalid"></a>

```vertex
public static let Invalid: uint8 = 0
```

<a id="RecordType.ChangeCipherSpec"></a>

```vertex
public static let ChangeCipherSpec: uint8 = 20
```

<a id="RecordType.Alert"></a>

```vertex
public static let Alert: uint8 = 21
```

<a id="RecordType.Handshake"></a>

```vertex
public static let Handshake: uint8 = 22
```

<a id="RecordType.ApplicationData"></a>

```vertex
public static let ApplicationData: uint8 = 23
```

### struct ServerHelloInfo <a id="struct-ServerHelloInfo"></a>

```vertex
public struct ServerHelloInfo
```

#### Initializers

<a id="ServerHelloInfo.init"></a>

```vertex
public init(serverRandom: [uint8], cipherSuite: uint16, serverPublicKey: [uint8])
```

#### Properties

<a id="ServerHelloInfo.ServerRandom"></a>

```vertex
public var ServerRandom: [uint8]
```

<a id="ServerHelloInfo.CipherSuite"></a>

```vertex
public var CipherSuite: uint16
```

<a id="ServerHelloInfo.ServerPublicKey"></a>

```vertex
public var ServerPublicKey: [uint8]
```

### struct SignatureScheme <a id="struct-SignatureScheme"></a>

```vertex
public struct SignatureScheme
```

Signature Algorithms (RFC 8446 Section 4.2.3)

#### Properties

<a id="SignatureScheme.Ed25519"></a>

```vertex
public static let Ed25519: uint16 = 0x0807
```

<a id="SignatureScheme.EcdsaSecp256r1Sha256"></a>

```vertex
public static let EcdsaSecp256r1Sha256: uint16 = 0x0403
```

<a id="SignatureScheme.RsaPssRsaeSha256"></a>

```vertex
public static let RsaPssRsaeSha256: uint16 = 0x0804
```

<a id="SignatureScheme.RsaPkcs1Sha256"></a>

```vertex
public static let RsaPkcs1Sha256: uint16 = 0x0401
```

### enum Tls12Error <a id="enum-Tls12Error"></a>

```vertex
public enum Tls12Error: Error
```

#### Cases

<a id="Tls12Error.handshake"></a>

```vertex
case handshake(string)
```

<a id="Tls12Error.alert"></a>

```vertex
case alert(uint8)
```

<a id="Tls12Error.verify"></a>

```vertex
case verify(string)
```

<a id="Tls12Error.closed"></a>

```vertex
case closed
```

#### Properties

<a id="Tls12Error.Message"></a>

```vertex
public var Message: string { get }
```

### enum TlsError <a id="enum-TlsError"></a>

```vertex
public enum TlsError: Error
```

TlsError represents transport security failures.

#### Cases

<a id="TlsError.handshakeFailed"></a>

```vertex
case handshakeFailed(string)
```

<a id="TlsError.unexpectedMessage"></a>

```vertex
case unexpectedMessage(string)
```

<a id="TlsError.badRecordMac"></a>

```vertex
case badRecordMac(string)
```

<a id="TlsError.unsupportedCipherSuite"></a>

```vertex
case unsupportedCipherSuite(string)
```

<a id="TlsError.unsupportedVersion"></a>

```vertex
case unsupportedVersion(string)
```

<a id="TlsError.recordOverflow"></a>

```vertex
case recordOverflow(string)
```

<a id="TlsError.closed"></a>

```vertex
case closed(string)
```

<a id="TlsError.alertReceived"></a>

```vertex
case alertReceived(string)
```

<a id="TlsError.certificate"></a>

```vertex
case certificate(string)
```

The server's certificate was refused: not trusted, not for this
host, expired, or its handshake signature did not verify.

#### Properties

<a id="TlsError.Message"></a>

```vertex
public var Message: string { get }
```

### struct TrafficKeys <a id="struct-TrafficKeys"></a>

```vertex
public struct TrafficKeys
```

#### Initializers

<a id="TrafficKeys.init"></a>

```vertex
public init(key: [uint8], iv: [uint8])
```

#### Properties

<a id="TrafficKeys.Key"></a>

```vertex
public var Key: [uint8]
```

<a id="TrafficKeys.IV"></a>

```vertex
public var IV: [uint8]
```

### struct TrafficSecrets <a id="struct-TrafficSecrets"></a>

```vertex
public struct TrafficSecrets
```

#### Initializers

<a id="TrafficSecrets.init"></a>

```vertex
public init(clientSecret: [uint8], serverSecret: [uint8])
```

#### Properties

<a id="TrafficSecrets.ClientSecret"></a>

```vertex
public var ClientSecret: [uint8]
```

<a id="TrafficSecrets.ServerSecret"></a>

```vertex
public var ServerSecret: [uint8]
```

### struct Transcript <a id="struct-Transcript"></a>

```vertex
public struct Transcript
```

Transcript tracks the running handshake hash using SHA-256.

#### Initializers

<a id="Transcript.init"></a>

```vertex
public init()
```

#### Methods

<a id="Transcript.Update"></a>

```vertex
public mutating func Update(_ data: [uint8])
```

<a id="Transcript.CurrentHash"></a>

```vertex
public func CurrentHash() -> [uint8]
```

## Files

- conn.vs
- handshake.vs
- key_schedule.vs
- record.vs
- tls.vs
- tls12.vs
- tls12_conn.vs
- tls12_messages.vs
- verify.vs
