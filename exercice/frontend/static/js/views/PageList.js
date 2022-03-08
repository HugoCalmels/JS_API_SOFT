import AbstractView from "./AbstractView.js";
import Grid from "../components/Grid.js"

const API_KEY = '?key=4a7bd6f3d4314002babc4e422c08c2e6'
const URL = `https://api.rawg.io/api/games${API_KEY}`

const app = document.querySelector('#app')

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Posts");
    this.getNextAwaitedGames()
      .then(data => {
      app.appendChild(Grid(data))
    })

  }

  async getNextAwaitedGames() {
    console.log("hi")
    const response = await fetch(URL)
    const data = await response.json();
    console.log(data)
    return data.results
  }

  async getHtml() { // this is the html for the dashboard view
    return `
      <h1> PAGE LIST </h1>
      <p>loremlist</p>
    `
  }
}