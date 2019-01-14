const fs = require('fs')
const { google } = require('googleapis')

const OAuth2 = google.auth.OAuth2
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly']
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'
const TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json'

function getCredentials() {
  return JSON.parse(fs.readFileSync('client_secret.json'))
}

function getAuth() {
  const credentials = getCredentials()
  const clientSecret = credentials.installed.client_secret
  const clientId = credentials.installed.client_id
  const redirectUrl = credentials.installed.redirect_uris[0]
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl)

  const token = fs.readFileSync(TOKEN_PATH)
  oauth2Client.credentials = JSON.parse(token)
  return oauth2Client
}

const videoId = 'CrpbOUglg7o'

function getCaptions(videoId) {
  const auth = getAuth()
  const service = google.youtube('v3')
  const params = {
    auth: auth,
    videoId: videoId,
    part: 'snippet',
  }

  service.captions.list(params, (err, resp) => {
    if (err) {
      console.log(err.name, ': ', err.message)
      return
    }
    console.log(resp)
  })
}

getCaptions(videoId)