import * as argon2 from "argon2";
import * as sanitizeHtml from "sanitize-html";

export async function isValidPassword(
  passwordString: string
): Promise<boolean> {
  // Implement valid password criteria
  return true;
}

// Argon2 was selected for a hashing algorithm due to its security.
// Read more here: https://password-hashing.net/
export async function passwordHash(providedPassword: string) {
  try {
    return await argon2.hash(sanitizeHtml(providedPassword), {
      type: argon2.argon2i,
      // Argon2i is the suggested variant to use for password hashing.
      // See: https://github.com/ranisalt/node-argon2/wiki/Options#type
      // While Argon2i is the default, it is explicitly selected here for the purpose
      // of demonstrating a concious design-choice relating to password security.
    });
  } catch (err) {
    throw new Error("Error creating password hash: " + err);
  }
}

export async function passwordCheck(
  providedHash: string,
  providedPassword: string
): Promise<boolean> {
  try {
    return await argon2.verify(providedHash, providedPassword);
  } catch (err) {
    console.log(err);
    return false;
  }
}
