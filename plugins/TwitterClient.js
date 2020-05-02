import axios from 'axios'

// FIXME: ts
const Twitter = class {
  constructor (apiKey, apiSecretKey, accessToken, accessTokenSecret) {
    this._apiKey = apiKey
    this._apiSecretKey = apiSecretKey
    this._accessToken = accessToken
    this._accessTokenSecret = accessTokenSecret
  }

  async get (url, params) {
    const query = this._percentEncodeParams(params).map(pair => pair.key + '=' + pair.value).join('&')
    const method = 'GET'
    const authorizationHeader = await this._getAuthorizationHeader(method, url, params)
    const headers = { Authorization: authorizationHeader }
    const response = await axios.get((!params ? url : url + '?' + query), { headers, data: {} })
    return response.json()
  }

  async post (url, params) {
    const data = {}
    params.forEach((p) => {
      data[p.key] = p.value
    })
    const query = this._percentEncodeParams(params).map(pair => pair.key + '=' + pair.value).join('&')
    const method = 'POST'
    const authorizationHeader = await this._getAuthorizationHeader(method, url, params)
    const headers = { Authorization: authorizationHeader }
    const response = await axios.post(url + '?' + query, null, { headers })
    return response.json()
  }

  async _getAuthorizationHeader (method, url, params) {
    // パラメータ準備
    const oauthParams = [
      { key: 'oauth_consumer_key', value: this._apiKey },
      { key: 'oauth_nonce', value: this._getNonce() },
      { key: 'oauth_signature_method', value: 'HMAC-SHA1' },
      { key: 'oauth_timestamp', value: this._getTimestamp() },
      { key: 'oauth_token', value: this._accessToken },
      { key: 'oauth_version', value: '1.0' }
    ]
    const allParams = this._percentEncodeParams([...oauthParams, ...params])
    this._ksort(allParams)
    // シグネチャ作成
    const signature = await this._getSignature(method, url, allParams)
    // 認証情報
    return 'OAuth ' + this._percentEncodeParams([...oauthParams, { key: 'oauth_signature', value: signature }]).map(pair => pair.key + '="' + pair.value + '"').join(', ')
  }

  async _getSignature (method, url, allParams) {
    const allQuery = allParams.map(pair => pair.key + '=' + pair.value).join('&')
    // シグネチャベース・キー文字列
    const signatureBaseString = [
      method.toUpperCase(),
      this._percentEncode(url),
      this._percentEncode(allQuery)
    ].join('&')
    const signatureKeyString = [
      this._apiSecretKey,
      this._accessTokenSecret
    ].map(secret => this._percentEncode(secret)).join('&')
    // シグネチャベース・キー
    const signatureBase = this._stringToUint8Array(signatureBaseString)
    const signatureKey = this._stringToUint8Array(signatureKeyString)
    // シグネチャ計算
    const signatureCryptoKey = await window.crypto.subtle.importKey('raw', signatureKey, { name: 'HMAC', hash: { name: 'SHA-1' } }, true, ['sign'])
    const signatureArrayBuffer = await window.crypto.subtle.sign('HMAC', signatureCryptoKey, signatureBase)
    return this._arrayBufferToBase64String(signatureArrayBuffer)
  }

  /**
   * RFC3986 仕様の encodeURIComponent
   */
  _percentEncode (str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, char => '%' + char.charCodeAt().toString(16))
  }

  _percentEncodeParams (params) {
    return params.map((pair) => {
      const key = this._percentEncode(pair.key)
      const value = this._percentEncode(pair.value)
      return { key, value }
    })
  }

  _ksort (params) {
    return params.sort((a, b) => {
      const keyA = a.key.toUpperCase()
      const keyB = b.key.toUpperCase()
      if (keyA < keyB) { return -1 }
      if (keyA > keyB) { return 1 }
      return 0
    })
  }

  _getNonce () {
    const array = new Uint8Array(32)
    window.crypto.getRandomValues(array)
    // メモ: Uint8Array のままだと String に変換できないので、Array に変換してから map
    return [...array].map(uint => uint.toString(16).padStart(2, '0')).join('')
  }

  _getTimestamp () {
    return Math.floor(Date.now() / 1000)
  }

  _stringToUint8Array (str) {
    return Uint8Array.from(Array.from(str).map(char => char.charCodeAt()))
  }

  _arrayBufferToBase64String (arrayBuffer) {
    const string = new Uint8Array(arrayBuffer).reduce((data, char) => {
      data.push(String.fromCharCode(char))
      return data
    }, []).join('')
    return btoa(string)
  }
}

export default Twitter
