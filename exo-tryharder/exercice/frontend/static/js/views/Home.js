import AbstractView from "./AbstractView.js";
import { drawIcon } from '../utils/drawIcon.js';
import Select from '../components/Select.js'

const API_KEY = '?key=4a7bd6f3d4314002babc4e422c08c2e6'
const URL = `https://api.rawg.io/api/games${API_KEY}`
const PLATFORMS_URL = `https://api.rawg.io/api/platforms/lists/parents${API_KEY}`

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
    this.getNextAwaitedGames()
      .then((games) => {
        console.log(games)
        this.displayGames(games)
      })
    
    this.getAllPlatformsAvailable()
      .then((platforms) => {
        this.wrapper = document.querySelector('.wrapper-select')
        console.log(platforms)
        const select = new Select(platforms, this.wrapper)
        console.log(select)
      })
  }

  

  async getNextAwaitedGames() {
    const response = await fetch(`${URL}&page_size=9`)
    const data = await response.json();
    return data.results
  }

  displayGames(games) {
    let grid = document.querySelector('.grid')
    games.forEach((game) => {
      let newGrid = document.createElement('div');
      newGrid.className = 'grid-item'
      newGrid.innerHTML += `
        <div class="grid-image">
        <img src="${game.background_image}">
        </div>  
      `
      let newGridContent = document.createElement('div')
      newGridContent.className = 'grid-content'
      newGridContent.innerHTML = `
      <h4> ${game.name}</h4>  
      `

      let newGridContentPlatforms = document.createElement('div')
      newGridContentPlatforms.className = 'grid-content-platforms'
      game.parent_platforms.forEach((parent) => {
        newGridContentPlatforms.innerHTML += `
          <p>${drawIcon(parent.platform.id)}</p>
        `
      })
      newGridContent.appendChild(newGridContentPlatforms)
      newGrid.appendChild(newGridContent)
      grid.appendChild(newGrid)
    })
  }

  async getAllPlatformsAvailable() {
    const result = await fetch(PLATFORMS_URL)
    const data = await result.json()
    return data.results
  }
   
  async getHtml() { // this is the html for the dashboard view
    return `
      <div class="wrapper-home">
      <div class="wrapper-select">
      </div>
      <div class="grid"></div>
      </div>
    `
  }
}