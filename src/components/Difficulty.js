import React from 'react';

export default function Difficulty(props) {
  function handleChange(e) {
    console.log(e.target.value);
    props.onChange(e.target.value);
  }

  return (
    <form onChange={handleChange}>
      <label htmlFor='difficulty'>Difficulty: </label>
      <select name='difficulty' defaultValue={props.value}>
        <option value='easy'>Easy</option>
        <option value='normal'>Normal</option>
        <option value='hard'>Hard</option>
        <option value='challenging'>Challenging</option>
      </select>
    </form>
  );
}
