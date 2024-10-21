const { After, Before, BeforeStep, AfterStep,Status } = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../tests/pageobjects/POManager");

Before(async function () {
  // Setting the common actions for scenarios
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    console.log("Test step failed");
    await this.page.screenshot({ path: "failire.png" });
  }
});

After(function () {
  console.log("Test execution completed!!!!");
});
