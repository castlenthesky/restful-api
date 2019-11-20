import * as crypto from 'crypto'
import { argon2i } from 'argon2-ffi'
import * as sanitizeHtml from 'sanitize-html'
import * as ipRegex from 'ip-regex'
import buildMakeSalt from './salt'
import buildMakeHash from './hash'

const makeSalt = buildMakeSalt({ crypto })
const makeHash = buildMakeHash({ argon2i, sanitizePassword, makeBuffer })

function sanitizePassword (password) {
  return sanitizeHtml(password)
}

function makeBuffer(string) {
  //returns a buffer from a utf-8 encoded string.
  return Buffer.from(string, 'utf8')
}

// import buildMakeSource from './source'
// import buildMakeUser from './user'

// const makeSource = buildMakeSource({ isValidIp })
// const makeUser = buildMakeUser({ Id, makeHash, sanitizePassword, makeSource })

// export default makeUser

function isValidIp (ip: string) {
  return ipRegex({ exact: true }).test(ip)
}



