import * as functions from 'firebase-functions'
const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: functions.config().credential.twitter.api_key,
  consumer_secret: functions.config().credential.twitter.api_secret_key,
  access_token_key: functions.config().credential.twitter.access_key,
  access_token_secret: functions.config().credential.twitter.access_secret_key
})

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((_request, response) => {
  response.send('Hello from Firebase!')
})

export const tweets = functions.firestore.document('users/{userId}/tweets/{tweetId}').onWrite((data, _context) => {
  const params = { status: data.after.data()?.text }
  console.log(params)
  client.post('statuses/update.json', params).then((res: any) => {
    console.log(res.data)
  }).catch((errors: any) => {
    // TODO: error処理
    console.log(errors)
  })
})
