---
slug: ownership
title: Borrowing & Consuming
description: Say how a function uses its arguments, borrow for reading, mutate in place, or take ownership, and move values with consume.
---

## Three ways to use an argument

Every parameter has an *ownership convention* that tells both the compiler and the reader what the function will do with the value.

| Convention | Meaning | Cost |
| --- | --- | --- |
| `borrowing` (default) | The function reads the value and cannot keep or change it. | No copy and no reference-count change. |
| `inout` | The function changes the caller's value in place. | No copy. |
| `consuming` | The function takes the value and the caller gives it up. | A move when the caller is done with it. |

```vertex
struct Document {
    var title: string
    var words: [string]

    borrowing func wordCount() -> int { words.count }
    mutating func retitle(to newTitle: string) { title = newTitle }
    consuming func intoWords() -> [string] { words }
}

func wordCount(of doc: borrowing Document) -> int { doc.words.count }
func retitle(_ doc: inout Document, to title: string) { doc.title = title }

var doc = Document(title: "Draft", words: ["alpha", "beta", "gamma"])
print(wordCount(of: doc), doc.wordCount())
retitle(&doc, to: "Final")
doc.retitle(to: "Final v2")
print(doc.title)
print(doc.intoWords())
```

Methods spell the conventions with `borrowing`, `mutating` (the in-place form), and `consuming` before `func`. A [receiver method](/docs/receiver-methods) writes them in front of the receiver's type instead.

## Moving and copying explicitly

`consume x` ends the life of a variable and hands its value on without a copy. The compiler then refuses any later use. `copy x` makes the duplication visible when you do want two values.

```vertex
struct Payload { var bytes: [uint8] }

func main() {
    let original = Payload(bytes: [1, 2, 3])
    let backup = copy original
    let moved = consume original
    print(backup.bytes, moved.bytes)
}
main()
```

```vertex error
struct Payload { var bytes: [uint8] }

func main() {
    let original = Payload(bytes: [1, 2, 3])
    let moved = consume original
    print(original.bytes)
}
```

## Noncopyable types

A type declared `~Copyable` has exactly one owner. It cannot be duplicated, so it is the right tool for things that must not be: a file handle, a lock, a unique token. It may have a `deinit`, which runs when the single owner finishes with it.

```vertex
struct Token: ~Copyable {
    let id: int
    init(_ id: int) {
        self.id = id
        print("issue \(id)")
    }
    deinit { print("revoke \(id)") }

    borrowing func peek() -> int { id }
    consuming func spend() {
        print("spend \(id)")
    }
}

func inspect(_ token: borrowing Token) -> int {
    token.peek()
}

func main() {
    let a = Token(1)
    print(inspect(a))

    let b = Token(2)
    b.spend()
    print("end of main")
}
main()
```

> warning: `consuming` is still maturing. Prefer `consuming` methods, and keep their bodies simple: hand the value on or move a field out. Passing a value that owns heap storage as a `consuming` function *argument* is not reliable yet.

## Value semantics and copy-on-write

Arrays, strings, and dictionaries are values with *copy-on-write* storage. Passing or assigning one is cheap, and the buffer is only duplicated when one side is mutated while the other still exists. Ownership conventions let you avoid even that when you know a value is not needed afterwards.

```vertex
var a = [Int](repeating: 0, count: 1_000_000)
var b = a
b[0] = 1
print(a[0], b[0])
```
