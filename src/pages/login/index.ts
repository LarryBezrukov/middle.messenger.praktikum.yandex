import LoginPage from "./login";
import { renderDOM } from "../../utils/renderDOM";
import "../../styles/global.scss";

document.addEventListener("DOMContentLoaded", () => {
  const page = new LoginPage();

  renderDOM("#app", page);
});
