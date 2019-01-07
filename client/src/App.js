import React, { Component } from 'react'
import { Dummy } from './components/dummy'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Dummy />
        </header>
      </div>
    )
  }
}

export default App
