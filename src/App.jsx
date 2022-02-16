import { useState } from 'react'
import WordItem from './components/word-item'
import './App.css'

function App() {

  return (
    <div className="App">
      <WordItem onFilterWordList={() => {
        // console.log()
      }} />
    </div>
  )
}

export default App
