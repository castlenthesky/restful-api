export default function buildMakeUser ({Id, crypto, argon2, sanitize, makeSource }) {
  return function makeUser ({
    id = Id.makeId(),
    username,
    hash,
    salt,
    createdOn = Date.now(),
    source,
    modifiedOn = Date.now(),
    role = 'user',
    title = 'Aspiring Programmer',
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error('User must have a valid ID.');
    }
    if (!username || username.length < 8) {
      throw new Error('New users must have a defined username of at least 8 characters.');
    }
    if (!hash || hash.length < 32) {
      throw new Error('Users must define a password which must be hashed.');
    }
    if (!salt) {
      throw new Error('A salt must be stored.')
    }
    if (!source) {
      throw new Error('Username must have a source.');
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
      getHash: () => hash || (hash = makeHash()),
      getSalt: () => salt,
      getCreatedOn: () => createdOn,
      getSource: () => source,
      getModifiedOn: () => modifiedOn,
      getRole: () => role,
      getTitle: () => title,
    })

    function makeHash() {
      return argon2()
    }
  }
}
