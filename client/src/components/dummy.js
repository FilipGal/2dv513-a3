import React, { Component } from 'react'
import axios from 'axios'

export class Dummy extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }

  componentDidMount = () => {
    this.getList()
  }

  getList = async () => {
    const res = await axios.get('/api/list')
    this.setState({ list: res.data })
  }

  renderList = () => {
    const { list } = this.state
    return list.map(x => <li key={x.id}>{x.name}</li>)
  }

  render = () => {
    return <ul>{this.renderList()}</ul>
  }
}
