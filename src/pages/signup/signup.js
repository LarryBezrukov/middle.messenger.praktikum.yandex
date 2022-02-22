import template from "./signup.pug";
import "../../styles/global.scss";
import "./signup.scss";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = template();
});
