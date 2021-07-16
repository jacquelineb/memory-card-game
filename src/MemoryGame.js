import React, { useState, useRef } from 'react';
import Scores from './components/Scores';
import CardDisplay from './components/CardDisplay';
import { cardImageImports } from './utils/importCardImages';
import './MemoryGame.css';

function MemoryGame() {
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const cards = useRef(cardImageImports);

  return (
    <div className='MemoryGame'>
      <h1>Memory Game</h1>
      <p>Click a card to start the game. The game is over if you click card more than once!</p>
      <Scores currScore={currScore} bestScore={bestScore} />
      <CardDisplay cards={cards.current} />
    </div>
  );
}

export default MemoryGame;
