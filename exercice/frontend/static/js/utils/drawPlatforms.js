import SelectOption from "../components/SelectOption.js"
const API_KEY = '?key=4a7bd6f3d4314002babc4e422c08c2e6'
const PLATFORMS_URL = `https://api.rawg.io/api/platforms/lists/parents${API_KEY}`
const selectWrapper = document.querySelector('.wrapper-select')

export async function drawPlatformsSelectOptions() {
  getPlatforms().then((data) => {
    data.forEach((el) => {
      selectWrapper.appendChild(SelectOption(el))
    })
  })

}

async function getPlatforms() {
  const result = await fetch(PLATFORMS_URL)
  const data = await result.json()
  return data.results
}

