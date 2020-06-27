console.log(
	"Hiya. Open war is upon you whether you would risk it or not. -Aragorn"
);

// todo exchangeInsults() optional

const game = {
	active: false,
	players: [],
	deck: null,
	round: 1,
};

class Player {
	constructor(fName, lName, title, userName, ship) {
		this.fName = fName;
		this.lName = lName;
		this.title = title;
		this.userName = userName;
		this.ship = ship;
		this.hand = [];
	}
	introduction() {
		console.log(
			`${this.title} ${this.lName} on his flagship ${this.ship} has joined the war.`
		);
	}
}

// * Assume player data is from new players logging in to the game
let nelson = new Player(
	"Horatio",
	"Nelson",
	"Admiral",
	"hnelson1805",
	"HMS Victory"
);

let villen = new Player(
	"Pierre",
	"Villeneuve",
	"Admiral",
	"pvillen1806",
	"Bucentaure"
);

// * Assume player data is from new players logging in to the game
const createPlayers = () => {
	game.players.push(nelson, villen);
	game.players.forEach((player) => player.introduction());
};

const newDeck = () => {
	const deck = [];
	const suits = ["♤", "♢", "♧", "♡"];

	//* Build deck as an array of objects
	for (let i = 2; i <= 14; i++) {
		for (let j = 0; j < suits.length; j++) {
			deck.push({
				card:
					(i <= 10
						? i
						: i === 11
						? "J"
						: i === 12
						? "Q"
						: i === 13
						? "K"
						: "A") + suits[j],
				rank: i,
				suit: suits[j],
				color: j % 2 === 0 ? "black" : "red",
			});
		}
	}
	return deck;
};

//* Based on a Fischer-Yates shuffle
const shuffle = (deck) => {
	//* deck is an array of card objects
	let numUnshuffledCards = deck.length;
	let randomUnshuffledCard;

	//* While unshuffled cards remain
	while (numUnshuffledCards) {
		//* Pick random number betweeen 0 inclusive and number of unshuffled cards
		//* Then decrement the number of unshuffled cards by 1
		randomUnshuffledCard = Math.floor(Math.random() * numUnshuffledCards--);
		//* Swap the random card with the last unshuffled card in the array
		[deck[randomUnshuffledCard], deck[numUnshuffledCards]] = [
			deck[numUnshuffledCards],
			deck[randomUnshuffledCard],
		];
	}

	return deck;
};

const deal = () => {
	game.deck.forEach((card, idx) => {
		idx % 2 === 0
			? game.players[0].hand.unshift(card)
			: game.players[1].hand.unshift(card);
	});
};

const reset = () => {
	game.players[0].hand.length = 0;
	game.players[1].hand.length = 0;
	game.deck = null;
	game.round = 1;
};

//* Allow human to play game again via a console command
const playAgain = () => {
	//* need to reset game object before running startGame()
	reset();

	//* introduce players
	game.players[0].introduction();
	game.players[1].introduction();

	//* start new game
	setTimeout(startGame, 3000);
};

const displayWinnersMsg = (winner, loser, notEnoughCards) => {
	if (notEnoughCards) {
		console.log(
			`Game over! ${winner.title} ${winner.lName} wins! ${loser.title} ${loser.lName} does not have enough cards for a war.`
		);
	} else {
		console.log(
			`Game over! ${winner.title} ${winner.lName} wins! ${loser.title} ${loser.lName} has no cards left.`
		);
	}

	setTimeout(function () {}, 2000);
	console.log(
		`If you would like ${game.players[0].title} ${game.players[0].lName} and ${game.players[1].title} ${game.players[1].lName} to play again, enter playAgain() in the console`
	);
};

const isGameOver = () => {
	//* if either player's hand is empty
	//* pass game winner and loser to displayWinnersMsg
	//* else continue game with turnCards()
	!game.players[0].hand.length
		? displayWinnersMsg(game.players[1], game.players[0])
		: !game.players[1].hand.length
		? displayWinnersMsg(game.players[0], game.players[1])
		: turnCards();
};

const collectCards = (winner, cardsInPlay) => {
	//* Shuffle the cardsInPlay to prevent "too much recursion"
	shuffle(cardsInPlay);

	//* Add cards to winner's hand
	game.players[winner].hand.push(...cardsInPlay);

	//* Print how may cards each player has after the round
	console.log(
		`${game.players[0].title} ${game.players[0].lName} has ${game.players[0].hand.length} cards`
	);
	console.log(
		`${game.players[1].title} ${game.players[1].lName} has ${game.players[1].hand.length} cards`
	);

	//* Update round
	game.round++;

	isGameOver();
};

const thisIsWar = (cardsInPlay) => {
	//* if either player has < four cards (3 to deal down & 1 to turnover)
	//* then end the game because that player doesn't have enough cards for war
	//* pass game winner, loser, and string (true) to displayWinnersMsg()
	if (game.players[0].hand.length < 4 || game.players[1].hand.length < 4) {
		game.players[0].hand.length < 4
			? displayWinnersMsg(game.players[1], game.players[0], "not-enough-cards")
			: displayWinnersMsg(game.players[0], game.players[1], "not-enough-cards");
		//* Stop this function
		return;
	}

	//* Remove 3 cards from the top of each player's hand
	//* Store the cards in temp card arrays
	let cardsWar1 = game.players[0].hand.splice(0, 3);
	let cardsWar2 = game.players[1].hand.splice(0, 3);

	//* Combine the temp arrays' values with cardsInPlay passed from turnCards()
	cardsInPlay = [...cardsInPlay, ...cardsWar1, ...cardsWar2];

	//* Pass cardsInPlay to turnCards() to turn over each player's next card
	turnCards(cardsInPlay);
};

const compareCards = (cardsInPlay) => {
	let winner;
	//* Compare cards and assign winner 0 or 1

	cardsInPlay[0].rank > cardsInPlay[1].rank ? (winner = 0) : (winner = 1);

	//* Print round results
	console.log(
		`Winner Round ${game.round}: ${game.players[winner].title} ${game.players[winner].lName} with a ${cardsInPlay[winner].card}`
	);

	//* Send won card objects to collectCards()
	collectCards(winner, cardsInPlay);
};

const turnCards = (cardsInPlay) => {
	//* Remove top card from each players hand and store in array
	let topCards = [game.players[0].hand.shift(), game.players[1].hand.shift()];

	//* turn over cards and print
	console.log(
		`Round ${game.round}: ${game.players[0].title} ${game.players[0].lName} turns over: ${topCards[0].card}`
	);
	console.log(
		`Round ${game.round}: ${game.players[1].title} ${game.players[1].lName} turns over: ${topCards[1].card}`
	);

	//* if cardsInPlay exist, the players were already at war
	//* --cardsInPlay holds the cards involved in the war passed from thisIsWar()
	//* --combine cardsInPlay with each player's new top card stored in topCards array
	//* if !cardsInPlay, assign each player's top card to cardsInPlay array
	cardsInPlay
		? (cardsInPlay = [...topCards, ...cardsInPlay])
		: (cardsInPlay = topCards);

	//* check if turned over cards are the same rank
	//* if yes, pass cardsInPlay to thisIsWar()
	//* if no, pass wardCards to comp
	if (topCards[0].rank === topCards[1].rank) {
		console.log(`${topCards[0].card} & ${topCards[1].card}. This is war!`);
		thisIsWar(cardsInPlay);
	} else {
		compareCards(cardsInPlay);
	}
};

const startGame = () => {
	//* if this is the first game played, create players
	if (game.active === false) {
		game.active = true;
		// * Assume player data is from new players logging in to the game
		createPlayers();
	}
	//* create a card deck, shuffle it, and store it in the game object
	game.deck = shuffle(newDeck());

	deal();

	setTimeout(turnCards, 3000);
	//* Alternatively, comment out line above
	//* and uncomment code below to allow human to invoke turnCards()
	// console.log(`Run turnCards() in the console to begin the game`);
};

startGame();
