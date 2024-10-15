class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();

    }
   
    async searchProductandAddCart(productName) {
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        console.log(await this.products.count());
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator("[@id="products"]/div[1]/div[2]/div[3]/div/div/button[2]").click();
                break;
            }
        }
        return -1;

    }

    async goToCart() {
        await this.cart.click();
        await this.page.waitForLoadState("networkidle");
    }
}
module.exports = {DashboardPage}