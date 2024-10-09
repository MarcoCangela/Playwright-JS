class APIUtils {
    
    
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    
    async getToken(){
        const loginReponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.loginPayload }
          );
          let responseBody = await loginReponse.json();
          const token = responseBody.token;
          console.log(token);
          return token;
    }
    
    async createOrder(orderPayload){
        const response = {};
        response.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
              data: orderPayload,
              headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
              },
            }
          );
            const orderResponseJson = await createOrderResponse.json();
            console.log(orderResponseJson);
            const orderId = orderResponseJson[0];
            response.orderId = orderId;
            return response;
    }

}

module.exports = {APIUtils};