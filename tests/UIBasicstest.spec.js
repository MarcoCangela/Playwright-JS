// Add test anotation for playwright 
const {test, expect} = require('@playwright/test');

    test('basic test with browser', async ({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://google.com/");

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