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

    test.skip('Registering and logging in', async  ({ browser }) => {
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


    test('Login Only', async ({page}) => {
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator("#userEmail").fill("markill123@example.com");
        await page.locator("#userPassword").fill("K1$$mm1234");
        await page.locator("[value='Login']").click();

        //applying wait mechanisms to ensure that the content is not empty on titles variable
        await page.waitForLoadState('networkidle');
        //waiting fot the element to be filled 
        // await page.locator(".card-body b").waitFor(); 
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
        await page.pause();
    });
        

    test('UIControl', async ({page}) => {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const username = page.locator("#username");
        const password = page.locator("#password");
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

        //asserion to check attribute value on blinking text 
        await expect(documentLink).toHaveAttribute("class", "blinkingText");


        // await page.pause();

    })

    test('Child Windows and other Tabs', async ({browser}) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink = page.locator("[href*='documents-request']");
        // const page2 = await context.waitForEvent('page');

        const [newPage] = await Promise.all([
           context.waitForEvent('page'),
           documentLink.click()
        ]);

        const text = await newPage.locator(".red").textContent();
        await newPage.close();

        let newUsername = text.split('@')[1].trim();
        newUsername = newUsername.split(" ")[0].trim();

        await page.locator("#username").type(newUsername);
        await page.locator("#password").type("12345");
        await page.locator("#terms").check();
        await page.locator("#signInBtn").click();
        await page.pause();

    })