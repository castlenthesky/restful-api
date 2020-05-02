import {passwordHasher} from '../../common/helpers/passwordTools'

export async function createUser (userData: {
  username: string;
  password: string;
  email: string;
  firstname?: string;
  lastname?: string;
  role?: string;
  title?: string;
  createdAt?: string;
  modifiedAt?: string;
}) {
  return await Object.freeze({
    username: userData.username,
    password: await passwordHasher(userData.password),
    email: userData.email,
    firstname: userData.firstname || null,
    lastname: userData.lastname || null,
    role: userData.role || 'user',
    title: userData.title || 'aspiring developer',
  })
}
