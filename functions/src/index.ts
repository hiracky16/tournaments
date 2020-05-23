import * as functions from 'firebase-functions'
// const fs = require('fs')
const Twitter = require('twitter')
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()

const DOMAIN = 'https://www.uniqa.site'

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

export const ogp = functions.region('us-central1').https.onRequest(async (req, res) => {
  const userAgent = req?.headers['user-agent']?.toLowerCase()
  const path = req.path
  const params = path.match(/^\/ogp\/user\/(.+?)\/tournament\/(.+?)$/)
  const tournamentId = params?.pop()
  const userId = params?.pop()
  const userDoc = await db.collection('users').doc(userId).get()
  const doc = await db.collection(`users/${userId}/tournaments`).doc(tournamentId).get()
  const tournamentName = doc.data()?.name
  const description = createDescription(userDoc.data().name, tournamentName, doc.data()?.rounds)
  const imageUrl = doc.data()?.imageUrl

  const isBot = userAgent !== null && (userAgent?.includes('googlebot') || userAgent?.includes('twitterbot'))

  if (isBot) {
    const html = createHtml(tournamentName, description, imageUrl, userId, tournamentId)
    res.status(200).send(html)
  } else {
    const url = `${DOMAIN}/user/${userId}/tournament/${tournamentId}`
    res.redirect(url)
  }
})

type Player = {
  id: string
  name: string
  winner: boolean
}

type Game = {
  player1: Player
  player2: Player
}

type Games = {
  games: Game[]
}

const createDescription = (
  userName: string,
  tournamentName: string,
  rounds: Games[]) => {
  const desc = `${userName}さんは${tournamentName}で遊びました！`
  const lastGame = rounds.pop()?.games[0]
  const isWinPlayer1 = lastGame?.player1?.winner
  if (lastGame && isWinPlayer1) {
    const winPlayer = isWinPlayer1 ? lastGame?.player1 : lastGame?.player2
    return `${desc}\n勝者は「${winPlayer.name}」です。`
  } else {
    return desc
  }
}

const createHtml = (
  title: string,
  description: string,
  imageUrl: string,
  userId: string | undefined,
  tournamentId: string | undefined) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Uniqa</title>
    <meta property="og:title" content="${title}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:description"${description}" />
    <meta property="og:url" content="${DOMAIN}/ogp/user/${userId}/tournament/${tournamentId}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Uniqa" />
    <meta name="twitter:site" content="${DOMAIN}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:description" content="${description}" />
  </head>
  <body>For Twitter Bot</body>
</html>
`
}
