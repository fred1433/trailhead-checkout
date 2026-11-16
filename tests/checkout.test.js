import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Checkout promo code", () => {
  it("applies promo code and verifies discount", async (context) => {
    const testdriver = TestDriver(context);
    const url = process.env.TEST_URL || "https://displays-loans-cologne-priority.trycloudflare.com";

    await testdriver.provision.chrome({ url });

    await testdriver.find("Promo code input field").click();
    await testdriver.type("TRAIL10");
    await testdriver.find("Apply button").click();

    const discountAssert = await testdriver.assert("the discount is -$1.80 and the total is $16.20");
    expect(discountAssert).toBeTruthy();

    await testdriver.find("Pay button").click();

    const orderAssert = await testdriver.assert("the status text says \"Order placed.\"");
    expect(orderAssert).toBeTruthy();
  });
});
