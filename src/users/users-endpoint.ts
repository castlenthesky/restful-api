import makeUser from './user'

export default function makeUsersEndpointHandler ({ userList }) {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return getUser(httpRequest)

      case 'POST':
        return postUsers(httpRequest)

      case 'PUT':
        return putUsers(httpRequest)

      case 'PATCH':
        return patchUsers(httpRequest)

      case 'DELETE':
        return deleteUsers(httpRequest)

      default:
        return makeHttpError({
          statusCode:504,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    }
  }
}

async function getUsers (httpRequest) {
  const {id} = httpRequest.pathParams || {}
  const { max, before, after } = httpRequest.queryParams || {}

  const result = id
    ? await contactList.findById({ userId: id})
    : await contactList.getItems({ max, before, after })
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: 200,
    data: JSON.stringify(result)
  }
}

async function postUser (httpRequest) {
  let userInfo = httpRequest.body
  if (!userInfo) {
    return makeHttpError({
      statusCode: 400,
      errorMessage: 'Bad request. No POST body.'
    })
  }
  if (typeof httpRequest.body === 'string') {
    try {
      userInfo = JSON.parse(userInfo)
    } catch {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. POST body must be valid JSON.'
      })
    }
    try {
      const user = makeUser(userInfo)
      const result = await userList.add(user)
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        data: JSON.stringify(result)
      }
    } catch (e) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. POST body must be valid JSON.'
      })
    }
  }
}
