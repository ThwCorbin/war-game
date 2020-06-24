console.log(
  "Hiya. Open war is upon you whether you would risk it or not. -Aragorn"
);

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

let deck = shuffle(newDeck());

// * Testing
let horatioCard = deck.shift();
let pierreCard = deck.pop();

horatioCard.rank === pierreCard.rank
  ? console.log(`This is war! Lord Nelson had the ${horatioCard.card}, and Admiral Villeneuve had the ${pierreCard.card}.`)
  : horatioCard.rank > pierreCard.rank
  ? console.log(
      `Lord Nelson wins with the ${horatioCard.card}! Admiral Villeneuve had the ${pierreCard.card}.`
    )
  : console.log(
      `Admiral Villeneuve wins with the ${pierreCard.card}! Lord Nelson had the ${horatioCard.card}.`
    );
