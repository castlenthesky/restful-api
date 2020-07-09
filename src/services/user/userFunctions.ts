import { passwordHash } from "../../helpers";
import * as shortid from "short-id";

export function isValidUsername(string: string): boolean {
  const hasSpace = RegExp(/\s/i);
  if (hasSpace.test(string) == true) {
    return false;
  }
  const isValidString = RegExp(/^[a-z][A-Z0-9_.-]{6,23}$/i);
  return isValidString.test(string);
}

enum UserRole {
  user,
  manager,
  administrator,
  developer,
  superuser,
}

export interface IUserData {
  username: string;
  password: string;
  email: string;
  firstname?: string;
  lastname?: string;
  role?: string;
  title?: string;
  avatarURL?: string;
}

export async function createUser(userData: IUserData) {
  return Object.freeze({
    _id: shortid.generate(),
    username: userData.username,
    password: await passwordHash(userData.password),
    email: userData.email,
    role: userData.role || "user",
    title: userData.title || "aspiring developer",
    avatarURL:
      userData.avatarURL || "http://www.somedomain.com/imageaddress.png",
    firstname: userData.firstname || null,
    lastname: userData.lastname || null,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  });
}

// export class User {
//   public username: string;
//   constructor({ username, password, firstname = "turd", ...others }) {
//     this.username = username;
//   }
// }

// export class User {
//   public username: string;
//   constructor(...args) {
//     this.username = username;
//   }
// }
