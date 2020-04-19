import passwordHasher from '../../common/passwordHasher'
import { createUser } from './user'

createUser(passwordHasher , {username: 'castlenthesky', password: 'password', email: 'castlenthesky@gmail.com'})
  .then(user => console.log(user))
