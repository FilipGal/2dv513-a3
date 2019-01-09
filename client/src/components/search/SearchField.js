import React, { Component } from 'react'

export class SearchField extends Component {
  generateInputField = (id, placeholder) => {
    return (
      <div className="col">
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          id={id}
          placeholder={placeholder}
        />
      </div>
    )
  }

  render() {
    return (
      <form className="form-inline">
        <div className="container">
          <div className="row">
            {this.generateInputField('inlineFormInputTitle', 'Title')}
            {this.generateInputField('inlineFormInputGenre', 'Genre')}
            {this.generateInputField('inlineFormInputRating', 'Rating')}
            <div className="w-100" />
            {this.generateInputField('inlineFormInputLanguage', 'Language')}
            {this.generateInputField('inlineFormInputActor', 'Actor')}
            {this.generateInputField('inlineFormInputActor', 'Actor')}
          </div>
        </div>
      </form>
    )
  }
}
