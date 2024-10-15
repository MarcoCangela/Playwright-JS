const {expect, test} = require('@playwright/test');
const {POManager} = require('./pageobjects/POManager');


test('Cleaning Code', async ({ page }) => {
    const poManager = new POManager(page);
   
    const username = "markill123@example.com";
    const password = "K1$$mm1234";
    const productName = 'Zara Coat 4';
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.gotoPage();
    await loginPage.validLogin(username, password);
    const dashBoardPage = poManager.getDashboardPage();
    await dashBoardPage.searchProductandAddCart(productName);
    await dashBoardPage.gotoCart();

    // const cartPage = poManager.getCartPage();
    // await cartPage.VerifyProductIsDisplayed(productName);
    // await cartPage.Checkout();

    

   


    // await page.locator("div li").first().waitFor();
    // await expect(page.getByText("IPHONE 13 PRO")).toBeVisible();
  
    // await page.getByRole("button",{name :"Checkout"}).click();
  
    // await page.getByPlaceholder("Select Country").pressSequentially("Moz");
  
    // await page.getByRole("button",{name :"Mozambique"}).nth(0).click();
    // await page.getByText("PLACE ORDER").click();
  
    // await expect(page.getByText("Thankyou for the order.")).toBeVisible();
 })