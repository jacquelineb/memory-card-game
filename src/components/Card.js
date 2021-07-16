import React from 'react';

export default function Card(props) {
  function handleClick() {
    props.onClick(props.card.id);
  }

  return (
    <div className='Card' onClick={handleClick}>
      <img className='cardImg' src={props.card.imgSrc} alt={props.card.name} />
      <p className='cardName'>{props.card.name.toUpperCase()}</p>
    </div>
  );
}
