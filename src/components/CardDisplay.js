import React from 'react';
import Card from './Card';

export default function CardDisplay(props) {
  return (
    <div className='CardDisplay'>
      {props.cards.map((card) => {
        return <Card key={card.id} onClick={props.onClick} card={card} />;
      })}
    </div>
  );
}
