import { BasePage } from "../pageObjects/basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }

  static get accountButton() {
    return cy.get("#navbarAccount");
  }

  static get loginButton() {
    return cy.get("#navbarLoginButton");
  }

  static get userProfileMenuButton() {
    return cy.get("button[aria-label='Go to user profile']");
  }

  static get searchIcon() {
    return cy.get("#searchQuery");
  }

  static get searchField() {
    return cy.get("#searchQuery input");
  }

  static get productBox() {
    return cy.get("div.mdc-card");
  }

  static get productBoxContent() {
    return cy.get("[id*='mat-mdc-dialog-']");
  }

  static get productCloseButton() {
    return cy.get("[aria-label='Close Dialog']")
  }

  static get reviewsButton() {
    return cy.get("mat-expansion-panel").contains("Reviews");
  }

  static get typeInReview() {
    return cy.get("[aria-label='Text field to review a product']");
  }

  static get submitButton() {
    return cy.get("#submitButton");
  }

  static get matSelect() {
    return cy.get("mat-select");
  }

  static get matOption() {
    return cy.get("mat-option");
  }

  static get addToBasket() {
    return cy.get("[aria-label='Add to Basket']");
  }

  static get basketButton() {
    return cy.get("[aria-label='Show the shopping cart']");
  }

  static get ordersAndPayment() {
    return cy.get("button").contains("Orders & Payment");
  }

  static get savedAddresses() {
    return cy.get("[aria-label='Go to saved address page']");
  }

  static get savedPayments() {
    return cy.get("button").contains("My Payment Options");
  }
}