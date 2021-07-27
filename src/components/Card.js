import React from 'react';

export default function Card(props) {
  function handleClick() {
    props.onClick(props.card.id);
  }

  return (
    <div className='card' onClick={handleClick}>
      <img className='card-img' src={props.card.imgSrc} alt={props.card.name} />
      <p className='card-name'>{props.card.name.toUpperCase()}</p>
    </div>
  );
}
