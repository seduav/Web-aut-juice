import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegistrationPage } from "../pageObjects/RegistrationPage";
import { BasketPage } from "../pageObjects/BasketPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionsPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";
import { SavedAddressesPage } from "../pageObjects/SavedAddressesPage";
import { CreateAddressPage } from "../pageObjects/CreateAddressPage";
import { SavedPaymentMethodsPage } from "../pageObjects/SavedPaymentMethodsPage";

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      HomePage.accountButton.click();
      HomePage.loginButton.click();
      LoginPage.emailField.type("demo");
      LoginPage.passwordField.type("demo");
      LoginPage.loginButton.click();
      HomePage.accountButton.click();
      HomePage.userProfileMenuButton.should("contain.text", "demo");
    });

    it("Registration", () => {
      HomePage.accountButton.click();
      HomePage.loginButton.click();
      LoginPage.notYetCustomerLink.click();
      const emailNumber = Math.floor(Math.random() * 101);
      const email = "email_" + emailNumber.toString() + "@ebox.com";
      const password = "randomPassword123#";
      RegistrationPage.emailField.type(email);
      RegistrationPage.passwordField.type(password);
      RegistrationPage.repeatPasswordField.type(password);
      RegistrationPage.securityQuestionField.click();
      RegistrationPage.menuOptions.contains("Your favorite book?").click();
      RegistrationPage.answerField.type("ABC123");
      RegistrationPage.registerButton.click();
      LoginPage.emailField.type(email);
      LoginPage.passwordField.type(password);
      LoginPage.loginButton.click();
      HomePage.accountButton.click();
      HomePage.userProfileMenuButton.should("contain.text", email);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
      HomePage.searchIcon.click();
      HomePage.searchField.type("Lemon{enter}");
      HomePage.productBox.contains("Lemon Juice (500ml)").click();
      HomePage.productBoxContent.should("contain.text", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate Lemon, while having multiple cards", () => {
      HomePage.searchIcon.click();
      HomePage.searchField.type("500ml{enter}");
      HomePage.productBox.contains("Lemon Juice (500ml)").click();
      HomePage.productBoxContent.should("contain.text", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate cards", () => {
      HomePage.searchIcon.click();
      HomePage.searchField.type("500ml{enter}");
      HomePage.productBox.contains("Eggfruit Juice (500ml)").click();
      HomePage.productBoxContent.should("contain.text", "Now with even more exotic flavour.");
      HomePage.productCloseButton.click();
      HomePage.searchIcon.click();
      HomePage.productBox.contains("Lemon Juice (500ml)").click();
      HomePage.productBoxContent.should("contain.text", "Sour but full of vitamins.");
      HomePage.productCloseButton.click();
      HomePage.searchIcon.click();
      HomePage.productBox.contains("Strawberry Juice (500ml)").click();
      HomePage.productBoxContent.should("contain.text", "Sweet & tasty!");
    });

    it("Read a review", () => {
      HomePage.searchIcon.click();
      HomePage.searchField.type("King{enter}");
      HomePage.productBox.contains("OWASP Juice Shop \"King of the Hill\" Facemask").click();
      HomePage.reviewsButton.click();
      HomePage.productBoxContent.should("contain.text", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
    });

    it("Add a review", () => {
      HomePage.searchIcon.click();
      HomePage.searchField.type("Raspberry{enter}");
      HomePage.productBox.contains("Raspberry Juice (1000ml)").click();
      HomePage.typeInReview.click().type("Tastes like metal");
      HomePage.submitButton.click();
      HomePage.reviewsButton.click();
      HomePage.productBoxContent.should("contain.text", "Tastes like metal")
    });

    it("Validate product card amount", () => {
      HomePage.productBox.should("have.length", 12);
      HomePage.matSelect.click();
      HomePage.matOption.contains("24").click();
      HomePage.productBox.should("have.length", 24);
      HomePage.matSelect.click();
      HomePage.matOption.contains("36").click();
      HomePage.productBox.should("have.length", 36);
    });

    it("Buy Girlie T-shirt", () => {
      HomePage.searchIcon.click();
      HomePage.searchField.type("Girlie{enter}");
      HomePage.addToBasket.click();
      HomePage.basketButton.click();
      BasketPage.checkoutButton.click();
      SelectAddressPage.selectAddreses.contains("United Fakedom").click();
      SelectAddressPage.continueButton.click();
      DeliveryMethodPage.deliveryOptions.contains("Standard Delivery").click();
      DeliveryMethodPage.continueButton.click();
      PaymentOptionsPage.paymentOptions.contains("************5678").parent().find(".mat-mdc-radio-button").click();
      PaymentOptionsPage.continueButton.click();
      OrderSummaryPage.placeYourOrderAndPay.click();
      OrderCompletionPage.confirmation.should("contain.text", "Thank you for your purchase!")
    });

    it("Add address", () => {
      HomePage.accountButton.click();
      HomePage.ordersAndPayment.click();
      HomePage.savedAddresses.click();
      SavedAddressesPage.addANewAdressButton.click();
      CreateAddressPage.addCountry.type("India");
      CreateAddressPage.addName.type("Homeworkenjoyer");
      CreateAddressPage.addMobileNumber.type("12345678");
      CreateAddressPage.addZipCode.type("6666");
      CreateAddressPage.addAddress.type("Somewhere in india");
      CreateAddressPage.addCity.type("New Delhi");
      CreateAddressPage.addState.type("Delhi");
      CreateAddressPage.submitButton.click();
      SavedAddressesPage.checkAddress.should("contain.text", "Somewhere in india");
    });

    it("Add payment option", () => {
      HomePage.accountButton.click();
      HomePage.ordersAndPayment.click();
      HomePage.savedPayments.click();
      SavedPaymentMethodsPage.addNewCard.click();
      SavedPaymentMethodsPage.fillInName.click().type("Great name");
      SavedPaymentMethodsPage.fillInCardNumber.click().type("1234567890123456");
      SavedPaymentMethodsPage.setMonth.select("7");
      SavedPaymentMethodsPage.setYear.select("2090");
      SavedPaymentMethodsPage.submitButton.click();
      HomePage.accountButton.click();
      HomePage.ordersAndPayment.click();
      HomePage.savedPayments.click();
      SavedPaymentMethodsPage.cardsList.should("contain.text", "3456");
    });
  });
});