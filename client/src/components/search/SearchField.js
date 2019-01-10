import React, { Component } from 'react'
import propTypes from 'prop-types'

export class SearchField extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  generateInputField = (id, placeholder, name) => {
    return (
      <div className="col">
        <input
          onChange={this.handleInput}
          type="text"
          className="form-control mb-2 mr-sm-2"
          id={id}
          placeholder={placeholder}
          name={name}
        />
      </div>
    )
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  getMovie = () => {
    // axios.post(url, this.state)
    console.log(this.state)
  }

  render() {
    return (
      <form className="form-inline">
        <div className="container">
          <div className="row">
            {this.generateInputField('inputTitle', 'Title', 'title')}
            {this.generateInputField('inputGenre', 'Genre', 'genre')}
            {this.generateInputField('inputRating', 'Rating', 'rating')}
            <div className="w-100" />
            {this.generateInputField('inputLanguage', 'Language', 'language')}
            {this.generateInputField('inputActor', 'Actor', 'actor')}
            {this.generateInputField('inputActor', 'Actor', 'actor')}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.getMovie}
          >
            Search
          </button>
        </div>
      </form>
    )
  }
}

SearchField.propTypes = {
  handleInput: propTypes.func
}
