// Add test anotation for playwright
const { test, expect } = require("@playwright/test");

test("Making an order", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const productName = "IPHONE 13 PRO";
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("#userEmail").fill("markill123@example.com");
  await page.locator("#userPassword").fill("K1$$mm1234");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();
//   console.log(titles);

  for (let i = 0; i < (await products.count()); i++) {
    if (productName === (await products.nth(i).locator("b").textContent())) {
      //add to cart
      await products.nth(i).locator("text=Add To Cart").click();
      break;
    }
    if (i == (await products.count()) - 1) {
      console.log("Product not found");
    }
  }
  await page.getByRole('button', { name: '   Cart' }).click();

//   await page.locator("routerlink*='cart'").click();
  await page.locator("div li").first().waitFor();
  //   await page.locator("text=Checkout").click();
  expect(
    await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible()
  ).toBeTruthy();
  await page.getByText("Checkout").click();
await page.locator("[placeholder*='Country']").pressSequentially("Moza");
const countriesList = page.locator(".ta-results");
await countriesList.waitFor();

for (let i= 0; i < (await countriesList.count()); i++) {
  if (await countriesList.nth(i).textContent() === " Mozambique") {
    await countriesList.nth(i).click();
    break;
  }
}
await expect(page.locator(".user__name [type='text']").first()).toHaveText("markill123@example.com");
await page.locator('input[type="text"]').nth(1).fill("232");
await page.locator('input[type="text"]').nth(2).fill("Marco Garujo");

await page.getByText('Place Order').click();

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();

const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); 
console.log(orderId);

await page.getByRole('button', { name: ' HOME' }).click();
await page.getByRole('button', { name: '   ORDERS' }).click();



await page.pause();

});
