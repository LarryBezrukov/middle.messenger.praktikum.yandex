import HomePage from "./home";
import { renderDOM } from "../../utils/renderDOM";
import "../../styles/global.scss";

document.addEventListener("DOMContentLoaded", () => {
  const page = new HomePage();

  renderDOM("#app", page);
});
