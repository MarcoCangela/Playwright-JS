const { test, expect, request } = require("@playwright/test");
const {APIUtils} = require('./../utils/APIUtils');

const loginPayload = {
  userEmail: "markill123@example.com",
  userPassword: "K1$$mm1234",
};
const orderPayload = {
  country: "Mozambique",
  productOrderedId: "6262e990e26b7e1a10e89bfa",
};

let response;
test.beforeAll(async () => {

  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("@API Login and order page validation", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  await page.pause();

//   const rows = await page.locator("tbody tr");

//   for (let i = 0; i < (await rows.count()); i++) {
//     const rowOrderId = await rows.nth(i).locator("th").textContent();
//     if (response.orderId.includes(rowOrderId)) {
//       await rows.nth(i).locator("button").first().click();
//       break;
//     }
//   }
//   const orderIdDetails = await page.locator(".col-text").textContent();
//   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});