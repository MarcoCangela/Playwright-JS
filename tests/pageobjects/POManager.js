const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashBoardPage');
const {OrdersHistoryPage} = require('./OrderHistoryPage');
const {OrdersReviewPage} = require('./OrderReviewPage');
const {CartPage} = require('./CartPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  getLoginPage(){
      return this.loginPage;
  }
  getCartPage(){
      return this.cartPage;
  }
  
  getDashboardPage(){
      return this.dashboardPage;
  }
  getOrdersHistoryPage(){
      return this.ordersHistoryPage;
  }
  
  getOrdersReviewPage(){
      return this.ordersReviewPage;
  }
}

module.exports = {POManager}