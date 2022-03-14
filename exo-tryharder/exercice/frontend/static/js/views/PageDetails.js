import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Settings");
  }

  async getHtml() { // this is the html for the dashboard view
    return `
      <h1> PAGE DETAILS </h1>
      <p>loremdetails</p>
    `
  }
}