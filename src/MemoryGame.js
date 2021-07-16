import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Scoreboard from './components/Scoreboard';
import CardDisplay from './components/CardDisplay';
import { cardImageImports } from './utils/importCardImages';
import { shuffle } from './utils/shuffleArray';
import './MemoryGame.css';

function MemoryGame() {
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState(() => {
    const initialCards = cardImageImports.map((card) => {
      card.id = uuidv4();
      card.clicked = false;
      return card;
    });
    return shuffle(initialCards);
  });

  // idk if this is good
  useEffect(() => {
    console.log('use effect');
    if (currScore > bestScore) {
      setBestScore(currScore);
    }
  }, [currScore, bestScore]);

  function handleClick(id) {
    const updatedCards = cards.map((card) => ({ ...card }));
    const card = updatedCards.find((card) => {
      return card.id === id;
    });

    if (card.clicked) {
      // remove this later. but have some kind of way of letting user know they just lost the game
      alert('you already clicked this card');
      updatedCards.forEach((card) => {
        card.clicked = false;
      });
      setCurrScore(0);
    } else {
      setCurrScore(currScore + 1);
      card.clicked = true;
    }

    shuffle(updatedCards);
    setCards(updatedCards);
  }

  return (
    <div className='MemoryGame'>
      <h1 className='gameHeader'>Memory Game</h1>
      <p className='gameDesc'>
        Click a card to start the game. The game is over if you click a card more than once!
      </p>
      <Scoreboard currScore={currScore} bestScore={bestScore} />
      <CardDisplay cards={cards} onClick={handleClick} />
    </div>
  );
}

export default MemoryGame;
