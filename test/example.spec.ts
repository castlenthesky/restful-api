import { expect } from "chai";
import { testFunction01, testFunction02 } from "./example";

describe("Example Tests", () => {
  describe("Basic Unit Test 01", () => {
    it("1 + 1 should equal 2", async () => {
      expect(await testFunction01(1, 1)).to.equal(2);
    });
    it("2 + 7 should equal 9", async () => {
      expect(await testFunction01(2, 7)).to.equal(9);
    });
  });

  describe("Subraction Function", () => {
    it("1 - 1 should equal zero", async () => {
      expect(await testFunction02(1, 1)).to.equal(0);
    });
    it("4 - 2 should equal 2", async () => {
      expect(await testFunction02(4, 2)).to.equal(2);
    });
  });
});
