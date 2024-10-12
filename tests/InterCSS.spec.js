const {test, expect} = require('@playwright/test');


test('Intercepting CSS with routes', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    //checking requests and responses made by the page
    page.on('request',request=> console.log(request.url()));

    page.on('response',response => console.log(response.url(), response.status()));


    page.route('**/*.css', route=>route.abort());

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("#username").fill('Marco Garujo');
    await page.locator("#password").fill('123456');
    const documentLink = page.locator("[href*='documents-request']");

    //Get the dropdown menu and then selecting the option
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Consultant");
    await page.locator(".radiotextsty").last().click();

    //Handle the Popup
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();
    await page.pause();

    //asserion to check attribute value on blinking text 
    await expect(documentLink).toHaveAttribute("class", "blinkingText");


    // await page.pause();

})

test("Screenshotting & Visual Comparison", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'elementSS.png'});
    await page.screenshot({path: 'screenshotBefore.png', fullPage: true});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshotAfter.png', fullPage: true});
    await expect(page.locator('#displayed-text')).toBeHidden();
})

test('Visual Testing', async ({page}) => {
    await page.goto("https://www.rediff.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
    
})