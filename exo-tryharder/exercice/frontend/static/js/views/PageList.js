import AbstractView from "./AbstractView.js";
export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Posts");
  }

  async getHtml() { // this is the html for the dashboard view
    return `
    <div class="wrapper-home">
    <h1> Next awaited games </h1>
    <div class="grid-container">
    </div>
    <div class="button-container">
    <button id="btn-show-more">Show more</button>
    </div>
    </div>
    `
  }
}