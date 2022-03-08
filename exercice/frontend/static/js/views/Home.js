import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async getHtml() { // this is the html for the dashboard view
    return `
      <h1> Home </h1>

    `
  }
}