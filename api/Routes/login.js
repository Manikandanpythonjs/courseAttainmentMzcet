const express = require('express')
const connectionString = require('../config/config')
const sql = require('msnodesqlv8')

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const query = `SELECT * FROM Staff_login WHERE Staff_id=? AND password=?`
  const params = [username, password]

  try {
    sql.query(connectionString, query, params, (err, result) => {
      if (err) {
        console.error('Error executing query:', err)
        res.status(500).send('Internal Server Error')
      } else {
        if (
          result.length === 1 &&
          result[0].Staff_Id === username &&
          result[0].Password === password
        ) {
          res.status(200).json({ result })
        } else {
          res.status(401).json({ message: 'Invalid username or password' })
        }
      }
    })
  } catch (error) {
    console.error('Error executing query:', error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
