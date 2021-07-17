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
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(() => {
    shuffle(GAME_CARDS);
    return shuffle(GAME_CARDS).slice(0, DEFAULT_DIFFICULTY.numCards);
  });

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
    if (score === difficulty.numCards) {
      // win
      restart(difficulty.numCards);
    }
  }, [score, bestScore, difficulty]);

  function handleCardClick(cardId) {
    let updatedCards = cards.map((card) => ({ ...card }));
    const card = updatedCards.find((card) => {
      return card.id === cardId;
    });

    if (card.clicked) {
      // loss
      restart(difficulty.numCards);
    } else {
      card.clicked = true;
      setScore((prevScore) => prevScore + 1);
      setCards(shuffle(updatedCards));
    }
  }

  function handleDifficultyChange(difficultyName) {
    const newDifficulty = DIFFICULTY_LEVELS.find(
      (difficulty) => difficulty.name === difficultyName
    );
    setDifficulty(newDifficulty);
    restart(newDifficulty.numCards);
  }

  function restart(numCards) {
    setCards(shuffle(GAME_CARDS).slice(0, numCards));
    setScore(0);
  }

  return (
    <div className='MemoryGame'>
      <h1 className='gameHeader'>Memory Game</h1>
      <p className='gameDesc'>
        Click a card to start the game. The game is over if you click a card more than once!
      </p>
      <div>
        <Difficulty value={difficulty.name} onChange={handleDifficultyChange} />
        <Scoreboard currScore={score} bestScore={bestScore} />
      </div>
      <CardDisplay difficulty={difficulty.name} cards={cards} onCardClick={handleCardClick} />
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

const DEFAULT_DIFFICULTY = DIFFICULTY_LEVELS[1];
