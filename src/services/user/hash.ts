export default function buildMakeHash ({ argon2i, sanitizePassword, makeBuffer }) {
  return async function makeHash (password: string, salt: string) {
    // Use Argon2 (https://www.npmjs.com/package/argon2-ffi) and cryptographically secure hashes.
    argon2i.hash(sanitizePassword(password), makeBuffer(salt, 'utf8')).then(hash => {
      return hash
    })

  }
}
