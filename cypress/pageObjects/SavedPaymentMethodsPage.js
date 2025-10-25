import { BasePage } from "../pageObjects/basePage";

export class SavedPaymentMethodsPage extends BasePage {
  static get url() {
    return "/#/address/saved-payment-methods";
  }

  static get addNewCard() {
      return cy.get("mat-panel-title").contains("Add new card");
  }

  static get fillInName() {
      return cy.get(`#mat-input-1`);
  }

  static get fillInCardNumber() {
      return cy.get(`#mat-input-2`);
  }

  static get setMonth() {
      return cy.get("#mat-input-3");
  }

  static get setYear() {
      return cy.get("#mat-input-4");
  }

  static get submitButton() {
      return cy.get("#submitButton");
  }

  static get cardsList() {
      return cy.get('mat-row');
  }
}