
export default function grid(data, index) {
  /*
  let oldGrid = document.querySelector('.grid');
  if ( oldGrid !== null ) {
    oldGrid.remove()
  }
  */
  



  const newGrid = document.createElement('div');
  newGrid.classList = `grid id-${index}`

  data.forEach((elem) => {
    let getParentsPlatforms = ""
    elem.parent_platforms.forEach((platform) => {
      getParentsPlatforms += ` ${platform.platform.id}`
  })
    newGrid.innerHTML += `
    <div class="grid-elem" data-platforms='${getParentsPlatforms}'>
    <p>${elem.name}</p>
    </div>
    `
  })
  return newGrid
}






