// Add test anotation for playwright 
const {test, expect} = require('@playwright/test');

    test('basic test with browser', async ({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        console.log("page title is "+await page.title());

        //Constructing selectors
        await page.locator('#username').fill('MarcoGarujo');
        await page.locator('#password').fill('123456');
        await page.locator('#terms').check();
        await page.locator('#signInBtn').click();
        // await page.locator("[style*='block']")
        
        await page.pause();

        await page.close();
        await browser.close();
    });

    test('basic page test', async ({page}) => {
        await page.goto("https://google.com");
        console.log("page title is "+await page.title());
        console.log("page url is "+await page.url());
        await expect(page).toHaveTitle("Google");
        // console.log("page source is "+await page.content());
        await page.close();

    });