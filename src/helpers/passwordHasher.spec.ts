import { expect } from "chai";
import { isValidPassword, passwordHash, passwordCheck } from "./passwordHasher";

describe("Password Hashing Functions:", () => {
  describe("isValidPassword()", () => {
    it("should only accept valid usernames", async () => {
      // expect(isValidPassword("password")).to.be.false;
      // expect(isValidPassword("ThisIsValid1234")).to.be.true;
    });
  });

  describe("passwordHash()", async () => {
    it("should return a hashed and salted password given a string", async () => {
      // test criteria here
      // expect(await isValidPassword("myPassword")).to.be.true;
    });
  });

  describe("passwordCheck()", async () => {
    it("should only validate passwords that match their salted hash", async () => {
      // expect("need to create test").to.be.true;
    });
  });
});
