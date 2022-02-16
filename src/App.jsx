import { useState, useMemo } from 'react'
import WordItem from './components/word-item'
import './App.css'

const ary = [0, 1, 2, 3, 4];

function App() {
  const [list, setList] = useState(ary);

  const roughExtraList = useMemo(() => {
    return list
      .filter(e => e?.type === 'exact')
      .map(e => ({
        word: e.word,
        position: e.position,
      }));
  }, [list]);

  const roughBlurList = useMemo(() => {
    return list
      .filter(e => e?.type === 'non-postion')
      .map(e => ({
        word: e.word,
        position: ary.filter(item => {
          return !e.position.includes(item);
        }),
      }));
  }, [list]);

  const extraList = useMemo(() => {

  }, [roughExtraList, roughBlurList]);


  return (
    <div className="App">
      {ary.map(idx => {
        return (
          <WordItem
            key={idx}
            onFilterCallback={info => {
              setList(list.map((e, i) => {
                return info
                  ? i === idx ? info : e
                  : e;
              }));
            }}
          />
        );
      })}
    </div>
  )
}

export default App

