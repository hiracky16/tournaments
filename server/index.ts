import express from 'express'
import bodyParser from 'body-parser'
import Twitter from 'twitter'
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/tweets', (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY || '',
    consumer_secret: process.env.TWITTER_API_SECRET_KEY || '',
    access_token_key: req.body.token,
    access_token_secret: req.body.secret
  })
  const params = { status: req.body.text }
  client.post('statuses/update.json', params).then((data) => {
    res.send(data.data)
  }).catch((errors) => {
    // TODO: error処理
    console.log(errors)
  })
})

module.exports = {
  path: '/api',
  handler: app
}
