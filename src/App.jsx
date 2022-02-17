import { useState, useMemo } from 'react'
import ColorSelector from './components/color-selector';
import Grid from './components/grid';
import ModeSelector from './components/mode-selector';
import './App.css'

function App() {

  return (
    <div className="App">
      <ModeSelector />
      <Grid />
      <ColorSelector />
    </div>
  )
}

export default App

