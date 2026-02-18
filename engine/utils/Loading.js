const template = `
<div class="loading">
  <h1>Loading...</h1>
</div>
`;

class Load {
  constructor() {
    this.app = document.querySelector("#app");
  }

  Show() {
    this.app.innerHTML = template;
    this.app.style.opacity = 1;
  }

  Hide() {
    this.app.style.opacity = 0;
    setTimeout(() => {
      this.app.innerHTML = "";
    }, 500);
  }
}

export const Loading = new Load();