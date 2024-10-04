// Add test anotation for playwright 
const {test, expect} = require('@playwright/test');

    test('Invalid Login test with browser', async ({browser}) => {
        const context = await browser.newContext(); 
        const page = await context.newPage();


        const username = page.locator('#username');
        const password = page.locator('#password');
        const signInButton = page.locator('#signInBtn');
        const cards = page.locator(".card-body a");

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        console.log("page title is "+await page.title());

        //Constructing selectors
        await username.fill('MarcoGarujo');
        await password.fill('123456');
        await page.locator('#terms').check();
        await signInButton.click();
        console.log(await page.locator("[style*='block']").textContent());

        //Write an assertion to ensure that the user is not allowed to login with invalid credentials
        await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
        
        await username.fill('rahulshettyacademy');
        await password.fill('learning');
        await signInButton.click();
        console.log(await cards.nth(1).textContent());
        console.log(await cards.first().textContent());
        // all element titles 
        console.log(typeof await cards.allTextContents());
        console.log(await cards.allTextContents());
        // await page.pause();

        await page.close();
        await browser.close();
    });

    test('Valid Login test with browser', async ({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

        console.log("page title is "+await page.title());

        //Constructing selectors
        await page.locator('#username').fill('rahulshettyacademy');
        await page.locator('#password').fill('123456');
        await page.locator('#terms').check();
        await page.locator('#signInBtn').click();
        console.log(await page.locator("[style*='block']").textContent());
      
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

    test('Registering and logging in', async  ({ browser }) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const firstName = await page.locator("#firstName");
            const lastName = await page.locator("#lastName");
            const email =  await page.locator("#userEmail");
            const phoneNumber = await page.locator("#userMobile");
            const password = await page.locator("#userPassword");
            const confirmPassword = await page.locator("#confirmPassword");
            const registerButton = await page.locator("#login");

            await page.goto('https://rahulshettyacademy.com/client');
            await page.locator("body > app-root > app-login > div.banner > section:nth-child(2) > div > div.login-wrapper.my-auto.p-5 > p > a").click();

            await firstName.fill('Mars');
            await lastName.fill('Garujo');
            await email.fill('markill123@example.com');
            await phoneNumber.fill('9202830234');
            await password.fill('K1$$mm1234');
            await confirmPassword.fill('K1$$mm1234');
            await registerButton.click();
            await page.getByRole('checkbox').check();
            await page.getByRole('button', { name: 'Register' }).click();
        
            //login after 
            await page.getByRole('button', { name: 'Login' }).click();
            await page.getByPlaceholder('email@example.com').fill('markill123@example.com');
            await page.pause();
            await password.fill('K1$$mm1234');
            await page.getByRole('button', { name: 'Login' }).click();
            await page.pause();
        });