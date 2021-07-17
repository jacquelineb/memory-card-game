import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CardDisplay from './components/CardDisplay';
import Difficulty from './components/Difficulty';
import Scoreboard from './components/Scoreboard';
import { cardImageImports } from './utils/importCardImages';
import { shuffle } from './utils/shuffleArray';
import './MemoryGame.css';

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(() => {
    shuffle(GAME_CARDS);
    return shuffle(GAME_CARDS).slice(0, DEFAULT_DIFFICULTY.numCards);
  });

  // idk if this is good
  useEffect(() => {
    console.log('use effect');
    if (currScore > bestScore) {
      setBestScore(currScore);
    }
    if (currScore === difficulty.numCards) {
      setCards(shuffle(GAME_CARDS).slice(0, difficulty.numCards));
      setCurrScore(0);
    }
  }, [currScore, bestScore, difficulty]);
  // eslint(react-hooks/exhaustive-deps) kept complaining if i didn't include bestScore and difficulty in deps array

  function handleClick(id) {
    let updatedCards = cards.map((card) => ({ ...card }));
    const card = updatedCards.find((card) => {
      return card.id === id;
    });

    if (card.clicked) {
      updatedCards = shuffle(GAME_CARDS).slice(0, difficulty.numCards);
      setCurrScore(0);
    } else {
      setCurrScore(currScore + 1);
      card.clicked = true;
      shuffle(updatedCards);
    }

    setCards(updatedCards);
  }

  function handleDifficultyChange(difficultyName) {
    const newDifficulty = DIFFICULTY_LEVELS.find(
      (difficulty) => difficulty.name === difficultyName
    );
    setDifficulty(newDifficulty);
    setCards(shuffle(GAME_CARDS).slice(0, newDifficulty.numCards));
    setCurrScore(0);
  }

  return (
    <div className='MemoryGame'>
      <h1 className='gameHeader'>Memory Game</h1>
      <p className='gameDesc'>
        Click a card to start the game. The game is over if you click a card more than once!
      </p>
      <div>
        <Difficulty value={difficulty.name} onChange={handleDifficultyChange} />
        <Scoreboard currScore={currScore} bestScore={bestScore} />
      </div>
      <CardDisplay difficulty={difficulty.name} cards={cards} onClick={handleClick} />
    </div>
  );
}

const GAME_CARDS = cardImageImports.map((card) => {
  card.id = uuidv4();
  card.clicked = false;
  return card;
});

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

const DEFAULT_DIFFICULTY = DIFFICULTY_LEVELS[0];
