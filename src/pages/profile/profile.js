import template from "./profile.pug";
import "../../styles/global.scss";
import "./profile.scss";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = template();
});
