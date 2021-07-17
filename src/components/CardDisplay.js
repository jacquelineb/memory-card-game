import React from 'react';
import Card from './Card';

export default function CardDisplay(props) {
  return (
    <div className={`CardDisplay ${props.difficulty}Grid`}>
      {props.cards.map((card) => {
        return <Card key={card.id} onClick={props.onCardClick} card={card} />;
      })}
    </div>
  );
}
