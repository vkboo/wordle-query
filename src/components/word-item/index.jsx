import React, { useState, useEffect } from 'react';
import SelectedDots from './selected-dots';
import styles from './style.module.less';

const WordItem = ({ onFilterCallback }) => {
  const [word, setWord] = useState('');
  // exact | non-postion
  const [type, setType] = useState('exact');
  const [position, setPosition] = useState([]);

  useEffect(() => {
    if (word.length === 1 && !!type && position.length > 0) {
      onFilterCallback({ word, type, position });
    } else {
      onFilterCallback(null);
    }
  }, [word, type, position]);

  return (
    <div className={styles.container}>
      <input
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <select
        value={type}
        onChange={e => { setType(e.target.value) }}
      >
        <option value="exact">exact</option>
        <option value="non-postion">non-postion</option>
      </select>
      <SelectedDots
        value={position}
        onChange={setPosition}
        type={type}
      />
    </div>
  );
};

export default WordItem;