console.log(
  "Hiya. Open war is upon you whether you would risk it or not. -Aragorn"
);

const game = {
  active: false,
  round: 1,
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

const collectCards = (winner, warCards) => {
  game.players[winner].hand.push(warCards);
};

const thisIsWar = (warCards) => {
  //* Remove 3 cards from the top of each player's hand
  //* Store the cards in temp card arrays
  let cardsWar1 = game.players[0].hand.splice(0, 3);
  let cardsWar2 = game.players[1].hand.splice(0, 3);

  //* Combine the temp arrays' values with warCards passed from turnCards()
  warCards = [...warCards, ...cardsWar1, ...cardsWar2];

  //* Pass warCards to turnCards() to turn over each player's next card
  turnCards(warCards);
};

const compareCards = (warCards) => {
  let winner;
  //* Compare cards and assign winner 0 or 1
  game.players[0].hand[0].rank > game.players[1].hand[0].rank
    ? (winner = 0)
    : (winner = 1);

  //* Print round results
  console.log(
    `Round ${game.round}: ${game.players[winner].title} ${game.players[winner].lName} wins`
  );

  //* Send won card objects to collectCards()
  collectCards(winner, warCards);

  //* Print how may cards each player has after the round
  console.log(
    `${game.players[0].title} ${game.players[0].lName} has ${game.players[0].hand.length} cards`
  );
  console.log(
    `${game.players[1].title} ${game.players[1].lName} has ${game.players[1].hand.length} cards`
  );
};

const turnCards = (warCards) => {
  //* Remove top card from each players hand and store in array
  let topCards = [game.players[0].hand.shift(), game.players[1].hand.shift()];

  //* turn over cards and print
  console.log(
    `Round ${game.round}: ${game.players[0].title} ${game.players[0].lName} turns over: ${topCards[0].card}`
  );
  console.log(
    `Round ${game.round}: ${game.players[1].title} ${game.players[1].lName} turns over: ${topCards[1].card}`
  );

  //* if warCards exist, the players were already at war
  //* --warCards holds the cards involved in the war passed from thisIsWar()
  //* --combine warCards with each player's new top card stored in topCards array
  //* if !warCards, assign each player's top card to warCards array
  warCards
    ? warCards = [...topCards, ...warCards]
    : warCards = topCards;
  console.log(warCards);


  //* check if turned over cards are the same rank
  //* if yes, pass warCards to thisIsWar()
  //* if no, pass wardCards to comp
  if (game.players[0].hand[0].rank === game.players[1].hand[0].rank) {
    console.log(`This is war!`);
    thisIsWar(warCards);
  } else {
    compareCards(warCards);
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
