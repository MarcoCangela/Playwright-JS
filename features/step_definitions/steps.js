const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../tes");
const {expect} = require('@playwright/test');
const playwright = require('playwright');


Given("a login to Ecommerce application with {string} and {string}", async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(page);

    const products = page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.gotoPage();
    await loginPage.validLogin(username,password);
  }
);

When("Add {string} to Cart", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  this.dashBoardPage = this.poManager.getDashboardPage();
  await dashBoardPage.searchProductandAddCart(string);
  await dashBoardPage.gotoCart();

});

Then("Verify {string} os displayed in the Cart", async function (string) {
  // Write code here that turns the phrase above into concrete actions

  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(string);
  await cartPage.Checkout();
});

When("Enter valid details and Place the Order",async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.page.locator("div li").first().waitFor();
  await expect(this.page.getByText("IPHONE 13 PRO")).toBeVisible();
  await this.page.getByRole("button",{name :"Checkout"}).click();
  await this.page.getByPlaceholder("Select Country").pressSequentially("Moz");
  await this.page.getByRole("button",{name :"Mozambique"}).nth(0).click();
  await this.page.getByText("PLACE ORDER").click();
});

Then("Verify order is present in the OrderHistory",async function () {
  // Write code here that turns the phrase above into concrete actions
    await this.dashBoardPage.navigateToOrders();
    const OrderHistory = this.poManager.getOrderHistoryPage();
    await OrderHistory.VerifyOrderIsDisplayed();
});
