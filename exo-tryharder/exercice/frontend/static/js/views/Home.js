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
      <div class="container-home">
      <h2>Welcome,</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis reiciendis nobis debitis quo quod, reprehenderit fugiat, quae fugit provident ullam maiores distinctio eos quia! Blanditiis tempore distinctio officiis doloribus aut impedit facilis, non sint voluptatem, autem vero adipisci harum animi voluptate consectetur quibusdam quae ad ipsam cumque vel? Voluptas laborum quidem inventore voluptatum quam aperiam quos tempora amet nisi, exercitationem eos quae ut, recusandae necessitatibus quo? Laborum, eveniet. Officia, atque eveniet. Incidunt dolor esse aspernatur, provident, culpa perferendis impedit sequi voluptas, exercitationem voluptatibus itaque aliquid vero eos suscipit deleniti? Similique officiis ab itaque, velit porro id aliquam sapiente earum consectetur cumque, magnam animi nemo doloremque quae molestiae beatae! Laboriosam non excepturi animi suscipit architecto dignissimos placeat quisquam id, nihil quibusdam, nulla nemo, fugit dicta tempore totam incidunt. Quibusdam minima iste similique! Dicta reiciendis minus autem possimus incidunt beatae atque provident officia accusamus, sequi quae error modi quidem eligendi. Reprehenderit, ut.</p>
      <div class="wrapper-select"></div>
      <div class="grid"></div>
      </div>
      
      </div>
    `
  }
}