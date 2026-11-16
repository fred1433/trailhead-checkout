import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Promo code discount stacking regression", () => {
  it("keeps discount at -$1.80 and total at $16.20 when Apply is clicked a second time", async (context) => {
    const testdriver = TestDriver(context);
    const url = process.env.TEST_URL || "https://accountability-dictionary-thereafter-video.trycloudflare.com";

    await testdriver.provision.chrome({ url });

    await testdriver.find("Promo code input field").click();
    await testdriver.type("TRAIL10");
    await testdriver.find("Apply button").click();
    await testdriver.find("Apply button").click();

    const assertResult = await testdriver.assert("the discount is -$1.80 and the total is $16.20");
    expect(assertResult).toBeTruthy();
  });
});
