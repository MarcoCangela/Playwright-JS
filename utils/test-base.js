const base = require('@playwright/test');

exports.customTest = base.test.extend({
   testDataForOrder : {
      username : "markill123@example.com",
      password : "K1$$mm1234", 
      productName : "Zara Coat 4" 
   }
      

})