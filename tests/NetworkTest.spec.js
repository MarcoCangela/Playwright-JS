const { test, expect, request } = require("@playwright/test");

 const  userEmail = "markill123@example.com";
  const userPassword = "K1$$mm1234";

test.only("Security Test Request Intercept", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(userEmail);
  await page.getByPlaceholder("enter your passsword").fill(userPassword);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) =>
      await route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b',
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator('.blink_me')).toHaveText('You are not authorize to view this order');
});
