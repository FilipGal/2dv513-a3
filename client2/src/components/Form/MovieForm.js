import axios from 'axios';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

export default class MovieForm extends React.Component {
  constructor() {
    super();

    this.state = {
      genres: [],
      radioRuntime: 'atLeast',
      radioScore: 'atLeast',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setGenresState = this.setGenresState.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getGenres').then(this.setGenresState);
  }

  setGenresState(response) {
    const formattedData = response.data.map(genre => genre.name);
    this.setState({ genres: formattedData})
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" id="title" onChange={this.handleChange} placeholder="Movie title" />
        </FormGroup>
        <FormGroup>
          <Label for="actor">Actor</Label>
          <Input type="text" name="actor" id="actor" onChange={this.handleChange} placeholder="Actor" />
        </FormGroup>
        <FormGroup>
          <Label for="genre">Genre</Label>
          <Input type="select" name="genre" id="genre" onChange={this.handleChange}>
            <option>--Select Genre--</option>
            {this.state.genres.map(genre => <option key={genre}>{genre}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="runtime">Runtime</Label>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radioRuntime" value="atLeast" onChange={this.handleChange} checked={this.state.radioRuntime === 'atLeast'} />{' '}
              At least
          </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radioRuntime" value="atMost" onChange={this.handleChange} checked={this.state.radioRuntime === 'atMost'} />{' '}
              At most
          </Label>
          </FormGroup>
          <Input type="text" name="runtime" id="runtime" onChange={this.handleChange} placeholder="Runtime in minutes" />
        </FormGroup>
        <FormGroup>
          <Label for="score">Score</Label>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radioScore" value="atLeast" onChange={this.handleChange} checked={this.state.radioScore === 'atLeast'} />{' '}
              At least
          </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radioScore" value="atMost" onChange={this.handleChange} checked={this.state.radioScore === 'atMost'} />{' '}
              At most
          </Label>
          </FormGroup>
          <Input type="text" name="score" id="score" onChange={this.handleChange} placeholder="Score between 0 and 10" />
        </FormGroup>
        <Button onClick={this.handleClick}>Submit</Button>
      </Form>
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClick() {
    let url = '/api?';

    for (let key of Object.keys(this.state)) {
      const isNoValueKey = this.state[key] === '';
      const isGenresKey = key === 'genres';
      const isNonSelectedGenre = key === 'genre' && this.state[key] === '--Select Genre--';

      if (isNoValueKey || isGenresKey || isNonSelectedGenre) { continue; }

      url += `${key}=${this.state[key]}&`;
    }

    axios.get(url).then(response => triggerGotDataEvent(response.data));
  }
}

function triggerGotDataEvent(movies) {
  const gotDataEvent = new CustomEvent('gotData', {
    detail: {
      movies
    }
  });

  window.dispatchEvent(gotDataEvent);
}
