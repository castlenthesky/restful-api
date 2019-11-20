export default function buildMakeSource ({ isValidIp }) {
  return function makeSource ({ ip, browser, referrer } = {}) {
    if (!ip) {
      throw new Error('User source must contain an IP address.')
    }
    if (!isValidIp(ip)) {
      throw new RangeError('User source must contain a valid IP address.')
    }
    return Object.freeze({
      getIp: () => ip,
      getBrowser: () => browser,
      getReferrer: () => referrer
    })
  }
}
