console.log(
  "Hiya. Open war is upon you whether you would risk it or not. -Aragorn"
);

const game = {
  active: false,
  rounds: 0,
  startWar: null,
  players: [],
  deck: null,
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
    console.log(`${this.title} ${this.lName} has joined the war.`);
  }
}

const createPlayers = () => {
  // * Assume this data comes from new players logging in to the game
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

const thisIsWar = (warCards) => {
  //* Remove 3 cards from the top of each player's hand
  //* Store the cards in temp card arrays
  let cardsWar1 = game.players[0].hand.slice(0, 3);
  let cardsWar2 = game.players[1].hand.slice(0, 3);
  // console.log(warCards);
  // console.log(cardsWar1);
  // console.log(cardsWar2);

  //* Combine the temp arrays' values with warCards passed from turnCards()
  warCards = [...warCards, ...cardsWar1, ...cardsWar2];
  console.log(warCards);
  //* Pass warCards to turnCards() to turn over each player's next card
  turnCards(warCards);
};

const compareCards = () => {
  //* Compare cards and print
  game.players[0].hand[0].rank === game.players[1].hand[0].rank
    ? (console.log(`This is war!`), thisIsWar(warCards))
    : game.players[0].hand[0].rank > game.players[1].hand[0].rank
    ? (console.log(
        `${game.players[0].title} ${game.players[0].lName} wins the round`
      ),
      (loser = 0))
    : (console.log(
        `${game.players[1].title} ${game.players[1].lName} wins the round`
      ),
      (loser = 1));

  //* Send won card objects to collectCards()
  //* if warCards === null, there was not a war
  // warCards === null ?
};

const turnCards = (warCards) => {
  //* Remove top card from each players hand
  let topCards = [
    game.players[0].hand.shift(),
    game.players[1].hand.shift()
  ];

  // console.log(topCards);
  // console.log(warCards);
  //* if warCards exist, the players were already at war
  //* warCards holds the cards involved in the war passed from thisIsWar()
  //* combined warCards with each player's top card stored in topCards array
  //* if !warCards, assign each player's top card to warCards array
  warCards ? (warCards = [...topCards, ...warCards]) : warCards = topCards.slice();
	// console.log(warCards);

  //* turn over cards and print
  console.log(
    `${game.players[0].title} ${game.players[0].lName} turns over: ${game.players[0].hand[0].card}`
  );
  console.log(
    `${game.players[1].title} ${game.players[1].lName} turns over: ${game.players[1].hand[0].card}`
  );

  //* check if turned over cards are the same rank
  //* if yes, pass warCards to thisIsWar()
  if (game.players[0].hand[0].rank === game.players[1].hand[0].rank) {
    console.log(`This is war!`);
    thisIsWar(warCards);
  } else {
    return;
		// compareCards(warCards);
	}
};

const startGame = () => {
  game.active = true;
  createPlayers();
  game.deck = shuffle(newDeck());
  deal();
  turnCards();
};

startGame();
