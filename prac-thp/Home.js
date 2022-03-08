
const Home = (argument = '') => {
  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles"> Home : ${argument}</div>
      </section>
    `;
  };
  render()
};