import React from 'react';

export default function Scoreboard(props) {
  return (
    <div className='scoreboard-container'>
      <p className='score'>Current Score: {props.currScore}</p>
      <p className='score'>Best Score: {props.bestScore}</p>
    </div>
  );
}
