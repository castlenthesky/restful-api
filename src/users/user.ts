export default function buildMakeUser({ makeSalt, makeHash, isValidEmail}) {
  return async function makeUser ({
    username,
    email,
    password,
    salt = makeSalt(32),
    role = 'user',
    title = 'Aspiring Programmer',
    createdOn = Date.now(),
    modifiedOn = Date.now(),
  }: {
    username?: string,
    email?: string,
    password?: string,
    salt?: string,
    role?: string,
    title?: string,
    createdOn?: number,
    modifiedOn?: number,
  } = {}) {
    if (!username) {throw new Error('User must have a username defined.')}
    if (!email || isValidEmail(email) == false) {
      throw new Error('User must have a valid email for creation.')
    }
    if (!password || password.length < 6) {
      throw new Error('User must supply a password of at least 6 characters.')
    }
    if (!salt) {
      throw new Error('There was an error in the creation of a salt for the new user.')
    }
    if (!role) {role = 'user'}
    if (!title) {title = 'Aspiring Programmer'}
    if (!createdOn) {throw new Error('Created date must be defined.')}
    if (!modifiedOn) {throw new Error('Modified date must exist for a new user.')}

    const hash = await makeHash(password, salt)

    if (!hash) {
      throw new Error('There was an error hashing the new user\'s password.')
    }

    return Object.freeze({
      getUsername: () => username,
      getEmail: () => email,
      getPassword: () => hash,
      getSalt: () => salt,
      getRole: () => role,
      getTitle: () => title,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn,
    })
  }
}
