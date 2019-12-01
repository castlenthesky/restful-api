import makeUser from './index'

export default function makeUsersEndpoints ({ 
  // userList 
}) {
  return async function handle (httpRequest) {
    switch (httpRequest.method) {
      case 'GET':
        return getUsers(httpRequest)

      case 'POST':
        return postUsers(httpRequest)

      // case 'PUT':
      //   // return putUsers(httpRequest)

      // case 'PATCH':
      //   // return patchUsers(httpRequest)

      // case 'DELETE':
      //   // return deleteUsers(httpRequest)

      // default:
      //   return 'Error'
      //   // return makeHttpError({
      //   //   statusCode:504,
      //   //   errorMessage: `${httpRequest.method} method not allowed.`
      //   // })
    }
  }
}

async function getUsers (httpRequest) {
 return {
   headers: {
     'Content-Type': 'application/json'
   },
   statusCode: 200,
   data: JSON.stringify({
     username: 'castle',
     password: 'password'
    })
  }
}
//   const {id} = httpRequest.pathParams || {}
//   const { max, before, after } = httpRequest.queryParams || {}

//   const result = id
//     ? await contactList.findById({ userId: id})
//     : await contactList.getItems({ max, before, after })
//   return {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     statusCode: 200,
//     data: JSON.stringify(result)
//   }
// }

async function postUsers(httpRequest) {
  let userInfo = httpRequest.body
  console.log(userInfo)
  if (!userInfo.username || !userInfo.password || !userInfo.email) {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify({
        error: 'You dumb. You need a username, a password, and an email.'
      })
    }
  }
  const user = await makeUser({
    username: userInfo.username,
    email: userInfo.email,
    password: userInfo.password,
    role: userInfo.role,
    title: userInfo.title
  })
  console.log(user);
  return {
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: 200,
    data: JSON.stringify({
      username: user.getUsername(),
      email: user.getEmail(),
      salt: user.getSalt(),
      password: user.getPassword(),
      role: user.getRole(),
      title: user.getTitle(),
      createdOn: user.getCreatedOn()
    })
  }
  
  
}
