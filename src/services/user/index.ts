import * as crypto from 'crypto'
import { argon2i } from 'argon2-ffi';
import * as ipRegex from 'ip-regex'
import * as sanitizeHtml from 'sanitize-html'

import buildMakeHash from './hash'
import buildMakeSource from './source'
import buildMakeUser from './user'

const makeHash = buildMakeHash({ crypto, argon2i, sanitizePassword })
const makeSource = buildMakeSource({ isValidIp })
const makeUser = buildMakeUser({ Id, makeHash, sanitizePassword, makeSource })

export default makeUser

function isValidIp (ip) {
  return ipRegex({ exact: true }).test(i)
}

function sanitizePassword (password) {
  return sanitizeHtml(password)
}
