var aes = require('aes-js')
var crypto = require('crypto')

module.exports = {encrypt, decrypt}

function encrypt (key, iv, payload) {
  var data = []
  Object.keys(payload).forEach(key => {
    data.push(`${key}=${encodeURIComponent(payload[key])}`)
  })
  // eslint-disable-next-line new-cap
  var cbc = new aes.ModeOfOperation.cbc(Buffer.from(key), Buffer.from(iv))
  var info = aes.utils.hex.fromBytes(cbc.encrypt(aes.utils.utf8.toBytes(padding(data.join('&')))))
  var sha = crypto.createHash('sha256')
    .update(`HashKey=${key}&${info}&HashIV=${iv}`)
    .digest('hex')
    .toUpperCase()

  return {
    TradeInfo: info,
    TradeSha: sha
  }
}

function decrypt (key, iv, data) {
  // eslint-disable-next-line new-cap
  var cbc = new aes.ModeOfOperation.cbc(Buffer.from(key), Buffer.from(iv))
  var encryptedBytes = aes.utils.hex.toBytes(data)
  var decryptedBytes = cbc.decrypt(encryptedBytes)
  var plaintext = aes.utils.utf8.fromBytes(decryptedBytes)
  return removePadding(plaintext)
}

function removePadding (plaintext) {
  var len = 0
  for (var i = plaintext.length - 1; i >= 0; i--) {
    if (plaintext[i] === '}') break
    len++
  }

  return plaintext.substr(0, plaintext.length - len)
}

function padding (str) {
  var len = str.length
  var pad = 32 - (len % 32)
  str += String.fromCharCode(pad).repeat(pad)
  return str
}
