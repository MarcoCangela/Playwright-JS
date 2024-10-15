class LoginPage{

    constructor(page){
        this.page = page;
        this.signInButton = page.getByRole('button',{name:"Login"});
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');

    }

    async gotoPage(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');

    }

    
}

module.exports = {LoginPage};