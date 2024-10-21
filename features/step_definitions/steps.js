const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../tests/pageobjects/POManager");
const { expect } = require("@playwright/test");
const playwright = require("playwright");

Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);

    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.gotoPage();
    await loginPage.validLogin(username, password);
  }
);

When("Add {string} to Cart", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  this.dashBoardPage = this.poManager.getDashboardPage();
  await this.dashBoardPage.searchProductandAddCart(string);
  await this.dashBoardPage.gotoCart();
});

Then(
  "Verify {string} os displayed in the Cart",
  { timeout: 15 * 1000 },
  async function (string) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(string);
    await cartPage.Checkout();
  }
);

When(
  "Enter valid details and Place the Order",
  { timeout: 100 * 1000 },
  async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.page.locator("div li").first().waitFor();
    await expect(this.page.getByText("IPHONE 13 PRO")).toBeVisible();
    await this.page.getByRole("button", { name: "Checkout" }).click();
    await this.page.getByPlaceholder("Select Country").pressSequentially("Moz");
    await this.page.getByRole("button", { name: "Mozambique" }).nth(0).click();
    await this.page.getByText("PLACE ORDER").click();
  }
);

Then(
  "Verify order is present in the OrderHistory",
  { timeout: 100 * 1000 },
  async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashBoardPage.navigateToOrders();
    const OrderHistory = this.poManager.getOrderHistoryPage();
    await OrderHistory.VerifyOrderIsDisplayed();
  }
);

Given("a login to Ecommerce2 application with {string} and {string}",async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(string);
    await this.page.locator("[type='password']").fill(string2);
    await signIn.click();
  }
);

When("Verify Error Message is displayed", async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
