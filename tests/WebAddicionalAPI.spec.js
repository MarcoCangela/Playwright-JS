const { expect, test } = require("@playwright/test");
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("markill123@example.com");
  await page.locator("#userPassword").fill("K1$$mm1234");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  await browser.newContext({ storageState: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("Login with context passed to page", async ({}) => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  await page.pause();
});
