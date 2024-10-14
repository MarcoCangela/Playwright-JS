const {expect, test} = require('@playwright/test');
const {LoginPage} = require('./pageobjects/LoginPage');


test('Cleaning Code', async ({ page }) => {
    //js file- Login js, DashboardPage
    const username = "markill123@example.com";
    const password = "K1$$mm1234";
    const productName = 'IPHONE 13 PRO';
    const products = page.locator(".card-body");
    
    const loginPage = new LoginPage(page);
    loginPage.gotoPage();
    loginPage.validLogin(username,password);


    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"IPHONE 13 PRO"})
    .getByRole("button",{name:"Add to Cart"}).click();
  
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
  
    //await page.pause();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("IPHONE 13 PRO")).toBeVisible();
  
    await page.getByRole("button",{name :"Checkout"}).click();
  
    await page.getByPlaceholder("Select Country").pressSequentially("Moz");
  
    await page.getByRole("button",{name :"Mozambique"}).nth(0).click();
    await page.getByText("PLACE ORDER").click();
  
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
 })