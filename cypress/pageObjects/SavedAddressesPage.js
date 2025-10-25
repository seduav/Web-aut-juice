import { BasePage } from "../pageObjects/basePage";

export class SavedAddressesPage extends BasePage {
  static get url() {
    return "/#/address/saved";
  }

  static get checkAddress() {
    return cy.get(`mat-row`);
  }

  static get addANewAdressButton() {
    return cy.get(`[aria-label="Add a new address"]`);
  }
}