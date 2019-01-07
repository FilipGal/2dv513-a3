const express = require('express')
const app = express()

app.get('/api/list', (req, res) => {
  const list = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
  ]

  res.json(list)
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log('\x1b[1m', `Server running on port ${port}`))
