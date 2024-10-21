Feature: Ecommerce Validations
        @ValidationErrorScenarios

    Scenario Outline: Placing an order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        When Verify Error Message is displayed 

        Examples: 
        | username                |     password   |
        | markill123@example.com  | K1$$mm12345    |
        | test@email.com          | test           |
        | third@email.com         | Testing3rd     |