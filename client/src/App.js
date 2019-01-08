import React, { Component } from 'react'
import { RenderSearch } from './components/search'
import { RenderResult } from './components/result'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Movie DB</h1>
        <header className="App-header">
          <RenderSearch />
          <RenderResult />
        </header>
      </div>
    )
  }
}

export default App
