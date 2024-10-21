Feature: Ecommerce Validations
    Scenario: Placing an order
        Given a login to Ecommerce application with "markill123@example.com" and "K1$$mm1234"
        When Add "PHONE 13 PRO" to Cart
        Then Verify "PHONE 13 PRO" os displayed in the Cart
        When Enter valid details and Place the Order 
        Then Verify order is present in the OrderHistory