import React from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';

export default function CardDisplay(props) {
  return (
    <div className='CardDisplay'>
      {props.cards.map((card) => {
        return <Card key={uuidv4()} name={card.name} image={card.imgSrc} />;
      })}
    </div>
  );
}
