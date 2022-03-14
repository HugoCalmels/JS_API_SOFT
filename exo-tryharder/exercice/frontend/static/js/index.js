
console.log("JS is loaded")

import Home from "./views/Home.js";
import PageList from "./views/PageList.js";
import PageDetails from "./views/PageDetails.js";




const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/PageList", view: PageList },
    { path: "/PageDetails",  view: PageDetails },
  ]
  // test each route for potential match // map permet de créer un nveau tableau ..
  const potentialMatches = routes.map((route) => {
    return { // iterer sur l'ancien tableau et retourner un autre tableau
      route: route,
      isMatch: location.pathname === route.path
    }
  })


  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch) // returns only if ismatch true? yes because its a find fn

  if (!match) { // if no match
    match = {
      route: routes[0],
      isMatch: true
    }
  }

  const view = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml()


}

window.addEventListener('popstate', router)

// ONCE THE DOM HAS LOADED
document.addEventListener('DOMContentLoaded', () => {
  // pour empecher le rechargement de page 
  document.body.addEventListener('click', (event) => {
    if (event.target.matches("[data-link]")) {
      event.preventDefault()
      navigateTo(event.target.href)
    }

  })

 router()
})


// -------------------- //



