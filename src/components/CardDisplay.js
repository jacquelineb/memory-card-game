import React from 'react';
import Card from './Card';

export default function CardDisplay(props) {
  return (
    <div className={`card-display ${props.gridType}-grid`}>
      {props.cards.map((card) => {
        return <Card key={card.id} onClick={props.onCardClick} card={card} />;
      })}
    </div>
  );
}
