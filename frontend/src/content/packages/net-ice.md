# package ice

```vertex
import "net/ice"
```

## Index

- [`func CalculatePairPriority(controllingPriority: uint32, controlledPriority: uint32) -> uint64`](#func-CalculatePairPriority)
- [`func CalculatePriority(type: string, localPref: uint16 = 65535, component: uint16 = 1) -> uint32`](#func-CalculatePriority)
- [`func NewAgent(socket: udp.UdpSocket, role: string = IceRole.Controlling, localCandidates: [Candidate] = [], ufrag: string = "", pwd: string = "") -> Agent`](#func-NewAgent)
- [`func NewCandidatePair(local: Candidate, remote: Candidate, isControlling: bool) -> CandidatePair`](#func-NewCandidatePair)
- [`func NewHostCandidate(foundation: string, address: udp.SocketAddress, localPref: uint16 = 65535, component: uint16 = 1) -> Candidate`](#func-NewHostCandidate)
- [`func NewRelayCandidate(foundation: string, address: udp.SocketAddress, relatedAddress: udp.SocketAddress, localPref: uint16 = 65535, component: uint16 = 1) -> Candidate`](#func-NewRelayCandidate)
- [`func NewServerReflexiveCandidate(foundation: string, address: udp.SocketAddress, relatedAddress: udp.SocketAddress, localPref: uint16 = 65535, component: uint16 = 1) -> Candidate`](#func-NewServerReflexiveCandidate)
- [`func ParseSDPLine(_ line: string) -> Candidate?`](#func-ParseSDPLine)
- [`struct Agent`](#struct-Agent)
  - [`var Socket: udp.UdpSocket`](#Agent.Socket)
  - [`var Role: string`](#Agent.Role)
  - [`var TieBreaker: uint64`](#Agent.TieBreaker)
  - [`var LocalUfrag: string`](#Agent.LocalUfrag)
  - [`var LocalPwd: string`](#Agent.LocalPwd)
  - [`var RemoteUfrag: string`](#Agent.RemoteUfrag)
  - [`var RemotePwd: string`](#Agent.RemotePwd)
  - [`var LocalCandidates: [Candidate]`](#Agent.LocalCandidates)
  - [`var RemoteCandidates: [Candidate]`](#Agent.RemoteCandidates)
  - [`var Pairs: [CandidatePair]`](#Agent.Pairs)
  - [`var SelectedPair: CandidatePair`](#Agent.SelectedPair)
  - [`var HasSelectedPair: bool`](#Agent.HasSelectedPair)
  - [`var State: string`](#Agent.State)
  - [`mutating func AddRemoteCandidate(_ cand: Candidate)`](#Agent.AddRemoteCandidate)
  - [`mutating func SetRemoteCredentials(ufrag: string, pwd: string)`](#Agent.SetRemoteCredentials)
  - [`mutating func FormPairs()`](#Agent.FormPairs)
  - [`mutating func Connect(timeoutMs: int32 = 4000) async throws`](#Agent.Connect)
  - [`func Send(_ data: [uint8]) async throws`](#Agent.Send)
  - [`func Receive() async throws -> [uint8]`](#Agent.Receive)
- [`struct Candidate`](#struct-Candidate)
  - [`var Foundation: string`](#Candidate.Foundation)
  - [`var Component: uint16`](#Candidate.Component)
  - [`var Protocol: string`](#Candidate.Protocol)
  - [`var Priority: uint32`](#Candidate.Priority)
  - [`var Address: udp.SocketAddress`](#Candidate.Address)
  - [`var Type: string`](#Candidate.Type)
  - [`var RelatedAddress: string`](#Candidate.RelatedAddress)
  - [`var RelatedPort: uint16`](#Candidate.RelatedPort)
  - [`func ToSDP() -> string`](#Candidate.ToSDP)
- [`struct CandidateGatherer`](#struct-CandidateGatherer)
  - [`init(localPort: uint16 = 0, stunServers: [string] = [])`](#CandidateGatherer.init)
  - [`var LocalPort: uint16`](#CandidateGatherer.LocalPort)
  - [`var StunServers: [string]`](#CandidateGatherer.StunServers)
  - [`func Gather() async throws -> (socket: udp.UdpSocket, candidates: [Candidate])`](#CandidateGatherer.Gather)
- [`struct CandidatePair`](#struct-CandidatePair)
  - [`var Local: Candidate`](#CandidatePair.Local)
  - [`var Remote: Candidate`](#CandidatePair.Remote)
  - [`var Priority: uint64`](#CandidatePair.Priority)
  - [`var State: string`](#CandidatePair.State)
  - [`var Nominated: bool`](#CandidatePair.Nominated)
- [`struct CandidateType`](#struct-CandidateType)
  - [`static let Host: string = "host"`](#CandidateType.Host)
  - [`static let ServerReflexive: string = "srflx"`](#CandidateType.ServerReflexive)
  - [`static let PeerReflexive: string = "prflx"`](#CandidateType.PeerReflexive)
  - [`static let Relay: string = "relay"`](#CandidateType.Relay)
- [`struct IceConnectionState`](#struct-IceConnectionState)
  - [`static let New: string = "new"`](#IceConnectionState.New)
  - [`static let Checking: string = "checking"`](#IceConnectionState.Checking)
  - [`static let Connected: string = "connected"`](#IceConnectionState.Connected)
  - [`static let Completed: string = "completed"`](#IceConnectionState.Completed)
  - [`static let Failed: string = "failed"`](#IceConnectionState.Failed)
  - [`static let Closed: string = "closed"`](#IceConnectionState.Closed)
- [`enum IceError: Error`](#enum-IceError)
  - [`var Message: string { get }`](#IceError.Message)
- [`struct IceRole`](#struct-IceRole)
  - [`static let Controlling: string = "controlling"`](#IceRole.Controlling)
  - [`static let Controlled: string = "controlled"`](#IceRole.Controlled)
- [`struct PairState`](#struct-PairState)
  - [`static let Frozen: string = "frozen"`](#PairState.Frozen)
  - [`static let Waiting: string = "waiting"`](#PairState.Waiting)
  - [`static let InProgress: string = "in_progress"`](#PairState.InProgress)
  - [`static let Succeeded: string = "succeeded"`](#PairState.Succeeded)
  - [`static let Failed: string = "failed"`](#PairState.Failed)

## Functions

### func CalculatePairPriority <a id="func-CalculatePairPriority"></a>

```vertex
public func CalculatePairPriority(controllingPriority: uint32, controlledPriority: uint32) -> uint64
```

Calculates pair priority according to RFC 8445 Section 6.1.2.3:
pair_priority = (2^32 * MIN(G, D)) + (2 * MAX(G, D)) + (G > D ? 1 : 0)
where G is the priority of controlling agent candidate, D is controlled agent candidate.

### func CalculatePriority <a id="func-CalculatePriority"></a>

```vertex
public func CalculatePriority(type: string, localPref: uint16 = 65535, component: uint16 = 1) -> uint32
```

Computes the candidate priority according to RFC 8445 Section 5.1.2:
priority = (2^24 * type_pref) + (2^8 * local_pref) + (256 - component_id)

### func NewAgent <a id="func-NewAgent"></a>

```vertex
public func NewAgent(socket: udp.UdpSocket,
                     role: string = IceRole.Controlling,
                     localCandidates: [Candidate] = [],
                     ufrag: string = "",
                     pwd: string = "") -> Agent
```

Creates a new ICE Agent initialized with local credentials and host candidates.

### func NewCandidatePair <a id="func-NewCandidatePair"></a>

```vertex
public func NewCandidatePair(local: Candidate,
                             remote: Candidate,
                             isControlling: bool) -> CandidatePair
```

Creates a new CandidatePair and computes its pair priority.

### func NewHostCandidate <a id="func-NewHostCandidate"></a>

```vertex
public func NewHostCandidate(foundation: string,
                             address: udp.SocketAddress,
                             localPref: uint16 = 65535,
                             component: uint16 = 1) -> Candidate
```

Creates a new Host candidate.

### func NewRelayCandidate <a id="func-NewRelayCandidate"></a>

```vertex
public func NewRelayCandidate(foundation: string,
                              address: udp.SocketAddress,
                              relatedAddress: udp.SocketAddress,
                              localPref: uint16 = 65535,
                              component: uint16 = 1) -> Candidate
```

Creates a new Relay candidate.

### func NewServerReflexiveCandidate <a id="func-NewServerReflexiveCandidate"></a>

```vertex
public func NewServerReflexiveCandidate(foundation: string,
                                       address: udp.SocketAddress,
                                       relatedAddress: udp.SocketAddress,
                                       localPref: uint16 = 65535,
                                       component: uint16 = 1) -> Candidate
```

Creates a new Server Reflexive candidate.

### func ParseSDPLine <a id="func-ParseSDPLine"></a>

```vertex
public func ParseSDPLine(_ line: string) -> Candidate?
```

Parses an RFC 8839 / RFC 8445 candidate attribute line from an SDP description.

## Types

### struct Agent <a id="struct-Agent"></a>

```vertex
public struct Agent
```

Agent conducts Interactive Connectivity Establishment (RFC 8445 & RFC 8838 Trickle ICE).

#### Properties

<a id="Agent.Socket"></a>

```vertex
public var Socket: udp.UdpSocket
```

<a id="Agent.Role"></a>

```vertex
public var Role: string
```

<a id="Agent.TieBreaker"></a>

```vertex
public var TieBreaker: uint64
```

<a id="Agent.LocalUfrag"></a>

```vertex
public var LocalUfrag: string
```

<a id="Agent.LocalPwd"></a>

```vertex
public var LocalPwd: string
```

<a id="Agent.RemoteUfrag"></a>

```vertex
public var RemoteUfrag: string
```

<a id="Agent.RemotePwd"></a>

```vertex
public var RemotePwd: string
```

<a id="Agent.LocalCandidates"></a>

```vertex
public var LocalCandidates: [Candidate]
```

<a id="Agent.RemoteCandidates"></a>

```vertex
public var RemoteCandidates: [Candidate]
```

<a id="Agent.Pairs"></a>

```vertex
public var Pairs: [CandidatePair]
```

<a id="Agent.SelectedPair"></a>

```vertex
public var SelectedPair: CandidatePair
```

<a id="Agent.HasSelectedPair"></a>

```vertex
public var HasSelectedPair: bool
```

<a id="Agent.State"></a>

```vertex
public var State: string
```

#### Methods

<a id="Agent.AddRemoteCandidate"></a>

```vertex
public mutating func AddRemoteCandidate(_ cand: Candidate)
```

Adds a remote candidate received via signaling / Trickle ICE (RFC 8838).

<a id="Agent.SetRemoteCredentials"></a>

```vertex
public mutating func SetRemoteCredentials(ufrag: string, pwd: string)
```

Sets the remote peer's ICE username fragment and password.

<a id="Agent.FormPairs"></a>

```vertex
public mutating func FormPairs()
```

Forms all valid candidate pairs and sorts them by priority descending (RFC 8445 Section 6.1.2).

<a id="Agent.Connect"></a>

```vertex
public mutating func Connect(timeoutMs: int32 = 4000) async throws
```

Runs the ICE connectivity check phase (RFC 8445 Section 7).

<a id="Agent.Send"></a>

```vertex
public func Send(_ data: [uint8]) async throws
```

Sends application payload over the nominated ICE candidate pair.

<a id="Agent.Receive"></a>

```vertex
public func Receive() async throws -> [uint8]
```

Receives application payload, automatically responding to STUN consent checks (RFC 7675).

### struct Candidate <a id="struct-Candidate"></a>

```vertex
public struct Candidate
```

Candidate represents an ICE transport address candidate (RFC 8445 / RFC 8839).

#### Properties

<a id="Candidate.Foundation"></a>

```vertex
public var Foundation: string
```

<a id="Candidate.Component"></a>

```vertex
public var Component: uint16
```

<a id="Candidate.Protocol"></a>

```vertex
public var Protocol: string
```

<a id="Candidate.Priority"></a>

```vertex
public var Priority: uint32
```

<a id="Candidate.Address"></a>

```vertex
public var Address: udp.SocketAddress
```

<a id="Candidate.Type"></a>

```vertex
public var Type: string
```

<a id="Candidate.RelatedAddress"></a>

```vertex
public var RelatedAddress: string
```

<a id="Candidate.RelatedPort"></a>

```vertex
public var RelatedPort: uint16
```

#### Methods

<a id="Candidate.ToSDP"></a>

```vertex
public func ToSDP() -> string
```

Formats the candidate as an RFC 8839 SDP attribute line:
candidate:<foundation> <component> <transport> <priority> <ip> <port> typ <type> ...

### struct CandidateGatherer <a id="struct-CandidateGatherer"></a>

```vertex
public struct CandidateGatherer
```

CandidateGatherer manages local host and server-reflexive ICE candidate discovery.

#### Initializers

<a id="CandidateGatherer.init"></a>

```vertex
public init(localPort: uint16 = 0, stunServers: [string] = [])
```

#### Properties

<a id="CandidateGatherer.LocalPort"></a>

```vertex
public var LocalPort: uint16
```

<a id="CandidateGatherer.StunServers"></a>

```vertex
public var StunServers: [string]
```

#### Methods

<a id="CandidateGatherer.Gather"></a>

```vertex
public func Gather() async throws -> (socket: udp.UdpSocket, candidates: [Candidate])
```

Gathers all local host and reflexive candidates.
Binds a UDP socket on the specified local port (or ephemeral) and returns the socket and candidates.

### struct CandidatePair <a id="struct-CandidatePair"></a>

```vertex
public struct CandidatePair
```

CandidatePair represents a checklist entry of a local and remote candidate (RFC 8445 Section 6.1.2).

#### Properties

<a id="CandidatePair.Local"></a>

```vertex
public var Local: Candidate
```

<a id="CandidatePair.Remote"></a>

```vertex
public var Remote: Candidate
```

<a id="CandidatePair.Priority"></a>

```vertex
public var Priority: uint64
```

<a id="CandidatePair.State"></a>

```vertex
public var State: string
```

<a id="CandidatePair.Nominated"></a>

```vertex
public var Nominated: bool
```

### struct CandidateType <a id="struct-CandidateType"></a>

```vertex
public struct CandidateType
```

Candidate Types (RFC 8445 Section 5.1.1)

#### Properties

<a id="CandidateType.Host"></a>

```vertex
public static let Host: string = "host"
```

<a id="CandidateType.ServerReflexive"></a>

```vertex
public static let ServerReflexive: string = "srflx"
```

<a id="CandidateType.PeerReflexive"></a>

```vertex
public static let PeerReflexive: string = "prflx"
```

<a id="CandidateType.Relay"></a>

```vertex
public static let Relay: string = "relay"
```

### struct IceConnectionState <a id="struct-IceConnectionState"></a>

```vertex
public struct IceConnectionState
```

ICE Connection States (RFC 8445 Section 6.1.2.6)

#### Properties

<a id="IceConnectionState.New"></a>

```vertex
public static let New: string = "new"
```

<a id="IceConnectionState.Checking"></a>

```vertex
public static let Checking: string = "checking"
```

<a id="IceConnectionState.Connected"></a>

```vertex
public static let Connected: string = "connected"
```

<a id="IceConnectionState.Completed"></a>

```vertex
public static let Completed: string = "completed"
```

<a id="IceConnectionState.Failed"></a>

```vertex
public static let Failed: string = "failed"
```

<a id="IceConnectionState.Closed"></a>

```vertex
public static let Closed: string = "closed"
```

### enum IceError <a id="enum-IceError"></a>

```vertex
public enum IceError: Error
```

#### Cases

<a id="IceError.noCandidates"></a>

```vertex
case noCandidates
```

<a id="IceError.connectivityFailed"></a>

```vertex
case connectivityFailed
```

<a id="IceError.protocolError"></a>

```vertex
case protocolError(string)
```

<a id="IceError.timedOut"></a>

```vertex
case timedOut(string)
```

#### Properties

<a id="IceError.Message"></a>

```vertex
public var Message: string { get }
```

### struct IceRole <a id="struct-IceRole"></a>

```vertex
public struct IceRole
```

ICE Roles (RFC 8445 Section 6.1.1)

#### Properties

<a id="IceRole.Controlling"></a>

```vertex
public static let Controlling: string = "controlling"
```

<a id="IceRole.Controlled"></a>

```vertex
public static let Controlled: string = "controlled"
```

### struct PairState <a id="struct-PairState"></a>

```vertex
public struct PairState
```

Candidate Pair States (RFC 8445 Section 6.1.2.6)

#### Properties

<a id="PairState.Frozen"></a>

```vertex
public static let Frozen: string = "frozen"
```

<a id="PairState.Waiting"></a>

```vertex
public static let Waiting: string = "waiting"
```

<a id="PairState.InProgress"></a>

```vertex
public static let InProgress: string = "in_progress"
```

<a id="PairState.Succeeded"></a>

```vertex
public static let Succeeded: string = "succeeded"
```

<a id="PairState.Failed"></a>

```vertex
public static let Failed: string = "failed"
```

## Files

- agent.vs
- candidate.vs
- gatherer.vs
- pair.vs
