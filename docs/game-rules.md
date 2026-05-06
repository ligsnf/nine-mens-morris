# Game rules

Nine Men's Morris is a two-player abstract strategy game played on a board of three concentric squares connected by lines, with 24 intersections and 16 possible mill triples. Each player has 9 pieces ("men") of one colour.

## Board

```
 0 ─────────── 1 ─────────── 2
 │             │             │
 │    3 ────── 4 ────── 5    │
 │    │        │        │    │
 │    │    6 ─ 7 ─ 8    │    │
 │    │    │       │    │    │
 9 ──10 ──11      12 ──13 ──14
 │    │    │       │    │    │
 │    │   15 ─16 ─17    │    │
 │    │        │        │    │
 │   18 ──────19 ──────20    │
 │             │             │
21 ───────────22 ───────────23
```

The 16 mills are the 8 horizontal triples and 8 vertical triples that connect three intersections in a straight line along the board's drawn lines:

```
horizontal: 0-1-2  3-4-5  6-7-8  9-10-11  12-13-14  15-16-17  18-19-20  21-22-23
vertical:   0-9-21 3-10-18 6-11-15 1-4-7 16-19-22 8-12-17 5-13-20 2-14-23
```

Diagonals do not count.

## Phases

A player's piece count drives which actions are available.

| Phase     | Trigger                                                | Allowed action                                    |
|-----------|--------------------------------------------------------|---------------------------------------------------|
| Placing   | The player has any unplaced pieces (`piecesLeft > 0`)  | Place one piece on any empty intersection         |
| Moving    | All 9 placed and `piecesOnBoard > 3`                   | Slide one of own pieces to an adjacent empty spot |
| Flying    | All 9 placed and `piecesOnBoard <= 3`                  | Move one of own pieces to **any** empty spot      |
| Removing  | The player just formed a new mill                      | Remove one opponent piece (rules below)           |

White moves first. After each turn (other than a mill-triggered removal), control passes to the other player.

## Forming a mill

A mill is three of a player's own pieces aligned on one of the 16 mill triples. A mill is "newly formed" when the most recent move (place / slide / fly) caused a mill triple to become full of that player's colour, and that triple was not full of that colour at the end of the previous turn.

Forming a new mill grants the player one removal: they remove a single opponent piece from the board before passing the turn.

Reforming a mill (breaking it on one turn and then closing it again on a later turn) counts as forming a new mill.

## Removing an opponent's piece

When a player has earned a removal:

1. They may remove any opponent piece that is not part of an opponent mill.
2. If every opponent piece is currently in a mill, the restriction is lifted: any opponent piece may be removed.

A piece that is removed from the board is gone for the rest of the game (it does not return to the owner's `piecesLeft`).

## Win conditions

A player loses the game (their opponent wins) when, at the start of their turn:

1. They have fewer than 3 pieces remaining on the board and no pieces left to place; or
2. They have no legal moves available.

## Move validation

Illegal actions are blocked and surface an error message. Examples:

- Placing on an occupied intersection.
- Selecting an opponent piece.
- Sliding to a non-adjacent intersection (when not in flying phase).
- Sliding to an occupied intersection.
- Removing an opponent piece that is in a mill while non-mill pieces are still available.
