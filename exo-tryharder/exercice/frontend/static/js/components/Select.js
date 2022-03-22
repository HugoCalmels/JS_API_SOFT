import { triangle } from '../assets/svgs/triangle.js'


export default class Select {
  constructor(data, wrapper) {
    console.log("----START SELECT CONSTRUCTOR-----")
    this.data = data;
    this.wrapper = wrapper
    this.options = this.initializeOptionsList()
    this.customSelectElement = document.createElement("div")
    this.labelElement = document.createElement('span')
    this.optionList = document.createElement('ul')
    build(this)
    console.log("----END SELECT CONSTRUCTOR-----")
  }

  initializeOptionsList() {
    const defaultOption = { name: "any", id: 0 }
    let newOptionsList = []
    newOptionsList.push(defaultOption)
    this.data.forEach((option) => {
    let game = { name: option.name, id: option.id }
      newOptionsList.push(game)
    })
    return newOptionsList
  }
}


function build(item) {
  console.log('AAAAAAAAAAAAA')
  item.customSelectElement.className = 'select-container'
  item.customSelectElement.innerText = 'Platform : '
  console.log('AAAAAAAAAAAAA')

  item.labelElement.innerText = item.options[0].name

  item.wrapper.append(item.customSelectElement)

  item.customSelectElement.addEventListener("click", () => {
    item.optionList.classList.toggle("show") // dropdown menu
  })

  item.options.forEach((option, index) => {
    let buildOneOption = document.createElement('option')
    buildOneOption.innerText = option.name
    buildOneOption.id = option.id
    if (index === 0) { // by default style of 1st index is styled
      buildOneOption.className = "option-element selected" 
    } else {
      buildOneOption.className = "option-element"
    }
    
    buildOneOption.setAttribute("name", option.name)
    item.optionList.append(buildOneOption)
  })

  // then building the dropdown container, and appendChild everything
  item.optionList.className = 'options-container'
  item.customSelectElement.append(item.labelElement)
  item.wrapper.append(item.customSelectElement)
  item.wrapper.append(item.optionList)

}