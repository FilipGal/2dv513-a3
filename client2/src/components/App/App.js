import React, { Component } from 'react';
import './App.css';
import MovieForm from '../Form/MovieForm';
import ResultsTable from '../ResultsTable/ResultsTable';

class App extends Component {
  constructor() {
    super();

    this.state = { data: [] };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    window.addEventListener('gotData', this.updateState)
  }

  componentWillUnmount() {
    window.removeEventListener('gotData', this.updateState)
  }

  render() {
    return (
      <div className="App">
        <MovieForm />
        <ResultsTable data={this.state.data} />
      </div>
    );
  }

  updateState(event) {
    this.setState({ data: event.detail.movies });
  }
}

export default App;
