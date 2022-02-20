import compileTemplate from "./index.pug";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = compileTemplate({ name: "Larry" });
});
