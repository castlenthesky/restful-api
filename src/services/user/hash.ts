export default function buildMakeHash ({ argon2i, sanitizePassword, makeBuffer }) {
  return function makeHash (password: string, salt: string) {
    // TODO: Create a hashing proceedure.
    // Use Argon2 (https://www.npmjs.com/package/argon2-ffi) and cryptographically secure hashes.
    return argon2i.hash(sanitizePassword(password), makeBuffer(salt, 'utf8'))

  }
}
