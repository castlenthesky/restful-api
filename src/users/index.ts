import { argon2i } from 'argon2-ffi'
import * as crypto from 'crypto'
import sanitizeHtml from 'sanitize-html'
import buildMakeUser from './user'

const makeUser = buildMakeUser({makeSalt, makeHash, isValidEmail})

export default makeUser

function sanitize (text) {
  return sanitizeHtml (text, {
    // additional options
  })
}

function isValidEmail (email) {
  // TODO: create email validation test
  return true
}

function makeSalt() {
  return crypto.randomBytes(32).toString('hex')
}

function makeBuffer(string) {
  return Buffer.from(string, 'utf-8')
}

async function makeHash(password, salt) {
  return await argon2i.hash(password, makeBuffer(salt))
}
