import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Trailhead Coffee Checkout", () => {
  it("should display items, update total with quantity, and complete checkout", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: process.env.APP_URL || "https://nominated-convergence-prices-guy.trycloudflare.com",
    });

    const initialAssert = await testdriver.assert("Trailhead Coffee heading and House blend are visible with Total $18.00");
    expect(initialAssert).toBeTruthy();

    await testdriver.find("Quantity input field").click();
    await testdriver.pressKeys(["ctrl", "a"]);
    await testdriver.type("2");

    const totalAssert = await testdriver.assert("The total is $36.00 and quantity is 2");
    expect(totalAssert).toBeTruthy();

    await testdriver.find("Pay button").click();

    const orderAssert = await testdriver.assert("Order placed. status message is visible");
    expect(orderAssert).toBeTruthy();
  });
});
