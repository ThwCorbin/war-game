# War Card Game Planning

## Upon page load, initialize game
- `startGame()`
- game object:

```js
const game = {
	active: Boolean,
	rounds: Number,
	startWar: null,
	players: Array of players,
	deck: Array of card functions
}
```

## Create two players 
- `createPlayers()`
- consider Player class:

```js
class Player {
	constructor(fName, lName, title, userName, hand) {
		this.fName = fName;
		this.lName = lName;
		this.title = title;
		this.userName = userName;
		this.hand = hand;
	}
	// add a player introduction console.log
}

```

## Exchange insults
- `exchangeInsults()`

```js
let insults = ["You, sir, are a braggart.", "I demand satisfaction.", "etc."];
```

## Create new card deck
- `newDeck()`
- leverage my previous card game deck function
- deck is an array of card objects

```js
let deck = [
	{
		suit: String,
		// "♤", "♢", "♧", "♡"
		rank: Number,
		value: Number,
		// value between 2 and 14 ace high
		color: String
		// red or black if I decide to add html version
	},
	{
		// more cards
	}
];

```

## Shuffle deck
- `shuffle()`
- leverage my previous card game shuffle function

## Deal 26 cards to each player
- `deal()`
- store cards in each players' hand 

## Turn over cards
- `turnOverCards()`

## Compare cards
- `compareCards()`
- if same cards: `thisIsWar()`
- else, highest card wins and that player gets both cards
- move cards to bottom of winner's deck: `collectCards()`
- display results of the round: `displayRoundResults()`
- check if game is over: `isGameOver()`

## War
- `thisIsWar()`
- each player places three cards face down and one card face up
- `compareCards()`

## Check if game is over
- `isGameOver()`
- if yes, display winner message: `displayWinnersMsg()`
- else, `turnOverCards()`

## Move cards to winning player's hand
- `collectCards()`
- cards go to bottom of player's deck

## Display (print) results after each round
- `displayRoundResults()`
- at minimum:
	1) cards played by each user
	2) player who won the round
	3) how many cards each player has
- consider: current round number
- exchange more insults: `exchangeInsults()`

## Display winner's message
- `displayWinnersMsg()`
- consider displaying stats: `displayStats()`
- `exchangeInsults()`
- ask human to play again: `playAgainPrompt()`

## Consider displaying stats at the end of a game
- `displayStats()`

## Ask human to play again
- `playAgainPrompt()`

```
Enter `game.warStart = "war is peace"` in the console to start a war.
```

- if yes, `initializeGame()`
- consider keeping game stats
- else, `exchangeInsults()` directed at human, antiwar-card-game, console dweller and...
- ...do something???