class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.titles = page.locator(".card-body b");
    }
    async gotoPage(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}
module.exports = {DashboardPage}