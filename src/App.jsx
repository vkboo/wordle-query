import { useState, useMemo } from 'react'
import ColorSelector from './components/color-selector';
import Grid from './components/grid';
import AnswerList from './components/answer-list';
import './App.css'

function App() {
  const [colorType, setColorType] = useState(1);
  const [answerList, setAnserList] = useState([]);
  return (
    <div className="App">
      <Grid
        type={colorType}
        onCallback={setAnserList}
      />
      <ColorSelector
        value={colorType}
        onChange={setColorType}
      />
      <AnswerList data={answerList}/>
    </div>
  )
}

export default App

