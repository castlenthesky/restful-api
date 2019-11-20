export default function buildMakeSalt({ crypto }) {
  return function makeSalt(length) {
    // Returns a cryptographically secure salt for hashing.
    return crypto.randomBytes(length).toString('hex')
  }
}
