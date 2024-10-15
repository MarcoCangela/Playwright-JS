const {expect, test} = require('@playwright/test');
const {LoginPage} = require('./pageobjects/LoginPage');
const {DashboardPage} = require('./pageobjects/DashBoardPage');


test('Cleaning Code', async ({ page }) => {
    //js file- Login js, DashboardPage
    const username = "markill123@example.com";
    const password = "K1$$mm1234";
    const productName = 'IPHONE 13 PRO';
    const products = page.locator(".card-body");
    
    const loginPage = new LoginPage(page);
    await loginPage.gotoPage();
    await loginPage.validLogin(username,password);
    const dashBoardPage = new DashboardPage(page);
    await dashBoardPage.searchProductandAddCart(productName);
    await dashBoardPage.goToCart();


    // await page.locator("div li").first().waitFor();
    // await expect(page.getByText("IPHONE 13 PRO")).toBeVisible();
  
    // await page.getByRole("button",{name :"Checkout"}).click();
  
    // await page.getByPlaceholder("Select Country").pressSequentially("Moz");
  
    // await page.getByRole("button",{name :"Mozambique"}).nth(0).click();
    // await page.getByText("PLACE ORDER").click();
  
    // await expect(page.getByText("Thankyou for the order.")).toBeVisible();
 })