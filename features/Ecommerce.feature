Feature: Ecommerce Validations

    Scenario: Placing an order
        Given a login to Ecommerce application with "markill123@example.com" and "K1$$mm1234"
        When Add "Zara Coat 4" to Cart
        Then Verify "Zara Coat 4" os displayed in the Cart
        When Enter valid details and Place the Order 
        Then Verify order is present in the OrderHistory