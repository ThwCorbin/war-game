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

let createPlayers = () => {
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

  // Build deck as an array of objects
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
  // deck is an array of card objects
  let numUnshuffledCards = deck.length;
  let randomUnshuffledCard;

  // While unshuffled cards remain
  while (numUnshuffledCards) {
    // Pick random number betweeen 0 inclusive and number of unshuffled cards
    // Then decrement the number of unshuffled cards by 1
    randomUnshuffledCard = Math.floor(Math.random() * numUnshuffledCards--);
    // Swap the random card with the last unshuffled card in the array
    [deck[randomUnshuffledCard], deck[numUnshuffledCards]] = [
      deck[numUnshuffledCards],
      deck[randomUnshuffledCard],
    ];
  }

  return deck;
};

let deal = () => {
  game.deck.forEach((card, idx) => {
    idx % 2 === 0
      ? game.players[0].hand.unshift(card)
      : game.players[1].hand.unshift(card);
  });
};

let compareCards = () => {
  // let horatioCard = deck.shift();
  // let pierreCard = deck.pop();
  // horatioCard.rank === pierreCard.rank
  //   ? console.log(
  //       `This is war! Lord Nelson had the ${horatioCard.card}, and Admiral Villeneuve had the ${pierreCard.card}.`
  //     )
  //   : horatioCard.rank > pierreCard.rank
  //   ? console.log(
  //       `Lord Nelson wins with the ${horatioCard.card}! Admiral Villeneuve had the ${pierreCard.card}.`
  //     )
  //   : console.log(
  //       `Admiral Villeneuve wins with the ${pierreCard.card}! Lord Nelson had the ${horatioCard.card}.`
  //     );
};

let startGame = () => {
  game.active = true;
  createPlayers();
  game.deck = shuffle(newDeck());
  deal();
};

startGame();

// * Testing
// let deck = shuffle(newDeck());

// let horatioCard = deck.shift();
// let pierreCard = deck.pop();

// horatioCard.rank === pierreCard.rank
//   ? console.log(
//       `This is war! Lord Nelson had the ${horatioCard.card}, and Admiral Villeneuve had the ${pierreCard.card}.`
//     )
//   : horatioCard.rank > pierreCard.rank
//   ? console.log(
//       `Lord Nelson wins with the ${horatioCard.card}! Admiral Villeneuve had the ${pierreCard.card}.`
//     )
//   : console.log(
//       `Admiral Villeneuve wins with the ${pierreCard.card}! Lord Nelson had the ${horatioCard.card}.`
//     );
