function createCards() {
  const context = require.context('../images/cards', false, /\.(jpg)$/);
  const cards = context.keys().map((imgName, idx) => {
    const cardObj = {
      id: idx,
      name: imgName.substring(imgName.lastIndexOf('/') + 1, imgName.lastIndexOf('.')),
      imgSrc: context(imgName).default,
    };
    return cardObj;
  });
  return cards;
}

const GAME_CARDS = createCards();

const DIFFICULTY_LEVELS = [
  {
    name: 'easy',
    numCards: 6,
  },
  {
    name: 'normal',
    numCards: 12,
  },
  {
    name: 'hard',
    numCards: 18,
  },
  {
    name: 'challenging',
    numCards: 24,
  },
];

const DEFAULT_DIFFICULTY = DIFFICULTY_LEVELS[1];

export { GAME_CARDS, DIFFICULTY_LEVELS, DEFAULT_DIFFICULTY };
