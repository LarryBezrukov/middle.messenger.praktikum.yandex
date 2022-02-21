import template from "./index.pug";
import "../styles/global.scss";
import "./index.scss";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = template();
});
