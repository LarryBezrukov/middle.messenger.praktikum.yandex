import template from "./login.pug";
import "../../styles/global.scss";
import "./login.scss";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = template();
});
