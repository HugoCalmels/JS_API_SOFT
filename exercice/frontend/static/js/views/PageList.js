import AbstractView from "./AbstractView.js";
import Grid from "../components/Grid.js"
import SelectOption from "../components/SelectOption.js"

const API_KEY = '?key=4a7bd6f3d4314002babc4e422c08c2e6'
const URL = `https://api.rawg.io/api/games${API_KEY}`
const PLATFORMS_URL = `https://api.rawg.io/api/platforms/lists/parents${API_KEY}`
const searchInput = document.querySelector('#search-input')
const selectWrapper = document.querySelector('.wrapper-select')

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Posts");
    this.oberserverIndex = 1 
    this.getMoreGames()
    setTimeout(()=>{
      this.listenButtonShowMore()
    },300)
    this.getPlatforms()
      .then((data) => {
        this.drawPlatformsSelectOptions(data)
        this.listenSelectOptions()
        //displayOnlySelectedElements()
      })
    this.listenSearchInput()   
  }

  listenSearchInput() {
    searchInput.addEventListener('keyup', (event) => {
      event.preventDefault()
      this.currentSearchInput = event.target.value
      this.searchGame(event.target.value)
        .then((searchData) => {
          let container = document.querySelector('.grid-container')
          console.log(searchData)
          let oldGrid = document.querySelector('.grid');
          if ( oldGrid !== null ) {
            oldGrid.remove()
          }
          container.appendChild(Grid(searchData))
        })
    })
  }

  listenButtonShowMore() {
    let buttonShowMore = document.querySelector('#btn-show-more')
    buttonShowMore.addEventListener('click', (e) => {
      e.preventDefault()
      this.getMoreGames()
    })
  }


  scrollDownListener() {
    let grids = document.querySelectorAll('.grid-elem')
    let options = {
      rootMargin: "-10% 0px", 
      treshold: 0, 
    }
    const observer = new IntersectionObserver(this.handleIntersect, options)
     grids.forEach((grid) => {
      observer.observe(grid) 
     })
  }

  handleIntersect(entries){
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
      } else {
        entry.target.style.opacity = 0;
      }
    })
  }

  async getMoreGames() {
      this.getNextAwaitedGames()
      .then(rawData => {
        let container = document.querySelector('.grid-container')
        container.appendChild(Grid(rawData, this.oberserverIndex))
        this.scrollDownListener()
        this.oberserverIndex++
      })
  
  }
  async displayOnlySelectedElements(number) {
    let gridElems = await document.querySelectorAll('.grid-elem')
    gridElems.forEach((gridElem) => {
      if (gridElem.attributes[1].nodeValue.includes(number))
        console.log(gridElem.attributes[1].nodeValue)
      else 
        gridElem.remove()
    })
  }

  async searchGameByPlatform(name, platform) {
    const response = await fetch(`${URL}&search=${name}&platforms=${platform}`)
    const data = await response.json()
    return data.results
  }

  drawPlatformsSelectOptions(data) {
    for (let i = 1; i < data.length; i++){
      selectWrapper.appendChild(SelectOption(data[i], i))
    }
 
 }
  async getPlatforms() {
    const result = await fetch(PLATFORMS_URL)
    const data = await result.json()
    return data.results
  }
  

  async getNextAwaitedGames() {
    const response = await fetch(`${URL}&page=${this.oberserverIndex}&page_size=9`)
    const data = await response.json();
    return data.results
  }
  
  listenSelectOptions() {
    let selectButtons = document.querySelectorAll('.select-option')
    selectButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        console.log(event.target.id)
        this.displayOnlySelectedElements(event.target.id)
      })
    })
  }

  
  
  async getPlatforms() {
    const result = await fetch(PLATFORMS_URL)
    const data = await result.json()
    return data.results
  }

  async searchGame(name) {
      const response = await fetch(`${URL}&search=${name}`)
      const data = await response.json()
      return data.results
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