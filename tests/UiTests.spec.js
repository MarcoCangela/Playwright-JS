const {test, expect} = require('@playwright/test');

test('Landing Page Test', async ({page}) => {    
    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByPlaceholder('Password').fill('12345');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
    await page.getByRole('link', { name: 'Shop' }).click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await page.locator('app-card').filter({hasText: 'Blackberry'}).getByRole('button', { name: 'Add' }).click();
    await page.locator('//*[@id="navbarResponsive"]/ul/li/a').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');    
    await page.getByRole('button', { name: 'Checkout' }).click();

})