const callRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');

  const pageName = pathParts[0];
  const pageArgument = pathParts[1] || '';
  const pageFunction = routes[pageName];

  if (pageFunction !== undefined) {
    pageFunction(pageArgument);
  }
};

window.addEventListener('hashchange', () => {
  console.log('hashchange')
  callRoute();
})
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')
  callRoute()
});