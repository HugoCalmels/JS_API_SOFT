import MyRouter from './MyRouter.js';

const navLinks = document.querySelectorAll('a')


const myRouter = new MyRouter("Toto")
console.log(myRouter)

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault()
    console.log(event.target.pathname)
  })
  console.log(link.pathname)
})