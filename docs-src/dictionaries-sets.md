---
slug: dictionaries-sets
title: Dictionaries & Sets
description: Hash-based collections that map keys to values, and sets of unique elements with full set algebra.
---

## Dictionaries

A dictionary from `K` to `V` is written `[K: V]`. Looking a key up returns an optional, because the key might be absent.

```vertex
var stock = ["apples": 12, "pears": 4]
print(stock["apples"] as Any, stock["plums"] as Any)
print(stock["plums", default: 0])
print(stock.count)

stock["plums"] = 30
stock["pears"] = nil
print(stock.count, stock["pears"] as Any)
```

`updateValue` returns the old value, and the `default:` form makes counting loops tidy.

```vertex
var counts: [string: int] = [:]
for word in ["a", "b", "a", "c", "a", "b"] {
    counts[word, default: 0] += 1
}
print(counts["a"]!, counts["b"]!, counts["c"]!)

var ages = ["ada": 36]
let old = ages.updateValue(37, forKey: "ada")
print(old as Any, ages["ada"]!)
```

Iteration order is not defined, so sort the keys when the order matters.

```vertex
let capitals = ["France": "Paris", "Japan": "Tokyo", "Peru": "Lima"]
for country in capitals.keys.sorted() {
    print(country, capitals[country]!)
}
print(capitals.values.sorted())
print(capitals.mapValues { $0.count }["Japan"]!)
print(capitals.filter { $0.value.count == 4 }.count)
```

Keys must be `Hashable`. Strings, integers, booleans, and structs or enums made of hashable parts all qualify; see [Protocols](/docs/protocols).

## Sets

A `Set<T>` stores unique elements, with constant-time membership tests.

```vertex
var tags: Set<string> = ["swift", "vertex", "swift"]
print(tags.count)
tags.insert("gpu")
print(tags.contains("vertex"), tags.contains("rust"))
let removed = tags.remove("gpu")
print(removed as Any, tags.count)
```

Sets support the usual algebra.

```vertex
let even: Set = [2, 4, 6, 8]
let small: Set = [1, 2, 3, 4]
print(even.union(small).sorted())
print(even.intersection(small).sorted())
print(even.subtracting(small).sorted())
print(even.symmetricDifference(small).sorted())
print(Set([2, 4]).isSubset(of: even), even.isDisjoint(with: Set([1, 3])))
```

Use a set to remove duplicates while you iterate in a known order.

```vertex
let input = [3, 1, 3, 2, 1, 3]
var seen = Set<int>()
let unique = input.filter { seen.insert($0).inserted }
print(unique)
```
