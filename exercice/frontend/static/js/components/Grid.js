
export default function grid(data) {
  const grid = document.createElement('div');
  grid.classList = 'grid'
  data.forEach((elem) => {
    grid.innerHTML += `
    <div class="grid-elem">
    <p>${elem.name}</p>
    </div>
    `
  })
  return grid
}






