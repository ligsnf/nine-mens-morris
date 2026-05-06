# User stories

What a player can do in the app.

## Starting and ending a game

1. **Start a game** — As a player, I want to start a new game so I can begin playing.
   - From the start screen I choose **Human vs. Human** or **Human vs. Computer**.
   - The board appears empty and White is prompted to play first.

2. **Reset / new game** — As a player, I want to reset or start a new game so I can keep playing after one ends.
   - A reset control is always available.
   - When the game ends, the result modal offers a new-game button.
   - Resetting clears the board and all per-player counters.

3. **Be told when the game is over** — As a player, I want a clear end-of-game message so I know who won.
   - The modal announces the winner and the reason (opponent has fewer than 3 pieces, or opponent has no legal moves).
   - No further moves can be made once the game is over.

## Playing a turn

4. **See the board** — As a player, I want a visible board with pieces shown at their intersections so I can understand the state of the game.

5. **See whose turn it is and what to do** — As a player, I want a status indicator that shows the active colour and the action they're expected to take (Place / Select / Move / Remove) so I know what's expected of me.

6. **See my resources** — As a player, I want to see how many pieces I still have to place and how many of my pieces have been taken so I can plan ahead.

7. **Place a piece** — As a player in the placing phase, I want to place one of my unplaced pieces on any empty intersection.

8. **Move a piece (slide)** — As a player past the placing phase, I want to select one of my pieces and slide it to an adjacent empty intersection.

9. **Fly a piece** — As a player with only 3 pieces left on the board, I want to move one of my pieces to any empty intersection on the board.

10. **Form a mill and capture** — As a player, I want forming a mill (three of my pieces in a line on one of the 16 mill triples) to grant me one opponent-piece removal so the game has incentive to create mills.

11. **Remove an opponent piece** — When I form a mill, I want to remove an opponent piece that is not part of one of their mills, unless all of their pieces are in mills (in which case any piece may be removed).

## Help and feedback

12. **See valid actions highlighted** — As a player, I want valid placement / move / removal squares to be highlighted so I know where I'm allowed to act.

13. **Be told when an action is invalid** — As a player, I want a clear error message when I try something illegal (placing on an occupied square, picking up an opponent's piece, sliding to a non-adjacent square, etc.) so I can correct my next click.

## Single-player mode

14. **Play against the computer** — As a player without a partner, I want to play the game against the computer so I can practice on my own.

15. **Computer obeys the rules** — As a player, I want the computer to make only legal moves and to take piece removals when it forms a mill, so the single-player game stays fair and consistent with the rules.
