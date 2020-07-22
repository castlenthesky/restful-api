import { expect } from "chai";
import { isValidUsername } from "./userFunctions";
import { isValidPassword } from "../../helpers/index";

describe("User Creation Tests", () => {
  describe("isValidUsername()", () => {
    it("should only accept valid usernames", async () => {
      expect(isValidUsername("dingledonkus")).to.be.true;
      expect(isValidUsername("short")).to.be.false;
      expect(isValidUsername("thisUsernameIsJuustRight")).to.be.true;
      expect(isValidUsername("thisusernameiswaytooloong")).to.be.false;
      expect(isValidUsername("this has spaces")).to.be.false;
      expect(isValidUsername("not$alpha&numeric")).to.be.false;
      expect(isValidUsername("this-has-dashes")).to.be.true;
      expect(isValidUsername("this.has.periods")).to.be.true;
    });
  });

  describe("isValidPassword()", async () => {
    it("should only accept valid passwords", async () => {
      // test criteria here
      expect(await isValidPassword("myPassword")).to.be.true;
    });
  });
});
