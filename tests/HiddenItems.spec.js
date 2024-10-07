const {test, expect} = require('@playwright/test');

test('Hidden Items', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator("#displayed-text")).toBeVisible();
    // await expect(page.locator("#hide-textbox")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();

})

test('Handle dialog', async ({page}) => {   
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await page.getByRole('button', { name: 'Confirm' }).click();

    page.on('dialog', dialog => dialog.accept());
    await page.pause();
    await page.locator('#mousehover').hover();
    await page.pause();
})

test.only('Handle iFrame', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.getByRole('link', { name: 'VIEW ALL COURSES' }).click();
})