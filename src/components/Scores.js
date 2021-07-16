import React from 'react';

export default function Scores(props) {
  return (
    <div className='Scores'>
      <p className='score'>Current Score: {props.currScore}</p>
      <p className='score'>Best Score: {props.bestScore}</p>
    </div>
  );
}
