import template from "./chat.pug";
import "../../styles/global.scss";
import "./chat.scss";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = template();
});
