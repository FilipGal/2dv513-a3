import React, { Component } from 'react'
import axios from 'axios'
import propTypes from 'prop-types'

export class Result extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: [],
      fetchCompleted: false
    }
  }

  requestMovie = async () => {
    const res = await axios.get(this.props.url)
    this.setState({ result: res.data, fetchCompleted: true })
  }

  render() {
    const contentLoadedSuccessfully =
      this.state.fetchCompleted && this.state.result.length > 0

    return (
      <form className="form-inline">
        <div className="container">
          {contentLoadedSuccessfully ? (
            <div>
              <h1>Result</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Language</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.result.map(char => (
                    <tr key={char.title}>
                      <td>{char.userId}</td>
                      <td>{char.title}</td>
                      <td>{char.id}</td>
                      <td>{char.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </form>
    )
  }
}

Result.propTypes = {
  url: propTypes.string
}
