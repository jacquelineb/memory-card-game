import React, { useState, useEffect } from 'react';
import CardDisplay from './components/CardDisplay';
import Difficulty from './components/Difficulty';
import Scoreboard from './components/Scoreboard';
import { shuffle } from './utils/shuffleArray';
import { GAME_CARDS, DIFFICULTY_LEVELS, DEFAULT_DIFFICULTY } from './utils/gameData';
import './MemoryGame.css';

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState(DEFAULT_DIFFICULTY);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(() => {
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
  }, [score, bestScore, difficulty.numCards]);

  function handleCardClick(cardId) {
    let cardsCopy = cards.map((card) => ({ ...card }));
    const card = cardsCopy.find((card) => {
      return card.id === cardId;
    });

    if (card.clicked) {
      // loss
      restart(difficulty.numCards);
    } else {
      card.clicked = true;
      setScore((prevScore) => prevScore + 1);
      setCards(shuffle(cardsCopy));
    }
  }

  function handleDifficultyChange(difficultyName) {
    const newDifficulty = DIFFICULTY_LEVELS.find(
      (difficulty) => difficulty.name === difficultyName
    );
    setDifficulty(newDifficulty);
    setBestScore(0);
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
      <CardDisplay cards={cards} onCardClick={handleCardClick} gridType={difficulty.name} />
    </div>
  );
}
