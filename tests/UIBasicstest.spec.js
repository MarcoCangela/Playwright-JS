// Add test anotation for playwright 
const {test} = require('@playwright/test');

test('basic test', async (browser) => {
//writing tests for chrome using chromium 
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    expect(await page.title()).toBe('Google');
    await page.close();

})