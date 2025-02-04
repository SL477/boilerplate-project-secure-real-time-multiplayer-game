# [Secure Real Time Multiplayer Game](https://www.freecodecamp.org/learn/information-security/information-security-projects/secure-real-time-multiplayer-game)

- [x] Multiple players can connect to a server and play
- [x] Each player has an avatar
- [x] Each player is represented by an object created by the Player class in Player.mjs
- [x] At a minimum, each player object should contain a unique id, a score, and x and y coordinates representing the player's current position.
- [x] The game has at least one type of collectible item. Complete the Collectible class in Collectible.mjs to implement this.
- [x] At a minimum, each collectible item object created by the Collectible class should contain a unique id, a value, and x and y coordinates representing the item's current position.
- [x] Players can use the WASD and/or arrow keys to move their avatar. Complete the movePlayer method in Player.mjs to implement this.
- [x] The movePlayer method should accept two arguments: a string of "up", "down", "left", or "right", and a number for the amount of pixels the player's position should change. movePlayer should adjust the x and y coordinates of the player object it's called from.
- [x] The player's score should be used to calculate their rank among the other players. Complete the calculateRank method in the Player class to implement this.
- [x] The calculateRank method should accept an array of objects representing all connected players and return the string Rank: currentRanking/totalPlayers. For example, in a game with two players, if Player A has a score of 3 and Player B has a score of 5, calculateRank for Player A should return Rank: 2/2.
- [x] Players can collide with a collectible item. Complete the collision method in Player.mjs to implement this.
- [x] The collision method should accept a collectible item's object as an argument. If the player's avatar intersects with the item, the collision method should return true.
- [x] All players are kept in sync.
- [x] Players can disconnect from the game at any time.
- [x] Prevent the client from trying to guess / sniff the MIME type.
- [x] Prevent cross-site scripting (XSS) attacks.
- [x] Nothing from the website is cached in the client.
- [x] The headers say that the site is powered by "PHP 7.4.3" even though it isn't (as a security measure).

Get Socket.io from https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js