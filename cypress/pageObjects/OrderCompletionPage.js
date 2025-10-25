import { BasePage } from "../pageObjects/basePage";

export class OrderCompletionPage extends BasePage {
  static get url() {
    return "/#/order-completion/";
  }

  static get confirmation() {
    return cy.get(".confirmation");
  }
}