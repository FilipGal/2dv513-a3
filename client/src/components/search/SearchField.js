import React from 'react'

export const SearchField = () => {
  return (
    <form className="form-inline">
      <div className="container">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              id="inlineFormInputTitle"
              placeholder="Title"
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              id="inlineFormInputGenre"
              placeholder="Genre"
            />
          </div>

          <div className="w-100" />

          <div className="col">
            <div className="col">
              <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                id="inlineFormInputRating"
                placeholder="Rating"
              />
            </div>
          </div>

          <div className="col">
            <div className="col">
              <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                id="inlineFormInputLanguage"
                placeholder="Language spoken"
              />
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  )
}
