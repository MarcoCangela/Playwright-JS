const {page, test} = require('@playwright/test');

test('Validacoes de datepicker e calendatios', async ({page}) => {

    const dia =  15;
    const monthNumber = 6;
    const year = '2027';
    const inputDate = [monthNumber,dia,year];


    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(monthNumber-1).click();
    await page.locator("//abbr[text()='"+dia+"']").click();

    const results = await page.locator(".react-date-picker__inputGroup input");
    for (let i = 0; i < results.length; i++) {
        const value = results[i].getAttribute('value');
        expect(value).toContain(inputDate[i]);
    }

})