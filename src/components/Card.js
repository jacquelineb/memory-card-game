import React, { useState } from 'react';

export default function Card(props) {
  const [wasClicked, setWasClicked] = useState(false);

  const handleClick = () => {
    if (!wasClicked) {
      setWasClicked(true);
    } else {
      console.log('you already clicked this');
    }
  };

  return (
    <div className='Card' onClick={handleClick}>
      <p>{props.name.toUpperCase()}</p>
      <img className='cardImg' src={props.image} alt={props.name} />
    </div>
  );
}
