import { useState, useMemo } from 'react'
import ColorSelector from './components/color-selector';
import Grid from './components/grid';
import './App.css'

function App() {
  const [colorType, setColorType] = useState(1);
  return (
    <div className="App">
      <Grid type={colorType} />
      <ColorSelector
        value={colorType}
        onChange={setColorType}
      />
    </div>
  )
}

export default App

