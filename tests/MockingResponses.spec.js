const { test, expect, request } = require("@playwright/test");
const {APIUtils} = require("../utils/APIUtils");

const loginPayload = {
  userEmail: "markill123@example.com",
  userPassword: "K1$$mm1234",
};
const orderPayload = {
  country: "Mozambique",
  productOrderedId: "6262e990e26b7e1a10e89bfa",
};

const mockedResponse = {
    data: [],
    message: "No orders"
}

let response;
test.beforeAll(async () => {

  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test.only("Mocking a Response to the server", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  
  await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67005e8aae2afd4c0b8f787c', async route => {
      //intercepting the response and mocking the response
     const serverResponse = await page.request.fetch(route.request());
     //Passing the mocked response to the browser
     let body = JSON.stringify(mockedResponse);
      route.fulfill({
        serverResponse,
        body,
      })
  })

  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67005e8aae2afd4c0b8f787c')
  console.log(await page.locator(".mt-4").textContent());

  
});