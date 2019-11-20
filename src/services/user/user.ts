export default function buildMakeUser ({Id, crypto, argon2, sanitize, makeSource }) {
  return function makeUser ({
    id = Id.makeId(),
    username,
    email,
    salt,
    password,
    firstname,
    lastname,
    role = 'user',
    title = 'Aspiring Programmer',
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('User must have a valid ID.');
    }
    if (!username || username.length < 6) {
      throw new Error('New users must have a defined username of at least 6 characters.');
    }
    if (!email || !Validator.isValidEmail(email)) {
      throw new Error('User must provide a valid email for registration.')
    }
    if (!salt || salt.length < 32) {
      throw new Error('A salt must be provided for hashing a user\'s password.');
    }
    if (!password) {
      throw new Error('A salted and hashed password must be defined for the user.')
    }
    if (!firstname) {
      firstname = null,
    }
    if (!lastname) {
      lastname = null,
    }
    if (!role) {
      throw new Error('A user must have a defined role.');
    }
    if (!title) {
      throw new Error('All users must have a title.');
    }

    let hash

    return Object.freeze({
      getId: () => id,
      getUsername: () => username,
      getHash: () => hash,
      getSalt: () => salt,
      getCreatedOn: () => createdOn,
      getSource: () => source,
      getModifiedOn: () => modifiedOn,
      getRole: () => role,
      getTitle: () => title,
    })
  }
}
