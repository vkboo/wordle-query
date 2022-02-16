import React, { useState, useEffect } from 'react';
import SelectedDots from './selected-dots';
import queryWordList from '../../utils/queryWordList';
import styles from './style.module.less';

const WordItem = ({ onFilterWordList }) => {
  const [word, setWord] = useState('');
  // exact | blur
  const [type, setType] = useState('exact');
  const [position, setPosition] = useState([]);

  useEffect(() => {
    if (word.length === 1 && !!type && position.length > 0) {
      onFilterWordList(queryWordList({ word, type, position }));
    } else {
      onFilterWordList([]);
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
        <option value="blur">blur</option>
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