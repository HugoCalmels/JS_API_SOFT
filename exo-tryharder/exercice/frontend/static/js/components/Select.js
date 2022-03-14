import { triangle } from '../assets/svgs/triangle.js'
const body = document.querySelector('html')

export default class Select {
  constructor(optionsList, wrapper) {

    this.optionsList = optionsList
 

    this.wrapper = wrapper
    this.customElement = document.createElement('div')
    this.spanElement = document.createElement('span')
    this.upArrowBtn = document.createElement('div')
    this.downArrowBtn = document.createElement('div')
    this.optionsElementsList = document.createElement('ul')

    
    this.selectedOption = ''


    initialize(this)
    listen(this)

    
  }

  get customSelectedOption() {

    let options = this.optionsElementsList.querySelectorAll('li')



    options.forEach((option) => {
      if (option.classList.contains('selected')) {
        console.log('//////////////////////////////////////')
        console.log(options)
        console.log(option)
        return option
      }
    })

    /*
   this.optionsElementsList.querySelectorAll('li').find((option) => {
      console.log(option)
      //option.classList.contains('selected')
     })
     */
  }

}


function initialize(item) {


  item.optionsElementsList.classList.remove("show")
  item.customElement.className = "select-elem"
  item.customElement.innerText = "Platform : "
  item.customElement.addEventListener("click", () => {
      item.optionsElementsList.classList.toggle("show")
      //item.customElement.setAttribute("tabindex", 0)
    //item.customElement.focus()
  })

  item.customElement.addEventListener("blur", () => {
    item.optionsElementsList.classList.remove("show")
  })

  //console.log("------------")
  //console.log(item.optionsList)
  //console.log("------------")

  

  item.spanElement.className = "select-value"
  item.spanElement.innerText = `item.optionsList[0]`
  item.customElement.append(item.spanElement)

  item.upArrowBtn.className = "select-btn-up"
  item.upArrowBtn.innerHTML = triangle
  item.customElement.append(item.upArrowBtn)

  item.downArrowBtn.className = "select-btn-down"
  item.downArrowBtn.innerHTML = triangle
  item.customElement.append(item.downArrowBtn)

  item.wrapper.append(item.customElement)

  item.optionsElementsList.className = "select-options-list"
  
  //item.optionsElementsList.innerHTML += `<li>any</li>`
  item.optionsList.forEach((option) => {
    let setOneOption = document.createElement('li')
    setOneOption.dataset.name = option.name
    setOneOption.innerHTML += `<li>${option.name}</li>`
    item.optionsElementsList.append(setOneOption)
  })
  item.wrapper.append(item.optionsElementsList)



  

  /*
  item.optionsElementsList.forEach((option) => {
    option.addEventListener('click', (event) => {
      console.log(event)
    })
  })
  */


  
}

function listen(item) {
  const singleOptionElemArray = item.optionsElementsList.querySelectorAll('li')
  
  singleOptionElemArray.forEach((option) => {
  
    option.addEventListener('click', (event) => {
      
      if (option.getAttribute('data-name') !== null) {
        console.log(item.selectedOption)
        console.log(option)
        console.log(event)
        console.log(option.getAttribute('data-name'));
    
        item.selectedOption = option.getAttribute('data-name')
        event.preventDefault();
        


        option.classList.add('selected')

        console.log('666666666666666666')
        console.log(item.customSelectedOption)
        singleOptionElemArray.forEach((el) => {
     

          /*
          console.log('------')
          console.log(item.customSelectedOption)
          console.log('---------')
          console.log('333333333333')
          console.log("EVENT", el.getAttribute('data-name'))
          console.log("ITEM", item.selectedOption)
          if (el.getAttribute('data-name') === item.selectedOption) {
            el.classList.add('selected')
            console.log('**********************************************')
            console.log("SHOULD BE ONLY ONE")
            console.log(el)
            el.style.backgroundColor = "purple";
            console.log('**********************************************')
          } else {
            console.log(el)
            el.style.backgroundColor = "none";
            el.classList.remove('selected')
          }
  
          console.log('333333333333')

          */
        })
        console.log('666666666666666666')
    
      }
  



      

    })
  })
}
