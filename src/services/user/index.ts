import * as crypto from 'crypto'
import { argon2i } from 'argon2-ffi'
import * as sanitizeHtml from 'sanitize-html'
import * as ipRegex from 'ip-regex'

import buildMakeSalt from './salt'
import buildMakeHash from './hash'
// import buildMakeSource from './source'
// import buildMakeUser from './user'

const makeSalt = buildMakeSalt({ crypto })
const makeHash = buildMakeHash({ argon2i, sanitizePassword, makeBuffer })
// const makeSource = buildMakeSource({ isValidIp })
// const makeUser = buildMakeUser({ Id, makeHash, sanitizePassword, makeSource })


function makeUser({
    username
  } = {}) {
    if (!username) {
      throw new Error('A username must be defined.')
    }
   
    return Object.freeze({
     getUsername: () => username,
   })
 }

const user = makeUser({username: 'castle'});
console.log(user.getUsername());

function sanitizePassword (password) {
  return sanitizeHtml(password)
}

function makeBuffer(string) {
  //returns a buffer from a utf-8 encoded string.
  return Buffer.from(string, 'utf8')
}

// async function makeUser (
//   username: string,
//   password: string,
//   email: string,
//   salt: string,
//   firstname: string,
//   lastname: string,
//   role='user',
//   title='Aspiring Programmer',
//   createdOn = Date.now(),
//   modifiedOn = Date.now(),
//   ) {
//   const userRecord = {
//     username: username,
//     email: email,
//     salt: salt,
//     password: await makeHash(password, salt),
//     firstname: firstname,
//     lastname: lastname,
//     role: role,
//     title: title,
//     createdOn: createdOn,
//     modifiedOn: modifiedOn,
//   }
//   console.log(userRecord)
//   return userRecord
// }

// makeUser('castle', 'password','something@gmail.com', makeSalt(32), 'Brian', 'Henson', 'user', 'ia')

export default makeUser

function isValidIp (ip: string) {
  return ipRegex({ exact: true }).test(ip)
}



