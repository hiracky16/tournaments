import * as functions from 'firebase-functions'
// const fs = require('fs')
const Twitter = require('twitter')
// const admin = require('firebase-admin')
// const db = admin.firestore()

const client = new Twitter({
  consumer_key: functions.config().credential.twitter.api_key,
  consumer_secret: functions.config().credential.twitter.api_secret_key,
  access_token_key: functions.config().credential.twitter.access_key,
  access_token_secret: functions.config().credential.twitter.access_secret_key
})

export const helloWorld = functions.region('us-central1').https.onRequest((_request, response) => {
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

export const ogp = functions.region('us-central1').https.onRequest((req, res) => {
  const userAgent = req?.headers['user-agent']?.toLowerCase()
  const path = req.params[0].split('/')
  // const domain = 'https://akbtest-66d57.web.app'
  // const indexHTML = fs.readFileSync('./hosting/index.html').toString()

  const isBot = userAgent !== null && (userAgent?.includes('googlebot') || userAgent?.includes('twitterbot'))

  if (isBot) {
    const html = createHtmlForTwitter(path)
    console.log(html)
    res.status(200).send(html)
  } else {
    // const url = `https://akbtest-66d57.web.app/${path.join('/')}`
    const html = createHtml(path)
    console.log(html)
    res.status(200).send(html)
  }
})

const createHtmlForTwitter = (path: any) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Wishlist Share</title>
    <meta property="og:title" content="ogp のテスト" />
    <meta property="og:image" content="https://img.benesse-cms.jp/pet-dog/item/image/normal/resized/resized_a18dcd9f-548b-4f68-ab7f-14887d74e7f5.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:description" content="ogp のテストです" />
    <meta property="og:url" content="https://akbtest-66d57.web.app/${path.join('/')}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="uniqa" />
    <meta name="twitter:site" content="https://akbtest-66d57.web.app" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="ogp のテスト" />
    <meta name="twitter:image" content="https://img.benesse-cms.jp/pet-dog/item/image/normal/resized/resized_a18dcd9f-548b-4f68-ab7f-14887d74e7f5.jpg" />
    <meta name="twitter:description" content="ogp のテスト" />
  </head>
  <body>For Twitter Bot</body>
</html>
`
}

const createHtml = (path: any) => {
  return `<!DOCTYPE html>
<html>
  <body>
   <script>
   window.location="https://akbtest-66d57.web.app/user/m4gaqEpz4NgrISY0DnupCLRIjzi2/tournament/3bgp2nmbut8"
   </script>
  </body>
</html>
`
}
